import React from 'react'

export default function IndianWomanIllustration() {
  return (
    <div className="relative w-full max-w-4xl mx-auto flex items-end justify-center select-none overflow-visible">
      {/* Background Scenic Landscape SVG */}
      <svg
        viewBox="0 0 1000 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
      >
        <defs>
          {/* Sky Gradient */}
          <linearGradient id="skyGrad" x1="500" y1="0" x2="500" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFBF7" />
            <stop offset="35%" stopColor="#FEEBD9" />
            <stop offset="70%" stopColor="#FDCBA5" />
            <stop offset="100%" stopColor="#E6A08A" />
          </linearGradient>

          {/* Halo Glow for Woman */}
          <radialGradient id="haloGlow" cx="500" cy="275" r="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#FFF2D6" stopOpacity="0.75" />
            <stop offset="75%" stopColor="#FED7AA" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FED7AA" stopOpacity="0" />
          </radialGradient>

          {/* Mountain Gradient Far */}
          <linearGradient id="mountainFar" x1="500" y1="280" x2="500" y2="460" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#875A6E" />
            <stop offset="100%" stopColor="#553448" />
          </linearGradient>

          {/* Mountain Gradient Near */}
          <linearGradient id="mountainNear" x1="500" y1="360" x2="500" y2="520" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#543347" />
            <stop offset="100%" stopColor="#301A29" />
          </linearGradient>

          {/* River Gradient */}
          <linearGradient id="riverGrad" x1="100" y1="410" x2="900" y2="460" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0D9488" />
            <stop offset="50%" stopColor="#0F766E" />
            <stop offset="100%" stopColor="#115E59" />
          </linearGradient>

          {/* Dupatta / Saree Teal Gradient */}
          <linearGradient id="sareeGrad" x1="420" y1="360" x2="580" y2="520" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#14B8A6" />
            <stop offset="40%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#0F766E" />
          </linearGradient>

          {/* Golden Blouse Pattern */}
          <linearGradient id="blouseGrad" x1="470" y1="400" x2="530" y2="490" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* Skin Tone */}
          <linearGradient id="skinTone" x1="480" y1="240" x2="520" y2="350" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C68662" />
            <stop offset="100%" stopColor="#A86546" />
          </linearGradient>

          {/* Soft cloud glow beneath callout annotations */}
          <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="15" />
          </filter>
        </defs>

        {/* --- SKY & SUNSET BACKDROP --- */}
        <rect x="0" y="0" width="1000" height="420" fill="url(#skyGrad)" opacity="0.65" rx="24" />

        {/* Soft highlight dunes / cloud pillows under annotations */}
        <ellipse cx="320" cy="380" rx="60" ry="12" fill="#FFFFFF" opacity="0.8" filter="url(#softBlur)" />
        <ellipse cx="740" cy="405" rx="65" ry="14" fill="#FFFFFF" opacity="0.8" filter="url(#softBlur)" />

        {/* --- FAR MOUNTAIN RIDGES --- */}
        <path
          d="M0 380 Q 250 330 460 365 Q 650 395 850 320 Q 940 335 1000 375 L 1000 520 L 0 520 Z"
          fill="url(#mountainFar)"
          opacity="0.9"
        />

        {/* --- RIVER / WATER STRIP --- */}
        <path
          d="M0 435 Q 220 425 400 440 Q 600 445 760 435 Q 900 442 1000 438 L 1000 470 Q 750 480 500 465 Q 250 470 0 465 Z"
          fill="url(#riverGrad)"
        />

        {/* River reflections */}
        <ellipse cx="140" cy="448" rx="35" ry="3" fill="#5EEAD4" opacity="0.5" />
        <ellipse cx="320" cy="452" rx="45" ry="2" fill="#99F6E4" opacity="0.4" />
        <ellipse cx="880" cy="450" rx="30" ry="2.5" fill="#5EEAD4" opacity="0.4" />

        {/* --- NEAR DUNES & FOOTHILLS --- */}
        <path
          d="M0 420 Q 180 390 380 440 Q 500 465 620 440 Q 820 370 1000 410 L 1000 520 L 0 520 Z"
          fill="url(#mountainNear)"
        />

        {/* Rural landscape details: huts & grazing sheep */}
        <g opacity="0.65">
          {/* Small village huts on distant ridge */}
          <polygon points="635,420 648,414 660,420 660,428 635,428" fill="#45273B" />
          <polygon points="655,420 668,413 680,420 680,428 655,428" fill="#5B334D" />
          {/* Tiny grazing cattle silhouettes on left bank */}
          <circle cx="118" cy="442" r="3" fill="#1E293B" />
          <rect x="114" y="443" width="7" height="4" rx="2" fill="#1E293B" />
          <circle cx="145" cy="448" r="2.5" fill="#1E293B" />
          <rect x="142" y="449" width="6" height="3" rx="1.5" fill="#1E293B" />
        </g>

        {/* --- SILHOUETTED PALM TREES --- */}
        {/* Left Palmyra Palm */}
        <g transform="translate(65, 385)">
          {/* Trunk */}
          <path d="M 16 70 Q 14 35 15 0 Q 17 35 18 70 Z" fill="#2A1724" />
          {/* Palm Fronds Fan */}
          <path d="M 16 0 Q 2 -18 -8 -5 Q 6 -7 16 0 Z" fill="#2A1724" />
          <path d="M 16 0 Q -2 -25 5 -20 Q 9 -12 16 0 Z" fill="#2A1724" />
          <path d="M 16 0 Q 16 -30 22 -28 Q 19 -15 16 0 Z" fill="#2A1724" />
          <path d="M 16 0 Q 32 -25 36 -12 Q 26 -7 16 0 Z" fill="#2A1724" />
          <path d="M 16 0 Q 38 -12 38 4 Q 28 -2 16 0 Z" fill="#2A1724" />
          <path d="M 16 0 Q 34 8 28 16 Q 22 8 16 0 Z" fill="#2A1724" />
          <path d="M 16 0 Q 5 12 0 16 Q 8 6 16 0 Z" fill="#2A1724" />
        </g>

        {/* Right Tall Palm Pair */}
        <g transform="translate(845, 305)">
          {/* Taller Palm */}
          <path d="M 20 150 Q 18 75 19 0 Q 22 75 24 150 Z" fill="#1E121A" />
          {/* Palm Fronds */}
          <path d="M 20 0 Q 2 -22 -12 -6 Q 5 -8 20 0 Z" fill="#1E121A" />
          <path d="M 20 0 Q -3 -30 7 -25 Q 12 -14 20 0 Z" fill="#1E121A" />
          <path d="M 20 0 Q 20 -38 27 -35 Q 24 -18 20 0 Z" fill="#1E121A" />
          <path d="M 20 0 Q 39 -30 45 -15 Q 33 -8 20 0 Z" fill="#1E121A" />
          <path d="M 20 0 Q 48 -15 48 5 Q 36 -2 20 0 Z" fill="#1E121A" />
          <path d="M 20 0 Q 42 10 35 20 Q 27 10 20 0 Z" fill="#1E121A" />
          <path d="M 20 0 Q 5 15 0 20 Q 10 8 20 0 Z" fill="#1E121A" />
        </g>
        <g transform="translate(890, 320)">
          {/* Slightly shorter Palm */}
          <path d="M 18 135 Q 16 68 17 0 Q 20 68 21 135 Z" fill="#2A1724" />
          <path d="M 18 0 Q 2 -20 -10 -5 Q 5 -7 18 0 Z" fill="#2A1724" />
          <path d="M 18 0 Q -2 -27 6 -22 Q 11 -12 18 0 Z" fill="#2A1724" />
          <path d="M 18 0 Q 18 -34 24 -32 Q 21 -16 18 0 Z" fill="#2A1724" />
          <path d="M 18 0 Q 35 -26 40 -12 Q 29 -7 18 0 Z" fill="#2A1724" />
          <path d="M 18 0 Q 42 -12 42 4 Q 31 -2 18 0 Z" fill="#2A1724" />
          <path d="M 18 0 Q 36 9 30 18 Q 23 9 18 0 Z" fill="#2A1724" />
        </g>

        {/* --- RADIANT HALO BEHIND THE WOMAN --- */}
        <circle cx="500" cy="275" r="140" fill="url(#haloGlow)" />
        <circle cx="500" cy="275" r="95" fill="#FFFFFF" opacity="0.3" filter="url(#softBlur)" />

        {/* --- ARTISTIC EMPOWERED WOMAN FIGURE --- */}
        <g id="empowered-woman" transform="translate(0, 0)">
          {/* Saree / Dupatta flowing behind */}
          <path
            d="M 410 400 Q 380 430 385 490 Q 440 470 480 480 L 480 420 Z"
            fill="#0F766E"
            opacity="0.8"
          />

          {/* Mustard / Marigold Blouse & Tunic with prints */}
          <path
            d="M 445 375 Q 490 395 530 375 L 545 490 Q 490 505 440 485 Z"
            fill="url(#blouseGrad)"
          />
          {/* Subtle gold block print dots on blouse */}
          <g fill="#FDE68A" opacity="0.6">
            <circle cx="465" cy="405" r="2" />
            <circle cx="485" cy="410" r="2.5" />
            <circle cx="475" cy="425" r="2" />
            <circle cx="460" cy="435" r="2" />
            <circle cx="485" cy="445" r="2.5" />
            <circle cx="470" cy="460" r="2" />
            <circle cx="510" cy="405" r="2" />
            <circle cx="525" cy="418" r="2.5" />
            <circle cx="515" cy="438" r="2" />
            <circle cx="530" cy="455" r="2" />
          </g>

          {/* Draped Teal Dupatta / Saree over left shoulder */}
          <path
            d="M 430 365 Q 465 375 510 365 Q 525 400 550 430 Q 565 470 585 520 L 385 520 Q 385 450 405 400 Q 418 375 430 365 Z"
            fill="url(#sareeGrad)"
          />
          {/* Saree gold border trim */}
          <path
            d="M 430 365 Q 465 375 510 365"
            stroke="#FBBF24"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 405 400 Q 430 460 455 520"
            stroke="#FBBF24"
            strokeWidth="3"
            opacity="0.8"
          />

          {/* Folded Forearms & Hands */}
          <path
            d="M 435 405 Q 455 450 515 455 Q 565 450 580 415 Q 570 395 550 405 Q 525 435 485 435 Q 455 430 435 405 Z"
            fill="url(#skinTone)"
          />
          {/* Arm fold shadow & sleeve line */}
          <path
            d="M 450 425 Q 490 445 540 430"
            stroke="#8C4E33"
            strokeWidth="2"
            opacity="0.6"
          />
          {/* Gold Bangles / Choodiyan on wrists */}
          <ellipse cx="450" cy="415" rx="5" ry="8" fill="#F59E0B" transform="rotate(-15 450 415)" />
          <ellipse cx="448" cy="416" rx="4" ry="7" fill="#FBBF24" transform="rotate(-15 448 416)" />
          <ellipse cx="560" cy="415" rx="5" ry="8" fill="#F59E0B" transform="rotate(15 560 415)" />
          <ellipse cx="562" cy="416" rx="4" ry="7" fill="#FBBF24" transform="rotate(15 562 416)" />

          {/* Neck */}
          <path
            d="M 488 320 L 488 360 Q 500 365 512 360 L 512 320 Z"
            fill="url(#skinTone)"
          />

          {/* Face Profile / Oval */}
          <path
            d="M 465 265 Q 462 315 500 325 Q 538 315 535 265 Q 532 215 500 215 Q 468 215 465 265 Z"
            fill="url(#skinTone)"
          />

          {/* Stylized Facial Features (artistic minimal like Image 1) */}
          {/* Bindi (Traditional Indian vermillion / maroon bindi) */}
          <circle cx="500" cy="250" r="3.5" fill="#DC2626" />
          <circle cx="500" cy="250" r="1.5" fill="#991B1B" />

          {/* Gentle serene eyelids & brows */}
          <path d="M 482 268 Q 490 264 496 268" stroke="#5F3824" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 504 268 Q 510 264 518 268" stroke="#5F3824" strokeWidth="2.5" strokeLinecap="round" />

          {/* Graceful Nose & Lips */}
          <path d="M 500 266 Q 502 278 497 282" stroke="#8C4E33" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M 493 293 Q 500 297 507 293" stroke="#991B1B" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Gold Jhumka Earrings with Teal stones */}
          <g transform="translate(463, 275)">
            <circle cx="0" cy="0" r="3.5" fill="#FBBF24" />
            <polygon points="-4,6 4,6 0,11" fill="#F59E0B" />
            <circle cx="0" cy="8" r="1.5" fill="#0D9488" />
          </g>
          <g transform="translate(537, 275)">
            <circle cx="0" cy="0" r="3.5" fill="#FBBF24" />
            <polygon points="-4,6 4,6 0,11" fill="#F59E0B" />
            <circle cx="0" cy="8" r="1.5" fill="#0D9488" />
          </g>

          {/* Hair: Parted sleek hair with side braid flowing over shoulder */}
          <path
            d="M 465 255 Q 460 215 500 212 Q 540 215 535 255 Q 520 230 500 232 Q 480 230 465 255 Z"
            fill="#1E1424"
          />
          {/* Thick Indian Braid draped over left shoulder */}
          <path
            d="M 475 295 Q 470 340 488 375 Q 498 405 488 435 Q 482 455 490 470 Q 495 470 496 460 Q 504 430 495 395 Q 485 360 488 320 Z"
            fill="#1E1424"
          />
          {/* Hair tie / parandi tassel at end */}
          <ellipse cx="490" cy="465" rx="3" ry="5" fill="#F59E0B" />
        </g>
      </svg>

      {/* --- FLOATING INTERACTIVE ANNOTATION CARDS (EXACT POSITIONS FROM IMAGE 1) --- */}

      {/* 1. Community (Middle Left) */}
      <div className="absolute left-6 md:left-14 top-[50%] -translate-y-1/2 max-w-[210px] sm:max-w-[240px] text-left transition-all duration-300 hover:scale-105 group cursor-pointer z-10">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping group-hover:bg-amber-600" />
          <h4 className="text-base sm:text-lg font-bold text-neutral-900 group-hover:text-amber-800 transition-colors">
            Community
          </h4>
        </div>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
          Direct micro-lending empowers self-help groups and grassroots cooperatives to build generational wealth together.
        </p>
      </div>

      {/* 2. Family (Upper Right) */}
      <div className="absolute right-6 md:right-16 top-[18%] max-w-[200px] sm:max-w-[230px] text-left transition-all duration-300 hover:scale-105 group cursor-pointer z-10">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping group-hover:bg-rose-600" />
          <h4 className="text-base sm:text-lg font-bold text-neutral-900 group-hover:text-rose-800 transition-colors">
            Family
          </h4>
        </div>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
          Ensuring children stay in school, nutritious meals, and quality healthcare without falling into predatory debt cycles.
        </p>
      </div>

      {/* 3. Financial Security (Lower Right) */}
      <div className="absolute right-4 md:right-12 bottom-[16%] max-w-[210px] sm:max-w-[250px] text-left transition-all duration-300 hover:scale-105 group cursor-pointer z-10">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-600 animate-ping group-hover:bg-teal-700" />
          <h4 className="text-base sm:text-lg font-bold text-neutral-900 group-hover:text-teal-800 transition-colors">
            Financial Security
          </h4>
        </div>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
          Fair, low-cost microcredit allowing women to own assets, grow livestock & enterprises, and achieve true independence.
        </p>
      </div>
    </div>
  )
}
