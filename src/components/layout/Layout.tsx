import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Toaster } from 'react-hot-toast';

export function Layout() {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="flex min-h-screen bg-dark">
      <Sidebar show={showSidebar} onToggle={() => setShowSidebar(!showSidebar)} />
      <div 
        className={`flex-1 transition-all duration-300 ${
          showSidebar ? 'ml-64' : 'ml-20'
        }`}
      >
        <Header />
        <main className="h-[calc(100vh-4rem)] overflow-auto">
          <div className="container mx-auto p-6">
            <Outlet />
          </div>
        </main>
      </div>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1E1A2E',
            color: '#fff',
            border: '1px solid rgba(157, 122, 234, 0.1)',
          },
        }}
      />
    </div>
  );
}