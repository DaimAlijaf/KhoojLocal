// VendorMessages.jsx
// Vendor Messages/Chat Component - Fully Responsive

import React, { useState, useEffect, useRef } from 'react';
import VendorSidebar from '../../components/VendorSidebar';

// Sample Conversations Data
const SAMPLE_CONVERSATIONS = [
  {
    id: 1,
    customerName: 'Sarah Johnson',
    customerAvatar: 'SJ',
    lastMessage: 'Thanks! I\'ll see you tomorrow at 2 PM.',
    timestamp: '2 min ago',
    unread: 2,
    online: true,
    messages: [
      { id: 1, sender: 'customer', text: 'Hi, I\'d like to book a massage appointment.', time: '10:30 AM' },
      { id: 2, sender: 'vendor', text: 'Hello! I\'d be happy to help. What day works best for you?', time: '10:32 AM' },
      { id: 3, sender: 'customer', text: 'How about tomorrow afternoon?', time: '10:35 AM' },
      { id: 4, sender: 'vendor', text: 'Tomorrow at 2 PM is available. Would that work?', time: '10:36 AM' },
      { id: 5, sender: 'customer', text: 'Perfect! Should I bring anything?', time: '10:38 AM' },
      { id: 6, sender: 'vendor', text: 'Just yourself! We provide everything you need. See you tomorrow!', time: '10:40 AM' },
      { id: 7, sender: 'customer', text: 'Thanks! I\'ll see you tomorrow at 2 PM.', time: '10:42 AM' },
    ],
  },
  {
    id: 2,
    customerName: 'Michael Chen',
    customerAvatar: 'MC',
    lastMessage: 'Can I reschedule my appointment?',
    timestamp: '15 min ago',
    unread: 1,
    online: true,
    messages: [
      { id: 1, sender: 'customer', text: 'Hi there!', time: '9:45 AM' },
      { id: 2, sender: 'vendor', text: 'Hello Michael! How can I help you?', time: '9:46 AM' },
      { id: 3, sender: 'customer', text: 'Can I reschedule my appointment?', time: '9:50 AM' },
    ],
  },
  {
    id: 3,
    customerName: 'Emily Rodriguez',
    customerAvatar: 'ER',
    lastMessage: 'The service was amazing, thank you!',
    timestamp: '1 hour ago',
    unread: 0,
    online: false,
    messages: [
      { id: 1, sender: 'customer', text: 'Just finished my appointment!', time: '8:30 AM' },
      { id: 2, sender: 'vendor', text: 'I\'m so glad you came in! How was everything?', time: '8:32 AM' },
      { id: 3, sender: 'customer', text: 'The service was amazing, thank you!', time: '8:35 AM' },
    ],
  },
  {
    id: 4,
    customerName: 'David Kim',
    customerAvatar: 'DK',
    lastMessage: 'What are your prices for haircuts?',
    timestamp: '3 hours ago',
    unread: 0,
    online: false,
    messages: [
      { id: 1, sender: 'customer', text: 'Hello, I\'m interested in your services.', time: '6:15 AM' },
      { id: 2, sender: 'vendor', text: 'Great! What service are you looking for?', time: '6:20 AM' },
      { id: 3, sender: 'customer', text: 'What are your prices for haircuts?', time: '6:25 AM' },
    ],
  },
  {
    id: 5,
    customerName: 'Jessica Taylor',
    customerAvatar: 'JT',
    lastMessage: 'Do you offer group bookings?',
    timestamp: 'Yesterday',
    unread: 0,
    online: false,
    messages: [
      { id: 1, sender: 'customer', text: 'Hi! I have a question.', time: 'Yesterday 5:30 PM' },
      { id: 2, sender: 'vendor', text: 'Of course! What would you like to know?', time: 'Yesterday 5:32 PM' },
      { id: 3, sender: 'customer', text: 'Do you offer group bookings?', time: 'Yesterday 5:35 PM' },
    ],
  },
];

