"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const TypingAnimation = () => {
  const [currentText, setCurrentText] = useState("(A/C)");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [shouldMove, setShouldMove] = useState(false);
  const [showImage, setShowImage] = useState(false);
  
  const textSteps: string[] = [
    "(A/C)",
    "(AXT)",
    "(AXNT)", 
    "(ACNT)",
    "(ACXNT)",
    "(AXCE/INT)",
  ];

  useEffect(() => {
    // Text animation timer
    const textTimer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        
        if (nextIndex >= textSteps.length) {
          return prevIndex;
        }
        
        setCurrentText(textSteps[nextIndex]);
        return nextIndex;
      });
    }, 200);

    // Number counting timer
    const numberTimer = setInterval(() => {
      setCurrentNumber((prevNumber) => {
        if (prevNumber >= 24) {
          return prevNumber;
        }
        return prevNumber + 1;
      });
    }, 50);

    return () => {
      if (currentIndex >= textSteps.length - 1) {
        clearInterval(textTimer);
      }
      if (currentNumber >= 24) {
        clearInterval(numberTimer);
      }
    };
  }, [currentIndex, currentNumber]);

  // Check if both animations are complete
  useEffect(() => {
    if (currentIndex >= textSteps.length - 1 && currentNumber >= 24) {
      setIsAnimationComplete(true);
    }
  }, [currentIndex, currentNumber, textSteps.length]);

  // 1-second delay after animation completion
  useEffect(() => {
    if (isAnimationComplete) {
      const delayTimer = setTimeout(() => {
        setShouldMove(true);
        // Show image after text/counter movement completes
        setTimeout(() => {
          setShowImage(true);
        }, 1200); // 1000ms for movement + 200ms extra delay
      }, 1000);

      return () => clearTimeout(delayTimer);
    }
  }, [isAnimationComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-full relative">
      {/* Text that moves up */}
      <h1 
        className={`mx-auto max-w-[30ch] text-4xl text-transparent-90 font-bold tracking-tight md:text-5xl transition-transform duration-1000 ease-in-out ${
          shouldMove ? 'transform -translate-y-65' : ''
        }`}
      >
        {currentText}
      </h1>
      
      {/* Counter that moves down */}
      <div 
        className={`flex items-center space-x-1 mt-4 transition-transform duration-1000 ease-in-out ${
          shouldMove ? 'transform translate-y-90' : ''
        }`}
      >
        <span className="text-3xl font-bold">{currentNumber}</span>
        <span className="text-3xl">©</span>
      </div>

      {/* Image with left-to-right reveal animation */}
      <div 
        className={`absolute top-1/2 left-1/2 transform -translate-x-[290px] -translate-y-[230px] transition-opacity duration-300 ${
          showImage ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="relative w-68 h-50 md:w-100 md:h-50 overflow-hidden">
          <Image
            src="/image/image.png" 
            alt="Revealing image"
            fill
            className="object-cover trasprent-90 object-[25%_30%]"
          />
          
          {/* Reveal mask that animates from left to right */}
          <div 
            className={`absolute inset-0 bg-neutral-300 transition-transform duration-1500 ease-out ${
              showImage ? 'transform translate-x-full' : 'transform translate-x-0'
            }`}
            style={{ transformOrigin: 'left' }}
          />
        </div> 
          <p className={`  translate-x-[-155px] mt-4 text-3xl font-extrabold whitespace-nowrap transition-opacity duration-300 ${
          showImage ? 'opacity-100' : 'opacity-0'
        }`}>
          LED BY AXCEINT PAINE, FUSES DEVELOPMENT AND DESTGN. <br/>
          WE CREATE BESPOKE WEBSITES FOR E-COMMERCE BRANDS. <br/>
          BRANDS, STUDIOS, ORGANIZATIONS, AND INNOVATORS,<br/>
          PARTNERING CLOSELY WITH CLIENTS<br/>
          TO CRAFT PRODUCTS THAT EMBODY<br/>
          THEIR BRAND'S ESSENCE.<br/>
          </p>
          
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen w-full p-6 md:p-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        {/* Top window */}
        <section className="h-[500px] md:h-[700px] rounded-none bg-neutral-300 px-6 py-10 text-center relative overflow-y-auto">
          <TypingAnimation />
          <div className="absolute top-4 right-4 text-lg font-bold">
            <div>DELHI</div>
            <div>376/TD</div>
          </div>
        </section>

        {/* Bottom window */}
        <section className="h-[500px] md:h-[700px] relative bg-neutral-300 px-6 py-10 overflow-y-auto">
          <div className="absolute top-4 left-4 text-xl font-bold tracking-tight text-black z-10">
            <div>STUDIO</div>
            <div>WORK _</div>
            <div>CONTACT</div>
          </div>
          
          <div className="absolute top-4 right-4 text-sm z-10">
            <div>SAN DIEGO</div>
            <div>3:01 PM</div>
          </div>
          
          <div className="flex items-center justify-center min-h-full">
            <h2 className="text-4xl font-bold">(S/P)</h2>
          </div>
        </section>
      </div>
    </main>
  );
}