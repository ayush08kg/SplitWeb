import React from "react";
import { Split } from "lucide-react";

function Header() {
  return (
    <header className="bg-blue-950 rounded-b-4xl py-5 shadow-md border-b border-white/20">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="hisaablogo.png" alt="" className="w-10 h-10"/>
          <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-sm">
            HisaabHawk
          </h1>
        </div>
        <p className="hidden sm:block text-sm text-white/80 italic">
         Now NO <span className="font-semibold text-red-400"> chik chik</span> in <span className="font-semibold text-yellow-300">Hisaab</span>
        </p>
      </div>
    </header>
  );
}

export default Header;
