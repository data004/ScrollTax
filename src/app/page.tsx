"use client";

import { useState } from "react";
import { AlertCircle, Terminal, TrendingDown, Settings2 } from "lucide-react";

export default function ScrollTaxDashboard() {
  const [logs, setLogs] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const simulateDoomscroll = async () => {
    setIsSimulating(true);
    const newLog = `[SYSTEM] 🚨 Limit Exceeded: X (Twitter) usage hit 74/60 minutes.`;
    setLogs((prev) => [newLog, ...prev]);

    try {
      const response = await fetch("/api/penalty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: "X",
          limit: 60,
          actual_usage: 74,
          penalty: 10,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setLogs((prev) => [
          `[AGENT] Binance MCP executed $${data.data.penalty_amount} MARKET BUY on ${data.data.executed_asset}USDC.`,
          ...prev,
        ]);
      } else {
        setLogs((prev) => [`[ERROR] Agent execution failed: ${data.error}`, ...prev]);
      }
    } catch (error) {
      setLogs((prev) => [`[ERROR] Network failure contacting Agent orchestrator.`, ...prev]);
    }
    
    setIsSimulating(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Configuration Panel */}
      <div className="lg:col-span-1 space-y-6">
        <div className="brutal-card">
          <div className="flex items-center gap-2 mb-4 text-primary">
            <Settings2 size={24} />
            <h2 className="text-xl font-bold uppercase">Penalty Rules</h2>
          </div>
          
          <div className="space-y-4 font-mono text-sm">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-gray-400">Daily Limit</span>
              <span className="font-bold text-white">60 min</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-gray-400">Penalty Amount</span>
              <span className="font-bold text-danger">$10 USDC</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-gray-400">Trigger</span>
              <span className="font-bold text-white">Exceed limit</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-gray-400">Execution</span>
              <span className="font-bold text-accent">Binance Agent OS</span>
            </div>
          </div>
        </div>

        <button 
          onClick={simulateDoomscroll}
          disabled={isSimulating}
          className="w-full brutal-button-danger flex justify-center items-center gap-2"
        >
          <AlertCircle size={20} />
          {isSimulating ? "Processing Penalty..." : "Simulate Doomscroll"}
        </button>
      </div>

      {/* Execution Terminal */}
      <div className="lg:col-span-2">
        <div className="brutal-card h-full flex flex-col">
          <div className="flex items-center justify-between mb-4 border-b-brutal border-border pb-4">
            <div className="flex items-center gap-2 text-accent">
              <Terminal size={24} />
              <h2 className="text-xl font-bold uppercase">Agent OS Execution Log</h2>
            </div>
            <div className="flex items-center gap-2 text-gray-500 font-mono text-xs">
              <TrendingDown size={14} />
              <span>Live Feed</span>
            </div>
          </div>
          
          <div className="flex-1 bg-black border-brutal border-border p-4 font-mono text-sm overflow-y-auto min-h-[300px]">
            {logs.length === 0 ? (
              <p className="text-gray-600">Waiting for browser extension events...</p>
            ) : (
              <div className="space-y-2">
                {logs.map((log, index) => (
                  <div key={index} className={log.includes("[ERROR]") ? "text-danger" : log.includes("[AGENT]") ? "text-accent" : "text-primary"}>
                    <span className="text-gray-500 mr-2">{new Date().toLocaleTimeString()}</span>
                    {log}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
