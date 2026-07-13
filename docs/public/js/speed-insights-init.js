/**
 * Vercel Speed Insights Initialization
 * This script initializes Vercel Speed Insights for performance monitoring
 */

// Import and initialize Speed Insights
import { injectSpeedInsights } from './vendor/speed-insights.mjs';

// Initialize Speed Insights when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSpeedInsights);
} else {
  initSpeedInsights();
}

function initSpeedInsights() {
  injectSpeedInsights({
    debug: false, // Set to true for development debugging
    // sampleRate: 1, // Optional: Sample rate (1 = 100% of events)
    // beforeSend: (event) => {
    //   // Optional: Modify or filter events before sending
    //   return event;
    // }
  });
}