export default function VendorMessages() {
  const [conversations, setConversations] = useState(SAMPLE_CONVERSATIONS);
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation]);

  // Filter conversations based on search
  const filteredConversations = conversations.filter(conv =>
    conv.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Total unread count
  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unread, 0);

  function selectConversation(conversation) {
    setSelectedConversation(conversation);
    setShowMobileChat(true);
    // Mark as read
    setConversations(conversations.map(c =>
      c.id === conversation.id ? { ...c, unread: 0 } : c
    ));
  }

  function sendMessage() {
    if (!messageText.trim()) return;

    const newMessage = {
      id: selectedConversation.messages.length + 1,
      sender: 'vendor',
      text: messageText,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    };

    const updatedConversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage],
      lastMessage: messageText,
      timestamp: 'Just now',
    };

    setSelectedConversation(updatedConversation);
    setConversations(conversations.map(c =>
      c.id === selectedConversation.id ? updatedConversation : c
    ));
    setMessageText('');
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <VendorSidebar activePage="Messages" />

          {/* Main Content */}
          <main className="flex-1 w-full lg:w-auto mt-16 lg:mt-0">
            {/* Header */}
            <div className="mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Messages</h1>
              <p className="text-sm text-gray-500 mt-1">
                {totalUnread > 0 ? `${totalUnread} unread message${totalUnread > 1 ? 's' : ''}` : 'All caught up!'}
              </p>
            </div>

            {/* Messages Container */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden h-[calc(100vh-220px)] sm:h-[600px] flex">
              {/* Conversations List - Hidden on mobile when chat is open */}
              <div className={`${showMobileChat ? 'hidden' : 'flex'} lg:flex flex-col w-full lg:w-80 border-r border-gray-200`}>
                {/* Search */}
                <div className="p-3 sm:p-4 border-b border-gray-200">
                  <div className="relative">
                    <SearchIcon />
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Conversation List */}
                <div className="flex-1 overflow-y-auto">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => selectConversation(conversation)}
                      className={`p-3 sm:p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${
                        selectedConversation?.id === conversation.id ? 'bg-indigo-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
                            {conversation.customerAvatar}
                          </div>
                          {conversation.online && (
                            <div className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>

                        {/* Conversation Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                              {conversation.customerName}
                            </h3>
                            <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{conversation.timestamp}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                        </div>

                        {/* Unread Badge */}
                        {conversation.unread > 0 && (
                          <div className="flex-shrink-0 h-5 w-5 bg-indigo-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{conversation.unread}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {filteredConversations.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                      <p>No conversations found</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Area - Hidden on mobile when conversation list is open */}
              <div className={`${showMobileChat ? 'flex' : 'hidden'} lg:flex flex-col flex-1`}>
                {selectedConversation ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-3 sm:p-4 border-b border-gray-200 flex items-center gap-3">
                      {/* Back button for mobile */}
                      <button
                        onClick={() => setShowMobileChat(false)}
                        className="lg:hidden text-gray-600 hover:text-gray-900"
                      >
                        <BackIcon />
                      </button>

                      <div className="relative flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                          {selectedConversation.customerAvatar}
                        </div>
                        {selectedConversation.online && (
                          <div className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                          {selectedConversation.customerName}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {selectedConversation.online ? 'Online' : 'Offline'}
                        </p>
                      </div>

                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreIcon />
                      </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50">
                      {selectedConversation.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'vendor' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[85%] sm:max-w-[70%]`}>
                            <div
                              className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-sm ${
                                message.sender === 'vendor'
                                  ? 'bg-indigo-600 text-white rounded-br-sm'
                                  : 'bg-white text-gray-800 rounded-bl-sm shadow-sm'
                              }`}
                            >
                              {message.text}
                            </div>
                            <p className={`text-xs text-gray-400 mt-1 ${message.sender === 'vendor' ? 'text-right' : 'text-left'}`}>
                              {message.time}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className="p-3 sm:p-4 border-t border-gray-200 bg-white">
                      <div className="flex items-end gap-2 sm:gap-3">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
                          <AttachIcon />
                        </button>
                        <div className="flex-1 relative">
                          <textarea
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type a message..."
                            rows="1"
                            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none text-sm"
                            style={{ minHeight: '42px', maxHeight: '120px' }}
                          />
                        </div>
                        <button
                          onClick={sendMessage}
                          disabled={!messageText.trim()}
                          className="p-2 sm:p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl transition-colors flex-shrink-0"
                        >
                          <SendIcon />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center bg-gray-50">
                    <div className="text-center text-gray-400">
                      <MessageEmptyIcon />
                      <p className="mt-4 font-medium">Select a conversation</p>
                      <p className="text-sm">Choose a conversation from the list to start messaging</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

/* ----- Icon Components ----- */
function SearchIcon() {
  return (
    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="1" fill="currentColor"/>
      <circle cx="12" cy="5" r="1" fill="currentColor"/>
      <circle cx="12" cy="19" r="1" fill="currentColor"/>
    </svg>
  );
}

function AttachIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function MessageEmptyIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
