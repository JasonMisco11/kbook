import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-cyan-950 px-6 text-center">
      {/* Animated background bubbles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Bubble 1 */}
        <div className="absolute left-[10%] bottom-0 h-4 w-4 rounded-full bg-blue-400/20 animate-[rise_6s_ease-in_infinite]" />
        {/* Bubble 2 */}
        <div className="absolute left-[25%] bottom-0 h-3 w-3 rounded-full bg-blue-300/15 animate-[rise_8s_ease-in_1.5s_infinite]" />
        {/* Bubble 3 */}
        <div className="absolute left-[50%] bottom-0 h-5 w-5 rounded-full bg-cyan-400/20 animate-[rise_7s_ease-in_3s_infinite]" />
        {/* Bubble 4 */}
        <div className="absolute left-[70%] bottom-0 h-3.5 w-3.5 rounded-full bg-blue-400/15 animate-[rise_9s_ease-in_2s_infinite]" />
        {/* Bubble 5 */}
        <div className="absolute left-[85%] bottom-0 h-4 w-4 rounded-full bg-cyan-300/20 animate-[rise_6.5s_ease-in_4s_infinite]" />
      </div>

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Drip icon */}
        <div className="relative">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="h-20 w-20 text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2C12 2 5.5 10.5 5.5 14.5C5.5 18.09 8.41 21 12 21C15.59 21 18.5 18.09 18.5 14.5C18.5 10.5 12 2 12 2Z"
            />
          </svg> */}
          {/* Drip animation */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-blue-400 animate-[drip_2s_ease-in_infinite] opacity-0" />
        </div>

        {/* 404 number */}
        <h1 className="text-[8rem] leading-none font-black tracking-tighter bg-gradient-to-b from-white to-blue-400/60 bg-clip-text text-transparent drop-shadow-lg sm:text-[10rem]">
          404
        </h1>

        {/* Message */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl font-semibold text-white/90 sm:text-3xl">
            This page has sprung a leak
          </h2>
          <p className="max-w-md text-base text-blue-200/60 leading-relaxed">
            Looks like the page you&apos;re looking for has been flushed away.
            Don&apos;t worry — we&apos;ll get you back on track.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-400 hover:scale-105 active:scale-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 duration-300 group-hover:-translate-x-0.5"
            >
              <path
                fillRule="evenodd"
                d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
                clipRule="evenodd"
              />
            </svg>
            Back to Home
          </Link>

          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/20 hover:scale-105 active:scale-100"
          >
            View Services
          </Link>
        </div>
      </div>

      {/* Footer attribution */}
      <p className="absolute bottom-8 text-xs text-white/20">
        KwameServices — Expert Plumbing in Ghana
      </p>

      {/* Inline keyframes via style tag */}
      <style>{`
        @keyframes rise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) scale(0.5);
            opacity: 0;
          }
        }
        @keyframes drip {
          0% {
            transform: translateX(-50%) translateY(0) scale(1);
            opacity: 0.8;
          }
          80% {
            transform: translateX(-50%) translateY(40px) scale(0.6);
            opacity: 0.4;
          }
          100% {
            transform: translateX(-50%) translateY(50px) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
