import { useNavigate } from "react-router-dom";

export default function AddUserDetails({ data, setData, onNext }) {
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
      
      <div>
        <label className="block font-medium mb-1 text-black text-base">Username</label>
        <label className="input flex items-center gap-2 bg-transparent border border-gray-300 text-gray-700 w-full focus-within:ring-1 focus-within:ring-blue-300 focus-within:border-blue-400">
          <span className="pr-3 border-r border-gray-300 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
            </svg>
          </span>
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
            placeholder="Enter username"
            className="grow bg-transparent focus:outline-none"
          />
          <span className="badge badge-neutral badge-xs">Optional</span>
        </label>
      </div>

      <div>
        <label className="block font-medium mb-1 text-black text-base">Email Address <span className="text-red-500">*</span></label>
        <label className="input flex items-center gap-2 bg-transparent border border-gray-300 text-gray-700 w-full focus-within:ring-1 focus-within:ring-blue-300 focus-within:border-blue-400">
          <span className="pr-3 border-r border-gray-300 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
            </svg>
          </span>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
            placeholder="Enter email"
            className="grow bg-transparent focus:outline-none"
          />
        </label>
      </div>

      <div>
        <label className="block font-medium mb-1 text-black text-base">Phone Number</label>
        <label className="input flex items-center gap-2 bg-transparent border border-gray-300 text-gray-700 w-full focus-within:ring-1 focus-within:ring-blue-300 focus-within:border-blue-400">
          <span className="pr-3 border-r border-gray-300 text-gray-500">+63</span>
          <input
            type="tel"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            placeholder="(123) 456 7890"
            className="grow bg-transparent focus:outline-none"
          />
          <span className="badge badge-neutral badge-xs">Optional</span>
        </label>
      </div>

      <div>
        <label className="block font-medium mb-1 text-black text-base">First Name <span className="text-red-500">*</span></label>
        <input
          type="text"
          name="givenName"
          value={data.givenName}
          onChange={handleChange}
          required
          placeholder="Enter firstname"
          className="input bg-transparent border border-gray-300 text-gray-700 w-full focus-within:ring-1 focus-within:ring-blue-300 focus-within:border-blue-400"
        />
      </div>

      <div>
        <label className="block font-medium mb-1 text-black text-base">Middle Name</label>
        <label className="input flex items-center gap-2 bg-transparent border border-gray-300 text-gray-700 w-full focus-within:ring-1 focus-within:ring-blue-300 focus-within:border-blue-400">
           <input
              type="text"
              name="middleName"
              value={data.middleName}
              onChange={handleChange}
              placeholder="Enter middlename"
              className="grow bg-transparent focus:outline-none"
           />
            <span className="badge badge-neutral badge-xs">Optional</span>
        </label>
      </div>

      <div>
        <label className="block font-medium mb-1 text-black text-base">Last Name <span className="text-red-500">*</span></label>
        <input
          type="text"
          name="surname"
          value={data.surname}
          onChange={handleChange}
          required
          placeholder="Enter lastname"
          className="input bg-transparent border border-gray-300 text-gray-700 w-full focus-within:ring-1 focus-within:ring-blue-300 focus-within:border-blue-400"
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <button type="button" onClick={() => navigate(-1)} className="btn border-none text-white bg-red-800 hover:bg-red-900 font-medium">
            Cancel
        </button>
        <button type="submit" className="btn border-none bg-green-600 hover:bg-green-700 font-medium text-white">
          Next
        </button>
      </div>
    </form>
  );
}
