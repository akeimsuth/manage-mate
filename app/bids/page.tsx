'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

export default function BidCenter() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedBid, setSelectedBid] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('active');

  const bids = [
    {
      id: 1,
      title: 'Roof Repair and Waterproofing',
      description: 'Complete roof inspection and repair of damaged sections, including waterproofing treatment.',
      category: 'Roofing',
      budget: '$15,000 - $25,000',
      deadline: '2024-02-15',
      status: 'Active',
      proposals: 5,
      location: 'Building A - Roof Level',
      postedDate: '2024-01-10',
      requirements: ['Licensed contractor', 'Insurance required', 'Previous commercial experience']
    },
    {
      id: 2,
      title: 'HVAC System Upgrade',
      description: 'Upgrade existing HVAC system with energy-efficient units and smart controls.',
      category: 'HVAC',
      budget: '$30,000 - $45,000',
      deadline: '2024-02-20',
      status: 'Under Review',
      proposals: 8,
      location: 'Building B - Mechanical Room',
      postedDate: '2024-01-08',
      requirements: ['HVAC certification', 'Energy efficiency expertise', 'Smart system integration']
    },
    {
      id: 3,
      title: 'Parking Lot Resurfacing',
      description: 'Complete resurfacing of parking lot including line painting and drainage improvements.',
      category: 'Exterior',
      budget: '$12,000 - $18,000',
      deadline: '2024-02-10',
      status: 'Completed',
      proposals: 3,
      location: 'Main Parking Area',
      postedDate: '2024-01-05',
      requirements: ['Asphalt experience', 'Commercial projects', 'Weather-dependent scheduling']
    }
  ];

  const proposals = [
    {
      id: 1,
      bidId: 1,
      vendor: 'Premium Roofing Solutions',
      amount: '$18,500',
      timeline: '10-12 days',
      rating: 4.8,
      completedJobs: 156,
      message: 'We have extensive experience with commercial roofing projects and can complete this work efficiently.',
      submittedDate: '2024-01-12'
    },
    {
      id: 2,
      bidId: 1,
      vendor: 'Elite Construction Group',
      amount: '$22,000',
      timeline: '8-10 days',
      rating: 4.9,
      completedJobs: 203,
      message: 'Our team specializes in waterproofing and can provide a comprehensive solution with warranty.',
      submittedDate: '2024-01-13'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBids = bids.filter(bid => {
    if (activeTab === 'active') return bid.status === 'Active';
    if (activeTab === 'review') return bid.status === 'Under Review';
    if (activeTab === 'completed') return bid.status === 'Completed';
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bid Center</h1>
            <p className="text-gray-600 mt-2">Manage project bids and vendor proposals</p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)} className="mt-4 sm:mt-0">
            <i className="ri-add-line mr-2"></i>
            Post New Project
          </Button>
        </div>

        <div className="flex space-x-1 mb-6 bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'active' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Active ({bids.filter(b => b.status === 'Active').length})
          </button>
          <button
            onClick={() => setActiveTab('review')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'review' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Under Review ({bids.filter(b => b.status === 'Under Review').length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'completed' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Completed ({bids.filter(b => b.status === 'Completed').length})
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {filteredBids.map((bid) => (
                <Card key={bid.id} className="hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{bid.title}</h3>
                      <p className="text-sm text-gray-600">{bid.category} • {bid.location}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bid.status)}`}>
                      {bid.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{bid.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Budget</p>
                      <p className="font-semibold text-green-600">{bid.budget}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Deadline</p>
                      <p className="font-semibold">{bid.deadline}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Proposals</p>
                      <p className="font-semibold text-blue-600">{bid.proposals}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Posted</p>
                      <p className="font-semibold">{bid.postedDate}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {bid.requirements.map((req, index) => (
                      <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
                        {req}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedBid(bid)}>
                        <i className="ri-eye-line mr-1"></i>
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <i className="ri-message-2-line mr-1"></i>
                        Messages
                      </Button>
                    </div>
                    {bid.status === 'Active' && (
                      <Button size="sm">
                        <i className="ri-edit-line mr-1"></i>
                        Edit
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">New proposal received</p>
                    <p className="text-xs text-gray-600">Elite Construction Group - 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">Project deadline approaching</p>
                    <p className="text-xs text-gray-600">HVAC System Upgrade - 5 days remaining</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">Bid under review</p>
                    <p className="text-xs text-gray-600">Parking Lot Resurfacing - Yesterday</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Active Projects</span>
                  <span className="font-semibold">{bids.filter(b => b.status === 'Active').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Proposals</span>
                  <span className="font-semibold">{bids.reduce((sum, bid) => sum + bid.proposals, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg Response Time</span>
                  <span className="font-semibold">2.5 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <span className="font-semibold text-green-600">94%</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Post New Project"
        size="lg"
      >
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter project title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8">
              <option>Select category</option>
              <option>HVAC</option>
              <option>Roofing</option>
              <option>Electrical</option>
              <option>Plumbing</option>
              <option>Exterior</option>
              <option>Interior</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the project requirements..."
              maxLength={500}
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., $10,000 - $15,000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Licensed contractor, Insurance required"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Post Project
            </Button>
          </div>
        </form>
      </Modal>

      {selectedBid && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedBid(null)}
          title={selectedBid.title}
          size="xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Project Details</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Description</p>
                  <p className="text-gray-900">{selectedBid.description}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Budget</p>
                  <p className="text-green-600 font-semibold">{selectedBid.budget}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Requirements</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedBid.requirements.map((req: any, index: number) => (
                      <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Proposals ({selectedBid.proposals})</h4>
              <div className="space-y-4">
                {proposals.filter(p => p.bidId === selectedBid.id).map((proposal) => (
                  <div key={proposal.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h5 className="font-semibold text-gray-900">{proposal.vendor}</h5>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center">
                            <i className="ri-star-fill text-yellow-400 text-sm"></i>
                            <span className="text-sm text-gray-600 ml-1">{proposal.rating}</span>
                          </div>
                          <span className="text-gray-300">•</span>
                          <span className="text-sm text-gray-600">{proposal.completedJobs} jobs</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-green-600">{proposal.amount}</p>
                        <p className="text-sm text-gray-600">{proposal.timeline}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">{proposal.message}</p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <i className="ri-message-2-line mr-1"></i>
                        Contact
                      </Button>
                      <Button size="sm">
                        Accept Bid
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}