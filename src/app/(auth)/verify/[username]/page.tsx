"use client";

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
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { verifySchema } from "@/schemas/verifySchema";
import { ShieldCheck, KeyRound, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";

export default function VerifyAccount() {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>(`/api/verify-code`, {
        username: params.username,
        code: data.code,
      });

      toast.success("Account Verified!", {
        description: response.data.message,
      });

      router.replace("/sign-in");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Verification Failed", {
        description:
          axiosError.response?.data.message ??
          "An error occurred. Please try again.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Gradient orbs for glass effect depth */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-gray-200 to-gray-100 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-gray-300 to-gray-200 rounded-full blur-3xl opacity-60"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Brand Section with Glass Effect */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-black/10 blur-2xl"></div>
              <div className="relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl p-4 shadow-2xl">
                <ShieldCheck className="w-8 h-8 text-black" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-black mb-3 tracking-tight">
            Verify Your Account
          </h1>
          <p className="text-gray-500 text-sm font-medium font-sans">
            Check your email for the verification code
          </p>
        </div>

        {/* Main Form Card with Glass Effect */}
        <div className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-2xl overflow-hidden">
          {/* Card header with glass effect */}
          <div className="bg-white/30 backdrop-blur-xl p-6 border-b border-white/40">
            <h2 className="text-2xl font-semibold text-black">
              Enter Verification Code
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              We sent a code to your email address
            </p>
          </div>

          <div className="p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Verification Code Field */}
                <FormField
                  name="code"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 text-sm font-medium">
                        Verification Code
                      </FormLabel>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-white/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
                        <div className="relative">
                          <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors group-hover:text-gray-600" />
                          <Input
                            {...field}
                            placeholder="Enter 6-digit code"
                            className="pl-12 pr-4 h-14 bg-white/50 backdrop-blur-sm border-white/60 text-black placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 rounded-xl transition-all shadow-sm text-center text-lg tracking-widest font-mono"
                            maxLength={6}
                          />
                        </div>
                      </div>
                      <p className="text-gray-500 text-xs mt-2">
                        The code expires in 15 minutes
                      </p>
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
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>Verify Account</span>
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
                  Did Not Receive Code?
                </span>
              </div>
            </div>

            {/* Resend Link */}
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-full h-14 bg-white/50 backdrop-blur-sm border-2 border-gray-300 hover:border-black text-black font-medium rounded-xl transition-all duration-300 hover:shadow-lg group"
              onClick={() => {
                toast.info("Resend functionality", {
                  description: "Please implement resend code API",
                });
              }}
            >
              <span>Resend verification code</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 space-y-3">
          <p className="text-xs text-gray-500">
            Having trouble? Contact support@truly.com
          </p>
          <p className="text-xs text-gray-600">
            Verified as{" "}
            <span className="font-semibold text-black">@{params.username}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
