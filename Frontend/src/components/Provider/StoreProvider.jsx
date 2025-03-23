"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import makeStore from "../Redux/Store"

export default function StoreProvider({ children }) {
  const storeRef = useRef(); //This ensures that the store is created only once per page load.
  if (!storeRef.current) {
    //If it's already set, it reuses the existing store.
    storeRef.current = makeStore(); //If it's null (i.e., first render), a new store is created using makeStore().
  } 

  return <Provider store={storeRef.current}>{children}</Provider>;
}
