"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Clock, DollarSign, GraduationCap, BookOpen, User } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ITutorWithRelations } from "@/types/tutor.types";

interface TutorCardProps {
  tutor: ITutorWithRelations;
}

export function TutorCard({ tutor }: TutorCardProps) {
  const profileImage = tutor.profilePhoto || tutor.User?.image;
  const displayName = tutor.name || tutor.User?.name || "Unknown";
  const categories = tutor.tutorCategory?.map((tc) => tc.Category?.name).filter(Boolean) || [];

  return (
   <Card className="group overflow-hidden rounded-3xl border border-white/10 bg-white/80 backdrop-blur-xl shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-[#00ADB5]/40 hover:shadow-2xl hover:shadow-[#00ADB5]/10">
  <CardHeader className="p-0">
    <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100">
      {profileImage ? (
        <Image
          src={profileImage}
          alt={displayName}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg">
            <User className="h-12 w-12 text-slate-400" />
          </div>
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {tutor.status === "ACTIVE" && (
        <Badge className="absolute right-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-white shadow-lg">
          ● Available
        </Badge>
      )}
    </div>
  </CardHeader>

  <CardContent className="space-y-5 p-6">
    {/* Name */}
    <div>
      <h3 className="line-clamp-1 text-xl font-bold text-slate-900 transition-colors group-hover:text-[#00ADB5]">
        {displayName}
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        {tutor.designation}
      </p>
    </div>

    {/* Categories */}
    <div className="flex flex-wrap gap-2">
      {categories.slice(0, 3).map((category, idx) => (
        <Badge
          key={idx}
          className="rounded-full border border-[#00ADB5]/20 bg-[#00ADB5]/10 px-3 py-1 text-xs font-medium text-[#00ADB5]"
        >
          {category}
        </Badge>
      ))}

      {categories.length > 3 && (
        <Badge
          variant="outline"
          className="rounded-full px-3 py-1 text-xs"
        >
          +{categories.length - 3}
        </Badge>
      )}
    </div>

    {/* Info Grid */}
    <div className="grid grid-cols-2 gap-4 rounded-2xl bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <GraduationCap className="h-4 w-4 text-[#00ADB5]" />
        <span className="line-clamp-1">
          {tutor.educationLevel}
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm text-slate-600">
        <Clock className="h-4 w-4 text-[#00ADB5]" />
        <span>{tutor.experienceYears} years</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-slate-600">
        <DollarSign className="h-4 w-4 text-[#00ADB5]" />
        <span>${tutor.hourlyRate}/hr</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-slate-600">
        <BookOpen className="h-4 w-4 text-[#00ADB5]" />
        <span className="line-clamp-1">
          {tutor.availableDays?.slice(0, 3).join(", ")}
        </span>
      </div>
    </div>

    {/* Rating */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1">
        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
        <span className="font-semibold text-slate-800">
          {tutor.avgRating}
        </span>
      </div>

      <span className="text-sm text-slate-500">
        Top Rated Tutor
      </span>
    </div>

    {/* Button */}
    <Link href={`/all-tutors/${tutor.id}`} className="block">
      <Button className="h-12 w-full rounded-xl bg-[#00ADB5] font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[#00959d]">
        View Profile
      </Button>
    </Link>
  </CardContent>
</Card>
  );
}
