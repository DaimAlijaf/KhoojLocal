import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../../components/Navbar";

/* Mock services */
const SERVICES = [
  { id: "s1", name: "Haircut & Style", duration: 45, price: 50 },
  { id: "s2", name: "Deep Tissue Massage", duration: 60, price: 90 },
  { id: "s3", name: "Manicure", duration: 30, price: 35 },
];

/* Mock calendar days (simple array of day numbers for Oct 2024) */
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

/* Mock timeslots */
const TIMES = [
  "9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","1:00 PM","1:30 PM","2:00 PM"
];


/* Service option (radio-like) */
function ServiceOption({ service, selected, onSelect }) {
  return (
    <label
      className={`flex items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border p-3 sm:p-4 cursor-pointer transition ${selected ? "border-violet-600 ring-2 ring-violet-200 bg-violet-50" : "border-gray-200"}`}
      onClick={() => onSelect(service.id)}
    >
      <input
        type="radio"
        name="service"
        checked={selected}
        readOnly
        className="h-4 w-4 sm:h-5 sm:w-5 text-violet-600"
        aria-hidden
      />
      <div className="flex-1">
        <div className="font-medium text-sm sm:text-base">{service.name}</div>
        <div className="text-xs sm:text-sm text-gray-500">{service.duration} min • ${service.price.toFixed(2)}</div>
      </div>
    </label>
  );
}

function Calendar({ selectedDay, onSelectDay }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-3 sm:p-4">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <button className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100" aria-label="Previous Month"><ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" /></button>
        <div className="font-semibold text-sm sm:text-base">October 2024</div>
        <button className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100" aria-label="Next Month"><ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" /></button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs sm:text-sm mb-2 sm:mb-3 text-gray-500">
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => <div key={d} className="py-1.5 sm:py-2 font-medium">{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-0.5 sm:gap-1 text-xs sm:text-sm text-center">
        {/* simple fixed back placeholders to match visual; in real app compute start-of-week */}
        <div className="text-gray-400 py-1.5 sm:py-2">29</div>
        <div className="text-gray-400 py-1.5 sm:py-2">30</div>
        {DAYS.map(day => {
          const isSelected = day === selectedDay;
          return (
            <div key={day} className="py-1 sm:py-2">
              <button
                onClick={() => onSelectDay(day)}
                className={`inline-flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-full ${isSelected ? "bg-violet-600 text-white font-semibold shadow" : "hover:bg-gray-100"}`}
                aria-pressed={isSelected}
              >
                {day}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TimesGrid({ selectedTime, onSelectTime }) {
  return (
    <div className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
      {TIMES.map(t => {
        const disabled = t === "1:00 PM"; // keep same disabled example
        const isSelected = t === selectedTime;
        return (
          <button
            key={t}
            onClick={() => !disabled && onSelectTime(t)}
            disabled={disabled}
            className={`px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold border ${isSelected ? "bg-violet-600 text-white border-violet-600 shadow" : "border-gray-300 hover:border-violet-600 hover:text-violet-700"} ${disabled ? "text-gray-400 cursor-not-allowed" : ""} active:scale-95 transition`}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

function BookingSummary({ service, day, time }) {
  if (!service) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4 shadow-sm lg:sticky lg:top-20">
      <h3 className="text-lg sm:text-xl font-bold">Your Booking Summary</h3>
      <div className="text-xs sm:text-sm space-y-2">
        <div className="flex justify-between"><span className="text-gray-600">Service</span><span className="font-semibold">{service.name}</span></div>
        <div className="flex justify-between"><span className="text-gray-600">Date</span><span className="font-semibold">{day ? `Oct ${day}, 2024` : "-"}</span></div>
        <div className="flex justify-between"><span className="text-gray-600">Time</span><span className="font-semibold">{time || "-"}</span></div>
        <div className="flex justify-between"><span className="text-gray-600">Duration</span><span className="font-semibold">{service.duration} min</span></div>
      </div>
      <hr />
      <div className="flex justify-between items-center">
        <span className="text-base sm:text-lg font-bold">Total</span>
        <span className="text-xl sm:text-2xl font-black text-violet-600">${service.price.toFixed(2)}</span>
      </div>
      <button className="w-full rounded-xl h-11 sm:h-12 bg-gradient-to-br from-violet-600 to-indigo-700 text-white font-bold shadow active:scale-95 transition text-sm sm:text-base">Continue</button>
    </div>
  );
}

export default function UserBooking() {
  const [selectedServiceId, setSelectedServiceId] = useState(SERVICES[0].id);
  const [selectedDay, setSelectedDay] = useState(9);
  const [selectedTime, setSelectedTime] = useState("10:00 AM");

  const service = useMemo(() => SERVICES.find(s => s.id === selectedServiceId), [selectedServiceId]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">Book Your Appointment</h1>
            <div className="mt-3">
              <p className="text-xs sm:text-sm text-gray-600">Step 1 of 3: Select Service &amp; Time</p>
              <div className="mt-2 sm:mt-3 h-2 rounded-full bg-gray-200">
                <div className="h-2 rounded-full bg-violet-600" style={{ width: "33%" }} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <section>
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">1. Choose a Service</h2>
                <div className="flex flex-col gap-2 sm:gap-3">
                  {SERVICES.map(s => (
                    <ServiceOption
                      key={s.id}
                      service={s}
                      selected={s.id === selectedServiceId}
                      onSelect={(id) => setSelectedServiceId(id)}
                    />
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">2. Select a Date &amp; Time</h2>
                <div>
                  <Calendar selectedDay={selectedDay} onSelectDay={setSelectedDay} />
                  <TimesGrid selectedTime={selectedTime} onSelectTime={setSelectedTime} />
                </div>
              </section>
            </div>

            <aside className="lg:col-span-1 order-first lg:order-last">
              <BookingSummary service={service} day={selectedDay} time={selectedTime} />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
