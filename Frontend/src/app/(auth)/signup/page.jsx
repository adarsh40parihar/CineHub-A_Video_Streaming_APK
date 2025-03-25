"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { api, ENDPOINT } from "@/lib/api_endpoints";
import { LucideLoader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import UserSlice from "@/components/Redux/Slice/UserSlice";
import { toast } from "sonner";
const actions = UserSlice.actions;

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
          if (!name || !email || !password || !confirmPassword) {
            toast("Please fill the fields");
            return;
          }
          if (password !== confirmPassword) {
             toast("Password & Confirm Password are not same");
             return;
           }
          
          setLoading(true);
          const res = await api.post(ENDPOINT.signup, {
            email: email,
            password: password,
            name: name,
            confirmPassword: confirmPassword
          });
          if (res.data.status === "Created") {
            // i am logged in
            // do whatever you want
            dispatch(actions.userLoggedInDetails(res.data.user));
            router.push("/");
            toast("login successfull");
          }
        } catch (err) {
          toast(err?.response?.data?.message);
        } finally {
            setLoading(false);
        }
      };
  
  return (
    <div className="h-screen pb-[100px] flex items-center justify-center">
      <Card className=" w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
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
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button onClick={onSubmit} className="w-full">
              Create an account
              {loading && (
                <LucideLoader2 className="animate-spin w-4 h-4" />
              )}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline hover:text-[#E11D48]">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;
