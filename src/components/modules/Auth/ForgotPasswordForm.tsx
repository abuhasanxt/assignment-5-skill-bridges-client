"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { forgotPasswordAction } from "@/app/(commonRoutes)/(authRoutes)/forgot-password/_action";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { forgotPasswordZodSchema, IForgotPasswordPayload } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { Mail, MailQuestion } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const ForgotPasswordForm = () => {
    const [serverError, setServerError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);

    const form = useForm({
        defaultValues: {
            email: "",
        } as IForgotPasswordPayload,

        onSubmit: async ({ value }) => {
            setServerError(null);
            setIsPending(true);
            
            const result = await forgotPasswordAction(value) as any;
            
            setIsPending(false);
            
            if (!result.success) {
                setServerError(result.message || "Failed to send reset code");
            } else {
                toast.success("Reset code sent to your email");
            }
        }
    });

    return (
       <Card className="w-full max-w-md overflow-hidden rounded-3xl border-0 bg-white shadow-2xl">
  {/* Header */}
  <CardHeader className="space-y-3 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-8 py-10 text-center text-white shadow-lg">
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur">
      <MailQuestion className="h-8 w-8" />
    </div>

    <CardTitle className="text-3xl font-bold">
      Forgot Password?
    </CardTitle>

    <CardDescription className="text-white/90">
      Enter your email address and we&apos;ll send you a 6-digit verification code.
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
      <form.Field
        name="email"
        validators={{ onChange: forgotPasswordZodSchema.shape.email }}
      >
        {(field) => (
          <AppField
            field={field}
            label="Email Address"
            type="email"
            placeholder="Enter your registered email"
            append={
              <Mail className="mr-3 h-5 w-5 text-muted-foreground" />
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
            pendingLabel="Sending Code..."
            disabled={!canSubmit}
            className="h-12 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-base font-semibold transition hover:scale-[1.02] hover:shadow-lg"
          >
            Send Reset Code
          </AppSubmitButton>
        )}
      </form.Subscribe>
    </form>
  </CardContent>

  <CardFooter className="flex justify-center border-t bg-slate-50 px-8 py-6">
    <p className="text-sm text-muted-foreground">
      Remembered your password?{" "}
      <Link
        href="/login"
        className="font-semibold text-indigo-600 transition hover:underline"
      >
        Back to Login
      </Link>
    </p>
  </CardFooter>
</Card>
    );
};

export default ForgotPasswordForm;
