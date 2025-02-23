import React from 'react';
import Joyride, { STATUS } from 'react-joyride';

const DashboardTutorial = ({ role, onComplete }) => {
  const getStepsByRole = () => {
    const commonSteps = [
      {
        target: '.dashboard-header',
        content: 'Welcome to your Dashboard! Here you can monitor all your key metrics and activities.',
        placement: 'bottom',
      },
      {
        target: '.kpi-container',
        content: 'These cards show your key performance indicators at a glance.',
        placement: 'bottom',
      },
      {
        target: '.activities-container',
        content: 'Track all recent activities and updates here.',
        placement: 'top',
      },
      {
        target: '.refresh-button',
        content: 'Click here to refresh your dashboard data.',
        placement: 'left',
      }
    ];

    const roleSpecificSteps = {
      operator: [
        {
          target: '.kpi-icon.uploaded',
          content: 'Monitor your total uploaded invoices for the month.',
          placement: 'bottom',
        },
        {
          target: '.kpi-icon.pending',
          content: 'Keep track of invoices waiting to be processed.',
          placement: 'bottom',
        },
        {
          target: '.kpi-icon.priority',
          content: 'High priority invoices that need immediate attention.',
          placement: 'bottom',
        }
      ],
      manager: [
        {
          target: '.kpi-trend',
          content: 'Track performance trends with these indicators.',
          placement: 'bottom',
        },
        {
          target: '.kpi-label-group',
          content: 'View detailed metrics and subtitles for each KPI.',
          placement: 'bottom',
        }
      ],
      admin: [
        {
          target: '.kpi-card',
          content: 'Monitor system-wide metrics and user activities.',
          placement: 'bottom',
        }
      ]
    };

    return [...commonSteps, ...(roleSpecificSteps[role] || [])];
  };

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      onComplete?.();
    }
  };

  return (
    <Joyride
      steps={getStepsByRole()}
      continuous={true}
      showProgress={true}
      showSkipButton={true}
      styles={{
        options: {
          primaryColor: '#1a73e8',
          zIndex: 1000,
        },
        tooltip: {
          fontSize: '14px',
        },
        buttonNext: {
          backgroundColor: '#1a73e8',
        },
        buttonBack: {
          marginRight: 10,
        }
      }}
      callback={handleJoyrideCallback}
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