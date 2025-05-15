import React from 'react';
import { Book, HelpCircle, Search, Download, FileText, Users, Settings, Bell, FileCheck, GitCompare, MessageSquare, Share2, Tag as TagIcon, X, Calendar, Clock, Brain } from 'lucide-react';

const SystemGuide = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <Book className="text-blue-600" size={32} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">System Guide</h1>
            <p className="text-gray-500">How to use the KGTPLRC128S platform effectively</p>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
          <ul className="space-y-2">
            <li>
              <a href="#getting-started" className="flex items-center gap-2 text-blue-600 hover:underline">
                <HelpCircle size={16} />
                <span>Getting Started</span>
              </a>
            </li>
            <li>
              <a href="#claims-management" className="flex items-center gap-2 text-blue-600 hover:underline">
                <FileText size={16} />
                <span>Claims Management</span>
              </a>
            </li>
            <li>
              <a href="#variations-management" className="flex items-center gap-2 text-blue-600 hover:underline">
                <GitCompare size={16} />
                <span>Variations Management</span>
              </a>
            </li>
            <li>
              <a href="#ai-features" className="flex items-center gap-2 text-blue-600 hover:underline">
                <Brain size={16} />
                <span>AI Features</span>
              </a>
            </li>
            <li>
              <a href="#user-management" className="flex items-center gap-2 text-blue-600 hover:underline">
                <Users size={16} />
                <span>User Management</span>
              </a>
            </li>
            <li>
              <a href="#system-settings" className="flex items-center gap-2 text-blue-600 hover:underline">
                <Settings size={16} />
                <span>System Settings</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Getting Started Section */}
        <section id="getting-started" className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <HelpCircle size={20} className="text-blue-600" />
            Getting Started
          </h2>
          <div className="space-y-4">
            <p>
              Welcome to the KGTPLRC128S platform, designed to streamline claims and variations management in accordance with GTPL RC 128 regulations. This guide will help you navigate the system effectively.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">System Navigation</h3>
                <p className="text-blue-700 text-sm">
                  Use the sidebar to navigate between different modules. The top navigation bar provides access to search, notifications, and user settings.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-800 mb-2">Quick Search</h3>
                <p className="text-green-700 text-sm">
                  Use the global search bar at the top to quickly find claims, variations, and documents across the system.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Claims Management Section */}
        <section id="claims-management" className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FileText size={20} className="text-blue-600" />
            Claims Management
          </h2>
          <div className="space-y-4">
            <p>
              The Claims Management hub provides tools for creating, tracking, and resolving claims in compliance with GTPL RC 128 regulations.
            </p>
            <div className="space-y-2">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium mb-2">Creating a New Claim</h3>
                <ol className="list-decimal list-inside text-sm space-y-1">
                  <li>Navigate to Master Claims</li>
                  <li>Click "New Claim" button</li>
                  <li>Fill in required details</li>
                  <li>Submit the claim</li>
                </ol>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium mb-2">Claim Workflow</h3>
                <p className="text-sm">
                  Claims follow a standard workflow: Draft → Submitted → Under Review → Approved/Rejected → Resolved
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Variations Management Section */}
        <section id="variations-management" className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <GitCompare size={20} className="text-blue-600" />
            Variations Management
          </h2>
          <div className="space-y-4">
            <p>
              The Variations Management hub allows you to handle contract variations efficiently while maintaining compliance with GTPL RC 128.
            </p>
            <div className="space-y-2">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium mb-2">Creating a Variation</h3>
                <ol className="list-decimal list-inside text-sm space-y-1">
                  <li>Navigate to Master Variations</li>
                  <li>Click "New Variation" button</li>
                  <li>Select variation type and fill details</li>
                  <li>Submit for approval</li>
                </ol>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium mb-2">Variation Approval</h3>
                <p className="text-sm">
                  Use the Variation Approval module to review and approve/reject variations. Ensure all required documentation is attached.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Features Section */}
        <section id="ai-features" className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Brain size={20} className="text-blue-600" />
            AI Features
          </h2>
          <div className="space-y-4">
            <p>
              KGTPLRC128S includes advanced AI capabilities to assist with claims and variations analysis, risk assessment, and compliance checking.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-medium text-purple-800 mb-2">Claims AI Analysis</h3>
                <p className="text-purple-700 text-sm">
                  AI-powered insights for claims, including risk assessment, approval likelihood, and recommended actions.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-medium text-purple-800 mb-2">Variations AI Analysis</h3>
                <p className="text-purple-700 text-sm">
                  Predictive analytics for variations, helping identify potential issues and optimize approval processes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* User Management Section */}
        <section id="user-management" className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Users size={20} className="text-blue-600" />
            User Management
          </h2>
          <div className="space-y-4">
            <p>
              Manage user accounts, roles, and permissions to ensure appropriate access to system features.
            </p>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium mb-2">User Roles</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><span className="font-medium">Employer:</span> Full access to all features</li>
                <li><span className="font-medium">Engineer:</span> Access to technical review and response features</li>
                <li><span className="font-medium">Contractor:</span> Limited access to submission and tracking features</li>
              </ul>
            </div>
          </div>
        </section>

        {/* System Settings Section */}
        <section id="system-settings" className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Settings size={20} className="text-blue-600" />
            System Settings
          </h2>
          <div className="space-y-4">
            <p>
              Configure system settings to customize the platform according to your organization's needs.
            </p>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium mb-2">Available Settings</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Notification preferences</li>
                <li>Display options</li>
                <li>Default views</li>
                <li>Report configurations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Download Button */}
        <div className="flex justify-center mt-8">
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download size={20} />
            <span>Download Full System Guide PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemGuide;