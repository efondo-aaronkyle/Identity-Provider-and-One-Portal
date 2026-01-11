import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IdpLayout from "../layouts/IdpLayout";
import AddUserCard from "../components/add-user/AddUserCard";
import AddUserDetails from "../components/add-user/AddUserDetails";
import AddUserInvitation from "../components/add-user/AddUserInvitation";
import FadeWrapper from "../../../components/FadeWrapper";
import { initialRoles } from "../data/RolesData";

export default function AddUser() {
  const navigate = useNavigate();
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
    roleIds: [],
  });

  const title = step === 1 ? "Add User" : "Invitation & Access";
  const description =
    step === 1
      ? "Enter basic user information to create an account."
      : "Set invitation method and access credentials.";

  const handleCreateUser = () => {
    if (!data.roleIds || data.roleIds.length === 0) {
      alert("Please select at least one role");
      return;
    }

    const selectedRoles = initialRoles
      .filter(r => data.roleIds.includes(r.id))
      .map(r => r.role_name);

    const newUser = {
      id: `usr_${Date.now()}`, // temporary ID
      username: data.username || `user${Date.now()}`,
      email: data.email,
      name: `${data.givenName} ${data.middleName ? data.middleName + " " : ""}${data.surname}`,
      roleIds: data.roleIds,
      roles: selectedRoles,
      status: "ACTIVE",
      emailVerified: data.emailVerified,
      createdAt: new Date().toISOString().split("T")[0],
    };
    navigate("/idp/user-pool", {
      state: {
        newUser,
        successMessage: "User successfully created!",
      },
    });
  };

  return (
    <IdpLayout>
      <div className="flex flex-col items-center gap-6 px-3 sm:px-6">
        <div className="max-w-md md:max-w-lg lg:max-w-6xl w-full mx-auto">
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
            <AddUserInvitation data={data} setData={setData} onBack={() => setStep(1)} onSubmit={handleCreateUser} />
          </FadeWrapper>
        </AddUserCard>
      </div>
  </IdpLayout>
  );
}