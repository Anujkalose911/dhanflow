import React from 'react';
import Joyride, { STATUS } from 'react-joyride';

const DashboardTutorial = ({ run, handleClose }) => {
  const steps = [
    {
      target: '.dashboard',
      content: 'Welcome to your Auditor Dashboard! Let\'s take a quick tour.',
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '.kpi-grid',
      content: 'Here you can see key metrics like total audit logs, flagged invoices, and high priority items.',
      placement: 'bottom',
    },
    {
      target: '.kpi-card',
      content: 'Each card shows different metrics such as total audit logs, flagged invoices, and pending reviews.',
      placement: 'right',
    },
    {
      target: '.action-buttons',
      content: 'Quick access to important functions like viewing audit logs and flagged invoices.',
      placement: 'bottom',
    },
    {
      target: '.recent-activity',
      content: 'View your most recent audit activities and their current status.',
      placement: 'top-start',
      floaterProps: {
        disableAnimation: true,
        disableFlip: true,
        offset: 15
      },
      spotlightPadding: 5,
      styles: {
        options: {
          zIndex: 10000
        }
      }
    }
  ];

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      handleClose();
      localStorage.setItem('hasSeenAuditorDashboardTutorial', 'true');
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
      scrollToFirstStep={false}
      styles={{
        options: {
          primaryColor: '#1a73e8',
          zIndex: 1000,
          arrowColor: '#fff',
          backgroundColor: '#fff',
          textColor: '#333',
          overlayColor: 'rgba(0, 0, 0, 0.5)',
        },
        tooltip: {
          fontSize: '14px',
          padding: '20px',
        },
        buttonNext: {
          backgroundColor: '#1a73e8',
          fontSize: '14px',
          padding: '8px 16px',
        },
        buttonBack: {
          color: '#666',
          marginRight: 10,
        },
        buttonSkip: {
          color: '#666',
        },
        floater: {
          filter: 'drop-shadow(0 0 3px rgba(0,0,0,.3))'
        }
      }}
      floaterProps={{
        hideArrow: false,
        offset: 20,
      }}
      locale={{
        back: 'Previous',
        close: 'Close',
        last: 'Got it',
        next: 'Next',
        skip: 'Skip tutorial'
      }}
    />
  );
};

export default DashboardTutorial; 