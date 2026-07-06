// "use client";
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { loginAction } from "@/app/(commonRoutes)/(authRoutes)/login/_action";
// import AppField from "@/components/shared/form/AppField";
// import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";
// import { useForm } from "@tanstack/react-form";
// import { Eye, EyeOff } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";

// interface LoginFormProps {
//   redirectPath?: string;
// }

// const LoginForm = ({ redirectPath }: LoginFormProps) => {
//   // const queryClient = useQueryClient();

//   const [serverError, setServerError] = useState<string | null>(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [isPending, setIsPending] = useState(false);

//   const form = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//     },

//     onSubmit: async ({ value }) => {
//       setServerError(null);
//       setIsPending(true);

//       const result = (await loginAction(value, redirectPath)) as any;

//       setIsPending(false);

//       if (!result.success) {
//         setServerError(result.message || "Login failed");
//       }
//       // On success, redirect is handled by server action - no code needed here
//     },
//   });
//   return (
//     <Card className="w-full max-w-md mx-auto shadow-md">
//       <CardHeader className="text-center">
//         <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
//         <CardDescription>
//           Please enter your credentials to log in.
//         </CardDescription>
//       </CardHeader>

//       <CardContent>
//         <form
//           method="POST"
//           action="#"
//           noValidate
//           onSubmit={(e) => {
//             e.preventDefault();
//             e.stopPropagation();
//             form.handleSubmit();
//           }}
//           className="space-y-4"
//         >
//           <form.Field
//             name="email"
//             validators={{ onChange: loginZodSchema.shape.email }}
//           >
//             {(field) => (
//               <AppField
//                 field={field}
//                 label="Email"
//                 type="email"
//                 placeholder="Enter your email"
//               />
//             )}
//           </form.Field>

//           <form.Field
//             name="password"
//             validators={{ onChange: loginZodSchema.shape.password }}
//           >
//             {(field) => (
//               <AppField
//                 field={field}
//                 label="Password"
//                 type={showPassword ? "text" : "password"}
//                 // type="text"
//                 placeholder="Enter your password"
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//                 className="cursor-pointer"
//                 append={
//                   <Button
//                     type="button"
//                     onClick={() => setShowPassword((value) => !value)}
//                     variant="ghost"
//                     size="icon"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="size-4" aria-hidden="true" />
//                     ) : (
//                       <Eye className="size-4" aria-hidden="true" />
//                     )}
//                   </Button>
//                 }
//               />
//             )}
//           </form.Field>

//           <div className="text-right mt-2">
//             <Link
//               href="/forgot-password"
//               className="text-sm text-primary hover:underline underline-offset-4"
//             >
//               Forgot password?
//             </Link>
//           </div>

//           {serverError && (
//             <Alert variant={"destructive"}>
//               <AlertDescription>{serverError}</AlertDescription>
//             </Alert>
//           )}

//           <form.Subscribe
//             selector={(s) => [s.canSubmit, s.isSubmitting] as const}
//           >
//             {([canSubmit, isSubmitting]) => (
//               <AppSubmitButton
//                 isPending={isSubmitting || isPending}
//                 pendingLabel="Logging In...."
//                 disabled={!canSubmit}
//               >
//                 Log In
//               </AppSubmitButton>
//             )}
//           </form.Subscribe>
//         </form>
//       </CardContent>

//       <CardFooter className="justify-center border-t pt-4">
//         <p className="text-sm text-muted-foreground">
//           Don&apos;t have an account?{" "}
//           <Link
//             href="/register"
//             className="text-primary font-medium hover:underline underline-offset-4"
//           >
//             Sign Up for an account
//           </Link>
//         </p>
//       </CardFooter>
//     </Card>
//   );
// };

// export default LoginForm;



"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginAction } from "@/app/(commonRoutes)/(authRoutes)/login/_action";
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
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface LoginFormProps {
  redirectPath?: string;
}

const LoginForm = ({ redirectPath }: LoginFormProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    onSubmit: async ({ value }) => {
      setServerError(null);
      setIsPending(true);

      const result = (await loginAction(value, redirectPath)) as any;

      setIsPending(false);

      if (!result.success) {
        setServerError(result.message || "Login failed");
      }
    },
  });

  return (
    <Card className="w-full max-w-md overflow-hidden rounded-3xl border-0 bg-white shadow-2xl">
      {/* Header */}
      <CardHeader className="space-y-3 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-8 py-10 text-center text-white">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur">
          <Lock className="h-8 w-8" />
        </div>

        <CardTitle className="text-3xl font-bold">
          Welcome Back
        </CardTitle>

        <CardDescription className="text-white/90">
          Sign in to continue to your account.
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
          <form.Field
            name="email"
            validators={{ onChange: loginZodSchema.shape.email }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                append={
                  <Mail className="mr-3 h-5 w-5 text-muted-foreground" />
                }
              />
            )}
          </form.Field>

          {/* Password */}
          <form.Field
            name="password"
            validators={{ onChange: loginZodSchema.shape.password }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                append={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setShowPassword((value) => !value)
                    }
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

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-indigo-600 transition hover:text-indigo-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Error */}
          {serverError && (
            <Alert variant="destructive">
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          {/* Submit */}
          <form.Subscribe
            selector={(s) => [s.canSubmit, s.isSubmitting] as const}
          >
            {([canSubmit, isSubmitting]) => (
              <AppSubmitButton
                isPending={isSubmitting || isPending}
                pendingLabel="Logging In..."
                disabled={!canSubmit}
                className="h-12 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-base font-semibold transition hover:scale-[1.02] hover:shadow-lg"
              >
                Log In
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center border-t bg-slate-50 px-8 py-6">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-indigo-600 transition hover:underline"
          >
            Create Account
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;