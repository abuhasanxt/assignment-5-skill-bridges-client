import { getCurrentTutor } from "@/services/tutor.service";
import { getUserInfo } from "@/services/auth.service";
import { redirect } from "next/navigation";
import { UserRole } from "@/lib/authUtils";
import { ProfileManagementClient } from "../../../../components/modules/dashboard/tutor/profile-management/ProfileManagementClient";
import { UserCog } from "lucide-react";


/**
 * Tutor Profile Management Page
 *
 * Server component that fetches current tutor data and renders the client form.
 * Features:  
 * - Profile information editing (name, email, contact, photo)
 * - Professional information editing (designation, education, experience)
 * - Availability management (days, start time, end time)
 * - Grid layout with cards spreading across the screen
 */
const ProfileManagementPage = async () => {
  // Verify user is authenticated and is a tutor
  const user = await getUserInfo();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== UserRole.TUTOR) {
    redirect("/dashboard");
  }

  // Fetch current tutor data
  const tutorResponse = await getCurrentTutor();

  if (!tutorResponse.success || !tutorResponse.data) {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
          <p>Error loading tutor data: {tutorResponse.message}</p>
        </div>
      </div>
    );
  }

  const tutor = tutorResponse.data;

  return (
   <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
  {/* Header */}
  <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-8 text-white shadow-xl">
    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
          <UserCog className="h-8 w-8" />
        </div>

        <div>
          <h1 className="text-3xl font-bold">
            Profile Management
          </h1>

          <p className="mt-1 text-white/90">
            Update your profile information and manage your teaching availability.
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Client Component */}
  <ProfileManagementClient tutor={tutor} />
</div>
  );
};

export default ProfileManagementPage;