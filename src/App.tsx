import React from 'react';
import { AppBar, AppBarSection, AppBarSpacer } from '@progress/kendo-react-layout';
import { Drawer, DrawerContent, DrawerNavigation } from '@progress/kendo-react-layout';
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import { Card, CardBody, CardTitle } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';
import { useState } from 'react';

// Import our custom components
import WaterParameterDashboard from './components/WaterParameterDashboard';
import FishSpeciesDatabase from './components/FishSpeciesDatabase';
import ParameterCalculator from './components/ParameterCalculator';
import MaintenanceScheduler from './components/MaintenanceScheduler';
import EducationalContent from './components/EducationalContent';

const App: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [drawerExpanded, setDrawerExpanded] = useState(false);

  const handleTabSelect = (e: any) => {
    setSelectedTab(e.selected);
  };

  const toggleDrawer = () => {
    setDrawerExpanded(!drawerExpanded);
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        return <WaterParameterDashboard />;
      case 1:
        return <FishSpeciesDatabase />;
      case 2:
        return <ParameterCalculator />;
      case 3:
        return <MaintenanceScheduler />;
      case 4:
        return <EducationalContent />;
      default:
        return <WaterParameterDashboard />;
    }
  };

  return (
    <div className="app">
      <AppBar>
        <AppBarSection>
          <Button
            icon="menu"
            fillMode="flat"
            onClick={toggleDrawer}
            className="k-button k-button-flat"
          />
          <h1 className="k-appbar-title">Freshwater Aquarium Manager</h1>
        </AppBarSection>
        <AppBarSpacer />
        <AppBarSection>
          <span className="k-appbar-separator"></span>
          <span>Keep Your Fish Happy & Healthy</span>
        </AppBarSection>
      </AppBar>

      <div className="app-content">
        <Drawer
          expanded={drawerExpanded}
          mode="overlay"
          mini={false}
          onOverlayClick={toggleDrawer}
        >
          <DrawerNavigation>
            <ul className="k-drawer-list">
              <li className="k-drawer-item">
                <Button
                  fillMode="flat"
                  className="k-drawer-item-button"
                  onClick={() => { setSelectedTab(0); setDrawerExpanded(false); }}
                >
                  <span className="k-icon k-i-dashboard"></span>
                  Water Parameters
                </Button>
              </li>
              <li className="k-drawer-item">
                <Button
                  fillMode="flat"
                  className="k-drawer-item-button"
                  onClick={() => { setSelectedTab(1); setDrawerExpanded(false); }}
                >
                  <span className="k-icon k-i-table"></span>
                  Fish Database
                </Button>
              </li>
              <li className="k-drawer-item">
                <Button
                  fillMode="flat"
                  className="k-drawer-item-button"
                  onClick={() => { setSelectedTab(2); setDrawerExpanded(false); }}
                >
                  <span className="k-icon k-i-calculator"></span>
                  Calculator
                </Button>
              </li>
              <li className="k-drawer-item">
                <Button
                  fillMode="flat"
                  className="k-drawer-item-button"
                  onClick={() => { setSelectedTab(3); setDrawerExpanded(false); }}
                >
                  <span className="k-icon k-i-calendar"></span>
                  Maintenance
                </Button>
              </li>
              <li className="k-drawer-item">
                <Button
                  fillMode="flat"
                  className="k-drawer-item-button"
                  onClick={() => { setSelectedTab(4); setDrawerExpanded(false); }}
                >
                  <span className="k-icon k-i-book"></span>
                  Learn
                </Button>
              </li>
            </ul>
          </DrawerNavigation>
        </Drawer>

        <div className="main-content">
          <TabStrip selected={selectedTab} onSelect={handleTabSelect}>
            <TabStripTab title="Water Parameters">
              {renderContent()}
            </TabStripTab>
            <TabStripTab title="Fish Database">
              {renderContent()}
            </TabStripTab>
            <TabStripTab title="Calculator">
              {renderContent()}
            </TabStripTab>
            <TabStripTab title="Maintenance">
              {renderContent()}
            </TabStripTab>
            <TabStripTab title="Learn">
              {renderContent()}
            </TabStripTab>
          </TabStrip>
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
