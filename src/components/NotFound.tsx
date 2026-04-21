// import {  Home } from 'lucide-react';
// import { useState, useEffect } from 'react';

// export default function NotFound() {
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       setMousePos({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   return (
//     <div className="min-h-screen bg-primary/40 flex flex-col items-center justify-center px-6 relative overflow-hidden">
//       {/* Animated background gradient that follows mouse */}
//       <div
//         className="absolute inset-0 pointer-events-none opacity-30 transition-opacity duration-300"
//         style={{
//           background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.15), transparent 80%)`,
//         }}
//       />


//       <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
//         {/* Animated 404 text */}
//         <div className="mb-8 relative h-32 sm:h-40 flex items-center justify-center">
//           <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-3xl blur-3xl opacity-20 animate-pulse" />
//           <div className="relative">
//             <h1 className="text-8xl sm:text-9xl font-black text-red-500 tracking-tighter relative">
//               <span className="inline-block animate-bounce" style={{ animationDelay: '0s' }}>
//                 4
//               </span>
//               <span className="inline-block animate-bounce" style={{ animationDelay: '0.1s' }}>
//                 0
//               </span>
//               <span className="inline-block animate-bounce" style={{ animationDelay: '0.2s' }}>
//                 4
//               </span>
//             </h1>
//             <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 via-transparent to-emerald-500 blur-sm" />
//           </div>
//         </div>

//         {/* Headline */}
//         <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
//           Page Not <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Found</span>
//         </h2>

//         {/* Description */}
//         <p className="text-lg text-slate-400 mb-12 max-w-md leading-relaxed">
//           The page you're looking for doesn't exist or has been moved. Let's get you back on track.
//         </p>

//         {/* Action buttons */}
//         <div className="flex flex-col sm:flex-row gap-4">
//           <a
//             href="/"
//             className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orange-500 text-white font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
//           >
//             <Home className="w-5 h-5" strokeWidth={2} />
//             Go Home
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }
import { Home } from 'lucide-react';

export default function NotFound() {

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center px-6 relative overflow-hidden"
    >
      <div
        className="absolute top-0 left-1/4 w-96 h-96 bg-primary/40 rounded-full blur-3xl opacity-20 pointer-events-none"
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-500/40 rounded-full blur-3xl opacity-15 pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">

        {/* 404 digits */}
        <div className="mb-8 relative flex items-center justify-center h-36 sm:h-44">
          {/* Glow behind digits */}
          <div
            className="absolute inset-0 rounded-3xl blur-3xl opacity-25 animate-pulse"
            style={{ background: 'linear-gradient(135deg, #1d4ed8, #f97316)' }}
          />
          <h1
            className="relative text-8xl sm:text-9xl font-black tracking-tighter"
            style={{ color: '#f97316' }}
          >
            {['4', '0', '4'].map((char, i) => (
              <span
                key={i}
                className="inline-block animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {char}
              </span>
            ))}
          </h1>
          {/* Underline rule */}
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 h-0.5 blur-sm"
            style={{ background: 'linear-gradient(to right, #1d4ed8, #f97316, #1d4ed8)' }}
          />
        </div>

        {/* Headline */}
        <h2
          className="text-4xl sm:text-5xl font-bold mb-4 leading-tight"
        >
          Page Not{' '}
          <span
            className="bg-clip-text"
            style={{
              backgroundImage: 'linear-gradient(90deg, #3b82f6, #f97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Found
          </span>
        </h2>

        {/* Description */}
        <p
          className="text-lg mb-12 max-w-md leading-relaxed"
          style={{ color: '#6b84aa' }}
        >
          The page you're looking for doesn't exist or has been moved. Let's
          get you back on track.
        </p>

        {/* CTA button */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/"
            className="inline-flex items-center text-orange-500 border borer-orange-500  justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all duration-200 active:scale-95"
            style={{
              boxShadow: '0 0 24px rgba(249, 115, 22, 0.35)',
            }}
          >
            <Home className="w-5 h-5" strokeWidth={2} />
            Go Home
          </a>

          <a
            href="#"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all duration-200 active:scale-95"
            style={{
              border: '1.5px solid #1d4ed8',
              color: '#60a5fa',
              backgroundColor: 'rgba(29, 78, 216, 0.1)',
            }}
          >
            ← Go Back
          </a>
        </div>
      </div>
    </div>
  );
}