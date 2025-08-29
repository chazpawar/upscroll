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
        // Show image slightly after text starts moving
        setTimeout(() => {
          setShowImage(true);
        }, 300);
      }, 1000);

      return () => clearTimeout(delayTimer);
    }
  }, [isAnimationComplete]);

  return (
    <div className="flex flex-col items-center space-y-4 relative min-h-[200px]">
      <h1 
        className={`mx-auto max-w-[30ch] text-4xl font-bold tracking-tight md:text-5xl transition-transform duration-1000 ease-in-out ${
          shouldMove ? 'transform -translate-y-55' : ''
        }`}
      >
        {currentText}
      </h1>
      <div 
        className={`flex items-center space-x-1 transition-transform duration-1000 ease-in-out ${
          shouldMove ? 'transform translate-y-70' : ''
        }`}
      >
        <span className="text-3xl font-bold">{currentNumber}</span>
        <span className="text-3xl">©</span>
      </div>
      
      {/* Image with left-to-right reveal animation */}
      <div 
        className={`absolute top-1/2 left-1/2 transform translate-x-[-300px] translate-y-[-200px] transition-opacity duration-300 ${
          showImage ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="relative w-64 h-50 md:w-80 md:h-50 overflow-hidden ">
          <Image
            src="/image/image.png" 
            alt="Revealing image"
            fill
            className="object-cover object-[25%_30%]"
          />
          
          {/* Reveal mask that animates from left to right */}
          <div 
            className={`absolute inset-0 bg-neutral-300 transition-transform duration-1500 ease-out ${
              showImage ? 'transform translate-x-full' : 'transform translate-x-0'
            }`}
            style={{ transformOrigin: 'left' }}
          />
          
         =
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen w-full p-6 md:p-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        {/* Top window */}
        <section className="rounded-none bg-neutral-300 px-6 py-10 text-center md:py-65 relative">
          <TypingAnimation />
          <div className="absolute top-4 right-4 text-lg font-bold">
            <div>DELHI</div>
            <div>376/TD</div>
          </div>
        </section>

        

        {/* Bottom window */}
        <section className="relative bg-neutral-300 px- py-10 md:px-6 md:py-75">
          {/* Navigation elements */}
          <div className="absolute top-4 left-4 text-xl font-bold tracking-tight text-black ">
            <div >STUDIO</div>
            <div>WORK _</div>
            <div>CONTACT</div>
          </div>
          
          <div className="absolute top-4 right-4 text-sm">
            <div>SAN DIEGO</div>
            <div>10:00PM</div>
          </div>
          
          <div className="text-center">
            <h2 className="text-4xl font-bold">(A/C)</h2>
          </div>
          
         
        </section>
      </div>
    </main>
  );
}