import React, { useState } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';

type VariationFiltersProps = {
  onSearch?: (term: string) => void;
  onStatusFilter?: (status: string) => void;
  onTypeFilter?: (type: string) => void;
  onDateFilter?: (startDate: string, endDate: string) => void;
};

export default function VariationFilters({ 
  onSearch, 
  onStatusFilter, 
  onTypeFilter,
  onDateFilter 
}: VariationFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (onSearch) onSearch(term);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    setStatusFilter(status);
    if (onStatusFilter) onStatusFilter(status);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setTypeFilter(type);
    if (onTypeFilter) onTypeFilter(type);
  };

  const handleDateChange = (field: 'start' | 'end', value: string) => {
    const newRange = { ...dateRange, [field]: value };
    setDateRange(newRange);
    if (onDateFilter && newRange.start && newRange.end) {
      onDateFilter(newRange.start, newRange.end);
    }
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by title, ID, or description..."
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <select
          className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
          value={statusFilter}
          onChange={handleStatusChange}
        >
          <option value="all">All Status</option>
          <option value="Draft">Draft</option>
          <option value="Submitted">Submitted</option>
          <option value="Under Review">Under Review</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select
          className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
          value={typeFilter}
          onChange={handleTypeChange}
        >
          <option value="all">All Types</option>
          <option value="Price Adjustment">Price Adjustment</option>
          <option value="Scope Change">Scope Change</option>
          <option value="Additional Works">Additional Works</option>
          <option value="Time Extension">Time Extension</option>
        </select>
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          <Filter size={16} />
          <span>Advanced</span>
        </button>
      </div>

      {showAdvancedFilters && (
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Advanced Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Date Range</label>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="date"
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full"
                    value={dateRange.start}
                    onChange={(e) => handleDateChange('start', e.target.value)}
                  />
                </div>
                <span className="text-gray-500">to</span>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="date"
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full"
                    value={dateRange.end}
                    onChange={(e) => handleDateChange('end', e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Value Range</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="px-4 py-2 border border-gray-200 rounded-lg w-full"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="px-4 py-2 border border-gray-200 rounded-lg w-full"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Created By</label>
              <select className="px-4 py-2 border border-gray-200 rounded-lg bg-white w-full">
                <option value="">All Users</option>
                <option value="user-123">John Doe</option>
                <option value="user-456">Jane Smith</option>
                <option value="user-789">Mike Johnson</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}