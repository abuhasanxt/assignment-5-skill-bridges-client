"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Clock,
  DollarSign,
  GraduationCap,
  BookOpen,
  User,
  Calendar,
  MapPin,
  Mail,
  Phone,
  ArrowLeft,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ITutorWithRelations } from "@/types/tutor.types";
import { ICategory } from "@/types/category.types";
import { IReview } from "@/types/review.types";
import { format } from "date-fns";
import { BookingModal } from "./BookingModal";

interface TutorDetailProps {
  tutor: ITutorWithRelations;
  categories: ICategory[];
  reviews: IReview[];
}

export function TutorDetail({ tutor, categories, reviews }: TutorDetailProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const profileImage = tutor.profilePhoto || tutor.User?.image;
  const displayName = tutor.name || tutor.User?.name || "Unknown Tutor";
  const averageRating = tutor.avgRating || 0;
  const reviewCount = reviews.length;

  // Format availability time
  const formatTime = (time: string | Date) => {
    if (!time) return "N/A";
    try {
      return format(new Date(time), "h:mm a");
    } catch {
      return String(time);
    }
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= Math.round(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header with back button */}
      <div className="sticky top-0 z-30 border-b border-white/10 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center px-4 py-5 sm:px-6 lg:px-8">
          <Link
            href="/all-tutors"
            className="group inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition-all duration-300 hover:-translate-x-1 hover:border-[#00ADB5]/30 hover:bg-[#00ADB5]/5 hover:text-[#00ADB5] hover:shadow-md"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 transition-colors group-hover:bg-[#00ADB5]/10">
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </div>

            <span>Back to All Tutors</span>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <Card className="overflow-hidden rounded-3xl border border-white/10 bg-white/80 backdrop-blur-xl shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-[#00ADB5]/10">
              {/* Cover */}
              <div className="relative h-72 w-full overflow-hidden bg-gradient-to-br from-[#00ADB5]/15 via-[#00ADB5]/5 to-slate-100">
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt={displayName}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 66vw"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="flex h-36 w-36 items-center justify-center rounded-full bg-white shadow-xl">
                      <User className="h-20 w-20 text-slate-400" />
                    </div>
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Rating */}
                <div className="absolute bottom-6 left-6">
                  <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 backdrop-blur-md">
                    {renderStars(averageRating)}

                    <span className="font-semibold text-white">
                      {averageRating.toFixed(1)}
                    </span>

                    <span className="text-sm text-white/80">
                      ({reviewCount} reviews)
                    </span>
                  </div>
                </div>

                {/* Status */}
                {tutor.status === "ACTIVE" && (
                  <Badge className="absolute right-6 top-6 rounded-full bg-emerald-500 px-4 py-1 text-white shadow-lg">
                    ● Available
                  </Badge>
                )}
              </div>

              <CardContent className="space-y-6 p-8">
                {/* Name */}
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">
                    {displayName}
                  </h1>

                  <p className="mt-2 text-lg font-medium text-[#00ADB5]">
                    {tutor.designation}
                  </p>
                </div>

                {/* Categories */}
                {categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Badge
                        key={category.id}
                        className="rounded-full border border-[#00ADB5]/20 bg-[#00ADB5]/10 px-3 py-1 text-[#00ADB5]"
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="rounded-2xl bg-slate-50 p-4 transition-all hover:bg-[#00ADB5]/5">
                    <GraduationCap className="mb-3 h-6 w-6 text-[#00ADB5]" />

                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Education
                    </p>

                    <p className="mt-1 line-clamp-1 text-sm font-semibold text-slate-900">
                      {tutor.educationLevel}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 transition-all hover:bg-[#00ADB5]/5">
                    <Clock className="mb-3 h-6 w-6 text-[#00ADB5]" />

                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Experience
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {tutor.experienceYears} years
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 transition-all hover:bg-[#00ADB5]/5">
                    <DollarSign className="mb-3 h-6 w-6 text-[#00ADB5]" />

                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Hourly Rate
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      ${tutor.hourlyRate}/hr
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 transition-all hover:bg-[#00ADB5]/5">
                    <BookOpen className="mb-3 h-6 w-6 text-[#00ADB5]" />

                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Subjects
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {categories.length} Categories
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card className="rounded-3xl border border-white/10 bg-white/80 backdrop-blur-xl shadow-xl">
              <CardHeader className="border-b border-slate-100 pb-5">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00ADB5]/10">
                      <MessageSquare className="h-5 w-5 text-[#00ADB5]" />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        Student Reviews
                      </h2>
                      <p className="text-sm text-slate-500">
                        {reviewCount} {reviewCount === 1 ? "Review" : "Reviews"}
                      </p>
                    </div>
                  </div>

                  {reviewCount > 0 && (
                    <div className="rounded-full bg-[#00ADB5]/10 px-4 py-2 text-sm font-semibold text-[#00ADB5]">
                      ⭐ {averageRating.toFixed(1)}
                    </div>
                  )}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-6">
                {reviews.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 py-14 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#00ADB5]/10">
                      <MessageSquare className="h-8 w-8 text-[#00ADB5]" />
                    </div>

                    <h3 className="text-lg font-semibold text-slate-800">
                      No Reviews Yet
                    </h3>

                    <p className="mt-2 max-w-sm text-sm text-slate-500">
                      This tutor hasnt received any reviews yet. Be the first
                      student to share your experience.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:border-[#00ADB5]/30 hover:bg-white hover:shadow-md"
                      >
                        <div className="flex gap-4">
                          <Avatar className="h-12 w-12 border-2 border-white shadow">
                            <AvatarImage
                              src={
                                review.Student?.User?.profileImage || undefined
                              }
                              alt={review.Student?.User?.name || "Student"}
                            />

                            <AvatarFallback className="bg-[#00ADB5]/10 font-semibold text-[#00ADB5]">
                              {getInitials(review.Student?.User?.name || "S")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div>
                                <h4 className="font-semibold text-slate-900">
                                  {review.Student?.User?.name || "Anonymous"}
                                </h4>

                                <span className="text-xs text-slate-500">
                                  {format(
                                    new Date(review.createdAt),
                                    "MMM d, yyyy",
                                  )}
                                </span>
                              </div>

                              <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1">
                                {renderStars(review.rating)}

                                <span className="ml-1 text-sm font-semibold text-slate-700">
                                  {review.rating}
                                </span>
                              </div>
                            </div>

                            <p className="mt-4 leading-7 text-slate-600">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Contact & Booking Card */}
            <Card className="sticky top-6 overflow-hidden rounded-3xl border border-white/10 bg-white/80 backdrop-blur-xl shadow-xl">
              <CardHeader className="border-b border-slate-100 pb-5">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00ADB5]/10">
                    <Calendar className="h-5 w-5 text-[#00ADB5]" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      Contact & Schedule
                    </h3>
                    <p className="text-sm font-normal text-slate-500">
                      Get in touch with your tutor
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6 p-6">
                {/* Contact */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Contact Information
                  </h4>

                  {tutor.email && (
                    <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 transition-all hover:bg-[#00ADB5]/5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00ADB5]/10">
                        <Mail className="h-5 w-5 text-[#00ADB5]" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-slate-500">Email</p>
                        <p className="truncate text-sm font-medium text-slate-800">
                          {tutor.email}
                        </p>
                      </div>
                    </div>
                  )}

                  {tutor.contactNumber && (
                    <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 transition-all hover:bg-[#00ADB5]/5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00ADB5]/10">
                        <Phone className="h-5 w-5 text-[#00ADB5]" />
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">Phone</p>

                        <p className="text-sm font-medium text-slate-800">
                          {tutor.contactNumber}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Availability */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Availability
                  </h4>

                  <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 transition-all hover:bg-[#00ADB5]/5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00ADB5]/10">
                      <Clock className="h-5 w-5 text-[#00ADB5]" />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">Time</p>

                      <p className="text-sm font-medium text-slate-800">
                        {formatTime(tutor.availabilityStartTime)} —{" "}
                        {formatTime(tutor.availabilityEndTime)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 transition-all hover:bg-[#00ADB5]/5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00ADB5]/10">
                      <Calendar className="h-5 w-5 text-[#00ADB5]" />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">Available Days</p>

                      <p className="text-sm font-medium text-slate-800">
                        {tutor.availableDays?.join(", ") || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="rounded-2xl border border-[#00ADB5]/10 bg-[#00ADB5]/5 p-5">
                  <Button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="h-12 w-full rounded-xl bg-[#00ADB5] text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[#00959d]"
                  >
                    Book a Session
                  </Button>

                  <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                    ✓ Free cancellation up to{" "}
                    <span className="font-semibold">24 hours</span> before your
                    session.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Booking Modal */}
            <BookingModal
              isOpen={isBookingModalOpen}
              onClose={() => setIsBookingModalOpen(false)}
              tutor={tutor}
            />

            {/* Additional Info */}
            <Card className="overflow-hidden rounded-3xl border border-white/10 bg-white/80 backdrop-blur-xl shadow-xl">
              <CardHeader className="border-b border-slate-100 pb-5">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00ADB5]/10">
                    <User className="h-5 w-5 text-[#00ADB5]" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">About Tutor</h3>
                    <p className="text-sm font-normal text-slate-500">
                      Profile information
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-5 p-6">
                <div className="rounded-2xl bg-slate-50 p-4 transition-all hover:bg-[#00ADB5]/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        Member Since
                      </p>

                      <p className="mt-1 text-base font-semibold text-slate-900">
                        {format(new Date(tutor.createdAt), "MMM yyyy")}
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00ADB5]/10">
                      <Calendar className="h-5 w-5 text-[#00ADB5]" />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 transition-all hover:bg-[#00ADB5]/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        Last Updated
                      </p>

                      <p className="mt-1 text-base font-semibold text-slate-900">
                        {format(new Date(tutor.updatedAt), "MMM d, yyyy")}
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00ADB5]/10">
                      <Clock className="h-5 w-5 text-[#00ADB5]" />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#00ADB5]/20 bg-[#00ADB5]/5 p-4">
                  <p className="text-center text-sm leading-6 text-slate-600">
                    This tutor profile is verified and regularly updated to
                    provide accurate information for students.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
