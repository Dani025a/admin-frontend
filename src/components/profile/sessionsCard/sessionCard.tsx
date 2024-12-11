import React from 'react';
import './sessionsCard.css';
import Button from '../../smallButton';

interface SessionCardProps {
  device: string;
  ipAddress: string;
  status: string;
  onDelete: () => void;
}

function SessionCard({ device, ipAddress, status, onDelete }: SessionCardProps) {
    return (
    <div className={`session-card ${status === 'DEACTIVATED' ? 'deactivated' : ''}`}>
      <p className="session-details">{`Device: ${device}`}</p>
      <p className="session-details">{`IP Address: ${ipAddress}`}</p>
      <p className="session-details">{`Status: ${status}`}</p>
      {status === 'ACTIVATED' && <Button variant="delete" type="submit" className="button-text" onClick={onDelete}>Delete session</Button>}
    </div>
  );
};

export default SessionCard;
