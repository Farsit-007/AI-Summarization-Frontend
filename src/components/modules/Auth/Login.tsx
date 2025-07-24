/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useUser } from "@/context/UserContext";
import { loginSchema } from "./loginSchema";
import { loginUser } from "@/services/AuthServices";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const { setIsLoading } = useUser();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      const res = await loginUser(data);

      if (res.success) {
        toast.success(res?.message);
        router.push(redirect || "/my-article");
        setIsLoading(true);
      } else {
        toast.error(res?.message || "Login failed");
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const demoUser = {
    email: "demo@example.com",
    password: "demopassword123",
  };

  return (
    <div className="max-w-md w-full mx-auto p-8 rounded-2xl shadow-xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold ">Welcome Back</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Sign in to access your account
        </p>
      </div>

      {/* Demo button */}
      <div className="mb-6">
        <Button
          variant="outline"
          className="w-full bg-black text-white"
          onClick={() => {
            form.setValue("email", demoUser.email);
            form.setValue("password", demoUser.password);
            toast.info("Demo credentials filled!");
          }}
        >
          Use Demo Account
        </Button>
      </div>

      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="your@email.com"
                    {...field}
                    value={field.value || ""}
                    className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Password
                  </FormLabel>
                </div>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...field}
                    value={field.value || ""}
                    className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            className="w-full bg-black text-white"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>

          {/* Register Link */}
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don&#39;t have an account?{" "}
            <Link
              href="/register"
              className="text-primary font-medium hover:underline"
            >
              Register
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
