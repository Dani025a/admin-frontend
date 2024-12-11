import React, { useEffect } from "react";
import ProfileInfo from "../../components/profile/profileInfo/profileInfo";
import SessionsList from "../../components/profile/sessionsList/sessionsList";
import useUserInfo from "../../hooks/useUserInfo";
import { useAuth } from "../../hooks/useAuth";
import { useSessionDeactivation } from "../../hooks/useSessionDeactivation";
import "./profile.css";
import LoadingScreen from "../../components/loadingScreen";

function Profile() {
  const { accessToken } = useAuth();
  const { user, loading, error, fetchUserInfo } = useUserInfo(accessToken);
  const { sessions, initializeSessions, deactivateSession } = useSessionDeactivation(
    accessToken!,
    fetchUserInfo
  );

  useEffect(() => {
    if (user?.sessions) {
      initializeSessions(user.sessions);
    }
  }, [user?.sessions, initializeSessions]);

  if (loading) {
    return <LoadingScreen></LoadingScreen>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="profile-page">
      {user && (
        <>
          <div className="profile-container">
            <ProfileInfo
              name={`${user.firstname} ${user.lastname}`}
              email={user.email}
              phone={user.phone}
              role={user.role}
            />
          </div>

          <div className="sessions-container">
            <SessionsList
              sessions={sessions.map((session) => ({
                id: session.id,
                device: session.deviceInfo,
                ipAddress: session.ipAddress,
                status: session.isActive ? "ACTIVATED" : "DEACTIVATED",
              }))}
              onDeleteSession={deactivateSession}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
