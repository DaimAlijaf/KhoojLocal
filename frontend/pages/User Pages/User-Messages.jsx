import { useState } from "react";
import { Search, Send, Paperclip, Smile, MoreVertical, ArrowLeft, Download } from "lucide-react";
import Navbar from "../../components/Navbar";

const THREADS = [
  { id: "t1", title: "Bella''s Beauty Salon", snippet: "Your appointment is confirmed for tomorrow at 3 PM", time: "2m", avatar: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200", online: true, unread: true },
  { id: "t2", title: "Fresh Bites Cafe", snippet: "Thanks for your order! It will be ready in 20 minutes", time: "1h", avatar: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200", online: false, unread: false },
  { id: "t3", title: "Urban Fitness Center", snippet: "Welcome! Your membership has been activated", time: "Yesterday", avatar: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200", online: true, unread: false },
  { id: "t4", title: "HomeStyle Plumbing", snippet: "We can schedule a visit for next Tuesday", time: "3 days", avatar: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=200", online: false, unread: false },
  { id: "t5", title: "Paws & Claws Vet", snippet: "Luna''s checkup went well! Prescription is ready", time: "1 week", avatar: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=200", online: true, unread: false },
];

const MESSAGES = {
  t1: [
    { id: "m1", from: "business", text: "Hi! Thanks for booking with Bella''s Beauty Salon. We''re excited to see you tomorrow.", time: "10:15 AM" },
    { id: "m2", from: "user", text: "Thank you! Quick question - do you provide hair color services?", time: "10:17 AM" },
    { id: "m3", from: "business", text: "Yes, we do! We offer a full range of hair coloring services including highlights, balayage, and full color treatments.", time: "10:18 AM" },
    { id: "m4", from: "user", text: "Perfect! Can I add that to my appointment tomorrow?", time: "10:19 AM" },
    { id: "m5", from: "business", text: "Absolutely! I''ve updated your appointment. The color service will take an additional 90 minutes. Your new appointment time is 1:30 PM.", time: "10:20 AM", attachment: { name: "Updated_Appointment.pdf", size: "124 KB" } },
    { id: "m6", from: "user", text: "Great, see you tomorrow!", time: "10:22 AM" },
  ],
  t2: [{ id: "m1", from: "business", text: "Your order #1234 is being prepared!", time: "2:30 PM" }],
  t3: [{ id: "m1", from: "business", text: "Welcome to Urban Fitness! Your membership is active.", time: "Yesterday" }],
  t4: [{ id: "m1", from: "business", text: "Thanks for reaching out! We have availability next week.", time: "3 days ago" }],
  t5: [{ id: "m1", from: "business", text: "Luna''s vaccination record has been updated.", time: "1 week ago" }],
};

export default function UserMessages() {
  const [activeThread, setActiveThread] = useState("t1");
  const [messages, setMessages] = useState(MESSAGES);
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [input, setInput] = useState("");

  const handleSend = (threadId, text) => {
    const newMessage = { id: `m${Date.now()}`, from: "user", text, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessages(prev => ({ ...prev, [threadId]: [...(prev[threadId] || []), newMessage] }));
  };

  const thread = THREADS.find(t => t.id === activeThread);
  const threadMessages = messages[activeThread] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Inbox</h1>
          <p className="mt-1 text-sm text-gray-600">All your conversations with local businesses in one place.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-16rem)]">
          <div className={`lg:col-span-4 ${showSidebar ? "block" : "hidden lg:block"}`}>
            <aside className="flex flex-col bg-white rounded-2xl shadow-sm h-full">
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent" placeholder="Search conversations" />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {THREADS.map(t => (
                  <div key={t.id} onClick={() => { setActiveThread(t.id); setShowSidebar(false); }} className={`flex items-center gap-3 p-4 cursor-pointer transition-colors active:scale-[0.98] ${t.id === activeThread ? "bg-violet-50 border-l-4 border-violet-600" : "hover:bg-gray-50 border-l-4 border-transparent"}`}>
                    <div className="relative flex-shrink-0">
                      <img src={t.avatar} alt={t.title} className="h-12 w-12 rounded-full object-cover" />
                      {t.online && <div className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className={`text-sm font-semibold truncate ${t.unread ? "text-gray-900" : "text-gray-700"}`}>{t.title}</p>
                        <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{t.time}</span>
                      </div>
                      <p className={`text-sm truncate ${t.unread ? "text-violet-600 font-medium" : "text-gray-600"}`}>{t.snippet}</p>
                    </div>
                    {t.unread && <div className="h-2 w-2 rounded-full bg-violet-600 flex-shrink-0" />}
                  </div>
                ))}
              </div>
            </aside>
          </div>
          <div className={`lg:col-span-8 ${!showSidebar ? "block" : "hidden lg:block"}`}>
            <div className="flex flex-col bg-white rounded-2xl shadow-sm h-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <button onClick={() => setShowSidebar(true)} className="lg:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg active:scale-95"><ArrowLeft className="h-5 w-5 text-gray-600" /></button>
                  <div className="relative">
                    <img src={thread?.avatar} alt={thread?.title} className="h-10 w-10 rounded-full object-cover" />
                    {thread?.online && <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{thread?.title}</h3>
                    <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-green-500" /><span className="text-xs text-green-600">Online</span></div>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg active:scale-95"><MoreVertical className="h-5 w-5 text-gray-600" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {threadMessages.map(m => {
                  const isUser = m.from === "user";
                  return (
                    <div key={m.id} className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
                      <img src={isUser ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200" : thread?.avatar} alt={isUser ? "You" : thread?.title} className="h-8 w-8 rounded-full object-cover flex-shrink-0" />
                      <div className={`flex flex-col gap-1 max-w-md ${isUser ? "items-end" : "items-start"}`}>
                        <div className={`rounded-2xl px-4 py-2.5 ${isUser ? "bg-violet-600 text-white rounded-tr-sm" : "bg-gray-100 text-gray-900 rounded-tl-sm"}`}>
                          <p className="text-sm leading-relaxed">{m.text}</p>
                          {m.attachment && (
                            <div className={`mt-3 p-3 rounded-lg border flex items-center gap-3 ${isUser ? "bg-violet-500 border-violet-400" : "bg-white border-gray-200"}`}>
                              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${isUser ? "bg-violet-400" : "bg-violet-50"}`}><Paperclip className={`h-5 w-5 ${isUser ? "text-white" : "text-violet-600"}`} /></div>
                              <div className="flex-1"><p className={`text-sm font-medium ${isUser ? "text-white" : "text-gray-900"}`}>{m.attachment.name}</p><p className={`text-xs ${isUser ? "text-violet-200" : "text-gray-500"}`}>{m.attachment.size}</p></div>
                              <button className={`p-2 rounded-lg hover:bg-opacity-80 active:scale-95 ${isUser ? "hover:bg-violet-400" : "hover:bg-gray-100"}`}><Download className={`h-4 w-4 ${isUser ? "text-white" : "text-gray-600"}`} /></button>
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 px-1">{m.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="px-4 py-3 border-t border-gray-200">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {["Confirming my booking", "What are your hours?", "Thank you!"].map((r, i) => (
                    <button key={i} onClick={() => handleSend(activeThread, r)} className="px-4 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100 active:scale-95 whitespace-nowrap">{r}</button>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2 border border-gray-200 focus-within:ring-2 focus-within:ring-violet-600 focus-within:border-transparent">
                  <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === "Enter" && input.trim() && (handleSend(activeThread, input.trim()), setInput(""))} placeholder="Type your message..." className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-900 placeholder-gray-500" />
                  <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 active:scale-95"><Smile className="h-5 w-5" /></button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 active:scale-95"><Paperclip className="h-5 w-5" /></button>
                  <button onClick={() => { if (input.trim()) { handleSend(activeThread, input.trim()); setInput(""); }}} disabled={!input.trim()} className="p-2.5 bg-violet-600 text-white rounded-lg hover:bg-violet-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"><Send className="h-5 w-5" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
