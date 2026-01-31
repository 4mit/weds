'use client';

import React, { useEffect, useRef, useCallback } from 'react';

interface AnalyticsEvent {
  type: 'click' | 'scroll' | 'pageview' | 'section_enter' | 'section_exit';
  timestamp: number;
  data: {
    element?: string;
    section?: string;
    progress?: number;
    x?: number;
    y?: number;
    ip?: string;
    location?: string;
    userAgent?: string;
  };
}

interface VisitorData {
  visitorId: string;
  firstVisit: number;
  lastVisit: number;
  visitCount: number;
  ip?: string;
  location?: string;
}

class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private visitorId: string;
  private visitorData: VisitorData;
  private clickCount: number = 0;
  private scrollCount: number = 0;
  private lastScrollTime: number = 0;
  private scrollThrottle: number = 1000; // Throttle scroll events to once per second

  constructor() {
    // Generate or retrieve visitor ID
    this.visitorId = this.getOrCreateVisitorId();
    this.visitorData = this.getVisitorData();
    this.updateVisitorData();
    this.fetchUserLocation();
  }

  private getOrCreateVisitorId(): string {
    if (typeof window === 'undefined') return 'unknown';
    
    let visitorId = localStorage.getItem('wedding_visitor_id');
    if (!visitorId) {
      visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('wedding_visitor_id', visitorId);
    }
    return visitorId;
  }

  private getVisitorData(): VisitorData {
    if (typeof window === 'undefined') {
      return {
        visitorId: 'unknown',
        firstVisit: Date.now(),
        lastVisit: Date.now(),
        visitCount: 0,
      };
    }

    const stored = localStorage.getItem('wedding_visitor_data');
    if (stored) {
      return JSON.parse(stored);
    }

    return {
      visitorId: this.visitorId,
      firstVisit: Date.now(),
      lastVisit: Date.now(),
      visitCount: 1,
    };
  }

  private updateVisitorData(): void {
    if (typeof window === 'undefined') return;

    this.visitorData.visitCount += 1;
    this.visitorData.lastVisit = Date.now();
    localStorage.setItem('wedding_visitor_data', JSON.stringify(this.visitorData));
  }

  private async fetchUserLocation(): Promise<void> {
    try {
      // Fetch IP and location using ipapi.co (free tier)
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      this.visitorData.ip = data.ip || 'unknown';
      this.visitorData.location = data.city 
        ? `${data.city}, ${data.region}, ${data.country_name}`
        : data.country_name || 'unknown';
      
      // Update stored data
      if (typeof window !== 'undefined') {
        localStorage.setItem('wedding_visitor_data', JSON.stringify(this.visitorData));
      }
    } catch (error) {
      console.error('Failed to fetch location:', error);
      // Fallback: try alternative service
      try {
        const fallbackResponse = await fetch('https://api.ipify.org?format=json');
        const fallbackData = await fallbackResponse.json();
        this.visitorData.ip = fallbackData.ip || 'unknown';
      } catch (fallbackError) {
        console.error('Failed to fetch IP:', fallbackError);
      }
    }
  }

  trackClick(element: string, x?: number, y?: number): void {
    this.clickCount++;
    const event: AnalyticsEvent = {
      type: 'click',
      timestamp: Date.now(),
      data: {
        element,
        x,
        y,
        ip: this.visitorData.ip,
        location: this.visitorData.location,
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'unknown',
      },
    };
    this.events.push(event);
    this.logEvent(event);
  }

  trackScroll(progress: number, section?: string): void {
    const now = Date.now();
    // Throttle scroll events
    if (now - this.lastScrollTime < this.scrollThrottle) {
      return;
    }
    this.lastScrollTime = now;
    this.scrollCount++;

    const event: AnalyticsEvent = {
      type: 'scroll',
      timestamp: now,
      data: {
        progress,
        section,
        ip: this.visitorData.ip,
        location: this.visitorData.location,
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'unknown',
      },
    };
    this.events.push(event);
    this.logEvent(event);
  }

  trackPageView(): void {
    const event: AnalyticsEvent = {
      type: 'pageview',
      timestamp: Date.now(),
      data: {
        ip: this.visitorData.ip,
        location: this.visitorData.location,
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'unknown',
      },
    };
    this.events.push(event);
    this.logEvent(event);
  }

  trackSectionEnter(section: string, progress: number): void {
    const event: AnalyticsEvent = {
      type: 'section_enter',
      timestamp: Date.now(),
      data: {
        section,
        progress,
        ip: this.visitorData.ip,
        location: this.visitorData.location,
      },
    };
    this.events.push(event);
    this.logEvent(event);
  }

  trackSectionExit(section: string, progress: number): void {
    const event: AnalyticsEvent = {
      type: 'section_exit',
      timestamp: Date.now(),
      data: {
        section,
        progress,
        ip: this.visitorData.ip,
        location: this.visitorData.location,
      },
    };
    this.events.push(event);
    this.logEvent(event);
  }

  private logEvent(event: AnalyticsEvent): void {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', event);
    }

    // Here you can send to your analytics backend
    // Example: sendToBackend(event);
  }

  getStats() {
    return {
      visitorId: this.visitorId,
      visitorData: this.visitorData,
      clickCount: this.clickCount,
      scrollCount: this.scrollCount,
      totalEvents: this.events.length,
      events: this.events,
    };
  }

  // Method to send events to backend (implement as needed)
  async sendToBackend(endpoint: string): Promise<void> {
    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          visitorId: this.visitorId,
          visitorData: this.visitorData,
          events: this.events,
          stats: {
            clickCount: this.clickCount,
            scrollCount: this.scrollCount,
          },
        }),
      });
    } catch (error) {
      console.error('Failed to send analytics to backend:', error);
    }
  }
}

// Create singleton instance
const analyticsService = new AnalyticsService();

interface AnalyticsProps {
  progress?: number;
  currentSection?: string;
}

const Analytics: React.FC<AnalyticsProps> = ({ progress, currentSection }) => {
  const lastProgressRef = useRef<number>(0);
  const lastSectionRef = useRef<string>('');

  // Track page view on mount
  useEffect(() => {
    analyticsService.trackPageView();
  }, []);

  // Track scroll progress
  useEffect(() => {
    if (progress !== undefined && progress !== lastProgressRef.current) {
      analyticsService.trackScroll(progress, currentSection);
      lastProgressRef.current = progress;
    }
  }, [progress, currentSection]);

  // Track section changes
  useEffect(() => {
    if (currentSection && currentSection !== lastSectionRef.current) {
      if (lastSectionRef.current) {
        analyticsService.trackSectionExit(lastSectionRef.current, lastProgressRef.current);
      }
      analyticsService.trackSectionEnter(currentSection, progress || 0);
      lastSectionRef.current = currentSection;
    }
  }, [currentSection, progress]);

  // Track clicks globally
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const element = target.tagName + (target.className ? `.${target.className.split(' ')[0]}` : '') + (target.id ? `#${target.id}` : '');
      analyticsService.trackClick(element, e.clientX, e.clientY);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return null; // This component doesn't render anything
};

// Export the service for direct use if needed
export { analyticsService };
export default Analytics;
