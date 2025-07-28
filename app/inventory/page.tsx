
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

export default function InventoryTracker() {
  const [userRole, setUserRole] = useState<'admin' | 'staff'>('admin');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [qrResult, setQrResult] = useState<string>('');
  const [qrScanning, setQrScanning] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState<any>(null);
  const [orderQuantity, setOrderQuantity] = useState(1);

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

  const inventory = [
    {
      id: 1,
      name: 'LED Light Bulbs (60W)',
      category: 'Electrical',
      quantity: 12,
      minQuantity: 25,
      location: 'Storage Room A',
      supplier: 'ElectricPro Supply',
      cost: 8.99,
      lastUpdated: '2024-01-14',
      qrCode: 'INV-LED-001',
      status: 'Low Stock'
    },
    {
      id: 2,
      name: 'All-Purpose Cleaner',
      category: 'Cleaning',
      quantity: 8,
      minQuantity: 15,
      location: 'Janitor Closet',
      supplier: 'CleanMax Solutions',
      cost: 12.50,
      lastUpdated: '2024-01-13',
      qrCode: 'INV-CLN-002',
      status: 'Low Stock'
    },
    {
      id: 3,
      name: 'Safety Goggles',
      category: 'Safety',
      quantity: 45,
      minQuantity: 20,
      location: 'Safety Equipment Room',
      supplier: 'SafetyFirst Inc',
      cost: 15.75,
      lastUpdated: '2024-01-12',
      qrCode: 'INV-SAF-003',
      status: 'In Stock'
    },
    {
      id: 4,
      name: 'Toilet Paper (24-pack)',
      category: 'Restroom',
      quantity: 30,
      minQuantity: 12,
      location: 'Storage Room B',
      supplier: 'Office Essentials',
      cost: 18.99,
      lastUpdated: '2024-01-11',
      qrCode: 'INV-RST-004',
      status: 'In Stock'
    },
    {
      id: 5,
      name: 'HVAC Filters (20x25)',
      category: 'HVAC',
      quantity: 6,
      minQuantity: 10,
      location: 'Mechanical Room',
      supplier: 'Climate Control Co',
      cost: 24.99,
      lastUpdated: '2024-01-10',
      qrCode: 'INV-HVC-005',
      status: 'Low Stock'
    },
    {
      id: 6,
      name: 'Fluorescent Tubes (4ft)',
      category: 'Electrical',
      quantity: 28,
      minQuantity: 15,
      location: 'Storage Room A',
      supplier: 'ElectricPro Supply',
      cost: 11.25,
      lastUpdated: '2024-01-09',
      qrCode: 'INV-LED-006',
      status: 'In Stock'
    }
  ];

  const categories = ['all', 'Electrical', 'Cleaning', 'Safety', 'Restroom', 'HVAC', 'Tools', 'Plumbing'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800';
      case 'Low Stock':
        return 'bg-red-100 text-red-800';
      case 'Out of Stock':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleQRScan = () => {
    setIsQRModalOpen(true);
    setQrScanning(true);
    setQrResult('');
    // Simulate QR code scanning
    setTimeout(() => {
      setQrScanning(false);
      setQrResult('INV-LED-001');
    }, 3000);
  };

  const handleQRResult = (qrCode: string) => {
    const foundItem = inventory.find(item => item.qrCode === qrCode);
    if (foundItem) {
      setSearchTerm(foundItem.name);
      setIsQRModalOpen(false);
      setQrResult('');
    }
  };

  const handleOrderItem = (item: any) => {
    setSelectedOrderItem(item);
    setOrderQuantity(item.minQuantity - item.quantity);
    setIsOrderModalOpen(true);
  };

  const handleSubmitOrder = () => {
    if (selectedOrderItem) {
      // Simulate order submission
      console.log(`Ordering ${orderQuantity} units of ${selectedOrderItem.name}`);
      setIsOrderModalOpen(false);
      setSelectedOrderItem(null);
      setOrderQuantity(1);
    }
  };

  const filteredInventory = inventory.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const lowStockItems = inventory.filter(item => item.quantity <= item.minQuantity);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {userRole === 'admin' ? 'Inventory Tracker' : 'Inventory Lookup'}
            </h1>
            <p className="text-gray-600 mt-2">
              {userRole === 'admin' 
                ? 'Manage tools, supplies, and consumables'
                : 'Search and check inventory levels'}
            </p>
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <Button variant="outline" onClick={handleQRScan}>
              <i className="ri-qr-scan-line mr-2"></i>
              Scan QR Code
            </Button>
            {userRole === 'admin' && (
              <Button onClick={() => setIsAddModalOpen(true)}>
                <i className="ri-add-line mr-2"></i>
                Add Item
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Items</p>
                <p className="text-2xl font-bold">{inventory.length}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-box-3-line text-xl"></i>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Low Stock</p>
                <p className="text-2xl font-bold">{lowStockItems.length}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-alert-line text-xl"></i>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Categories</p>
                <p className="text-2xl font-bold">{categories.length - 1}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-folder-line text-xl"></i>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">
                  {userRole === 'admin' ? 'Total Value' : 'Items Accessed'}
                </p>
                <p className="text-2xl font-bold">
                  {userRole === 'admin' 
                    ? `$${inventory.reduce((sum, item) => sum + (item.cost * item.quantity), 0).toFixed(0)}`
                    : '24'}
                </p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <i className={`${userRole === 'admin' ? 'ri-money-dollar-circle-line' : 'ri-hand-coin-line'} text-xl`}></i>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Inventory Items</h3>
                <div className="flex space-x-3 mt-4 sm:mt-0">
                  <div className="relative">
                    <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input
                      type="text"
                      placeholder="Search items..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      {userRole === 'admin' && (
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredInventory.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500">QR: {item.qrCode}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.quantity}</div>
                            <div className="text-sm text-gray-500">Min: {item.minQuantity}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">{item.location}</td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        {userRole === 'admin' && (
                          <td className="px-4 py-4 text-sm">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <i className="ri-edit-line"></i>
                              </Button>
                              <Button size="sm" variant="outline">
                                <i className="ri-qr-code-line"></i>
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleOrderItem(item)}>
                                <i className="ri-shopping-cart-line"></i>
                              </Button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            {userRole === 'admin' && (
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  <i className="ri-alert-line text-red-500 mr-2"></i>
                  Low Stock Alerts
                </h3>
                <div className="space-y-3">
                  {lowStockItems.map((item) => (
                    <div key={item.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                        <span className="text-xs text-red-600 font-medium">{item.quantity} left</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{item.location}</p>
                      <Button variant="outline" size="sm" className="w-full" onClick={() => handleOrderItem(item)}>
                        <i className="ri-shopping-cart-line mr-1"></i>
                        Reorder
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <Card className={userRole === 'admin' ? 'mt-6' : ''}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {userRole === 'admin' ? 'Quick Actions' : 'Staff Actions'}
              </h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <i className="ri-qr-scan-line mr-2"></i>
                  Bulk QR Scan
                </Button>
                {userRole === 'admin' ? (
                  <>
                    <Button variant="outline" className="w-full justify-start">
                      <i className="ri-download-line mr-2"></i>
                      Export Inventory
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <i className="ri-file-text-line mr-2"></i>
                      Generate Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <i className="ri-settings-3-line mr-2"></i>
                      Settings
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full justify-start">
                      <i className="ri-subtract-line mr-2"></i>
                      Report Usage
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <i className="ri-alert-line mr-2"></i>
                      Report Issue
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <i className="ri-map-pin-line mr-2"></i>
                      Find Location
                    </Button>
                  </>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        title="QR Code Scanner"
        size="md"
      >
        <div className="text-center">
          {qrScanning ? (
            <div className="space-y-4">
              <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="border-4 border-blue-500 rounded-lg p-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <i className="ri-qr-scan-line text-4xl text-white animate-pulse"></i>
                  </div>
                </div>
              </div>
              <p className="text-lg font-medium text-gray-900">Scanning QR Code...</p>
              <p className="text-sm text-gray-600">Position the QR code within the frame</p>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            </div>
          ) : qrResult ? (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <i className="ri-check-line text-2xl text-green-600"></i>
              </div>
              <p className="text-lg font-medium text-gray-900">QR Code Found!</p>
              <p className="text-sm text-gray-600">Code: {qrResult}</p>
              <div className="flex justify-center space-x-3">
                <Button onClick={() => handleQRResult(qrResult)}>
                  View Item
                </Button>
                <Button variant="outline" onClick={handleQRScan}>
                  Scan Again
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </Modal>

      {userRole === 'admin' && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Item"
          size="lg"
        >
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter item name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8">
                  <option>Select category</option>
                  <option>Electrical</option>
                  <option>Cleaning</option>
                  <option>Safety</option>
                  <option>Restroom</option>
                  <option>HVAC</option>
                  <option>Tools</option>
                  <option>Plumbing</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Quantity</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit Cost</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Storage location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Supplier name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Additional details about the item..."
                maxLength={500}
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Add Item
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {userRole === 'admin' && (
        <Modal
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          title="Order Item"
          size="md"
        >
          {selectedOrderItem && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">{selectedOrderItem.name}</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Current Stock</p>
                    <p className="font-medium text-red-600">{selectedOrderItem.quantity}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Minimum Required</p>
                    <p className="font-medium">{selectedOrderItem.minQuantity}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Unit Cost</p>
                    <p className="font-medium text-green-600">${selectedOrderItem.cost}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Supplier</p>
                    <p className="font-medium">{selectedOrderItem.supplier}</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={orderQuantity}
                  onChange={(e) => setOrderQuantity(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Recommended: {selectedOrderItem.minQuantity - selectedOrderItem.quantity} units to reach minimum stock
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Total Cost</span>
                  <span className="font-bold text-lg text-blue-600">
                    ${(selectedOrderItem.cost * orderQuantity).toFixed(2)}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Notes</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add any special delivery instructions..."
                  maxLength={500}
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setIsOrderModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitOrder}>
                  <i className="ri-shopping-cart-line mr-2"></i>
                  Place Order
                </Button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
