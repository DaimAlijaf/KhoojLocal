import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';

export default function AdminAnalysis() {
  const [activeTab, setActiveTab] = useState('system');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('Date Range');
  const [logLevel, setLogLevel] = useState('Log Level: All');
  const [service, setService] = useState('Service: All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedLog, setSelectedLog] = useState(null);
  const [showLogModal, setShowLogModal] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  
  // Schedule Reports Form State
  const [reportName, setReportName] = useState('');
  const [reportType, setReportType] = useState('User Activity');
  const [frequency, setFrequency] = useState('Weekly');
  const [recipientEmails, setRecipientEmails] = useState('');
  const [scheduledReports, setScheduledReports] = useState([
    { id: 1, name: 'User Activity Report', frequency: 'Weekly', schedule: 'Every Monday', active: true },
    { id: 2, name: 'Booking Statistics', frequency: 'Daily', schedule: '9:00 AM', active: true },
  ]);

  // Expanded system logs data with more entries
  const systemLogs = [
    {
      id: 1,
      timestamp: '2023-10-27 10:30:15',
      level: 'ERROR',
      service: 'API-Gateway',
      message: 'Failed to connect to payment provider.',
      details: 'Connection timeout after 30 seconds. Provider endpoint unreachable. Check network connectivity and firewall rules.',
      stackTrace: 'at PaymentGateway.connect(gateway.js:45)\nat processPayment(payment.js:102)',
    },
    {
      id: 2,
      timestamp: '2023-10-27 10:28:02',
      level: 'WARNING',
      service: 'AuthService',
      message: 'Token expiration nearing for user_123.',
      details: 'JWT token will expire in 5 minutes. User should be prompted to refresh session.',
      stackTrace: null,
    },
    {
      id: 3,
      timestamp: '2023-10-27 10:25:55',
      level: 'INFO',
      service: 'BookingService',
      message: 'New booking created: #BK-59821.',
      details: 'User created booking for salon service. Payment successful. Confirmation email sent.',
      stackTrace: null,
    },
    {
      id: 4,
      timestamp: '2023-10-27 10:24:10',
      level: 'INFO',
      service: 'UserService',
      message: "User 'john.doe' logged in successfully.",
      details: 'Login from IP: 192.168.1.105. Device: Chrome/Windows. Location: New York, US.',
      stackTrace: null,
    },
    {
      id: 5,
      timestamp: '2023-10-27 10:22:45',
      level: 'ERROR',
      service: 'BookingService',
      message: 'Database connection pool exhausted.',
      details: 'All 50 connections in use. Consider increasing pool size or optimizing queries.',
      stackTrace: 'at ConnectionPool.acquire(pool.js:78)\nat BookingRepository.save(repository.js:23)',
    },
    {
      id: 6,
      timestamp: '2023-10-27 10:20:33',
      level: 'WARNING',
      service: 'API-Gateway',
      message: 'Rate limit approaching for client_456.',
      details: 'Client has made 950 requests out of 1000 allowed per hour.',
      stackTrace: null,
    },
    {
      id: 7,
      timestamp: '2023-10-27 10:18:12',
      level: 'INFO',
      service: 'NotificationService',
      message: 'Email notification sent successfully.',
      details: 'Booking confirmation email sent to user@example.com.',
      stackTrace: null,
    },
    {
      id: 8,
      timestamp: '2023-10-27 10:15:22',
      level: 'ERROR',
      service: 'UserService',
      message: 'Failed login attempt detected.',
      details: 'Multiple failed login attempts from IP: 203.45.67.89. Account temporarily locked.',
      stackTrace: null,
    },
  ];

  // Filter logs based on search and filters
  const filteredLogs = systemLogs.filter((log) => {
    const matchesSearch =
      log.timestamp.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLogLevel =
      logLevel === 'Log Level: All' ||
      log.level === logLevel.replace('Log Level: ', '');

    const matchesService =
      service === 'Service: All' ||
      log.service === service.replace('Service: ', '');

    return matchesSearch && matchesLogLevel && matchesService;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLogs = filteredLogs.slice(startIndex, endIndex);

  // Auto refresh logs simulation
  React.useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        console.log('Auto-refreshing logs...');
        // In real app, fetch new logs here
      }, 10000); // Refresh every 10 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const handleGenerateReport = () => {
    const reportTypes = {
      'User Activity': 'user-activity-report.pdf',
      'Vendor Performance': 'vendor-performance-report.pdf',
      'Booking Statistics': 'booking-stats-report.pdf',
      'Revenue Report': 'revenue-report.pdf',
      'System Health': 'system-health-report.pdf',
    };
    
    const filename = reportTypes[reportType] || 'report.pdf';
    alert(`Generating ${reportType} report...\nReport will be downloaded as: ${filename}`);
  };

  const handleScheduleReport = (e) => {
    e.preventDefault();
    
    const newReport = {
      id: scheduledReports.length + 1,
      name: reportName,
      frequency: frequency,
      schedule: frequency === 'Daily' ? '9:00 AM' : frequency === 'Weekly' ? 'Every Monday' : '1st of month',
      active: true,
    };
    
    setScheduledReports([...scheduledReports, newReport]);
    alert(`Report "${reportName}" scheduled successfully!`);
    
    // Reset form
    setReportName('');
    setRecipientEmails('');
  };

  const handleToggleSchedule = (id) => {
    setScheduledReports(scheduledReports.map(report => 
      report.id === id ? { ...report, active: !report.active } : report
    ));
  };

  const handleDeleteSchedule = (id) => {
    if (confirm('Are you sure you want to delete this scheduled report?')) {
      setScheduledReports(scheduledReports.filter(report => report.id !== id));
    }
  };

  const handleViewLog = (log) => {
    setSelectedLog(log);
    setShowLogModal(true);
  };

  const handleExportLogs = () => {
    const csvContent = [
      ['Timestamp', 'Level', 'Service', 'Message'],
      ...filteredLogs.map(log => [log.timestamp, log.level, log.service, log.message])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setDateRange('Date Range');
    setLogLevel('Log Level: All');
    setService('Service: All');
    setCurrentPage(1);
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'ERROR':
        return 'bg-red-100 text-red-700';
      case 'WARNING':
        return 'bg-orange-100 text-orange-700';
      case 'INFO':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getLogStats = () => {
    return {
      total: filteredLogs.length,
      errors: filteredLogs.filter(log => log.level === 'ERROR').length,
      warnings: filteredLogs.filter(log => log.level === 'WARNING').length,
      info: filteredLogs.filter(log => log.level === 'INFO').length,
    };
  };

  const stats = getLogStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="lg:ml-64">
        <div className="p-3 sm:p-4 md:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Reports & System Logs
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Monitor system activity and generate reports
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleExportLogs}
                className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </button>
              <button
                onClick={handleGenerateReport}
                className="px-4 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 text-sm shadow-md"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Generate Report
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600 mb-1">Total Logs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600 mb-1">Errors</p>
              <p className="text-2xl font-bold text-red-600">{stats.errors}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600 mb-1">Warnings</p>
              <p className="text-2xl font-bold text-orange-600">{stats.warnings}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600 mb-1">Info</p>
              <p className="text-2xl font-bold text-blue-600">{stats.info}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Left Section - Logs Table */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                {/* Tabs */}
                <div className="border-b border-gray-200 px-4">
                  <div className="flex gap-6">
                    <button
                      onClick={() => setActiveTab('system')}
                      className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === 'system'
                          ? 'text-purple-600 border-purple-600'
                          : 'text-gray-500 border-transparent hover:text-gray-700'
                      }`}
                    >
                      System Logs
                    </button>
                    <button
                      onClick={() => setActiveTab('analytics')}
                      className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === 'analytics'
                          ? 'text-purple-600 border-purple-600'
                          : 'text-gray-500 border-transparent hover:text-gray-700'
                      }`}
                    >
                      Analytics Reports
                    </button>
                  </div>
                </div>

                {/* Search and Filters */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex flex-col gap-3">
                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search logs by keyword..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 text-sm"
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-700"
                      >
                        <option>Date Range</option>
                        <option>Today</option>
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Custom</option>
                      </select>

                      <select
                        value={logLevel}
                        onChange={(e) => setLogLevel(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-700"
                      >
                        <option>Log Level: All</option>
                        <option>Log Level: ERROR</option>
                        <option>Log Level: WARNING</option>
                        <option>Log Level: INFO</option>
                      </select>

                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-700"
                      >
                        <option>Service: All</option>
                        <option>Service: API-Gateway</option>
                        <option>Service: AuthService</option>
                        <option>Service: BookingService</option>
                        <option>Service: UserService</option>
                      </select>

                      <button
                        onClick={handleClearFilters}
                        className="px-3 py-2 text-purple-600 hover:text-purple-700 text-sm font-medium"
                      >
                        Clear
                      </button>

                      <label className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          checked={autoRefresh}
                          onChange={(e) => setAutoRefresh(e.target.checked)}
                          className="rounded text-purple-600 focus:ring-purple-500"
                        />
                        Auto-refresh
                      </label>
                    </div>
                  </div>
                </div>

                {/* Logs Table - Desktop View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Timestamp
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Log Level
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Service
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Message
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                            {log.timestamp}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2.5 py-1 rounded-md text-xs font-medium ${getLevelColor(
                                log.level
                              )}`}
                            >
                              {log.level}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                            {log.service}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {log.message}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <button 
                              onClick={() => handleViewLog(log)}
                              className="text-purple-600 hover:text-purple-700 font-medium"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Logs Cards - Mobile View */}
                <div className="md:hidden divide-y divide-gray-200">
                  {currentLogs.map((log) => (
                    <div key={log.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between mb-2">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-md text-xs font-medium ${getLevelColor(
                            log.level
                          )}`}
                        >
                          {log.level}
                        </span>
                        <button 
                          onClick={() => handleViewLog(log)}
                          className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                        >
                          View
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mb-1">{log.timestamp}</p>
                      <p className="text-sm font-medium text-gray-900 mb-1">{log.service}</p>
                      <p className="text-sm text-gray-700">{log.message}</p>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-sm text-gray-600">
                    Showing <span className="font-medium">{startIndex + 1}-{Math.min(endIndex, filteredLogs.length)}</span> of{' '}
                    <span className="font-medium">{filteredLogs.length}</span>
                  </p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <span className="px-3 py-1.5 text-sm text-gray-900">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button 
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Schedule Reports */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm lg:sticky lg:top-6">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-base font-semibold text-gray-900">Schedule Reports</h3>
                </div>

                <form onSubmit={handleScheduleReport} className="p-4 space-y-4">
                  {/* Report Name */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Report Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Monthly User Signups"
                      value={reportName}
                      onChange={(e) => setReportName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>

                  {/* Report Type */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Report Type
                    </label>
                    <select
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 bg-white"
                    >
                      <option>User Activity</option>
                      <option>Vendor Performance</option>
                      <option>Booking Statistics</option>
                      <option>Revenue Report</option>
                      <option>System Health</option>
                    </select>
                  </div>

                  {/* Frequency */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Frequency
                    </label>
                    <select
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 bg-white"
                    >
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                      <option>Quarterly</option>
                    </select>
                  </div>

                  {/* Recipient Emails */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Recipient Emails
                    </label>
                    <input
                      type="text"
                      placeholder="comma-separated emails"
                      value={recipientEmails}
                      onChange={(e) => setRecipientEmails(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>

                  {/* Schedule Button */}
                  <button
                    type="submit"
                    className="w-full px-4 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 text-sm shadow-md"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Schedule Report
                  </button>
                </form>

                {/* Scheduled Reports List */}
                <div className="border-t border-gray-200 p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Active Schedules ({scheduledReports.length})</h4>
                  <div className="space-y-2">
                    {scheduledReports.map((report) => (
                      <div key={report.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200 group hover:border-purple-300 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{report.name}</p>
                            <p className="text-xs text-gray-500 mt-1">{report.frequency} • {report.schedule}</p>
                          </div>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleToggleSchedule(report.id)}
                              className={`text-xs px-2 py-1 rounded ${
                                report.active 
                                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                              }`}
                            >
                              {report.active ? 'Active' : 'Paused'}
                            </button>
                            <button
                              onClick={() => handleDeleteSchedule(report.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {scheduledReports.length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-4">No scheduled reports yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Log Details Modal */}
      {showLogModal && selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Log Details</h3>
              <button
                onClick={() => setShowLogModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Timestamp</label>
                <p className="text-sm text-gray-900">{selectedLog.timestamp}</p>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Level</label>
                <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-medium ${getLevelColor(selectedLog.level)}`}>
                  {selectedLog.level}
                </span>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Service</label>
                <p className="text-sm text-gray-900">{selectedLog.service}</p>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Message</label>
                <p className="text-sm text-gray-900">{selectedLog.message}</p>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Details</label>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">{selectedLog.details}</p>
              </div>
              
              {selectedLog.stackTrace && (
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Stack Trace</label>
                  <pre className="text-xs text-gray-700 bg-gray-900 text-green-400 p-3 rounded-md overflow-x-auto">
                    {selectedLog.stackTrace}
                  </pre>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowLogModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(selectedLog, null, 2));
                  alert('Log details copied to clipboard!');
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
