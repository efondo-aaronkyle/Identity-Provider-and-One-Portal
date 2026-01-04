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

  const title = step === 1 ? "Add User" : "Invitation & Access";
  const description =
    step === 1
      ? "Enter basic user information to create an account."
      : "Set invitation method and access credentials.";

  return (
    <IdpLayout>
      <div className="flex flex-col items-center gap-6 px-3 sm:px-6">
        <div className="max-w-3xl w-full mx-auto">
          <h1 className="text-[#991b1b] text-2xl sm:text-4xl font-bold">
            {title}
          </h1>
          <p className="text-sm text-gray-600">
            {description}
          </p>
        </div>
        <AddUserCard>
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