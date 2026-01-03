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

  return (
    <IdpLayout>
      <div className="flex justify-center mt-8">
        <AddUserCard
          title={step === 1 ? "Add User" : "Invitation & Access"}
          description={
            step === 1 
            ? "Enter basic user information to create an account." 
            : "Set invitation method and access credentials."
          }
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