'use client';

import Header from '@/components/Header';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="relative">
        <div 
          className="h-96 bg-cover bg-center bg-gray-900 flex items-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://readdy.ai/api/search-image?query=Modern%20building%20management%20office%20with%20professional%20staff%20coordinating%20maintenance%20operations%2C%20clean%20workspace%20with%20digital%20tablets%20and%20planning%20boards%2C%20bright%20natural%20lighting%2C%20contemporary%20interior%20design%2C%20professional%20atmosphere%2C%20high-tech%20building%20management%20center&width=1200&height=400&seq=hero1&orientation=landscape')`
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Streamline Your Building Operations
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                ManageMate helps building managers and staff coordinate maintenance, track inventory, and manage vendor relationships with ease.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                    <i className="ri-arrow-right-line ml-2"></i>
                  </Button>
                </Link>
                <Link href="/bids">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 text-white border-white/30 hover:bg-white/20">
                    View Bid Center
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Complete Building Management Solution
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage your building operations efficiently, from maintenance scheduling to vendor management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-auction-line text-2xl text-blue-600"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Bid Center</h3>
            <p className="text-gray-600 mb-4">
              Post maintenance projects and receive competitive bids from qualified vendors.
            </p>
            <Link href="/bids">
              <Button variant="outline" size="sm" className="w-full">
                Explore Bids
              </Button>
            </Link>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-file-list-3-line text-2xl text-green-600"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Inventory Tracker</h3>
            <p className="text-gray-600 mb-4">
              Track tools, supplies, and consumables with QR code support and low-stock alerts.
            </p>
            <Link href="/inventory">
              <Button variant="outline" size="sm" className="w-full">
                Manage Inventory
              </Button>
            </Link>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-calendar-todo-line text-2xl text-purple-600"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Maintenance Scheduler</h3>
            <p className="text-gray-600 mb-4">
              Schedule repairs, assign tasks, and track maintenance with recurring task support.
            </p>
            <Link href="/maintenance">
              <Button variant="outline" size="sm" className="w-full">
                Schedule Tasks
              </Button>
            </Link>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-dashboard-line text-2xl text-orange-600"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics Dashboard</h3>
            <p className="text-gray-600 mb-4">
              Monitor spending, track bid performance, and generate comprehensive reports.
            </p>
            <Link href="/analytics">
              <Button variant="outline" size="sm" className="w-full">
                View Analytics
              </Button>
            </Link>
          </Card>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Mobile-First Design for On-the-Go Management
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                ManageMate is designed with mobile users in mind. Access your dashboard, update task statuses, and communicate with vendors from anywhere in your building.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <i className="ri-check-line text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Role-Based Access Control</h4>
                    <p className="text-gray-600">Secure access levels for admins and staff members</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <i className="ri-check-line text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Real-Time Notifications</h4>
                    <p className="text-gray-600">Stay updated on task assignments and changes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <i className="ri-check-line text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Modular Architecture</h4>
                    <p className="text-gray-600">Easily expand with additional features as needed</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:pl-8">
              <img 
                src="https://readdy.ai/api/search-image?query=Building%20maintenance%20staff%20using%20mobile%20tablets%20and%20smartphones%20for%20facility%20management%2C%20modern%20workplace%20with%20digital%20workflow%2C%20professional%20maintenance%20team%20coordinating%20tasks%2C%20clean%20office%20environment%20with%20technology%20integration%2C%20realistic%20workplace%20scenario&width=600&height=400&seq=mobile1&orientation=landscape"
                alt="Mobile Management"
                className="rounded-lg shadow-lg w-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Building Management?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of building managers who have streamlined their operations with ManageMate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/bids">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                Schedule Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}