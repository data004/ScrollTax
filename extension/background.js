let timeSpent = 60; // Starting at 60 so the hackathon demo triggers immediately
const LIMIT = 60;
let isPenaltyTriggered = false;

// For a fast hackathon demo, we use setInterval to check every 5 seconds.
// In a production build, you would use chrome.alarms.
setInterval(async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  
  if (tabs.length > 0) {
    const activeTab = tabs[0];
    if (activeTab.url && (activeTab.url.includes("x.com") || activeTab.url.includes("twitter.com"))) {
      timeSpent += 1; 
      console.log("Time on X detected. Current total:", timeSpent);
      
      if (timeSpent > LIMIT && !isPenaltyTriggered) {
        isPenaltyTriggered = true;
        triggerScrollTaxPenalty(timeSpent);
      }
    }
  }
}, 5000);

async function triggerScrollTaxPenalty(actualUsage) {
  try {
    // Note: Update this to your Vercel deployment URL when presenting
    const API_URL = "http://localhost:3000/api/penalty"; 
    
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        platform: "X",
        limit: LIMIT,
        actual_usage: actualUsage,
        penalty: 10
      })
    });
    
    const data = await response.json();
    console.log("ScrollTax Execution payload sent:", data);
  } catch (error) {
    console.error("Failed to trigger Binance Agent OS penalty:", error);
  }
}
