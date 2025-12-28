import LoginHeader from "../components/LoginHeader";
import LoginFooter from "../components/LoginFooter";

export default function AuthLayout({ children }) {
  return (
    <div>
      <LoginHeader />
      <main className="hero min-h-screen" style={{ backgroundImage: "url(/assets/images/PUPTbg1.jpg)" }}>
        {children}
      </main>
      <LoginFooter />
    </div>
  );
}
