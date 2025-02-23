import React from 'react';
import Joyride, { STATUS } from 'react-joyride';

const DashboardTutorial = ({ run, handleClose }) => {
  const steps = [
    {
      target: '.dashboard',
      content: 'Welcome to your Manager Dashboard! Let\'s take a quick tour.',
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '.kpi-grid',
      content: 'Here you can see key metrics for invoices above your threshold amount.',
      placement: 'bottom',
    },
    {
      target: '.action-buttons',
      content: 'Quick access to important functions like reviewing invoices and generating reports.',
      placement: 'bottom',
    },
    {
      target: '.recent-activity',
      content: 'View your most recent activities and high-value invoices.',
      placement: 'top',
    }
  ];

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      handleClose();
      localStorage.setItem('hasSeenManagerDashboardTutorial', 'true');
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