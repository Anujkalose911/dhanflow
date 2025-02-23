import React from 'react';
import Joyride, { STATUS } from 'react-joyride';

const DashboardTutorial = ({ run, handleClose }) => {
  const steps = [
    {
      target: '.dashboard-header',
      content: 'Welcome to your Admin Dashboard! This is your control center for managing the entire system.',
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '.action-buttons',
      content: 'Quick access to important administrative functions like user management, audit logs, and reports.',
      placement: 'bottom',
    },
    {
      target: '.kpi-grid',
      content: 'Monitor key performance indicators at a glance. These cards show important metrics about your system.',
      placement: 'top',
    },
    {
      target: '.kpi-card',
      content: 'Each card represents a different metric. The number shows the current value, and the icon indicates the type of metric.',
      placement: 'right',
    },
    {
      target: '.recent-activity',
      content: 'Track all recent activities in the system. This helps you monitor changes and important events.',
      placement: 'top-start',  // Changed to top-start
      floaterProps: {
        disableAnimation: true,
        disableFlip: true,    // Prevent tooltip from flipping position
        offset: 15            // Adjust distance from target
      },
      spotlightPadding: 5,    // Adjust spotlight padding
      styles: {
        options: {
          zIndex: 10000       // Ensure tooltip stays on top
        }
      }
    },
    {
      target: '.btn-manage-users',
      content: 'Click here to manage user accounts, permissions, and roles.',
      placement: 'bottom',
    },
    {
      target: '.btn-audit-logs',
      content: 'Access detailed audit logs to track all system activities and changes.',
      placement: 'bottom',
    },
    {
      target: '.btn-download-reports',
      content: 'Generate and download various system reports and analytics.',
      placement: 'bottom',
    }
  ];

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      handleClose();
      localStorage.setItem('dashboard-tutorial-completed', 'true');
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
      scrollToFirstStep={false}  // Prevent automatic scrolling
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