import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, Search } from 'lucide-react';

const AppLayout = () => {
  // Initialize TradingView widget with new styling and configuration
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;

    // Enhanced widget configuration with more relevant symbols and improved styling
    const widgetConfig = {
      symbols: [
        { proName: "NASDAQ:AAPL", description: "Apple" },
        { proName: "NASDAQ:GOOGL", description: "Google" },
        { proName: "NASDAQ:MSFT", description: "Microsoft" },
        { proName: "NASDAQ:AMZN", description: "Amazon" },
        { proName: "NASDAQ:TSLA", description: "Tesla" },
        { proName: "NYSE:V", description: "Visa" },
        { proName: "NYSE:JPM", description: "JPMorgan" },
        { proName: "NASDAQ:META", description: "Meta" }
      ],
      colorTheme: "dark", // Changed to dark theme for better contrast
      isTransparent: true, // Makes widget blend better with the layout
      displayMode: "adaptive",
      locale: "en"
    };

    script.innerHTML = JSON.stringify(widgetConfig);

    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    
    const container = document.querySelector('.tradingview-widget-container');
    if (container) {
      container.appendChild(widgetDiv);
      container.appendChild(script);
    }

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Enhanced Header with Navigation */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-indigo-600" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  StockSense
                </h1>
                <p className="text-sm text-gray-600">Smart Market Insights</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden sm:block flex-1 max-w-lg mx-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
                  placeholder="Search stocks..."
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area with Improved Spacing */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Welcome Card */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Welcome to StockSense</h2>
                <p className="text-gray-600 mt-1">Your personal market analysis platform</p>
              </div>
              <div className="hidden sm:block">
                <div className="text-sm text-gray-500">
                  Market Status: <span className="text-green-500 font-medium">Open</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Main Content Container */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div id="root" />
          </Card>
        </div>
      </main>

      {/* Enhanced Footer with TradingView Widget */}
      <footer className="fixed bottom-0 w-full bg-gray-900/90 backdrop-blur-sm border-t border-gray-800">
        <div className="tradingview-widget-container h-14">
          {/* TradingView widget will be inserted here */}
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;