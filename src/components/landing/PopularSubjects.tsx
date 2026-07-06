"use client";

import Link from "next/link";
import {
  Code,
  Palette,
  BarChart3,
  Languages,
  Music,
  Calculator,
  Camera,
  PenTool,
  ArrowRight,
} from "lucide-react";

const subjects = [
  {
    icon: Code,
    name: "Programming",
    description: "Python, JavaScript, React, Node.js & more",
    tutorCount: 120,
    color: "#00ADB5",
    href: "/all-tutors",
  },
  {
    icon: Palette,
    name: "Design",
    description: "UI/UX, Graphic Design, Illustration",
    tutorCount: 85,
    color: "#FF6B6B",
    href: "/all-tutors",
  },
  {
    icon: BarChart3,
    name: "Business",
    description: "Marketing, Finance, Management",
    tutorCount: 64,
    color: "#4ECDC4",
    href: "/all-tutors",
  },
  {
    icon: Languages,
    name: "Languages",
    description: "English, Spanish, French, Mandarin",
    tutorCount: 95,
    color: "#FFE66D",
    href: "/all-tutors",
  },
  {
    icon: Music,
    name: "Music",
    description: "Piano, Guitar, Singing, Theory",
    tutorCount: 48,
    color: "#95E1D3",
    href: "/all-tutors",
  },
  {
    icon: Calculator,
    name: "Mathematics",
    description: "Algebra, Calculus, Statistics",
    tutorCount: 72,
    color: "#F7DC6F",
    href: "/all-tutors",
  },
  {
    icon: Camera,
    name: "Photography",
    description: "Digital, Portrait, Editing",
    tutorCount: 38,
    color: "#BB8FCE",
    href: "/all-tutors",
  },
  {
    icon: PenTool,
    name: "Writing",
    description: "Creative, Academic, Copywriting",
    tutorCount: 56,
    color: "#85C1E9",
    href: "/all-tutors",
  },
];

export function PopularSubjects() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32 bg-gradient-to-b from-[#181C22] via-[#222831] to-[#1B2028]">
  {/* Background Blur */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute -top-40 left-0 h-[400px] w-[400px] rounded-full bg-cyan-400/10 blur-[120px]" />
    <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-teal-400/10 blur-[120px]" />
  </div>

  <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    {/* Section Header */}
    <div className="text-center mb-20">
      <span className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-semibold text-cyan-300 backdrop-blur-md">
        Explore Subjects
      </span>

      <h2 className="mt-6 text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
        Popular Subjects
      </h2>

      <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-gray-400">
        From coding to creative arts, find expert tutors in any subject you&rsquo;re
        passionate about learning.
      </p>
    </div>

    {/* Subjects Grid */}
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {subjects.map((subject) => (
        <Link
          key={subject.name}
          href={subject.href}
          className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-xl transition-all duration-500 hover:-translate-y-3 hover:border-cyan-400/40 hover:bg-white/10 hover:shadow-cyan-500/20"
        >
          {/* Glow */}
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Icon */}
          <div
            className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
            style={{ backgroundColor: `${subject.color}20` }}
          >
            <subject.icon
              className="h-8 w-8"
              style={{ color: subject.color }}
            />
          </div>

          {/* Content */}
          <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-cyan-300">
            {subject.name}
          </h3>

          <p className="mb-8 text-sm leading-7 text-gray-400">
            {subject.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-white/10 pt-5">
            <span className="text-sm font-medium text-cyan-300">
              {subject.tutorCount} tutors
            </span>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-all duration-300 group-hover:bg-cyan-400 group-hover:text-[#222831]">
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </Link>
      ))}
    </div>

    {/* View All */}
    <div className="mt-16 text-center">
      <Link
        href="/all-tutors"
        className="inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-6 py-3 font-semibold text-cyan-300 transition-all duration-300 hover:scale-105 hover:bg-cyan-400 hover:text-[#222831]"
      >
        View All Subjects
        <ArrowRight className="h-5 w-5" />
      </Link>
    </div>
  </div>
</section>
  );
}
