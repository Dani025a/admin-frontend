import React, { useEffect, useState } from "react";
import "./form.css";
import InputField from "../../inputField";
import Button from "../../button";
import { useAuth } from "../../../hooks/useAuth";

function Form() {
  const { login, ensureValidAccessToken } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ensureValidAccessToken();
  }, [ensureValidAccessToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      console.log("Login successful!");
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email" className="input-text">
          Email
        </label>
        <InputField
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password" className="input-text">
          Password
        </label>
        <InputField
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="text-div">
  <a href="/forgot-password" className="link-text">
    Forgot Password
  </a>
  <p className="error-message">{error}</p>
</div>
      <Button variant="primary" type="submit" className="button-text">
        Log In
      </Button>
    </form>
  );
}

export default Form;
