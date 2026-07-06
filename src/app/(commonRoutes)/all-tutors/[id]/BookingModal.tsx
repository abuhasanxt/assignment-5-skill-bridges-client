"use client";

import { useState, useMemo } from "react";
import { format, addMinutes, parseISO } from "date-fns";
import {
  CalendarIcon,
  CreditCard,
  Loader2,
  CheckCircle,
  CalendarCheck,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ITutorWithRelations } from "@/types/tutor.types";
import { createBooking } from "@/services/booking.service";
import { toast } from "sonner";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutor: ITutorWithRelations;
}

interface BookingResult {
  booking: {
    id: string;
    startDateTime: string;
    endDateTime: string;
    price: number;
    duration: number;
    status: string;
  };
  payment: {
    id: string;
    amount: number;
    status: string;
  };
  paymentUrl: string;
}

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

const durations = [30, 60, 90, 120];

export function BookingModal({ isOpen, onClose, tutor }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [duration, setDuration] = useState<number>(60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<BookingResult | null>(
    null,
  );

  // Calculate price
  const calculatedPrice = useMemo(() => {
    return (tutor.hourlyRate * duration) / 60;
  }, [tutor.hourlyRate, duration]);

  // Get tutor's available days
  const availableDays = useMemo(() => {
    const dayMap: Record<string, number> = {
      SUNDAY: 0,
      MONDAY: 1,
      TUESDAY: 2,
      WEDNESDAY: 3,
      THURSDAY: 4,
      FRIDAY: 5,
      SATURDAY: 6,
    };
    return tutor.availableDays?.map((day) => dayMap[day]) || [1, 2, 3, 4, 5];
  }, [tutor.availableDays]);

  // Filter time slots based on tutor availability
  const availableTimeSlots = useMemo(() => {
    if (!tutor.availabilityStartTime || !tutor.availabilityEndTime)
      return timeSlots;

    // Parse HH:mm format strings directly
    const [startHour] = tutor.availabilityStartTime.split(":").map(Number);
    const [endHour] = tutor.availabilityEndTime.split(":").map(Number);

    return timeSlots.filter((time) => {
      const hour = parseInt(time.split(":")[0]);
      return hour >= startHour && hour < endHour;
    });
  }, [tutor.availabilityStartTime, tutor.availabilityEndTime]);

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and time");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create start and end datetime for booking
      // Booking times are stored as ISO datetime strings
      const [hours, minutes] = selectedTime.split(":").map(Number);
      const startDateTime = new Date(
        Date.UTC(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          hours,
          minutes,
        ),
      );
      const endDateTime = addMinutes(startDateTime, duration);

      const payload = {
        startDateTime: startDateTime.toISOString(),
        endDateTime: endDateTime.toISOString(),
      };

      const result = await createBooking(tutor.id, payload);

      if (result.success && result.data) {
        setBookingResult(result.data as BookingResult);
        toast.success("Booking created successfully!");
      } else {
        toast.error(result.message || "Failed to create booking");
      }
    } catch (error) {
      toast.error("An error occurred while creating the booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayNow = () => {
    if (bookingResult?.paymentUrl) {
      window.location.href = bookingResult.paymentUrl;
    }
  };

  const handlePayLater = () => {
    setBookingResult(null);
    setSelectedDate(undefined);
    setSelectedTime(undefined);
    setDuration(60);
    onClose();
    toast.success("You can pay later from your bookings page");
  };

  const handleClose = () => {
    setBookingResult(null);
    setSelectedDate(undefined);
    setSelectedTime(undefined);
    setDuration(60);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {!bookingResult ? (
          <>
            <DialogHeader className="rounded-t-3xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 px-8 py-7 text-white">
              <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
                <CalendarCheck className="h-6 w-6" />
                Book a Session
              </DialogTitle>

              <DialogDescription className="text-white/90">
                Schedule a session with{" "}
                <span className="font-semibold">{tutor.name}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-7 px-8 py-7">
              {/* Tutor Info Summary */}
              <div className="flex items-center justify-between rounded-2xl border bg-slate-50 p-5">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">{tutor.name}</h3>

                  <p className="text-sm text-muted-foreground">
                    {tutor.designation}
                  </p>
                </div>

                <div className="rounded-xl bg-cyan-100 px-4 py-2">
                  <p className="text-lg font-bold text-cyan-700">
                    ${tutor.hourlyRate}
                  </p>

                  <p className="text-xs text-cyan-600">per hour</p>
                </div>
              </div>

              {/* Date Selection */}
              <div className="space-y-2">
                <Label>Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-12 w-full justify-start rounded-xl border text-left",
                        !selectedDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate
                        ? format(selectedDate, "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => {
                        // Disable past dates and days not in availableDays
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        if (date < today) return true;
                        if (!availableDays.includes(date.getDay())) return true;
                        return false;
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-xs text-muted-foreground">
                  Available days: {tutor.availableDays?.join(", ")}
                </p>
              </div>

              {/* Time Selection */}
              <div className="space-y-2">
                <Label>Select Time</Label>
                <div className="grid grid-cols-4 gap-2">
                  {availableTimeSlots.map((time) => (
                    <Button
                      key={time}
                      type="button"
                      variant={selectedTime === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTime(time)}
                      className={cn(
                        "rounded-xl transition-all",
                        selectedTime === time &&
                          "bg-cyan-600 text-white hover:bg-cyan-700",
                      )}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Duration Selection */}
              <div className="space-y-2">
                <Label>Duration</Label>
                <div className="flex gap-2">
                  {durations.map((d) => (
                    <Button
                      key={d}
                      type="button"
                      variant={duration === d ? "default" : "outline"}
                      size="sm"
                      onClick={() => setDuration(d)}
                      className={cn(
                        "rounded-xl",
                        duration === d &&
                          "bg-cyan-600 text-white hover:bg-cyan-700",
                      )}
                    >
                      {d} min
                    </Button>
                  ))}
                </div>
              </div>

              {/* Price Summary */}
              <div className="rounded-2xl border bg-slate-50 p-5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Session</span>

                  <span>{duration} min</span>
                </div>

                <div className="mt-3 flex justify-between">
                  <span className="text-muted-foreground">Hourly Rate</span>

                  <span>${tutor.hourlyRate}</span>
                </div>

                <div className="mt-4 flex justify-between border-t pt-4">
                  <span className="text-lg font-semibold">Total</span>

                  <span className="text-2xl font-bold text-cyan-600">
                    ${calculatedPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                className="rounded-xl"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!selectedDate || !selectedTime || isSubmitting}
                className="rounded-xl bg-cyan-600 hover:bg-cyan-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Booking...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Book Session
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Booking Confirmed!
              </DialogTitle>
              <DialogDescription>
                Your session has been scheduled successfully
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">
                    Booking ID
                  </span>
                  <span className="text-sm font-mono">
                    {bookingResult.booking.id.slice(0, 8)}...
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">
                    Date & Time
                  </span>
                  <span className="text-sm font-medium">
                    {format(
                      parseISO(bookingResult.booking.startDateTime),
                      "MMM d, yyyy h:mm a",
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">
                    Duration
                  </span>
                  <span className="text-sm">
                    {bookingResult.booking.duration} minutes
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-green-200">
                  <span className="font-medium">Amount Due</span>
                  <span className="text-lg font-bold text-[#00ADB5]">
                    ${bookingResult.payment.amount.toFixed(2)}
                  </span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground text-center">
                Choose how you&apos;d like to proceed with payment
              </p>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={handlePayLater}
                className="w-full sm:w-auto"
              >
                Pay Later
              </Button>
              <Button
                onClick={handlePayNow}
                className="w-full sm:w-auto bg-[#00ADB5] hover:bg-[#008f96]"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Pay Now
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
