"use client";

import { Search, Calendar, Video, Star } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find Your Tutor",
    description:
      "Browse through 500+ verified tutors by subject, rating, or expertise. Filter to find the perfect match for your learning goals.",
  },
  {
    icon: Calendar,
    title: "Book a Session",
    description:
      "Select a convenient time slot from the tutor's availability calendar. Instantly confirm your booking with secure payment.",
  },
  {
    icon: Video,
    title: "Start Learning",
    description:
      "Join your 1-on-1 video session from anywhere. Get personalized guidance, ask questions, and accelerate your learning.",
  },
  {
    icon: Star,
    title: "Leave a Review",
    description:
      "After your session, rate your experience and help other students find great tutors. Build the community together.",
  },
];

export function HowItWorks() {
  return (
 <section
  id="how-it-works"
  className="relative overflow-hidden py-24 lg:py-32 bg-gradient-to-b from-[#1B2028] via-[#222831] to-[#181C22]"
>
  {/* Background Blur */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[120px]" />
    <div className="absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full bg-teal-400/10 blur-[120px]" />
  </div>

  <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    {/* Header */}
    <div className="text-center mb-20">
      <span className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-semibold text-cyan-300 backdrop-blur-md">
        Simple Process
      </span>

      <h2 className="mt-6 text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
        How SkillBridge Works
      </h2>

      <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-gray-400">
        Get started in minutes. From finding a tutor to booking your first
        session, we&rsquo;ve made learning seamless and accessible.
      </p>
    </div>

    {/* Steps */}
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <div key={step.title} className="relative group">
          {/* Connector */}
          {index < steps.length - 1 && (
            <div className="hidden lg:block absolute top-14 left-full w-full h-[2px] bg-gradient-to-r from-cyan-400/40 via-cyan-300/20 to-transparent" />
          )}

          {/* Card */}
          <div className="relative h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-xl transition-all duration-500 hover:-translate-y-3 hover:border-cyan-400/40 hover:bg-white/10 hover:shadow-cyan-500/20">

            {/* Step Number */}
            <div className="absolute -top-4 -left-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-teal-400 text-[#222831] text-sm font-bold shadow-lg">
              {index + 1}
            </div>

            {/* Icon */}
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-400/20">
              <step.icon className="h-8 w-8 text-cyan-300" />
            </div>

            {/* Title */}
            <h3 className="mb-4 text-xl font-bold text-white">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-sm leading-7 text-gray-400">
              {step.description}
            </p>

            {/* Bottom Glow Line */}
            <div className="mt-8 h-[2px] w-12 bg-gradient-to-r from-cyan-400 to-transparent rounded-full group-hover:w-full transition-all duration-500" />
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
  );
}
