import { useState, useEffect } from "react";
import ChangePasswordStep from "../../../../components/ChangePasswordStep";
import OtpVerificationStep from "../../../../components/OtpVerificationStep";
import SuccessStep from "../../../../components/SuccessStep";

export default function ChangePasswordModal({ isOpen, onClose, addAuditLog, setToastMessage }) {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (step !== 2) return;
        setTimer(60);
        setCanResend(false);
        const interval = setInterval(() => {
            setTimer((t) => {
                if (t <= 1) {
                    clearInterval(interval);
                    setCanResend(true);
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [step]);

    useEffect(() => {
        if (!isOpen) {
            setStep(1);
            setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
            setOtp(["", "", "", "", "", ""]);
        }
    }, [isOpen]);

    useEffect(() => {
        if (step === 3) {
            const showToast = setTimeout(() => {
                setToastMessage("Password changed successfully!");

                const hideToast = setTimeout(() => {
                    setToastMessage("");
                }, 2500);

                return () => clearTimeout(hideToast);
            }, 400);

            return () => clearTimeout(showToast);
        }
    }, [step, setToastMessage]);

    const verifyOTP = () => {
        const code = otp.join("");
        if (code.length !== 6 || !/^\d+$/.test(code)) return;

        addAuditLog({
            timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
            action: "PASSWORD_CHANGE",
            details: "Password changed successfully",
            color: "yellow",
        });

        setStep(3); // SuccessStep will mount next
    };

    if (!isOpen) return null;

    return (
        <dialog className="modal modal-open">
            <div className="modal-box rounded-3xl max-w-md p-0">
                {step === 1 && (
                    <ChangePasswordStep 
                        form={form}
                        setForm={setForm}
                        onClose={onClose}
                        onNext={() => setStep(2)}
                    />
                )}
                {step === 2 && (
                    <OtpVerificationStep
                        otp={otp}
                        setOtp={setOtp}
                        timer={timer}
                        canResend={canResend}
                        onResend={() => setStep(1)}
                        onBack={() => setStep(1)}
                        onVerify={verifyOTP}
                        onClose={onClose}
                    />
                )}
                {step === 3 && (
                    <SuccessStep onClose={onClose} />
                )}
            </div>
        </dialog>
    );
}