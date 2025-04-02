"use client"

import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from "react-redux";
import UserSlice from "@/components/Redux/Slice/UserSlice";
import { api, ENDPOINT } from "@/lib/api_endpoints";
const actions = UserSlice.actions;

function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const {isLoggedIn} = useSelector((state) => state.user)
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    const fetcher = async () => {
      try {
        const res = await api.get(ENDPOINT.user);
        if (res.data.status === "success") {
          dispatch(actions.userLoggedInDetails(res.data.user));
        }
      } catch (err) {
        console.log("User needs to Login");
      } finally {
        setLoading(false);
      }
    };
    fetcher();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="animate-spin md:h-[50px] md:w-[50px] h-[35px] w-[35px] text-gray-300" />
      </div>
    );
  }
  return (
    <>
      {children}
    </>

  );
}

export default AuthProvider