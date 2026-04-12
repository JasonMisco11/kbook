'use client'

import React, { useState, useMemo } from 'react'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'motion/react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn, generateRef, formatCurrency } from '@/lib/utils'

/* ─── Service Data ───────────────────────────────────── */

interface ServiceItem {
  id: string
  name: string
  description: string
  price: number
  duration: string
  icon: string
}

interface ServiceCategory {
  category: string
  emoji: string
  services: ServiceItem[]
}

const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    category: 'Plumbing',
    emoji: '🔧',
    services: [
      { id: 'plumb-1', name: 'Leak Repair', description: 'Fix leaking pipes, faucets and valves', price: 150, duration: '1–2 hrs', icon: '💧' },
      { id: 'plumb-2', name: 'Drain Unblocking', description: 'Clear clogged drains and sewer lines', price: 120, duration: '1–2 hrs', icon: '🚿' },
      { id: 'plumb-3', name: 'Pipe Installation', description: 'Install new pipes for water supply or drainage', price: 300, duration: '3–5 hrs', icon: '🔩' },
      { id: 'plumb-4', name: 'Water Heater Service', description: 'Install, repair or replace water heaters', price: 250, duration: '2–3 hrs', icon: '🔥' },
    ],
  },
  {
    category: 'Electrical',
    emoji: '⚡',
    services: [
      { id: 'elec-1', name: 'Wiring & Rewiring', description: 'New wiring or rewire existing circuits', price: 400, duration: '4–6 hrs', icon: '🔌' },
      { id: 'elec-2', name: 'Light Fixture Install', description: 'Install chandeliers, recessed or outdoor lights', price: 100, duration: '1 hr', icon: '💡' },
      { id: 'elec-3', name: 'Panel Upgrade', description: 'Upgrade your breaker panel for more capacity', price: 600, duration: '4–8 hrs', icon: '🔋' },
      { id: 'elec-4', name: 'Outlet & Switch Repair', description: 'Repair or add outlets and switches', price: 80, duration: '30–60 min', icon: '🔘' },
    ],
  },
  {
    category: 'Painting',
    emoji: '🎨',
    services: [
      { id: 'paint-1', name: 'Interior Painting', description: 'Professional interior walls and ceilings', price: 500, duration: '1–2 days', icon: '🏠' },
      { id: 'paint-2', name: 'Exterior Painting', description: 'Weatherproof exterior paint job', price: 800, duration: '2–3 days', icon: '🏗️' },
      { id: 'paint-3', name: 'Accent Wall', description: 'Feature wall with designer finish', price: 200, duration: '3–5 hrs', icon: '✨' },
    ],
  },
  {
    category: 'Cleaning',
    emoji: '🧹',
    services: [
      { id: 'clean-1', name: 'Deep Clean', description: 'Full house deep clean including kitchen & bath', price: 250, duration: '4–6 hrs', icon: '🏡' },
      { id: 'clean-2', name: 'Post-Construction', description: 'Clean up after renovations and builds', price: 350, duration: '5–8 hrs', icon: '🧱' },
      { id: 'clean-3', name: 'Carpet Cleaning', description: 'Steam clean and deodorise carpets', price: 180, duration: '2–3 hrs', icon: '🧽' },
    ],
  },
  {
    category: 'Carpentry',
    emoji: '🪚',
    services: [
      { id: 'carp-1', name: 'Furniture Assembly', description: 'Assemble flat-pack or custom furniture', price: 100, duration: '1–3 hrs', icon: '🪑' },
      { id: 'carp-2', name: 'Door & Window Repair', description: 'Fix or replace interior/exterior doors', price: 200, duration: '2–4 hrs', icon: '🚪' },
      { id: 'carp-3', name: 'Custom Shelving', description: 'Build and mount custom shelves', price: 280, duration: '3–5 hrs', icon: '📚' },
    ],
  },
  {
    category: 'AC & HVAC',
    emoji: '❄️',
    services: [
      { id: 'hvac-1', name: 'AC Installation', description: 'Install split or window air conditioning', price: 450, duration: '3–5 hrs', icon: '🌬️' },
      { id: 'hvac-2', name: 'AC Servicing', description: 'Clean, gas recharge and maintenance', price: 150, duration: '1–2 hrs', icon: '🛠️' },
      { id: 'hvac-3', name: 'Duct Cleaning', description: 'Clean air ducts and vents', price: 300, duration: '3–4 hrs', icon: '💨' },
    ],
  },
]

