export default function LoginHeader() {
  return (
    <nav className="navbar bg-[#991b1b] shadow-sm h-24 sm:h-24 py-25 sm:py-0 px-4 sm:px-6 flex items-center">
      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-[1.2em] w-full">
        <div className="flex items-center gap-2 mb-0">
          <img
            src="/assets/images/PUPlogo.png"
            alt="PUP Logo"
            className="h-12 sm:h-15 object-contain"
          />
          <img
            src="/assets/images/PUPIDP-logo.png"
            alt="PUP IDP Logo"
            className="h-16 sm:h-22 object-contain"
          />
        </div>

        <div className="flex flex-col text-white items-center sm:items-start text-center sm:text-left">
          <div className="text-lg sm:text-[1.1em] font-bold tracking-[1px]">
            PUPT IDENTITY PROVIDER
          </div>
          <div className="text-sm sm:text-[.75em] opacity-[.9] mt-1 sm:mt-0">
            POLYTECHNIC UNIVERSITY OF THE PHILIPPINES — TAGUIG CAMPUS
          </div>
        </div>
      </div>
    </nav>
  );
}