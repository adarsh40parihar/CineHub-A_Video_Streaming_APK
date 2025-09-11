"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import { Button } from "../ui/button";
import { useState } from "react";
import Link from "next/link";
import { ChevronRightIcon, ExternalLinkIcon, LogInIcon, LogOut } from "lucide-react";
import { navLinks } from "./Header";
import { useDispatch, useSelector } from "react-redux";
import UserSlice from "@/components/Redux/Slice/UserSlice";
import { useRouter } from "next/navigation";
import { api, ENDPOINT } from "@/lib/api_endpoints";
import ShowToast from "@/components/atoms/ShowToast";
import { ToastStatus } from "@/components/atoms/ShowToast";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const actions = UserSlice.actions;


function SheetSide() {
  const [open, setOpen] = useState(false); 
  const { user, isLoggedIn } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const router = useRouter();
  const signOut = async () => {
    try {
      const res = await api.get(ENDPOINT.logout);
      if (res.data.status == "success") { 
        dispatch(actions.userLoggedOutDetails());
        setOpen(false);
        router.push("/");
        ShowToast(ToastStatus.Success, "SignOut successfull");
      }
    } catch (err) {
       ShowToast(ToastStatus.Failure, err?.response?.data?.message);
    }
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        {!isLoggedIn ? (
          <Image
            src="/profile.avif"
            alt="Profile Icon"
            className="ml-4 h-10 w-10 rounded-full"
            width={40}
            height={40}
          />
        ) : (
          <div className="ml-4 h-10 w-10 rounded-full bg-[#0059A3] text-xl font-semibold flex items-center justify-center">
            {user ? user.name[0].toUpperCase() : ""}
          </div>
        )}
      </SheetTrigger>
      <SheetContent
        side={"right"}
        className="px-6 overflow-auto scrollbar-hide"
      >
        <VisuallyHidden>
          <SheetTitle className="text-2xl">Profile</SheetTitle>{" "}
          <SheetDescription>Manage your profile and settings</SheetDescription>
        </VisuallyHidden>
        <div className="bg-slate-700/30 p-6 flex flex-col items-center gap-2 mt-[60px] rounded-lg">
          {!isLoggedIn ? (
            <Image
              src="/profile.avif"
              alt="Profile Icon"
              className="h-[100px] w-[100px] rounded-full -mt-[60px]"
              width={40}
              height={40}
            />
          ) : (
            <div className="h-[100px] w-[100px] -mt-[70px] rounded-full bg-[#0059A3] text-5xl font-semibold flex items-center justify-center">
              {user ? user.name[0].toUpperCase() : ""}
            </div>
          )}

          <p className="text-xl font-bold capitalize mt-2">
            {isLoggedIn ? user.name : "GUEST"}
          </p>
          {isLoggedIn ? (
            <Link
              href={"/resetPassword"}
              className="flex items-center justify-centre pl-4 text-sm text-gray-500 hover:text-gray-300"
              onClick={() => {
                setOpen(false);
              }}
            >
              Reset Password
              <ChevronRightIcon className="w-6 h-6" />
            </Link>
          ) : null}
          <div className="flex gap-2">
            {isLoggedIn ? (
              <Button
                onClick={signOut}
                className="rounded-full font-semibold mt-4 text-base px-4 py-2 bg-pink-600"
              >
                {" "}
                <LogOut className="w-5 h-5" />
                SignOut
              </Button>
            ) : (
              <Link href={"/login"}>
                <Button
                  onClick={() => {
                    setOpen(false);
                  }}
                  className="rounded-full font-semibold mt-4 text-base px-4 py-2 bg-pink-600"
                >
                  {" "}
                  <LogInIcon className="w-5 h-5" />
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
        <div className="divide-y my-4">
          <Link
            href={"/subscription"}
            className="flex items-center justify-between px-2 py-4 text-sm"
            onClick={() => {
              setOpen(false);
            }}
          >
            Subscribe Now
            <ChevronRightIcon className="w-6 h-6" />
          </Link>
          <div>
            {navLinks.map((link) => (
              <Link
                href={link.href}
                key={link.key}
                className="flex items-center justify-between px-2 py-4 text-sm"
                onClick={() => {
                  setOpen(false);
                }}
              >
                {link.name}
                <ExternalLinkIcon className="w-4 h-4" />
              </Link>
            ))}
          </div>
          <Link
            href={"/"}
            className="flex items-center justify-between px-2 py-4 text-sm"
          >
            Help and Legal
            <ChevronRightIcon className="w-6 h-6" />
          </Link>
          <div className="flex justify-center items-center text-sm text-gray-400 py-2">Built with ❤️ by Adarsh Parihar</div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SheetSide;
