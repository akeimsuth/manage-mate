
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'staff'>('admin');

  const toggleRole = () => {
    const newRole = userRole === 'admin' ? 'staff' : 'admin';
    setUserRole(newRole);
    localStorage.setItem('userRole', newRole);
    // Trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent('roleChanged', { detail: newRole }));
  };

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') as 'admin' | 'staff';
    if (savedRole) {
      setUserRole(savedRole);
    }
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="text-xl font-bold text-blue-600" style={{ fontFamily: 'Pacifico, serif' }}>
                ManageMate
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
            {userRole === 'admin' && (
              <Link href="/bids" className="text-gray-700 hover:text-blue-600 transition-colors">
                Bid Center
              </Link>
            )}
            <Link href="/inventory" className="text-gray-700 hover:text-blue-600 transition-colors">
              Inventory
            </Link>
            <Link href="/maintenance" className="text-gray-700 hover:text-blue-600 transition-colors">
              Maintenance
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleRole}
              className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              {userRole === 'admin' ? 'Admin' : 'Staff'}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center text-gray-700 hover:text-blue-600 cursor-pointer"
            >
              <i className="ri-menu-line text-xl"></i>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-3">
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
              {userRole === 'admin' && (
                <Link href="/bids" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Bid Center
                </Link>
              )}
              <Link href="/inventory" className="text-gray-700 hover:text-blue-600 transition-colors">
                Inventory
              </Link>
              <Link href="/maintenance" className="text-gray-700 hover:text-blue-600 transition-colors">
                Maintenance
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
