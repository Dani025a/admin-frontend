import React, { useState } from 'react';
import './profileInfo.css';
import { useForgotPassword } from '../../../hooks/useForgotPassword';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProfileInfoProps {
  name: string;
  email: string;
  phone: string;
  role: string;
}

function ProfileInfo({ name, email, phone, role }: ProfileInfoProps) {
  const { requestPasswordReset, isLoading } = useForgotPassword();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleResetPassword = async () => {
    setIsProcessing(true);

    try {
      await requestPasswordReset(email);
      toast.success(`Email sent to ${email}`);
    } catch (error: any) {
      toast.error(`Failed to send email: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="profile-info">
      <h2 className="title">Profile</h2>
      <p className="profile-detail">{`Name: ${name}`}</p>
      <p className="profile-detail">{`Email: ${email}`}</p>
      <p className="profile-detail">{`Phone Number: ${phone}`}</p>
      <p className="profile-detail">{`Role: ${role}`}</p>
      <button
        className="reset-password-button"
        onClick={handleResetPassword}
        disabled={isProcessing || isLoading}
      >
        {isProcessing ? 'Processing...' : 'RESET PASSWORD'}
      </button>
    </div>
  );
};

export default ProfileInfo;
