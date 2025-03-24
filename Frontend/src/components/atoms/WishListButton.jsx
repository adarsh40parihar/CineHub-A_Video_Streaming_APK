"use client"

import { api, ENDPOINT } from '@/lib/api_endpoints';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '../ui/button';
import { Check, Loader, PlusIcon } from 'lucide-react';

function WishListButton({wishlist}) {
  const [loading, setLoading] = useState(false);
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const [tick, setTick] = useState(false);

  useEffect(() => {
    if (user && user.wishlist) {
      let found = false;
      for (let i = 0; i < user.wishlist.length; i++) {
        if (user.wishlist[i].id === wishlist.id) {
          setTick(true);
          found = true;
          break;
        }
      }
      if (!found) {
        setTick(false);
      }
    }
  }, [user, wishlist]);
  
    if (!isLoggedIn) return <></>;

    const addToWishlist = async () => {
      // logic to actually add to wishlist
      try {
        setLoading(true);
        const res = await api.post(ENDPOINT.addToWishlist,wishlist);
        if (res.data.status == "success") {
          // alert("Wishlist added successfully");
          setTick(true);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
  
    const deleteFromWishlist = async () => {
        // logic to actually add to wishlist
        try {
          setLoading(true);
          const res = await api.delete(ENDPOINT.deleteFromWishlist, { data: { id: wishlist.id } });
          if (res.data.status == "success") {
            // alert("Wishlist deleted successfully");
            setTick(false);
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      };
  return (
    <div>
      {tick ? (
        <Button
          className={`sm:ml-auto bg-green-500 hover:bg-green-600${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={deleteFromWishlist}
        >
          {loading ? (
            <Loader className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Check className="w-4 h-4 mr-1 text-green-950" />
          )}
          <p className='text-green-900'>Watchlist </p>
        </Button>
      ) : (
        <Button
          className={`sm:ml-auto ${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={addToWishlist}
        >
          {loading ? (
            <Loader className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <PlusIcon className="w-4 h-4 mr-1" />
          )}
          Watchlist
        </Button>
      )}
    </div>
  );
}

export default WishListButton