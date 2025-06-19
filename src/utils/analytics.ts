
// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}

export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      event_label: eventName,
      ...parameters,
    });
  }
};

export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-55SXGEFWWH', {
      page_title: title,
      page_location: url,
    });
  }
};

export const trackAgentView = (agentId: string, agentName: string) => {
  trackEvent('view_agent', {
    agent_id: agentId,
    agent_name: agentName,
    event_category: 'agent_interaction',
  });
};

export const trackAgentSearch = (searchTerm: string, resultsCount: number) => {
  trackEvent('search', {
    search_term: searchTerm,
    results_count: resultsCount,
    event_category: 'search',
  });
};

export const trackCategoryView = (categoryName: string) => {
  trackEvent('view_category', {
    category_name: categoryName,
    event_category: 'navigation',
  });
};

export const trackAgentSubmission = (agentName: string) => {
  trackEvent('submit_agent', {
    agent_name: agentName,
    event_category: 'conversion',
  });
};
