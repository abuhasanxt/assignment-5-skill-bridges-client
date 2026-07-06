"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, BadgeCheck, Clock, ArrowRight } from "lucide-react";

const featuredTutors = [
  {
    id: "1",
    name: "Dr. Sarah Mitchell",
    avatar: "SM",
    subject: "Mathematics",
    rating: 4.9,
    reviews: 127,
    hourlyRate: 45,
    experience: "8 years",
    bio: "PhD in Applied Mathematics. Specializes in Calculus, Linear Algebra, and Statistics.",
    tags: ["Calculus", "Statistics"],
    isVerified: true,
  },
  {
    id: "2",
    name: "James Chen",
    avatar: "JC",
    subject: "Programming",
    rating: 5.0,
    reviews: 203,
    hourlyRate: 60,
    experience: "10 years",
    bio: "Senior Software Engineer at Google. Expert in React, Node.js, and System Design.",
    tags: ["React", "Node.js"],
    isVerified: true,
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    avatar: "ER",
    subject: "Design",
    rating: 4.8,
    reviews: 89,
    hourlyRate: 55,
    experience: "6 years",
    bio: "Lead UX Designer at Apple. Passionate about user-centered design and prototyping.",
    tags: ["UI/UX", "Figma"],
    isVerified: true,
  },
  {
    id: "4",
    name: "Michael Park",
    avatar: "MP",
    subject: "Business",
    rating: 4.9,
    reviews: 156,
    hourlyRate: 50,
    experience: "12 years",
    bio: "MBA from Harvard. Former McKinsey consultant. Expert in marketing and strategy.",
    tags: ["Marketing", "Strategy"],
    isVerified: true,
  },
];

export function FeaturedTutors() {
  return (
 <section
  id="tutors"
  className="relative overflow-hidden py-24 lg:py-32 bg-gradient-to-b from-[#181C22] via-[#222831] to-[#1B2028]"
>
  {/* Background Blur */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute -top-40 left-0 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[120px]" />
    <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-teal-400/10 blur-[120px]" />
  </div>

  <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    {/* Section Header */}
    <div className="mb-20 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <span className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-semibold text-cyan-300 backdrop-blur-md">
          ⭐ Top Rated
        </span>

        <h2 className="mt-6 text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          Featured Tutors
        </h2>

        <p className="mt-6 text-lg leading-8 text-gray-400">
          Learn from the best. Our top-rated tutors are verified experts with
          years of teaching experience and proven student success.
        </p>
      </div>

      <Link href="/all-tutors">
        <Button
          variant="outline"
          className="rounded-xl border-cyan-400/30 bg-white/5 text-cyan-300 backdrop-blur-md hover:border-cyan-400 hover:bg-cyan-400 hover:text-[#222831] transition-all duration-300"
        >
          View All Tutors
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>

    {/* Tutors Grid */}
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {featuredTutors.map((tutor) => (
        <Link
          key={tutor.id}
          href={`/all-tutors/${tutor.id}`}
          className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-xl transition-all duration-500 hover:-translate-y-3 hover:border-cyan-400/40 hover:bg-white/10 hover:shadow-cyan-500/20"
        >
          {/* Glow */}
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Header */}
          <div className="mb-6 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-teal-400 text-lg font-bold text-[#222831] shadow-lg">
                {tutor.avatar}
              </div>

              <div>
                <div className="flex items-center gap-1">
                  <h3 className="font-bold text-white">
                    {tutor.name}
                  </h3>

                  {tutor.isVerified && (
                    <BadgeCheck className="h-4 w-4 fill-cyan-400 text-cyan-400" />
                  )}
                </div>

                <p className="text-sm text-gray-400">
                  {tutor.subject}
                </p>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="mb-4 flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full bg-cyan-400/10 px-3 py-1">
              <Star className="h-4 w-4 fill-cyan-400 text-cyan-400" />
              <span className="text-sm font-semibold text-white">
                {tutor.rating}
              </span>
            </div>

            <span className="text-sm text-gray-500">
              ({tutor.reviews} reviews)
            </span>
          </div>

          {/* Bio */}
          <p className="mb-6 line-clamp-3 text-sm leading-7 text-gray-400">
            {tutor.bio}
          </p>

          {/* Tags */}
          <div className="mb-6 flex flex-wrap gap-2">
            {tutor.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-white/10 pt-5">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="h-4 w-4 text-cyan-400" />
              {tutor.experience}
            </div>

            <div className="text-lg font-bold text-cyan-300">
              ${tutor.hourlyRate}
              <span className="text-sm font-normal text-gray-400">/hr</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>
  );
}
