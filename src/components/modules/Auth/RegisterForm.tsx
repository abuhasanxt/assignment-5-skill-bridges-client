"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { registerAction } from "@/app/(commonRoutes)/(authRoutes)/register/_action";
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
import { IRegisterPayload, registerZodSchema } from "@/zod/register.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Mail, User, UserPlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const RegisterForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IRegisterPayload) => registerAction(payload),
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const result = (await mutateAsync(value)) as any;

        if (!result.success) {
          setServerError(result.message || "Registration failed");
          return;
        }
      } catch (error: any) {
        console.log(`Registration failed: ${error.message}`);
        setServerError(`Registration failed: ${error.message}`);
      }
    },
  });

  return (
    <Card className="w-full max-w-md overflow-hidden rounded-3xl border-0 bg-white shadow-2xl">
      {/* Header */}
      <CardHeader className="space-y-3 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-8 py-10 text-center text-white shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur">
          <UserPlus className="h-8 w-8" />
        </div>

        <CardTitle className="text-3xl font-bold">Create Account</CardTitle>

        <CardDescription className="text-white/90">
          Join SkillBridge and start learning with expert tutors.
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
          {/* Name */}
          <form.Field
            name="name"
            validators={{ onChange: registerZodSchema.shape.name }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                append={<User className="mr-3 h-5 w-5 text-muted-foreground" />}
              />
            )}
          </form.Field>

          {/* Email */}
          <form.Field
            name="email"
            validators={{ onChange: registerZodSchema.shape.email }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                append={<Mail className="mr-3 h-5 w-5 text-muted-foreground" />}
              />
            )}
          </form.Field>

          {/* Password */}
          <form.Field
            name="password"
            validators={{ onChange: registerZodSchema.shape.password }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                append={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword((value) => !value)}
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
                pendingLabel="Creating Account..."
                disabled={!canSubmit}
                className="h-12 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-base font-semibold transition hover:scale-[1.02] hover:shadow-lg"
              >
                Create Account
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center border-t bg-slate-50 px-8 py-6">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-indigo-600 transition hover:underline"
          >
            Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
