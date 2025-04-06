"use client";
import React from "react";

import { Share2Icon } from "lucide-react";
import { Button } from "../ui/button";
import ShowToast from "@/components/atoms/ShowToast";
import { ToastStatus } from "@/components/atoms/ShowToast";

const ShareButton = () => {
    const handleShare = () => {
        // url
        const url = window.location.href;
        // clipboard -> api browser -> promise 
        navigator.clipboard
            .writeText(url)
            .then(() => {
                ShowToast(ToastStatus.Success, "URL copied to the clipboard");
            })
            .catch((err) => {
                ShowToast(ToastStatus.Failure, err.message || "Failed to copy URL");
            });
    };
    return (
      <Button data-testid="shareButton" onClick={handleShare}>
        <Share2Icon className="w-4 h-4 mr-2" />
        Share
      </Button>
      
    );
};

export default ShareButton;