const TIME_SLOTS = [
  '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
]

const STEPS = [
  { id: 1, label: 'Service' },
  { id: 2, label: 'Date & Time' },
  { id: 3, label: 'Details' },
  { id: 4, label: 'Review' },
]

/* ─── Component ──────────────────────────────────────── */

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedServiceId, setSelectedServiceId] = useState('')
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')

  // Find selected service
  const selectedService = useMemo(() => {
    for (const cat of SERVICE_CATEGORIES) {
      const svc = cat.services.find((s) => s.id === selectedServiceId)
      if (svc) return svc
    }
    return null
  }, [selectedServiceId])

  // Filtered services for selected category
  const filteredServices = useMemo(() => {
    const cat = SERVICE_CATEGORIES.find((c) => c.category === selectedCategory)
    return cat?.services ?? []
  }, [selectedCategory])

  /* ─ Validation ─ */
  const canProceed = (): boolean => {
    switch (step) {
      case 1: return !!selectedServiceId
      case 2: return !!date && !!time
      case 3: return !!name.trim() && !!phone.trim() && !!address.trim()
      default: return true
    }
  }

  /* ─ Submit ─ */
  const handleSubmit = () => {
    const ref = generateRef()
    toast.success('Booking Confirmed! 🎉', {
      description: `Your booking reference is ${ref}. We'll contact you at ${phone} to confirm.`,
      duration: 8000,
    })
    // Reset
    setStep(1)
    setSelectedCategory('')
    setSelectedServiceId('')
    setDate(undefined)
    setTime('')
    setName('')
    setEmail('')
    setPhone('')
    setAddress('')
    setNotes('')
  }

  /* ─── Render helpers ─── */

  const renderStep1 = () => (
    <div className="space-y-6">
      {/* Category selection */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          Choose a Category
        </label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat.category}
              id={`category-${cat.category.toLowerCase()}`}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.category)
                setSelectedServiceId('')
              }}
              className={cn(
                'group relative flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-lg',
                selectedCategory === cat.category
                  ? 'border-blue-500 bg-blue-50 shadow-md shadow-blue-100 dark:border-blue-400 dark:bg-blue-900/20 dark:shadow-blue-900/20'
                  : 'border-neutral-200 bg-white hover:border-blue-300 dark:border-neutral-700 dark:bg-neutral-800/50 dark:hover:border-blue-600'
              )}
            >
              <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
                {cat.emoji}
              </span>
              <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                {cat.category}
              </span>
              {selectedCategory === cat.category && (
                <motion.div
                  layoutId="cat-indicator"
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  ✓
                </motion.div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Service selection with animation */}
      <AnimatePresence mode="wait">
        {selectedCategory && (
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            <label className="mb-2 block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Select a Service
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              {filteredServices.map((svc) => (
                <button
                  key={svc.id}
                  id={`service-${svc.id}`}
                  type="button"
                  onClick={() => setSelectedServiceId(svc.id)}
                  className={cn(
                    'group relative flex items-start gap-4 rounded-2xl border-2 p-4 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg',
                    selectedServiceId === svc.id
                      ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100/50 shadow-md shadow-blue-100 dark:border-blue-400 dark:from-blue-900/20 dark:to-blue-800/10 dark:shadow-blue-900/20'
                      : 'border-neutral-200 bg-white hover:border-blue-300 dark:border-neutral-700 dark:bg-neutral-800/50 dark:hover:border-blue-600'
                  )}
                >
                  <span className="mt-0.5 text-2xl transition-transform duration-300 group-hover:scale-110">
                    {svc.icon}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {svc.name}
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                      {svc.description}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                        {formatCurrency(svc.price)}
                      </span>
                      <span className="text-xs text-neutral-400">
                        ⏱ {svc.duration}
                      </span>
                    </div>
                  </div>
                  {selectedServiceId === svc.id && (
                    <motion.div
                      layoutId="svc-indicator"
                      className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      ✓
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      {/* Date Picker */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          Pick a Date
        </label>
        <div className="flex justify-center">
          <div className="rounded-2xl border border-neutral-200 bg-white p-1 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
            />
          </div>
        </div>
        {date && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 text-center text-sm text-blue-600 dark:text-blue-400"
          >
            📅 Selected: <span className="font-semibold">{format(date, 'EEEE, MMMM d, yyyy')}</span>
          </motion.p>
        )}
      </div>

      {/* Time Picker */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          Choose a Time Slot
        </label>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot}
              id={`time-${slot.replace(/[: ]/g, '')}`}
              type="button"
              onClick={() => setTime(slot)}
              className={cn(
                'rounded-xl border px-2 py-2.5 text-xs font-medium transition-all duration-200 hover:scale-105',
                time === slot
                  ? 'border-blue-500 bg-blue-500 text-white shadow-md shadow-blue-200 dark:shadow-blue-900/30'
                  : 'border-neutral-200 bg-white text-neutral-700 hover:border-blue-300 hover:bg-blue-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-blue-600'
              )}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label htmlFor="booking-name" className="mb-1.5 block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="booking-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Kwame Asante"
            className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 shadow-sm transition-colors placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
          />
        </div>
        {/* Email */}
        <div>
          <label htmlFor="booking-email" className="mb-1.5 block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            Email
          </label>
          <input
            id="booking-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="kwame@email.com"
            className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 shadow-sm transition-colors placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="booking-phone" className="mb-1.5 block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          id="booking-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+233 24 XXX XXXX"
          className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 shadow-sm transition-colors placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
        />
      </div>

      {/* Address */}
      <div>
        <label htmlFor="booking-address" className="mb-1.5 block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          Service Address <span className="text-red-500">*</span>
        </label>
        <input
          id="booking-address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="House No., Street, Area, City"
          className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 shadow-sm transition-colors placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
        />
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="booking-notes" className="mb-1.5 block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          Additional Notes
        </label>
        <textarea
          id="booking-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Any specifics about the job…"
          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm transition-colors placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
        />
      </div>
    </div>
  )

  const renderStep4 = () => {
    const cat = SERVICE_CATEGORIES.find((c) =>
      c.services.some((s) => s.id === selectedServiceId)
    )
    return (
      <div className="space-y-5">
        <div className="rounded-2xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-6 dark:border-neutral-700 dark:from-neutral-800/50 dark:to-neutral-800">
          <h3 className="mb-4 text-lg font-bold text-neutral-900 dark:text-neutral-100">
            Booking Summary
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-700">
              <span className="text-neutral-500 dark:text-neutral-400">Category</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                {cat?.emoji} {cat?.category}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-700">
              <span className="text-neutral-500 dark:text-neutral-400">Service</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                {selectedService?.icon} {selectedService?.name}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-700">
              <span className="text-neutral-500 dark:text-neutral-400">Date</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                {date ? format(date, 'EEE, MMM d, yyyy') : '—'}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-700">
              <span className="text-neutral-500 dark:text-neutral-400">Time</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">{time}</span>
            </div>
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-700">
              <span className="text-neutral-500 dark:text-neutral-400">Duration</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                {selectedService?.duration}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-700">
              <span className="text-neutral-500 dark:text-neutral-400">Client</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">{name}</span>
            </div>
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-700">
              <span className="text-neutral-500 dark:text-neutral-400">Phone</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">{phone}</span>
            </div>
            {email && (
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-700">
                <span className="text-neutral-500 dark:text-neutral-400">Email</span>
                <span className="font-medium text-neutral-900 dark:text-neutral-100">{email}</span>
              </div>
            )}
            <div className="flex items-start justify-between border-b border-neutral-100 pb-3 dark:border-neutral-700">
              <span className="text-neutral-500 dark:text-neutral-400">Address</span>
              <span className="max-w-[60%] text-right font-medium text-neutral-900 dark:text-neutral-100">
                {address}
              </span>
            </div>
            {notes && (
              <div className="flex items-start justify-between pb-1">
                <span className="text-neutral-500 dark:text-neutral-400">Notes</span>
                <span className="max-w-[60%] text-right text-neutral-700 dark:text-neutral-300">
                  {notes}
                </span>
              </div>
            )}
          </div>

          {/* Total */}
          <div className="mt-5 flex items-center justify-between rounded-xl bg-blue-50 px-4 py-3 dark:bg-blue-900/20">
            <span className="text-sm font-semibold text-blue-800 dark:text-blue-200">
              Estimated Total
            </span>
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {selectedService ? formatCurrency(selectedService.price) : '—'}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/40 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-200/30 blur-[100px] dark:bg-blue-800/10" />
        <div className="absolute top-1/2 -right-48 h-[500px] w-[500px] rounded-full bg-cyan-200/20 blur-[120px] dark:bg-cyan-800/10" />
        <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-indigo-200/20 blur-[100px] dark:bg-indigo-800/10" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-16">
        {/* Header */}
        <div className="mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a href="/" className="mb-4 inline-flex items-center gap-2 text-sm text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
              Back to Home
            </a>
            <h1 className="bg-gradient-to-r from-neutral-900 via-blue-800 to-blue-600 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl dark:from-white dark:via-blue-300 dark:to-blue-500">
              Book a Service
            </h1>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              Schedule your home service in just a few steps
            </p>
          </motion.div>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.id}>
                <button
                  type="button"
                  onClick={() => {
                    // Only allow going back
                    if (s.id < step) setStep(s.id)
                  }}
                  className="flex flex-col items-center gap-1.5"
                >
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-300',
                      step === s.id
                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-200 ring-4 ring-blue-100 dark:shadow-blue-900/30 dark:ring-blue-900/50'
                        : step > s.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-neutral-200 text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400'
                    )}
                  >
                    {step > s.id ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    ) : (
                      s.id
                    )}
                  </div>
                  <span
                    className={cn(
                      'hidden text-xs font-medium sm:block',
                      step >= s.id
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-neutral-400 dark:text-neutral-500'
                    )}
                  >
                    {s.label}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className="mt-[-1.25rem] flex-1 px-2 sm:mt-[-1rem]">
                    <div
                      className={cn(
                        'h-1 rounded-full transition-all duration-500',
                        step > s.id
                          ? 'bg-blue-500'
                          : 'bg-neutral-200 dark:bg-neutral-700'
                      )}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content Card */}
        <motion.div
          className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 shadow-xl shadow-neutral-200/30 backdrop-blur-sm sm:p-8 dark:border-neutral-700/60 dark:bg-neutral-800/60 dark:shadow-neutral-900/20"
          layout
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
              {step === 4 && renderStep4()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            {step > 1 ? (
              <button
                id="booking-back-btn"
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition-all duration-200 hover:bg-neutral-50 hover:shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                id="booking-next-btn"
                type="button"
                disabled={!canProceed()}
                onClick={() => setStep((s) => s + 1)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200',
                  canProceed()
                    ? 'bg-blue-500 shadow-md shadow-blue-200 hover:bg-blue-600 hover:shadow-lg dark:shadow-blue-900/30'
                    : 'cursor-not-allowed bg-neutral-300 dark:bg-neutral-600'
                )}
              >
                Continue
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            ) : (
              <button
                id="booking-confirm-btn"
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition-all duration-200 hover:from-emerald-600 hover:to-emerald-700 hover:shadow-lg dark:shadow-emerald-900/30"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                Confirm Booking
              </button>
            )}
          </div>
        </motion.div>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-neutral-400 dark:text-neutral-500">
          Need help? Call us at <a href="tel:+233000000000" className="text-blue-500 hover:underline">+233 XX XXX XXXX</a> or{' '}
          <a href="/contact" className="text-blue-500 hover:underline">send a message</a>.
        </p>
      </div>
    </div>
  )
}
