import React from 'react';
import RaceControlInfo from './RaceControlInfo';

const ConditionalRaceControlInfo = ({ sessionKey, flag, startDate, endDate }) => {
  if (!startDate || !endDate) {
    return null;
  }

  return <RaceControlInfo sessionKey={sessionKey} flag={flag} />;
};

export default ConditionalRaceControlInfo;
