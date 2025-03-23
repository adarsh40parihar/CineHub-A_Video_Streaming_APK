"use client"

import { api, ENDPOINT } from '@/lib/api_endpoints';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '../ui/button';
import { Loader, PlusIcon } from 'lucide-react';

function WishListButton({wishlist}) {
    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = useSelector((state) => state.user);
    if (!isLoggedIn) return <></>;

    const addToWishlist = async () => {
        // logic to actually add to wishlist
        try {
            const res = await api.post(ENDPOINT.addToWishlist(wishlist));
            if (res.status == "success") {
                alert("Wishlist added successfully");
            }
            
        } catch (err) { console.log(err)}
    }
  return (
    <div>
      <Button onClick={addToWishlist}>
        {loading ? <Loader/> : <PlusIcon />}
        Add to Watchlist
      </Button>
    </div>
  );
}

export default WishListButton