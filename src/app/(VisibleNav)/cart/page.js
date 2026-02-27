"use client";

import LiveMap from "@/components/LiveMap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Cart() {
  const [pizza, setPizza] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showMap, setshowMap] = useState(false)
  const [maptext, setMaptext] = useState("");
  const prices = { base: 150, sauce: 40, cheese: 60, toppings: 30 };
  const [extras, setExtras] = useState({
    oregano: true,
    chilli: true,
  });
  const [total, setTotal] = useState(0)
  const [final, setFinal] = useState(0)
  const DELIVERY_CHARGE = 40;
  const PLATFORM_CHARGE = 10;

  useEffect(() => {
    const saved = localStorage.getItem("pizza");
    if (saved) setPizza(JSON.parse(saved));
  }, []);

  // Price calculation
  useEffect(() => {
    if (!pizza) return;
    console.log(pizza)
    let price = (pizza.Base ? prices.base : 0)
      + (pizza.Sauce ? prices.sauce : 0)
      + (pizza.Cheese ? prices.cheese : 0)
      + (pizza.Toppings ? pizza.Toppings.length * prices.toppings : 0);
    if (extras.oregano) price += 5;
    if (extras.chilli) price += 5;
    setTotal(price);
    setFinal(price * quantity + DELIVERY_CHARGE + PLATFORM_CHARGE);
  }, [pizza, quantity, extras]);

  function clearCart() {
    localStorage.removeItem("pizza");
    setPizza(null);
  }
  const router = useRouter()
  const [toast, setToast] = useState(false);

  function handleCheckOut() {
    if (maptext === '') {
      setToast(true);
      setTimeout(() => setToast(false), 3000);
      return;
    }
    router.push('/success');
  }
  if (!pizza) {
    return (
      <div className="h-dvh text-[8vw] font-black text-zinc-400/20 flex flex-col items-center justify-center gap-2 bg-black">
        <h1>Cart is empty🍕</h1>
        <Link href={'/pizza'} className="py-4 px-24 transition-all duration-300 text-3xl bg-yellow-500 text-black font-nun rounded-full hover:bg-orange-400/90">Order Now</Link>
      </div>
    );
  }
  return (
    <div className="min-h-dvh bg-black overflow-x-clip text-white flex flex-col font-nun">
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-200 bg-zinc-800 text-white text-sm font-bold px-6 py-3 rounded-xl shadow-lg border border-zinc-600 transition-all">
          📍 Please add your delivery location first!
        </div>
      )}

      <div className="flex justify-center px-4 py-10 ">
        <div className="w-full bg-zinc-900/65 rounded-2xl p-5 space-y-3 sm:space-y-0 mt-3 sm:p-8 shadow-lg mb-40">
          <h1 className="text-xl -mt-2 sm:-mt-5 sm:text-2xl text-zinc-700 font-black pb-2">Your Cart</h1>
          <div className="flex justify-between">
            <div className=" text-zinc-300 text-sm sm:text-base">
              <p><strong>Base:</strong> {pizza.Base}</p>
              <p><strong>Sauce:</strong> {pizza.Sauce}</p>
              <p><strong>Cheese:</strong> {pizza.Cheese}</p>
              <p><strong>Toppings:</strong>{" "}
                {pizza.Toppings?.length > 0? pizza.Toppings.join(", "): "None"}
              </p>
            </div>

            <div className="text-center w-fit">
              <span className="font-extrabold text-lg text-zinc-600">Quantity</span>
              <div className="flex items-center gap-6 bg-zinc-800 px-5 py-2 rounded-xl">
                <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="text-xl">−</button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button onClick={() => setQuantity(prev => prev + 1)} className="text-xl">+</button>
              </div>
            </div>
          </div>

          {/* Extras */}
          <div className="space-y-1 ">
            <p className="font-bold text-lg">Add Extras</p>

            <label className="flex justify-between items-center bg-zinc-800/60 p-3 sm:mx-5 rounded-xl cursor-pointer">
              <span>Oregano (+₹5)</span>
              <input type="checkbox" checked={extras.oregano}
                onChange={() =>
                  setExtras(prev => ({ ...prev, oregano: !prev.oregano }))
                }/>
            </label>

            <label className="flex justify-between items-center bg-zinc-800/60 p-3 rounded-xl sm:mx-5 cursor-pointer mt-1.5">
              <span>Chilli Flakes (+₹5)</span>
              <input type="checkbox" checked={extras.chilli}
                onChange={() =>
                  setExtras(prev => ({ ...prev, chilli: !prev.chilli }))
                } />
            </label>
          </div>

          <div className="border-y border-zinc-700 py-2 mt-3 space-y-2 text-sm text-zinc-300 px-1">
            <div className="flex justify-between">
              <span className="font-bold text-zinc-400">Delivery Charge</span>
              <span>₹{DELIVERY_CHARGE}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-zinc-400">Platform Charge</span>
              <span>₹{PLATFORM_CHARGE}</span>
            </div>
          </div>
          {showMap &&
            <div className="relative z-99 mt-4 w-full flex justify-center items-center overflow-x-clip h-80">
              <LiveMap maptext={maptext} setMaptext={setMaptext} />
            </div>}
        </div>
      </div>

      {/* Sticky Bottom */}
      <div className="fixed z-100 w-full bottom-0 bg-zinc-950 border-t border-zinc-800 p-3 sm:px-8 rounded-t-2xl">
        <div onClick={() => setshowMap(!showMap)} className="py-2 mb-1 space-x-1 border-b border-zinc-600 flex items-end">
          <svg width="26" height="26" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C6.5 0 2 4.5 2 10c0 7.5 12 22 10 22s10-14.5 10-22C22 4.5 17.5 0 12 0z" fill="#ff1f1f" /> <circle cx="12" cy="10" r="4" fill="white" />
          </svg>
          <div className="w-full h-6 px-2 rounded-4xl bg-zinc-800">
            {maptext || "Click here to set your location"}
          </div>
        </div>
        <div className="max-w-xl mx-auto space-y-2">

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{final}</span>
          </div>

          <div className="flex gap-4 w-full">
            <button onClick={clearCart} className="w-full bg-[#c00d0d] hover:bg-[#a71300] active:scale-[0.97] text-black font-bold font-sans py-3 rounded-xl">
              Clear Cart
            </button>

            <div onClick={handleCheckOut} className="bg-[#fc940d] hover:bg-[#ff7b00] w-full text-center active:scale-[0.97] text-black font-bold font-sans py-3 rounded-xl">
              Checkout →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
