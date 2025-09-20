import React, { useState } from 'react';
import { AppBar, AppBarSection, AppBarSpacer } from '@progress/kendo-react-layout';
import { Drawer, DrawerContent, DrawerNavigation } from '@progress/kendo-react-layout';
import { Card, CardBody, CardTitle } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';
import styles from './styles/App.module.css';

// Import our custom components
import WaterParameterDashboard from './components/WaterParameterDashboard';
import FishSpeciesDatabase from './components/FishSpeciesDatabase';
import ParameterCalculator from './components/ParameterCalculator';
import MaintenanceScheduler from './components/MaintenanceScheduler';
import EducationalContent from './components/EducationalContent';

// Define navigation types for better type safety
type NavigationItem = 'dashboard' | 'fish-database' | 'calculator' | 'maintenance' | 'learn';

interface NavigationState {
  activeItem: NavigationItem;
  sidebarCollapsed: boolean;
}

const App: React.FC = () => {
  const [activeItem, setActiveItem] = useState<NavigationItem>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  const toggleSidebar = (): void => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleNavigation = (item: NavigationItem): void => {
    setActiveItem(item);
  };

  const renderContent = (): JSX.Element => {
    switch (activeItem) {
      case 'dashboard':
        return <WaterParameterDashboard />;
      case 'fish-database':
        return <FishSpeciesDatabase />;
      case 'calculator':
        return <ParameterCalculator />;
      case 'maintenance':
        return <MaintenanceScheduler />;
      case 'learn':
        return <EducationalContent />;
      default:
        return <WaterParameterDashboard />;
    }
  };

  const getPageTitle = (): string => {
    switch (activeItem) {
      case 'dashboard':
        return 'Water Parameters Dashboard';
      case 'fish-database':
        return 'Fish Species Database';
      case 'calculator':
        return 'Parameter Calculator';
      case 'maintenance':
        return 'Maintenance Scheduler';
      case 'learn':
        return 'Educational Content';
      default:
        return 'Freshwater Aquarium Manager';
    }
  };

  return (
    <div className={styles.app}>
      {/* Top Navigation Bar */}
      <AppBar>
        <AppBarSection>
          <Button
            icon="menu"
            fillMode="flat"
            onClick={toggleSidebar}
            className="k-button k-button-flat"
            style={{ color: 'white' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 className={styles.appBarTitle}>{getPageTitle()}</h1>
            <span className={styles.appBarSubtitle}>Freshwater Aquarium Manager</span>
          </div>
        </AppBarSection>
        <AppBarSpacer />
        <AppBarSection>
          <div className={styles.appBarActions}>
            <span className={styles.appBarSeparator}></span>
            <div className={styles.appBarStatus}>
              <div className={styles.statusIndicator}></div>
              <span>System Online</span>
            </div>
            <span className={styles.appBarSeparator}></span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Keep Your Fish Happy & Healthy</span>
          </div>
        </AppBarSection>
      </AppBar>

      <div className={styles.appContent}>
        {/* Sidebar Navigation */}
        <Drawer
          expanded={!sidebarCollapsed}
          mode="push"
          mini={false}
          onOverlayClick={toggleSidebar}
          className={styles.sidebar}
        >
          <DrawerNavigation>
            <div className={styles.sidebarHeader}>
              <h3>Navigation</h3>
            </div>
            <ul className={styles.sidebarList}>
              <li className={styles.sidebarItem}>
                <Button
                  fillMode="flat"
                  className={`${styles.sidebarButton} ${activeItem === 'dashboard' ? styles.active : ''}`}
                  onClick={() => handleNavigation('dashboard')}
                >
                  <span className={`k-icon k-i-dashboard ${styles.icon}`}></span>
                  <span className={styles.buttonText}>Water Parameters</span>
                </Button>
              </li>
              <li className={styles.sidebarItem}>
                <Button
                  fillMode="flat"
                  className={`${styles.sidebarButton} ${activeItem === 'fish-database' ? styles.active : ''}`}
                  onClick={() => handleNavigation('fish-database')}
                >
                  <span className={`k-icon k-i-table ${styles.icon}`}></span>
                  <span className={styles.buttonText}>Fish Database</span>
                </Button>
              </li>
              <li className={styles.sidebarItem}>
                <Button
                  fillMode="flat"
                  className={`${styles.sidebarButton} ${activeItem === 'calculator' ? styles.active : ''}`}
                  onClick={() => handleNavigation('calculator')}
                >
                  <span className={`k-icon k-i-calculator ${styles.icon}`}></span>
                  <span className={styles.buttonText}>Calculator</span>
                </Button>
              </li>
              <li className={styles.sidebarItem}>
                <Button
                  fillMode="flat"
                  className={`${styles.sidebarButton} ${activeItem === 'maintenance' ? styles.active : ''}`}
                  onClick={() => handleNavigation('maintenance')}
                >
                  <span className={`k-icon k-i-calendar ${styles.icon}`}></span>
                  <span className={styles.buttonText}>Maintenance</span>
                </Button>
              </li>
              <li className={styles.sidebarItem}>
                <Button
                  fillMode="flat"
                  className={`${styles.sidebarButton} ${activeItem === 'learn' ? styles.active : ''}`}
                  onClick={() => handleNavigation('learn')}
                >
                  <span className={`k-icon k-i-book ${styles.icon}`}></span>
                  <span className={styles.buttonText}>Learn</span>
                </Button>
              </li>
            </ul>
          </DrawerNavigation>
        </Drawer>

        {/* Main Content Area */}
        <div className={styles.mainContent}>
          <div className={styles.contentWrapper}>
            {renderContent()}
          </div>
        </div>
      </div>

      <NotificationGroup
        style={{
          right: 0,
          top: 50,
          alignItems: "flex-start",
          flexWrap: "wrap-reverse"
        }}
      />
    </div>
  );
};

export default App;
