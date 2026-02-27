"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function OrderPlaced() {
  const router = useRouter();
  const [count, setCount] = useState(5);

  useEffect(() => {
    localStorage.clear();

    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      router.push("/");
      router.refresh(); // force reload homepage images
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [router]);

  const handleRedirect = () => {
  window.location.replace("/");
};

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      
      {/* Background */}
      <div className="absolute w-full h-screen p-5 bg-yellow-500">
        <div className="relative w-full h-screen">
          <Image
            src="/logo1.jpg"
            alt="Cafe Background"
            fill
            className="absolute object-contain scale-[1.5]"
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 bg-white/10 backdrop-blur-sm border border-white/20 
                      p-10 rounded-3xl shadow-2xl text-center max-w-md w-full">

        {/* Checkmark */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
            <span className="text-4xl text-green-400">✔</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-3">
          Order Placed Successfully!
        </h1>

        <p className="text-white/70 mb-2">
          Your order has been confirmed and is now being prepared with love ☕🍕
        </p>

        <p className="text-orange-300 text-sm mb-6">
          You’ll be automatically redirected in {count} sec...
        </p>

        <button
          onClick={handleRedirect}
          className="bg-orange-500 hover:bg-orange-600 transition 
                     py-3 w-full rounded-xl font-semibold shadow-lg">
          Go to Home
        </button>

      </div>
    </div>
  );
}