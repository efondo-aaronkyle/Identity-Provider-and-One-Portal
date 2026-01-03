import FadeWrapper from "../../../../components/FadeWrapper";

export default function AddUserInvitation({ data, setData, onBack }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({ ...data, [name]: type === "checkbox" ? checked : value });
  };

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let pwd = "";
    for (let i = 0; i < 12; i++) {
      pwd += chars[Math.floor(Math.random() * chars.length)];
    }
    setData({ ...data, tempPassword: pwd });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("FINAL DATA:", data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <div>
        <label className="font-medium text-black text-base">
          Invitation method
        </label>
        <p className="text-xs text-gray-500 italic mb-2">
          Choose how the user will get access
        </p>

        <select
          name="inviteMode"
          value={data.inviteMode}
          onChange={handleChange}
          className="select bg-white border rounded-lg border-gray-300 text-gray-700 w-full focus:outline-none focus:ring-1 focus:border-blue-200"
        >
          <option value="invite">Send an invitation to the user</option>
          <option value="temp">Set a temporary password</option>
        </select>
      </div>
      <div className="relative overflow-hidden">
        <div className={`${data.inviteMode === "invite" ? "relative" : "absolute top-0 left-0 w-full opacity-0 pointer-events-none"}`}>
          <FadeWrapper isVisible={data.inviteMode === "invite"} keyId="delivery">
            <div>
              <label className="block font-medium text-black text-base mb-2">
                Delivery method
              </label>
              <select
                name="delivery"
                value={data.delivery}
                onChange={handleChange}
                className="select bg-white border rounded-lg border-gray-300 text-gray-700 w-full focus:ring-0 focus:border-blue-200"
              >
                <option value="email">Email</option>
                <option value="sms">SMS</option>
              </select>
            </div>
          </FadeWrapper>
        </div>

        <div className={`${data.inviteMode === "temp" ? "relative" : "absolute top-0 left-0 w-full opacity-0 pointer-events-none"}`}>
          <FadeWrapper isVisible={data.inviteMode === "temp"} keyId="tempPassword">
            <div>
                <label className="block font-medium text-black text-base mb-2">
                    Temporary password
                </label>
                <div className="flex gap-2">
                    <input
                        type="password"
                        name="tempPassword"
                        value={data.tempPassword}
                        onChange={handleChange}
                        placeholder="Temporary password"
                        className="input bg-transparent border rounded-lg border-gray-300 text-gray-700 w-full focus:ring-0 focus:border-blue-200"
                    />
                    <button type="button" onClick={generatePassword} className="btn bg-[#991b1b] text-white border-[#991b1b] hover:bg-[#ffd700] hover:border-[#ffd700] hover:text-[#991b1b]">
                          Generate
                    </button>
                </div>
                <p className="text-xs text-gray-500">
                    User will be required to set a new password at first sign-in.
                </p>
            </div>
          </FadeWrapper>
        </div>
      </div>

      <div>
        <label className="font-medium text-black text-base">
          Verification status
        </label>
        <p className="text-xs text-gray-500 italic">
          Mark attributes as verified (optional)
        </p>

        <label className="flex items-center gap-2 mt-3 cursor-pointer">
          <input
            type="checkbox"
            name="emailVerified"
            checked={data.emailVerified}
            onChange={handleChange}
            className="checkbox border-gray-300 bg-transparent checked:bg-red-800 checked:border-red-800 checked:text-white"
          />
          <span className="text-base text-black">Email is already verified</span>
        </label>

        <label className="flex items-center gap-2 mt-2 cursor-pointer">
          <input
            type="checkbox"
            name="phoneVerified"
            checked={data.phoneVerified}
            onChange={handleChange}
            className="checkbox border-gray-300 bg-transparent checked:bg-red-800 checked:border-red-800 checked:text-white"
          />
          <span className="text-base text-black">Phone is already verified</span>
        </label>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <button type="button" onClick={onBack} className="btn btn-outline text-[#991b1b] border-[#991b1b] hover:bg-[#ffd700] hover:border-[#ffd700] hover:text-[#991b1b]">
          Back
        </button>
        <button type="button" className="btn bg-[#991b1b] text-white border-[#991b1b] hover:bg-[#ffd700] hover:border-[#ffd700] hover:text-[#991b1b]" onClick={() => console.log("FINAL DATA:", data)}>
          Create User
        </button>
      </div>
    </form>
  );
}