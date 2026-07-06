"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: "1",
    name: "Alex Thompson",
    role: "Computer Science Student",
    avatar: "AT",
    rating: 5,
    content:
      "SkillBridge completely transformed my coding journey. I went from struggling with basic JavaScript to building full-stack applications in just 3 months. My tutor James was incredibly patient and knowledgeable.",
    subject: "Programming",
  },
  {
    id: "2",
    name: "Maria Garcia",
    role: "Marketing Professional",
    avatar: "MG",
    rating: 5,
    content:
      "I needed to learn data analytics for my career transition. The tutor I found on SkillBridge made complex statistics concepts so easy to understand. Highly recommend for anyone looking to upskill!",
    subject: "Data Analytics",
  },
  {
    id: "3",
    name: "David Kim",
    role: "High School Student",
    avatar: "DK",
    rating: 5,
    content:
      "My math tutor helped me improve from a C to an A+ in AP Calculus. The 1-on-1 attention made all the difference. The booking system is super convenient too!",
    subject: "Mathematics",
  },
  {
    id: "4",
    name: "Sophia Chen",
    role: "UX Designer",
    avatar: "SC",
    rating: 5,
    content:
      "As a designer wanting to learn motion graphics, I found the perfect tutor here. The platform made it so easy to compare tutors and book sessions that fit my schedule.",
    subject: "Motion Design",
  },
  {
    id: "5",
    name: "James Wilson",
    role: "Entrepreneur",
    avatar: "JW",
    rating: 5,
    content:
      "I used SkillBridge to learn business strategy before launching my startup. The quality of tutors is exceptional - many are industry professionals with real-world experience.",
    subject: "Business Strategy",
  },
  {
    id: "6",
    name: "Emily Brown",
    role: "Piano Enthusiast",
    avatar: "EB",
    rating: 5,
    content:
      "Finally achieved my dream of playing piano! My tutor adapted lessons to my pace and musical interests. The progress tracking feature kept me motivated throughout.",
    subject: "Music",
  },
];

export function Testimonials() {
  return (
   <section
  id="testimonials"
  className="relative overflow-hidden py-24 lg:py-32 bg-gradient-to-b from-[#1B2028] via-[#222831] to-[#181C22]"
>
  {/* Background Glow */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute -top-40 left-0 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[120px]" />
    <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-teal-400/10 blur-[120px]" />
  </div>

  <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    {/* Header */}
    <div className="mb-20 text-center">
      <span className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-semibold text-cyan-300 backdrop-blur-md">
        💬 Success Stories
      </span>

      <h2 className="mt-6 text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
        What Our Students Say
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
        Join thousands of satisfied learners who have achieved their goals with
        SkillBridge.
      </p>
    </div>

    {/* Testimonials */}
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((testimonial, index) => (
        <div
          key={testimonial.id}
          className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-xl transition-all duration-500 hover:-translate-y-3 hover:border-cyan-400/40 hover:bg-white/10 hover:shadow-cyan-500/20 ${
            index === 0 || index === 3 ? "lg:row-span-1" : ""
          }`}
        >
          {/* Glow */}
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Quote */}
          <Quote className="mb-5 h-10 w-10 text-cyan-400/30" />

          {/* Rating */}
          <div className="mb-5 flex items-center gap-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-cyan-400 text-cyan-400"
              />
            ))}
          </div>

          {/* Review */}
          <p className="mb-8 text-sm leading-8 text-gray-300">
            &ldquo;{testimonial.content}&rdquo;
          </p>

          {/* Footer */}
          <div className="flex items-center gap-4 border-t border-white/10 pt-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-teal-400 text-sm font-bold text-[#222831] shadow-lg">
              {testimonial.avatar}
            </div>

            <div>
              <h4 className="font-semibold text-white">
                {testimonial.name}
              </h4>

              <p className="text-sm text-gray-400">
                {testimonial.role}
              </p>
            </div>

            <span className="ml-auto rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
              {testimonial.subject}
            </span>
          </div>
        </div>
      ))}
    </div>

    {/* Stats */}
    <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">
      {[
        { value: "15,000+", label: "Happy Students" },
        { value: "98%", label: "Satisfaction Rate" },
        { value: "4.9/5", label: "Average Rating" },
        { value: "50,000+", label: "Sessions Completed" },
      ].map((stat) => (
        <div
          key={stat.label}
          className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/10"
        >
          <div className="text-4xl font-extrabold text-cyan-300">
            {stat.value}
          </div>

          <div className="mt-2 text-sm text-gray-400">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
  );
}
