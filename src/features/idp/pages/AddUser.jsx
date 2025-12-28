import { useState } from "react";
import IdpLayout from "../layouts/IdpLayout";
import AddUserCard from "../components/add-user/AddUserCard";
import AddUserDetails from "../components/add-user/AddUserDetails";
import AddUserInvitation from "../components/add-user/AddUserInvitation";
import FadeWrapper from "../../../components/FadeWrapper";

export default function AddUser() {
  const [step, setStep] = useState(1);

  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
    givenName: "",
    middleName: "",
    surname: "",
    inviteMode: "invite",
    delivery: "email",
    emailVerified: false,
    phoneVerified: false,
    tempPassword: "",
  });

  const userIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-[#B91C1C] w-7 h-7">
      <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
    </svg>
  );

  const lockIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#B91C1C]">
      <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
    </svg>
  );

  return (
    <IdpLayout>
      <div className="flex justify-center mt-8">
        <AddUserCard
          title={step === 1 ? "Add User" : "Invitation & Access"}
          icon={step === 1 ? userIcon : lockIcon}
        >
          <FadeWrapper isVisible={step === 1} keyId="step1">
            <AddUserDetails data={data} setData={setData} onNext={() => setStep(2)} />
          </FadeWrapper>

          <FadeWrapper isVisible={step === 2} keyId="step2">
            <AddUserInvitation data={data} setData={setData} onBack={() => setStep(1)} />
          </FadeWrapper>
        </AddUserCard>
      </div>
    </IdpLayout>
  );
}