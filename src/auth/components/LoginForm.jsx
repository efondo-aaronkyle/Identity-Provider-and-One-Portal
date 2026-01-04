import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      navigate("/idp/add-user");
    } else if (password === "user123") {
      navigate("/portal");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="w-full max-w-md px-7 sm:px-0">
      <div className="card bg-white w-full shadow-xl">
        <div className="card-body space-y-6">
          <img src="/assets/images/PUPlogo.png" alt="PUP IDP Logo" className="h-24 object-contain mx-auto block drop-shadow-lg mb-1"/>
          <h2 className="text-red-800 text-4xl font-bold text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-medium mb-2 text-black text-base">Email Address <span className="text-red-500">*</span></label>
              <label className="input flex items-center rounded-lg gap-2 bg-transparent border border-gray-300 text-gray-700 w-full focus-within:ring-1 focus-within:ring-blue-200 focus-within:border-blue-200">
                <span className="pr-3 border-r border-gray-300 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                      <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                      <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                  </svg>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email address"
                  className="grow bg-transparent border-none rounded-e-lg focus-within:ring-blue-200 focus-within:border-blue-200"
                />
              </label>
            </div>
            <div>
              <label className="block font-medium mb-2 text-black text-base">Password <span className="text-red-500">*</span></label>
              <label className="input flex items-center rounded-lg gap-2 bg-transparent border border-gray-300 text-gray-700 w-full focus-within:ring-1 focus-within:ring-blue-200 focus-within:border-blue-200">
                <span className="pr-3 border-r border-gray-300 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                  </svg>
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="grow bg-transparent border-none rounded-e-lg focus-within:ring-blue-200 focus-within:border-blue-200"
                />
              </label>
            </div>
            <div className="flex items-center justify-between mb-10 mt-10 font-medium">
              <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" className="checkbox border-gray-300 bg-transparent checked:bg-[#991b1b] checked:border-red-900 checked:text-white mr-1" />
                <span className="text-[#991b1b] text-[.7rem] sm:text-sm">Remember me</span>
              </label>
              <a href="#" className="link link-hover text-[#991b1b] text-[.7rem] sm:text-sm">
                Forgot your password?
              </a>
            </div>
            <button className="btn w-full font-semibold bg-[#991b1b] text-white border-[#991b1b] hover:bg-[#ffd700] hover:border-[#ffd700] hover:text-[#991b1b]">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
