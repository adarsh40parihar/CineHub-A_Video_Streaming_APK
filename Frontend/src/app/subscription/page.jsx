"use client";
import ShowToast, { ToastStatus } from "@/components/atoms/ShowToast";
import SpecialOfferCard from "@/components/atoms/SpecialCardOffer";
import { api, ENDPOINT } from "@/lib/api_endpoints";
import { ArrowLeft, LucideLoader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRazorpay } from "react-razorpay";
import UserSlice from "@/components/Redux/Slice/UserSlice";
const actions = UserSlice.actions;

const offers = [
  {
    title: "Premium Monthly",
    features: [
      "Ad-Free (except sports & live)",
      "Includes all Premium content",
      "Any 1 device at a time (up to Asli 4K quality)",
      "Download and watch anytime",
    ],
    price: "29",
    originalPrice: "59",
    discountLabel: "51% OFF",
    duration: "1 Month",
  },
  {
    title: "Family",
    features: [
      "Enjoy all Premium plan benefits on up to 4 devices",
      "Create up to 4 unique viewer profiles",
      "Download content on multiple devices",
    ],
    price: "89",
    originalPrice: "149",
    discountLabel: "40% OFF",
    duration: "1 Month",
  },
];
function Subscription() {
  const [activePrice, setActivePrice] = useState("");
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const { Razorpay } = useRazorpay();
  const [loading, setLoading] = useState(false);

  // Y->if user plan is selected ->  X -> ask to select the plan
  // Y-> if user logged in  ->   X -> send to login page
  // Y-> open the portal
  // Y-> if payed -> upgrade to premium -> don't upgrade
  const handlePaymentClick = async () => {
    if (!isLoggedIn) {
      router.push("/login");
      return; 
    }
     if (!activePrice) {
       ShowToast(ToastStatus.Warning, "Please select a plan first");
       return;
     }
    try {
      setLoading(true);
      //Create order
      const res = await api.post(
        `${ENDPOINT.payment(activePrice === "29" ? "single" : "family")}`
      );

      const options = {
        key: process.env.NEXT_PUBLIC_KEY_ID ?? "",
        amount: res.data.amount,
        currency: "INR",
        name: "Jio PVT LTD.",
        description: `${
          activePrice === "29" ? "Premium Monthly" : "Family"
        } Plan Subscription`,
        order_id: res.data.orderId,
        handler: async function (response) {
          try {
            //  Update premium status in backend
            const updatePremium = await api.patch(ENDPOINT.updatePremium, {
              email: user?.email,
              premiumType: activePrice === "29" ? "single" : "family",
            });
            if (updatePremium.status === 200) {
              // Update premium status in frontend
              dispatch(
                actions.updateUserPremium({
                  isPremium: true,
                  premiumType: activePrice === "29" ? "single" : "family",
                })
              );
              ShowToast(
                ToastStatus.Success,
                "Payment successful! Premium access activated"
              );
              router.push("/");
            }
          } catch (err) {
            ShowToast(ToastStatus.Failure, err.message);
          }
        },
      };
      
      // razorpay -> portal
      const rzrp1 = new Razorpay(options);
      rzrp1.on("payment.failed", function (response) {
        ShowToast(
          ToastStatus.Failure,
          response.error?.reason || "Payment failed"
      );
      });
      // gateway open
      rzrp1.open();
      
    } catch (err) {
      ShowToast(ToastStatus.Failure, err.response?.data?.message || "Failed to initiate payment");
    }
    setLoading(false);
  };
  return (
    <div className="h-full min-h-screen w-full">
      <Image
        src="/motu-patlu.png"
        alt="Background Image"
        fill={true}
        quality={100}
        className="-z-50 hidden md:block object-fit"
      />

      <div className="mx-auto p-4 md:pt-8 pt-4">
        <div className="flex items-center justify-between ">
          <Link
            href="/"
            className="hover:bg-gray-600 font-bold py-2 px-3 rounded-lg"
          >
            <ArrowLeft />
          </Link>
        </div>

        <Image
          src="/motu-patlu.png"
          alt="Background Image"
          className="w-full md:hidden rounded-lg mb-4 h-[100px] object-fit"
          width={354}
          height={60}
        />

        <div className="md:mx-16">
          <h1 className="md:text-4xl text-2xl leading-none font-black mb-4 text-nowrap">
            JioCinema Premium
          </h1>
          <p className="text-lg mb-8 w-[70%] text-wrap hidden md:block">
            Entertainment Redefined - The best of Hollywood, Before TV
            premieres, Blockbuster movies, Exclusive series, India's biggest
            Kids & Family hub + 365 days of reality!
          </p>
          <div className="flex flex-col md:flex-row w-full md:gap-8 gap-2">
            {offers.map((offer, index) => (
              <SpecialOfferCard
                key={index}
                title={offer.title}
                features={offer.features}
                price={offer.price}
                originalPrice={offer.originalPrice}
                discountLabel={offer.discountLabel}
                duration={offer.duration}
                isActive={activePrice === offer.price}
                onClick={() => setActivePrice(offer.price)}
              />
            ))}
          </div>
          {activePrice ? (
            <button
              className="bg-pink-600 hover:bg-pink-800 p-3 md:mt-10 flex items-center justify-center font-medium rounded-lg ml-2"
              onClick={handlePaymentClick}
            >
              Continue & Pay
              {loading && (
                <LucideLoader2 className="animate-spin ml-1 w-4 h-4" />
              )}
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Subscription;
