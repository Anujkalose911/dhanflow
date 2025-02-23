import React from 'react';
import Joyride, { STATUS } from 'react-joyride';

const DashboardTutorial = ({ run, handleClose }) => {
  const steps = [
    {
      target: '.dashboard',
      content: 'Welcome to your Operator Dashboard! Let\'s take a quick tour.',
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '.kpi-grid',
      content: 'Here you can see key metrics like total invoices, pending uploads, and high priority items.',
      placement: 'bottom',
    },
    {
      target: '.action-buttons',
      content: 'Quick access to important functions like uploading new invoices and viewing existing ones.',
      placement: 'bottom',
    },
    {
      target: '.recent-activity',
      content: 'View your most recent activities and their current status.',
      placement: 'top',
    }
  ];

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      handleClose();
      localStorage.setItem('hasSeenOperatorDashboardTutorial', 'true');
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous={true}
      showProgress={true}
      showSkipButton={true}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: '#1a73e8',
          zIndex: 1000,
        },
      }}
    />
  );
};

export default DashboardTutorial; 