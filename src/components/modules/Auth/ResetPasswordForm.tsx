"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { resetPasswordAction } from "@/app/(commonRoutes)/(authRoutes)/reset-password/_action";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import {
  IResetPasswordPayload,
  resetPasswordBaseSchema,
} from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface ResetPasswordFormProps {
  email: string;
}

const ResetPasswordForm = ({ email }: ResetPasswordFormProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const form = useForm({
    defaultValues: {
      email: email,
      otp: "",
      newPassword: "",
      confirmPassword: "",
    } as IResetPasswordPayload,

    onSubmit: async ({ value }) => {
      setServerError(null);
      setIsPending(true);

      const result = (await resetPasswordAction(value)) as any;

      setIsPending(false);

      if (!result.success) {
        setServerError(result.message || "Failed to reset password");
      } else {
        toast.success("Password reset successfully. Please login.");
      }
    },
  });

  return (
    <Card className="w-full max-w-md overflow-hidden rounded-3xl border-0 bg-white shadow-2xl">
      {/* Header */}
      <CardHeader className="space-y-3 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-8 py-10 text-center text-white shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur">
          <LockKeyhole className="h-8 w-8" />
        </div>

        <CardTitle className="text-3xl font-bold">Reset Password</CardTitle>

        <CardDescription className="text-white/90">
          Enter the verification code and create a new secure password.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-8 py-8">
        <form
          method="POST"
          action="#"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              disabled
              readOnly
              className="h-12 rounded-xl bg-slate-100"
            />
          </div>

          {/* OTP */}
          <form.Field
            name="otp"
            validators={{ onChange: resetPasswordBaseSchema.shape.otp }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="otp">Reset Code</Label>

                <div className="flex justify-center py-2">
                  <InputOTP
                    id="otp"
                    maxLength={6}
                    value={field.state.value}
                    onChange={(value) => field.handleChange(value)}
                    onBlur={field.handleBlur}
                    disabled={isPending}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                {field.state.meta.errors.length > 0 && (
                  <p className="text-center text-sm text-destructive">
                    {field.state.meta.errors[0]?.message || "Invalid code"}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* New Password */}
          <form.Field
            name="newPassword"
            validators={{
              onChange: resetPasswordBaseSchema.shape.newPassword,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="New Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                append={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword((v) => !v)}
                    className="mr-2 rounded-full"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </Button>
                }
              />
            )}
          </form.Field>

          {/* Confirm Password */}
          {/* <form.Field
        name="confirmPassword"
        validators={{
          onChange: resetPasswordBaseSchema.shape.confirmPassword,
        }}
      >
        {(field) => (
          <AppField
            field={field}
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm new password"
          />
        )}
      </form.Field> */}
          <form.Field
            name="confirmPassword"
            validators={{
              onChange: resetPasswordBaseSchema.shape.confirmPassword,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                append={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowConfirmPassword((value) => !value)}
                    className="mr-2 rounded-full"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </Button>
                }
              />
            )}
          </form.Field>
          {serverError && (
            <Alert variant="destructive">
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          <form.Subscribe
            selector={(s) => [s.canSubmit, s.isSubmitting] as const}
          >
            {([canSubmit, isSubmitting]) => (
              <AppSubmitButton
                isPending={isSubmitting || isPending}
                pendingLabel="Resetting Password..."
                disabled={!canSubmit}
                className="h-12 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-base font-semibold transition hover:scale-[1.02] hover:shadow-lg"
              >
                Reset Password
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center border-t bg-slate-50 px-8 py-6">
        <p className="text-sm text-muted-foreground">
          Suddenly remembered?{" "}
          <Link
            href="/login"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default ResetPasswordForm;
