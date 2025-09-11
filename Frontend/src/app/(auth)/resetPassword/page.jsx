"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogOverlay } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { api, ENDPOINT } from "@/lib/api_endpoints";
import { Loader2, LucideLoader2} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import UserSlice from "@/components/Redux/Slice/UserSlice";
import { useRouter } from "next/navigation";
import ShowToast from "@/components/atoms/ShowToast";
import { ToastStatus } from "@/components/atoms/ShowToast";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

const actions = UserSlice.actions;

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  // reponsible for oepning the dialog
  const [showDialog, setShowDialog] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const { user, isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      setEmail(user.email);
    }
  }, [isLoggedIn, user]);

  const handleForgetPassword = async () => {
    try {
      setLoading(true);
      const res = await api.patch(ENDPOINT.forgetpassword, { email: email });
      if (res.data.status === "success") {
        ShowToast(ToastStatus.Success, res.data.message);
        setShowDialog(true);
      }
    } catch (err) {
      ShowToast(ToastStatus.Failure, err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    if (
      newPassword.length === 0 ||
      confirmNewPassword.length === 0 ||
      otp.length == 0
    ) {
      ShowToast(ToastStatus.Warning, "Please fill all fields");
      setLoading(false);
      return;
    }
    if (newPassword !== confirmNewPassword) {
      ShowToast(
        ToastStatus.Warning,
        "New password and Confirm password do not match"
      );
      setLoading(false);
      return;
    }

    try {
      const res = await api.patch(ENDPOINT.resetPassword, {
        email,
        password: newPassword,
        confirmPassword: confirmNewPassword,
        otp,
      });

      if (res.data.status === "success") {
        ShowToast(ToastStatus.Success, "Password reset successfully!");
        setShowDialog(false);
        try {
          setLoading2(true);
          await api.get(ENDPOINT.logout);
          dispatch(actions.userLoggedOutDetails());
          setLoading2(false);
        } catch (err) {
          ShowToast(ToastStatus.Failure, err?.response?.data?.message);
        }
        router.push("/login");
      } else {
        ShowToast(ToastStatus.Failure, "Failed to reset password. Try Again");
      }
    } catch (err) {
      ShowToast(ToastStatus.Failure, err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const dialogVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
    },
  };
  return (
    <div>
      {loading2 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full h-[90vh] flex justify-center items-center"
        >
          <Loader2 className="animate-spin md:h-[50px] md:w-[50px] h-[35px] w-[35px] text-gray-300" />
        </motion.div>
      ) : (
        <>
          <div className="h-[90vh] flex items-center justify-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <Card className="w-full max-w-sm">
                <motion.div variants={itemVariants}>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      Forgot Password / Reset Password
                    </CardTitle>
                    <CardDescription>
                      Enter your email below to get OTP.
                    </CardDescription>
                  </CardHeader>
                </motion.div>

                <CardContent className="grid gap-2">
                  <motion.div variants={itemVariants} className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Button className="mt-6" onClick={handleForgetPassword}>
                      Send OTP
                      {loading && (
                        <LucideLoader2 className="animate-spin ml-2 w-4 h-4" />
                      )}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <Dialog open={showDialog} onOpenChange={() => setShowDialog(false)}>
            <DialogOverlay>
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dialogVariants}
              >
                <DialogContent className="p-4 bg-black rounded-lg shadow-lg">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                      Reset Password
                    </DialogTitle>
                    <DialogDescription className="mb-2 text-sm text-gray-400 -pt-2">
                      OTP is sent to {email}
                    </DialogDescription>
                  </DialogHeader>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid gap-4"
                  >
                    <motion.div variants={itemVariants}>
                      <Label htmlFor="otp">Enter OTP</Label>
                      <Input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <Label htmlFor="confirmNewPassword">
                        Confirm New Password
                      </Label>
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="flex justify-end mt-4"
                  >
                    <Button type="submit" onClick={handleResetPassword}>
                      Submit
                      {loading && (
                        <LucideLoader2 className="animate-spin ml-2 w-4 h-4" />
                      )}
                    </Button>
                  </motion.div>
                </DialogContent>
              </motion.div>
            </DialogOverlay>
          </Dialog>
        </>
      )}
    </div>
  );
}

export default ResetPassword;
