import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle } from '@progress/kendo-react-layout';
import { CircularGauge, RadialGauge, LinearGauge } from '@progress/kendo-react-gauges';
import { Chart, ChartSeries, ChartSeriesItem, ChartCategoryAxis, ChartCategoryAxisItem, ChartValueAxis, ChartValueAxisItem, ChartLegend, ChartTooltip } from '@progress/kendo-react-charts';
import { Notification } from '@progress/kendo-react-notification';
import { Button } from '@progress/kendo-react-buttons';

interface WaterParameter {
  name: string;
  value: number;
  unit: string;
  optimalMin: number;
  optimalMax: number;
  current: number;
  status: 'optimal' | 'warning' | 'danger';
  description: string;
}

const WaterParameterDashboard: React.FC = () => {
  const [parameters, setParameters] = useState<WaterParameter[]>([
    {
      name: 'pH Level',
      value: 7.2,
      unit: '',
      optimalMin: 6.5,
      optimalMax: 7.5,
      current: 7.2,
      status: 'optimal',
      description: 'Measures acidity/alkalinity. Most freshwater fish prefer 6.5-7.5'
    },
    {
      name: 'Temperature',
      value: 76,
      unit: '°F',
      optimalMin: 72,
      optimalMax: 82,
      current: 76,
      status: 'optimal',
      description: 'Water temperature affects fish metabolism and health'
    },
    {
      name: 'Ammonia',
      value: 0.1,
      unit: 'ppm',
      optimalMin: 0,
      optimalMax: 0.25,
      current: 0.1,
      status: 'optimal',
      description: 'Toxic to fish. Should be 0 ppm in established tanks'
    },
    {
      name: 'Nitrite',
      value: 0.05,
      unit: 'ppm',
      optimalMin: 0,
      optimalMax: 0.5,
      current: 0.05,
      status: 'optimal',
      description: 'Also toxic. Should be 0 ppm in established tanks'
    },
    {
      name: 'Nitrate',
      value: 15,
      unit: 'ppm',
      optimalMin: 0,
      optimalMax: 40,
      current: 15,
      status: 'optimal',
      description: 'Less toxic but should be kept below 40 ppm'
    },
    {
      name: 'General Hardness',
      value: 8,
      unit: 'dGH',
      optimalMin: 4,
      optimalMax: 12,
      current: 8,
      status: 'optimal',
      description: 'Measures calcium and magnesium levels'
    }
  ]);

  const [notifications, setNotifications] = useState<any[]>([]);

  const getStatusClass = (status: string) => {
    return `parameter-status ${status}`;
  };

  const getGaugeColor = (status: string) => {
    switch (status) {
      case 'optimal': return '#4caf50';
      case 'warning': return '#ff9800';
      case 'danger': return '#f44336';
      default: return '#2196f3';
    }
  };

  const updateParameter = (index: number, newValue: number) => {
    const updatedParams = [...parameters];
    const param = updatedParams[index];
    param.current = newValue;
    
    // Determine status based on optimal range
    if (newValue >= param.optimalMin && newValue <= param.optimalMax) {
      param.status = 'optimal';
    } else if (newValue < param.optimalMin - (param.optimalMax - param.optimalMin) * 0.2 || 
               newValue > param.optimalMax + (param.optimalMax - param.optimalMin) * 0.2) {
      param.status = 'danger';
    } else {
      param.status = 'warning';
    }
    
    setParameters(updatedParams);

    // Show notification for dangerous levels
    if (param.status === 'danger') {
      setNotifications(prev => [...prev, {
        id: Date.now(),
        type: 'error',
        content: `⚠️ ${param.name} is at dangerous levels! Current: ${newValue}${param.unit}`
      }]);
    }
  };

  const historicalData = [
    { date: '2024-01-01', pH: 7.0, temp: 75, ammonia: 0.2, nitrite: 0.1, nitrate: 20 },
    { date: '2024-01-02', pH: 7.1, temp: 76, ammonia: 0.15, nitrite: 0.08, nitrate: 18 },
    { date: '2024-01-03', pH: 7.2, temp: 76, ammonia: 0.1, nitrite: 0.05, nitrate: 15 },
    { date: '2024-01-04', pH: 7.3, temp: 77, ammonia: 0.08, nitrite: 0.03, nitrate: 12 },
    { date: '2024-01-05', pH: 7.2, temp: 76, ammonia: 0.1, nitrite: 0.05, nitrate: 15 }
  ];

  return (
    <div className="aquarium-theme">
      <div className="fade-in">
        <h1 style={{ marginBottom: '20px', color: '#1976d2', fontSize: '28px' }}>
          🐠 Water Parameter Dashboard
        </h1>
        
        {/* Current Parameters Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          {parameters.map((param, index) => (
            <Card key={param.name} className="parameter-card">
              <CardTitle>{param.name}</CardTitle>
              <CardBody>
                <div className="parameter-gauge">
                  <div style={{ position: 'relative' }}>
                    <CircularGauge
                      value={param.current}
                      scale={{
                        min: param.optimalMin - (param.optimalMax - param.optimalMin) * 0.5,
                        max: param.optimalMax + (param.optimalMax - param.optimalMin) * 0.5
                      }}
                      color={getGaugeColor(param.status)}
                    />
                    <div style={{ 
                      position: 'absolute', 
                      top: '50%', 
                      left: '50%', 
                      transform: 'translate(-50%, -50%)', 
                      textAlign: 'center',
                      pointerEvents: 'none'
                    }}>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: getGaugeColor(param.status) }}>
                        {param.current}{param.unit}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        Optimal: {param.optimalMin}-{param.optimalMax}{param.unit}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div style={{ marginTop: '15px' }}>
                  <div className={getStatusClass(param.status)}>
                    {param.status.toUpperCase()}
                  </div>
                  <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
                    {param.description}
                  </p>
                  
                  <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                    <Button
                      size="small"
                      onClick={() => updateParameter(index, param.current - 0.1)}
                      disabled={param.current <= 0}
                    >
                      -
                    </Button>
                    <Button
                      size="small"
                      onClick={() => updateParameter(index, param.current + 0.1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Historical Data Chart */}
        <Card className="chart-container">
          <CardTitle>📊 Parameter Trends (Last 5 Days)</CardTitle>
          <CardBody>
            <Chart>
              <ChartValueAxis>
                <ChartValueAxisItem title={{ text: 'pH Level' }} min={6.5} max={7.5} />
                <ChartValueAxisItem name="temp" title={{ text: 'Temperature (°F)' }} min={70} max={80} />
                <ChartValueAxisItem name="ammonia" title={{ text: 'Ammonia (ppm)' }} min={0} max={0.5} />
              </ChartValueAxis>
              <ChartCategoryAxis>
                <ChartCategoryAxisItem categories={historicalData.map(d => d.date)} />
              </ChartCategoryAxis>
              <ChartSeries>
                <ChartSeriesItem
                  type="line"
                  data={historicalData.map(d => d.pH)}
                  name="pH Level"
                  color="#2196f3"
                />
                <ChartSeriesItem
                  type="line"
                  data={historicalData.map(d => d.temp)}
                  name="Temperature"
                  color="#ff9800"
                  axis="temp"
                />
                <ChartSeriesItem
                  type="line"
                  data={historicalData.map(d => d.ammonia)}
                  name="Ammonia"
                  color="#f44336"
                  axis="ammonia"
                />
              </ChartSeries>
              <ChartLegend position="top" />
              <ChartTooltip />
            </Chart>
          </CardBody>
        </Card>

        {/* Quick Actions */}
        <Card className="parameter-card">
          <CardTitle>⚡ Quick Actions</CardTitle>
          <CardBody>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <Button
                themeColor="primary"
                onClick={() => {
                  setNotifications(prev => [...prev, {
                    id: Date.now(),
                    type: 'success',
                    content: '✅ Water test completed! All parameters are within optimal ranges.'
                  }]);
                }}
              >
                🧪 Test Water Now
              </Button>
              <Button
                themeColor="primary"
                onClick={() => {
                  setNotifications(prev => [...prev, {
                    id: Date.now(),
                    type: 'info',
                    content: '📝 Water change reminder set for next week'
                  }]);
                }}
              >
                💧 Schedule Water Change
              </Button>
              <Button
                themeColor="primary"
                onClick={() => {
                  setNotifications(prev => [...prev, {
                    id: Date.now(),
                    type: 'info',
                    content: '📊 Parameter report generated and saved'
                  }]);
                }}
              >
                📊 Generate Report
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Notifications */}
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            type={notification.type}
            closable={true}
            onClose={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
          >
            {notification.content}
          </Notification>
        ))}
      </div>
    </div>
  );
};

export default WaterParameterDashboard;
