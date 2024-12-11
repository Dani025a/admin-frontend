import React from 'react';
import SessionCard from '../sessionsCard/sessionCard';
import './sessionsList.css';

interface Session {
  id: string;
  device: string;
  ipAddress: string;
  status: string;
}

interface SessionsListProps {
  sessions: Session[];
  onDeleteSession: (id: string) => void;
}

function SessionsList({ sessions, onDeleteSession }: SessionsListProps) {
  const sortedSessions = [...sessions].sort((a, b) =>
    a.status === 'ACTIVATED' && b.status === 'DEACTIVATED' ? -1 : 1
  );

  return (
    <div className="sessions-list">
      <h2 className="title">Sessions</h2>
      {sortedSessions.map((session) => (
        <SessionCard
          key={session.id}
          device={session.device}
          ipAddress={session.ipAddress}
          status={session.status}
          onDelete={() => onDeleteSession(session.id)}
        />
      ))}
    </div>
  );
}

export default SessionsList;
