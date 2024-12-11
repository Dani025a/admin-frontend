import React, { useState } from "react";
import InputField from "../../components/inputField";
import Button from "../../components/button";
import { useForgotPassword } from "../../hooks/useForgotPassword";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./requestForgotPassword.css"
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { requestPasswordReset, isLoading } = useForgotPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Email cannot be empty");
      return;
    }

    try {
      await requestPasswordReset(email);
      toast.success("Email sent! Please check your inbox.");
      window.location.href = "/";
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form className="req-password-form" onSubmit={handleSubmit}>
      <div className="req-password-form-group">
        <label htmlFor="email" className="input-text">
          Email
        </label>
        <InputField
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="req-password-form-input"
        />
      </div>
      <div className="text-div">
  <p className="error-message">{error}</p>
</div>
      <Button type="submit" className="button-text">
        Send Email
      </Button>
    </form>
  );
}


export default ForgotPassword;
