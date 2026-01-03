export default function Navbar() {
  return (
    <nav className="h-24 bg-[#991b1b] shadow flex items-center px-6 transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img src="/assets/images/PUPlogo.png" alt="PUP Logo" className="h-9 sm:h-15" />
          </div>
          <div className="flex flex-col items-start ml-1.25 text-white">
            <div className="font-bold text-[.73em] sm:text-[1.1em] tracking-[1px]">
              PUP TAGUIG IDENTITY PROVIDER
            </div>
            <div className="text-[.5em] sm:text-[.75em] opacity-[.9] -mt-0.5">
              POLYTECHNIC UNIVERSITY OF THE PHILIPPINES — TAGUIG CAMPUS
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
