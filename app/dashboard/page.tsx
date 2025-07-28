
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Link from 'next/link';

export default function Dashboard() {
  const [userRole, setUserRole] = useState<'admin' | 'staff'>('admin');
  const [isLogHoursModalOpen, setIsLogHoursModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState('');
  const [hoursWorked, setHoursWorked] = useState('');
  const [workDate, setWorkDate] = useState(new Date().toISOString().split('T')[0]);
  const [workDescription, setWorkDescription] = useState('');

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') as 'admin' | 'staff';
    if (savedRole) {
      setUserRole(savedRole);
    }

    const handleRoleChange = (event: CustomEvent) => {
      setUserRole(event.detail);
    };

    window.addEventListener('roleChanged', handleRoleChange as EventListener);
    return () => window.removeEventListener('roleChanged', handleRoleChange as EventListener);
  }, []);

  const recentTasks = [
    { id: 1, title: 'Fix AC Unit - Floor 3', priority: 'High', status: 'In Progress', assignee: 'John Smith', dueDate: '2024-01-15' },
    { id: 2, title: 'Replace Light Bulbs - Lobby', priority: 'Medium', status: 'Pending', assignee: 'Sarah Johnson', dueDate: '2024-01-16' },
    { id: 3, title: 'Inspect Fire Extinguishers', priority: 'High', status: 'Completed', assignee: 'Mike Davis', dueDate: '2024-01-14' },
    { id: 4, title: 'Clean Elevator Maintenance', priority: 'Medium', status: 'Scheduled', assignee: 'Lisa Wilson', dueDate: '2024-01-17' },
  ];

  const recentBids = [
    { id: 1, title: 'Roof Repair Project', vendor: 'ABC Roofing Co.', amount: '$15,000', status: 'Under Review' },
    { id: 2, title: 'HVAC System Upgrade', vendor: 'Climate Solutions', amount: '$28,500', status: 'Accepted' },
    { id: 3, title: 'Parking Lot Resurfacing', vendor: 'Paving Masters', amount: '$12,000', status: 'Pending' },
  ];

  const lowStockItems = [
    { id: 1, name: 'LED Light Bulbs', current: 12, minimum: 25, category: 'Electrical' },
    { id: 2, name: 'Cleaning Supplies', current: 8, minimum: 15, category: 'Maintenance' },
    { id: 3, name: 'Safety Equipment', current: 3, minimum: 10, category: 'Safety' },
  ];

  const myTasks = recentTasks.filter(task => {
    if (userRole === 'staff') {
      return task.assignee === 'John Smith' || task.assignee === 'Sarah Johnson';
    }
    return true;
  });

  const availableTasks = [
    'Fix AC Unit - Floor 3',
    'Replace Light Bulbs - Lobby',
    'Inspect Fire Extinguishers',
    'Clean Elevator Maintenance',
    'General Maintenance',
    'Administrative Tasks',
    'Training/Meetings',
    'Equipment Setup'
  ];

  const handleLogHours = () => {
    if (selectedTask && hoursWorked && workDate) {
      console.log('Logging hours:', {
        task: selectedTask,
        hours: hoursWorked,
        date: workDate,
        description: workDescription
      });
      // Reset form
      setSelectedTask('');
      setHoursWorked('');
      setWorkDate(new Date().toISOString().split('T')[0]);
      setWorkDescription('');
      setIsLogHoursModalOpen(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Scheduled': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {userRole === 'admin' ? 'Admin Dashboard' : 'Staff Dashboard'}
          </h1>
          <p className="text-gray-600 mt-2">
            {userRole === 'admin'
              ? "Welcome back! Here's what's happening in your building."
              : "Welcome back! Here are your assigned tasks and updates."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">
                  {userRole === 'admin' ? 'Active Tasks' : 'My Tasks'}
                </p>
                <p className="text-2xl font-bold">
                  {userRole === 'admin' ? '24' : myTasks.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-task-line text-xl"></i>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">
                  {userRole === 'admin' ? 'Completed Today' : 'Completed This Week'}
                </p>
                <p className="text-2xl font-bold">
                  {userRole === 'admin' ? '8' : '3'}
                </p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-check-line text-xl"></i>
              </div>
            </div>
          </Card>

          {userRole === 'admin' ? (
            <>
              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Open Bids</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <i className="ri-auction-line text-xl"></i>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Low Stock Alerts</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <i className="ri-alert-line text-xl"></i>
                  </div>
                </div>
              </Card>
            </>
          ) : (
            <>
              <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm">Pending Tasks</p>
                    <p className="text-2xl font-bold">2</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <i className="ri-time-line text-xl"></i>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Hours This Week</p>
                    <p className="text-2xl font-bold">32</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <i className="ri-time-line text-xl"></i>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {userRole === 'admin' ? 'Recent Tasks' : 'My Tasks'}
              </h3>
              <Link href="/maintenance">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {(userRole === 'admin' ? recentTasks : myTasks).map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                    <p className="text-sm text-gray-600">
                      {userRole === 'admin' ? `Assigned to: ${task.assignee}` : `Due: ${task.dueDate}`}
                    </p>
                    {userRole === 'admin' && (
                      <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
                    )}
                  </div>
                  <div className="flex flex-col space-y-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {userRole === 'admin' && (
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Bids</h3>
                <Link href="/bids">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {recentBids.map((bid) => (
                  <div key={bid.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{bid.title}</h4>
                      <p className="text-sm text-gray-600">Vendor: {bid.vendor}</p>
                      <p className="text-sm font-medium text-green-600">{bid.amount}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bid.status)}`}>
                      {bid.status}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {userRole === 'staff' && (
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </div>
              <div className="space-y-4">
                <Link href="/inventory">
                  <Button variant="outline" className="w-full justify-start">
                    <i className="ri-qr-scan-line mr-2"></i>
                    Scan Inventory QR Code
                  </Button>
                </Link>
                <Link href="/maintenance">
                  <Button variant="outline" className="w-full justify-start">
                    <i className="ri-tools-line mr-2"></i>
                    Update Task Status
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start" onClick={() => setIsLogHoursModalOpen(true)}>
                  <i className="ri-time-line mr-2"></i>
                  Log Work Hours
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <i className="ri-camera-line mr-2"></i>
                  Upload Photos
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <i className="ri-message-2-line mr-2"></i>
                  Send Message
                </Button>
              </div>
            </Card>
          )}
        </div>

        {userRole === 'admin' && (
          <div className="mt-8">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Low Stock Alerts</h3>
                <Link href="/inventory">
                  <Button variant="outline" size="sm">
                    Manage Inventory
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {lowStockItems.map((item) => (
                  <div key={item.id} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <span className="text-xs text-gray-500">{item.category}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-red-600 font-medium">Current: {item.current}</span>
                        <span className="text-gray-500 ml-2">Min: {item.minimum}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Reorder
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {userRole === 'staff' && (
          <div className="mt-8">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium text-gray-900">Fix AC Unit - Floor 3</p>
                      <p className="text-sm text-gray-600">9:00 AM - 11:00 AM</p>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    In Progress
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium text-gray-900">Replace Light Bulbs - Lobby</p>
                      <p className="text-sm text-gray-600">1:00 PM - 2:00 PM</p>
                    </div>
                  </div>
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                    Scheduled
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium text-gray-900">Inspect Emergency Equipment</p>
                      <p className="text-sm text-gray-600">3:00 PM - 4:00 PM</p>
                    </div>
                  </div>
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                    Scheduled
                  </span>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      <Modal
        isOpen={isLogHoursModalOpen}
        onClose={() => setIsLogHoursModalOpen(false)}
        title="Log Work Hours"
        size="md"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Task/Activity</label>
            <select
              value={selectedTask}
              onChange={(e) => setSelectedTask(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
            >
              <option value="">Select a task</option>
              {availableTasks.map((task, index) => (
                <option key={index} value={task}>{task}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={workDate}
                onChange={(e) => setWorkDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hours Worked</label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="24"
                value={hoursWorked}
                onChange={(e) => setHoursWorked(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Work Description</label>
            <textarea
              rows={3}
              value={workDescription}
              onChange={(e) => setWorkDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe what you worked on..."
              maxLength={500}
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">This Week's Summary</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Today</p>
                <p className="font-semibold">6.5 hrs</p>
              </div>
              <div>
                <p className="text-gray-600">This Week</p>
                <p className="font-semibold">32 hrs</p>
              </div>
              <div>
                <p className="text-gray-600">Remaining</p>
                <p className="font-semibold">8 hrs</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsLogHoursModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleLogHours} disabled={!selectedTask || !hoursWorked || !workDate}>
              <i className="ri-save-line mr-2"></i>
              Log Hours
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
