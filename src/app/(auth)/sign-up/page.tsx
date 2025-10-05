"use client";

import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import {
  Loader2,
  Mail,
  Lock,
  ArrowRight,
  User,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ track availability explicitly
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<
    boolean | null
  >(null);

  const debouncedUsername = useDebounce(username, 300);
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (!debouncedUsername.trim()) {
        setUsernameMessage("");
        setIsUsernameAvailable(null);
        return;
      }

      setIsCheckingUsername(true);
      setUsernameMessage("");
      try {
        const response = await axios.get<ApiResponse>(
          `/api/check-username-unique?username=${debouncedUsername}`
        );

        setUsernameMessage(response.data.message);

        if (response.data.message === "Username is available") {
          setIsUsernameAvailable(true);
        } else {
          setIsUsernameAvailable(false);
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        setUsernameMessage(
          axiosError.response?.data.message ?? "Error checking username"
        );
        setIsUsernameAvailable(false);
      } finally {
        setIsCheckingUsername(false);
      }
    };
    checkUsernameUnique();
  }, [debouncedUsername]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", data);

      toast.success("Account created!", {
        description: response.data.message,
      });

      router.replace(`/verify/${username}`);
    } catch (error) {
      console.error("Error during sign-up:", error);

      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage =
        axiosError.response?.data.message ??
        "There was a problem with your sign-up. Please try again.";

      toast.error("Sign Up Failed", {
        description: errorMessage,
      });

      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-gray-200 to-gray-100 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-gray-300 to-gray-200 rounded-full blur-3xl opacity-60"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-black mb-3 tracking-tight">
            Truly
          </h1>
          <p className="text-gray-500 text-sm font-medium font-sans">
            Your Safe Space For Honest Feedbacks
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-white/30 backdrop-blur-xl p-6 border-b border-white/40">
            <h2 className="text-2xl font-semibold text-black">
              Create Account
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Join us for honest conversations
            </p>
          </div>

          <div className="p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Username Field */}
                <FormField
                  name="username"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 text-sm font-medium">
                        Username
                      </FormLabel>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-white/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors group-hover:text-gray-600" />
                          <Input
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setUsername(e.target.value);
                            }}
                            placeholder="johndoe"
                            className="pl-12 pr-12 h-14 bg-white/50 backdrop-blur-sm border-white/60 text-black placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 rounded-xl transition-all shadow-sm"
                          />
                          {isCheckingUsername && (
                            <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 animate-spin" />
                          )}
                          {!isCheckingUsername && usernameMessage && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                              {isUsernameAvailable ? (
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-500" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      {!isCheckingUsername && usernameMessage && (
                        <p
                          className={`text-xs mt-2 flex items-center gap-1 ${
                            isUsernameAvailable
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {usernameMessage}
                        </p>
                      )}
                      <FormMessage className="text-red-600 text-xs mt-2" />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 text-sm font-medium">
                        Email
                      </FormLabel>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-white/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors group-hover:text-gray-600" />
                          <Input
                            {...field}
                            type="email"
                            placeholder="john@example.com"
                            className="pl-12 pr-4 h-14 bg-white/50 backdrop-blur-sm border-white/60 text-black placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 rounded-xl transition-all shadow-sm"
                          />
                        </div>
                      </div>
                      <p className="text-gray-500 text-xs mt-2">
                        We will send you a verification code
                      </p>
                      <FormMessage className="text-red-600 text-xs mt-2" />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 text-sm font-medium">
                        Password
                      </FormLabel>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-white/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors group-hover:text-gray-600" />
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-12 pr-12 h-14 bg-white/50 backdrop-blur-sm border-white/60 text-black placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 rounded-xl transition-all shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                      <FormMessage className="text-red-600 text-xs mt-2" />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-black hover:bg-gray-900 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-8 group"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Creating account...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>Create Account</span>
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  )}
                </Button>
              </form>
            </Form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-white/40 backdrop-blur-sm text-gray-600">
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Sign In Link */}
            <Link
              href="/sign-in"
              className="flex items-center justify-center gap-2 w-full h-14 bg-white/50 backdrop-blur-sm border-2 border-gray-300 hover:border-black text-black font-medium rounded-xl transition-all duration-300 hover:shadow-lg group"
            >
              <span>Sign in instead</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 space-y-3">
          <p className="text-xs text-gray-500">
            Protected by enterprise-grade encryption
          </p>
          <p className="text-xs text-gray-600">
            By continuing, you agree to our{" "}
            <Link
              href="/terms"
              className="text-gray-700 hover:text-black transition-colors underline underline-offset-2"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-gray-700 hover:text-black transition-colors underline underline-offset-2"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
