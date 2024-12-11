import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useResetPassword } from "../../hooks/usePasswordReset";
import { useAuth } from "../../hooks/useAuth";
import InputField from "../../components/inputField";
import Button from "../../components/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./resetPassword.css";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const { resetPassword, isLoading, error } = useResetPassword();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!password || !confirmPassword) {
      setValidationError("Both password fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    if (!token) {
      setValidationError("Invalid or missing token");
      return;
    }

    await resetPassword(token, password);

    if (!error) {
      toast.success("Password reset successfully!");

      if (isAuthenticated) {
        navigate("/profile");
      } else {
        navigate("/login");
      }
    }
  };

  return (
    <>
      <form className="reset-password-form" onSubmit={handleSubmit}>
        <div className="reset-password-form-group">
          <label htmlFor="password" className="input-text">
            New Password
          </label>
          <InputField
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="reset-password-form-input"
          />
        </div>
        <div className="reset-password-form-group">
          <label htmlFor="confirmPassword" className="input-text">
            Confirm Password
          </label>
          <InputField
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="reset-password-form-input"
          />
        </div>
        <div className="text-div">
          {validationError && <p className="error-message">{validationError}</p>}
          {error && <p className="error-message">{error}</p>}
        </div>
        <Button
          type="submit"
          className="button-text"
          disabled={isLoading || !password || !confirmPassword}
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </>
  );
}

export default ResetPassword;
