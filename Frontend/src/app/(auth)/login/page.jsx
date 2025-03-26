"use client";

import React, { useEffect, useState } from "react";
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
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { api, ENDPOINT } from "@/lib/api_endpoints";
import { LucideLoader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import UserSlice from "@/components/Redux/Slice/UserSlice";
const actions = UserSlice.actions;
import ShowToast from "@/components/atoms/ShowToast";
import { ToastStatus } from "@/components/atoms/ShowToast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const onSubmit = async () => {
    try {
      if (!email || !password) {
        ShowToast(ToastStatus.Warning, "Please fill the fields");
        return;
      }

      setLoading(true);

      const res = await api.post(ENDPOINT.login, {
        email: email,
        password: password,
      });

      if (res.data.status === "success") {
        // i am logged in
        dispatch(actions.userLoggedInDetails(res.data.user));
        router.push("/");
        ShowToast(ToastStatus.Success, "login successfull");
      }
    } catch (err) {
      ShowToast(ToastStatus.Failure, err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen pb-[150px] flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl ">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onSubmit} className="w-full">
            Sign in
            {loading && <LucideLoader2 className="animate-spin w-4 h-4" />}
          </Button>
        </CardFooter>
        <div className="mt-4 text-center text-sm pb-6 flex justify-between px-6">
          <Link href="/resetPassword" className="hover:text-[#E11D48]">
            Forgot Password?
          </Link>
          <div>
            Need an account?{" "}
            <Link href="/signup" className="underline hover:text-[#E11D48]">
              Sign Up
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
