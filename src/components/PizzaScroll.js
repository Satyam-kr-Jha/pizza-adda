"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Load from "./Load";

gsap.registerPlugin(ScrollTrigger);
export default function PizzaScrollAnimation() {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [Arrow, setArrow] = useState(true)

  useEffect(() => {
    const frameCount = 193;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = 1920;
    canvas.height = 1080;
    const images = new Array(frameCount);
    const imageSeq = { frame: 0 };

    const loadImage = (index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = `/pizza/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;
        img.onload = () => resolve(img);
      });
    };

    // 🥇 Load first 10 frames immediately
    const preloadInitial = async () => {
      for (let i = 0; i < 10; i++) {
        images[i] = await loadImage(i);
      }
      context.drawImage(images[0], 0, 0);
      setTimeout(() => setLoading(false), 300);
      startAnimation();
      preloadInBatches(10);
    };

    const preloadInBatches = async (startIndex) => {
      const batchSize = 12;
      for (let i = startIndex; i < frameCount; i += batchSize) {
        const batch = [];
        for (let j = i; j < i + batchSize && j < frameCount; j++) {
          batch.push(loadImage(j));
        }
        const loaded = await Promise.all(batch);
        loaded.forEach((img, idx) => {
          images[i + idx] = img;
        });
        await new Promise((r) => setTimeout(r, 50));
      }
    };

    const startAnimation = () => {
      gsap.to(imageSeq, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: canvas,
          start: "top top",
          end: "400% top",
          scrub: 1,
          pin: true,
        },
        onUpdate: render,
      });
    };

    const render = () => {
      const img = images[imageSeq.frame];
      if (!img) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    };

    preloadInitial();


    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      setArrow(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black relative">

      {/* 🔥 LOADER */}
      <div
        className={`fixed inset-0 z-50 bg-black transition-opacity duration-700 ${loading ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        <Load />
      </div>

      <canvas
        ref={canvasRef}
        className="sticky top-0 w-full h-screen"
      />
      <div className="absolute w-full min-h-screen inset-0 ">
        <div className="relative w-full h-screen ">
          <p className={`sm:w-[40vw] sm:text-white text-zinc-600 font-semibold p-4 transition-all text-center sm:text-left text-sm sm:text-lg absolute duration-500 ${Arrow ? 'opacity-100' : 'opacity-0'}`}>
            Hot. Cheesy. Straight out of the oven and into your heart.
            Built different. Tastes better. Leaves zero crumbs and zero regrets.
            Main character meal. Side characters can watch.
            This isn’t pizza — it’s a personality trait.</p>
          <div className="absolute flex items-center justify-center text-center tracking-tighter w-full h-screen">
            <h1 className={`sm:text-[13vw] text-8xl font-extrabold font-nun sm:text-nowrap text-wrap transition-all duration-1000 ${Arrow ? 'opacity-100' : 'opacity-0'}`}>
              Pizza Adda
            </h1>
          </div>
          <p className={`sm:w-[25%] text-sm bottom-6 sm:text-right text-center sm:right-0 p-4 absolute transition-all font-nun sm:text-lg duration-500 ${Arrow ? 'opacity-100' : 'opacity-0'} sm:text-white text-zinc-400 font-bold`}>
            That cheese isn’t going to pull itself.
            Your cravings are already watching.
            You should never make them wait. <br />
            <span className="sm:text-2xl text-xl font-bold tracking-tight text-[#ff7316]">Scroll down & Order fast.</span>
          </p>
          <div className={`w-full absolute bottom-0 scale-[0.3] md:scale-[1] transition-all duration-800 ${Arrow ? 'opacity-100' : 'opacity-0'}`}>
            <div className="relative bottom-15 w-full flex justify-center animate-[down-animate_4s_ease-in-out_infinite]">
              <div className="rotate-25 ml-3.5 rounded-full w-32 h-1 bg-zinc-900"></div>
              <div className="-rotate-25 -ml-3.5 rounded-full w-32 h-1 bg-zinc-900"></div>
            </div>
            <div className="relative bottom-22 w-full flex justify-center animate-[down-animate_4s_ease-in-out_infinite] [animation-delay:200ms]">
              <div className="rotate-25 ml-3 w-31 h-1 bg-zinc-900"></div>
              <div className="-rotate-25 -ml-3 w-31 h-1 bg-zinc-900"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 CTA SECTION */}
      <div className="w-full h-[26vh] sm:h-[40vh] sm:-mt-25 relative z-1 bg-linear-to-l to-[#0f0f0f] via-[#141414] from-[rgb(26,23,24)] flex items-center justify-center">
        <Link href={"/pizza"}>
          <div className="w-full sm:w-fit text-3xl sm:px-20 sm:text-[300%] py-3 rounded-full font-extrabold text-[#f19100] border-2 bg-[#202020] font-nun hover:bg-[#f19100] hover:text-[#151515] active:scale-[0.97] transition-all text-nowrap">
            Order Now
          </div>
        </Link>
      </div>
    </div>
  );
}
