import React from 'react';
import { Bell, Moon, Settings, Sun, User, Search } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../contexts/ThemeContext';

export function Header() {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="glass border-b border-purple/10 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search here..."
            className="search-input"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 hover:bg-dark-lighter"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-purple-light" />
            ) : (
              <Moon className="h-5 w-5 text-purple-light" />
            )}
          </button>
          <button className="rounded-full p-2 hover:bg-dark-lighter">
            <Bell className="h-5 w-5 text-purple-light" />
          </button>
          <button className="rounded-full p-2 hover:bg-dark-lighter">
            <Settings className="h-5 w-5 text-purple-light" />
          </button>
          
          <div className="flex items-center gap-3 pl-4 border-l border-purple/10">
            <div className="text-right">
              <p className="text-sm font-medium text-white">
                {user?.displayName || user?.email}
              </p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
            <div className="relative">
              <button className="h-10 w-10 rounded-full bg-purple/20">
                <User className="h-5 w-5 m-auto text-purple-light" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}