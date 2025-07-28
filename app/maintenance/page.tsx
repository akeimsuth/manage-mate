
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

export default function MaintenanceScheduler() {
  const [userRole, setUserRole] = useState<'admin' | 'staff'>('admin');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [viewMode, setViewMode] = useState('list');
  const [filterStatus, setFilterStatus] = useState('all');

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

  const tasks = [
    {
      id: 1,
      title: 'Replace HVAC Filter - Unit 3A',
      description: 'Monthly replacement of air filter in main HVAC unit',
      priority: 'Medium',
      status: 'In Progress',
      assignedTo: 'John Smith',
      dueDate: '2024-01-15',
      startDate: '2024-01-14',
      category: 'HVAC',
      location: 'Mechanical Room A',
      recurring: true,
      estimatedTime: '2 hours',
      attachments: ['filter_specs.pdf'],
      notes: 'Check for any unusual wear patterns'
    },
    {
      id: 2,
      title: 'Elevator Inspection',
      description: 'Quarterly safety inspection of elevator systems',
      priority: 'High',
      status: 'Scheduled',
      assignedTo: 'Mike Davis',
      dueDate: '2024-01-16',
      startDate: '2024-01-16',
      category: 'Safety',
      location: 'Elevator Shaft',
      recurring: true,
      estimatedTime: '4 hours',
      attachments: ['inspection_checklist.pdf'],
      notes: 'Coordinate with external inspector'
    },
    {
      id: 3,
      title: 'Fix Water Leak - Floor 2',
      description: 'Repair water leak in second floor restroom',
      priority: 'High',
      status: 'Pending',
      assignedTo: 'Sarah Johnson',
      dueDate: '2024-01-14',
      startDate: '2024-01-14',
      category: 'Plumbing',
      location: 'Floor 2 Restroom',
      recurring: false,
      estimatedTime: '3 hours',
      attachments: ['leak_photo.jpg'],
      notes: 'Emergency repair - high priority'
    },
    {
      id: 4,
      title: 'Light Bulb Replacement - Lobby',
      description: 'Replace burnt out LED bulbs in main lobby',
      priority: 'Low',
      status: 'Completed',
      assignedTo: 'Tom Wilson',
      dueDate: '2024-01-12',
      startDate: '2024-01-12',
      category: 'Electrical',
      location: 'Main Lobby',
      recurring: false,
      estimatedTime: '1 hour',
      attachments: [],
      notes: 'All bulbs replaced successfully'
    },
    {
      id: 5,
      title: 'Fire Extinguisher Check',
      description: 'Monthly inspection of all fire extinguishers',
      priority: 'High',
      status: 'Overdue',
      assignedTo: 'Lisa Brown',
      dueDate: '2024-01-10',
      startDate: '2024-01-10',
      category: 'Safety',
      location: 'All Floors',
      recurring: true,
      estimatedTime: '2 hours',
      attachments: ['safety_checklist.pdf'],
      notes: 'Check pressure levels and expiration dates'
    },
    {
      id: 6,
      title: 'Parking Lot Cleaning',
      description: 'Weekly cleaning and maintenance of parking area',
      priority: 'Medium',
      status: 'Scheduled',
      assignedTo: 'Carlos Martinez',
      dueDate: '2024-01-17',
      startDate: '2024-01-17',
      category: 'Exterior',
      location: 'Main Parking Lot',
      recurring: true,
      estimatedTime: '3 hours',
      attachments: [],
      notes: 'Include line re-painting if needed'
    }
  ];

  const staff = [
    { id: 1, name: 'John Smith', role: 'HVAC Technician' },
    { id: 2, name: 'Mike Davis', role: 'General Maintenance' },
    { id: 3, name: 'Sarah Johnson', role: 'Plumbing Specialist' },
    { id: 4, name: 'Tom Wilson', role: 'Electrician' },
    { id: 5, name: 'Lisa Brown', role: 'Safety Inspector' },
    { id: 6, name: 'Carlos Martinez', role: 'Custodial Staff' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Scheduled': return 'bg-purple-100 text-purple-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const statusMatch = filterStatus === 'all' || task.status.toLowerCase() === filterStatus.toLowerCase();
    const roleMatch = userRole === 'admin' || task.assignedTo === 'John Smith' || task.assignedTo === 'Sarah Johnson';
    return statusMatch && roleMatch;
  });

  const tasksByStatus = {
    pending: filteredTasks.filter(t => t.status === 'Pending').length,
    inProgress: filteredTasks.filter(t => t.status === 'In Progress').length,
    completed: filteredTasks.filter(t => t.status === 'Completed').length,
    overdue: filteredTasks.filter(t => t.status === 'Overdue').length
  };

  const handleStatusUpdate = (taskId: number, newStatus: string) => {
    console.log(`Updating task ${taskId} to ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {userRole === 'admin' ? 'Maintenance Scheduler' : 'My Tasks'}
            </h1>
            <p className="text-gray-600 mt-2">
              {userRole === 'admin' 
                ? 'Manage repairs, upkeep, and recurring tasks'
                : 'View and update your assigned maintenance tasks'}
            </p>
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <Button variant="outline" onClick={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}>
              <i className={`${viewMode === 'list' ? 'ri-calendar-line' : 'ri-list-check-2'} mr-2`}></i>
              {viewMode === 'list' ? 'Calendar View' : 'List View'}
            </Button>
            {userRole === 'admin' && (
              <Button onClick={() => setIsCreateModalOpen(true)}>
                <i className="ri-add-line mr-2"></i>
                New Task
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">Pending</p>
                <p className="text-2xl font-bold">{tasksByStatus.pending}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-time-line text-xl"></i>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">In Progress</p>
                <p className="text-2xl font-bold">{tasksByStatus.inProgress}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-tools-line text-xl"></i>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Completed</p>
                <p className="text-2xl font-bold">{tasksByStatus.completed}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-check-line text-xl"></i>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Overdue</p>
                <p className="text-2xl font-bold">{tasksByStatus.overdue}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-alert-line text-xl"></i>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {userRole === 'admin' ? 'Maintenance Tasks' : 'My Tasks'}
                </h3>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>

              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{task.title}</h4>
                        <p className="text-sm text-gray-600">{task.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          {userRole === 'admin' && (
                            <span className="text-sm text-gray-500">
                              <i className="ri-user-line mr-1"></i>
                              {task.assignedTo}
                            </span>
                          )}
                          <span className="text-sm text-gray-500">
                            <i className="ri-map-pin-line mr-1"></i>
                            {task.location}
                          </span>
                          <span className="text-sm text-gray-500">
                            <i className="ri-time-line mr-1"></i>
                            {task.estimatedTime}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2 ml-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">Due: {task.dueDate}</span>
                        {task.recurring && (
                          <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                            <i className="ri-repeat-line mr-1"></i>
                            Recurring
                          </span>
                        )}
                        {task.attachments.length > 0 && (
                          <span className="text-sm text-gray-500">
                            <i className="ri-attachment-line mr-1"></i>
                            {task.attachments.length} files
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setSelectedTask(task)}>
                          <i className="ri-eye-line mr-1"></i>
                          View
                        </Button>
                        {userRole === 'staff' && task.status !== 'Completed' && (
                          <div className="flex space-x-1">
                            {task.status === 'Pending' && (
                              <Button size="sm" onClick={() => handleStatusUpdate(task.id, 'In Progress')}>
                                <i className="ri-play-line mr-1"></i>
                                Start
                              </Button>
                            )}
                            {task.status === 'In Progress' && (
                              <Button size="sm" onClick={() => handleStatusUpdate(task.id, 'Completed')}>
                                <i className="ri-check-line mr-1"></i>
                                Complete
                              </Button>
                            )}
                          </div>
                        )}
                        {userRole === 'admin' && (
                          <Button variant="outline" size="sm">
                            <i className="ri-edit-line mr-1"></i>
                            Edit
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            {userRole === 'admin' && (
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Staff Assignments</h3>
                <div className="space-y-3">
                  {staff.map((member) => {
                    const memberTasks = tasks.filter(t => t.assignedTo === member.name && t.status !== 'Completed');
                    return (
                      <div key={member.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-600">{member.role}</p>
                          </div>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                            {memberTasks.length} tasks
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}

            <Card className={userRole === 'admin' ? 'mt-6' : ''}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {userRole === 'admin' ? 'Upcoming This Week' : 'Quick Actions'}
              </h3>
              {userRole === 'admin' ? (
                <div className="space-y-3">
                  {tasks.filter(t => t.status === 'Scheduled' || t.status === 'Pending').slice(0, 4).map((task) => (
                    <div key={task.id} className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium text-gray-900 text-sm">{task.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{task.dueDate}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <i className="ri-camera-line mr-2"></i>
                    Take Photo
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <i className="ri-time-line mr-2"></i>
                    Log Hours
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <i className="ri-tools-line mr-2"></i>
                    Request Tools
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <i className="ri-message-2-line mr-2"></i>
                    Send Update
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Task"
        size="lg"
      >
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the task..."
              maxLength={500}
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8">
                <option>Select category</option>
                <option>HVAC</option>
                <option>Electrical</option>
                <option>Plumbing</option>
                <option>Safety</option>
                <option>Exterior</option>
                <option>Interior</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8">
                <option>Select priority</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Assign To</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8">
                <option>Select staff member</option>
                {staff.map(member => (
                  <option key={member.id} value={member.name}>{member.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Task location"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Time</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 2 hours"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="recurring"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="recurring" className="text-sm font-medium text-gray-700">
              Recurring Task
            </label>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Create Task
            </Button>
          </div>
        </form>
      </Modal>

      {selectedTask && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedTask(null)}
          title={selectedTask.title}
          size="lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Status</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedTask.status)}`}>
                  {selectedTask.status}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Priority</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(selectedTask.priority)}`}>
                  {selectedTask.priority}
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Description</p>
              <p className="text-gray-900">{selectedTask.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Assigned To</p>
                <p className="text-gray-900">{selectedTask.assignedTo}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Location</p>
                <p className="text-gray-900">{selectedTask.location}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Due Date</p>
                <p className="text-gray-900">{selectedTask.dueDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Estimated Time</p>
                <p className="text-gray-900">{selectedTask.estimatedTime}</p>
              </div>
            </div>

            {selectedTask.notes && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Notes</p>
                <p className="text-gray-900">{selectedTask.notes}</p>
              </div>
            )}

            {selectedTask.attachments.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Attachments</p>
                <div className="space-y-2">
                  {selectedTask.attachments.map((file, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <i className="ri-file-line text-gray-400"></i>
                      <span className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">{file}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              {userRole === 'admin' && (
                <Button variant="outline">
                  <i className="ri-edit-line mr-2"></i>
                  Edit Task
                </Button>
              )}
              {userRole === 'staff' && selectedTask.status !== 'Completed' && (
                <>
                  {selectedTask.status === 'Pending' && (
                    <Button onClick={() => handleStatusUpdate(selectedTask.id, 'In Progress')}>
                      <i className="ri-play-line mr-2"></i>
                      Start Task
                    </Button>
                  )}
                  {selectedTask.status === 'In Progress' && (
                    <Button onClick={() => handleStatusUpdate(selectedTask.id, 'Completed')}>
                      <i className="ri-check-line mr-2"></i>
                      Mark Complete
                    </Button>
                  )}
                </>
              )}
              {userRole === 'admin' && (
                <Button>
                  <i className="ri-check-line mr-2"></i>
                  Mark Complete
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
