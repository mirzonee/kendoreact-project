import React, { useState } from 'react';
import { Card, CardBody, CardTitle } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { NumericTextBox } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Chart, ChartSeries, ChartSeriesItem, ChartCategoryAxis, ChartCategoryAxisItem, ChartValueAxis, ChartValueAxisItem, ChartLegend } from '@progress/kendo-react-charts';
import { Notification } from '@progress/kendo-react-notification';

interface TankInfo {
  length: number;
  width: number;
  height: number;
  unit: 'inches' | 'centimeters';
  shape: 'rectangular' | 'cylindrical' | 'hexagonal';
}

interface WaterParameters {
  currentPH: number;
  targetPH: number;
  currentTemp: number;
  targetTemp: number;
  currentHardness: number;
  targetHardness: number;
  currentAmmonia: number;
  currentNitrite: number;
  currentNitrate: number;
}

const ParameterCalculator: React.FC = () => {
  const [tankInfo, setTankInfo] = useState<TankInfo>({
    length: 24,
    width: 12,
    height: 16,
    unit: 'inches',
    shape: 'rectangular'
  });

  const [waterParams, setWaterParams] = useState<WaterParameters>({
    currentPH: 7.0,
    targetPH: 7.2,
    currentTemp: 75,
    targetTemp: 78,
    currentHardness: 8,
    targetHardness: 10,
    currentAmmonia: 0.1,
    currentNitrite: 0.05,
    currentNitrate: 20
  });

  const [notifications, setNotifications] = useState<any[]>([]);

  const calculateTankVolume = () => {
    let volume = 0;
    const { length, width, height, unit, shape } = tankInfo;
    
    // Convert to inches if needed
    const l = unit === 'centimeters' ? length / 2.54 : length;
    const w = unit === 'centimeters' ? width / 2.54 : width;
    const h = unit === 'centimeters' ? height / 2.54 : height;
    
    switch (shape) {
      case 'rectangular':
        volume = l * w * h;
        break;
      case 'cylindrical':
        volume = Math.PI * Math.pow(l / 2, 2) * h;
        break;
      case 'hexagonal':
        volume = (3 * Math.sqrt(3) / 2) * Math.pow(l / 2, 2) * h;
        break;
    }
    
    // Convert to gallons
    return volume / 231;
  };

  const calculatePHAdjustment = () => {
    const difference = waterParams.targetPH - waterParams.currentPH;
    const volume = calculateTankVolume();
    
    if (Math.abs(difference) < 0.1) {
      return { action: 'No adjustment needed', amount: 0, product: '' };
    }
    
    if (difference > 0) {
      // Need to increase pH
      const bakingSodaAmount = (difference * volume * 0.5).toFixed(2);
      return {
        action: 'Increase pH',
        amount: parseFloat(bakingSodaAmount),
        product: 'Baking Soda (teaspoons)',
        warning: 'Add gradually over several hours'
      };
    } else {
      // Need to decrease pH
      const peatAmount = (Math.abs(difference) * volume * 0.25).toFixed(2);
      return {
        action: 'Decrease pH',
        amount: parseFloat(peatAmount),
        product: 'Peat Moss (cups)',
        warning: 'Use in filter or as substrate'
      };
    }
  };

  const calculateTemperatureAdjustment = () => {
    const difference = waterParams.targetTemp - waterParams.currentTemp;
    const volume = calculateTankVolume();
    
    if (Math.abs(difference) < 1) {
      return { action: 'No adjustment needed', time: 0 };
    }
    
    const heatingRate = 2; // degrees per hour for typical heater
    const time = Math.abs(difference) / heatingRate;
    
    return {
      action: difference > 0 ? 'Increase temperature' : 'Decrease temperature',
      time: time.toFixed(1),
      warning: 'Adjust gradually to avoid shocking fish'
    };
  };

  const calculateWaterChange = () => {
    const ammonia = waterParams.currentAmmonia;
    const nitrite = waterParams.currentNitrite;
    const nitrate = waterParams.currentNitrate;
    
    let changePercentage = 0;
    let reason = '';
    
    if (ammonia > 0.25) {
      changePercentage = 50;
      reason = 'High ammonia levels detected';
    } else if (nitrite > 0.5) {
      changePercentage = 40;
      reason = 'High nitrite levels detected';
    } else if (nitrate > 40) {
      changePercentage = 30;
      reason = 'High nitrate levels detected';
    } else if (nitrate > 20) {
      changePercentage = 20;
      reason = 'Moderate nitrate levels';
    } else {
      changePercentage = 10;
      reason = 'Regular maintenance';
    }
    
    const volume = calculateTankVolume();
    const changeAmount = (volume * changePercentage / 100).toFixed(1);
    
    return {
      percentage: changePercentage,
      amount: parseFloat(changeAmount),
      reason,
      volume
    };
  };

  const generateReport = () => {
    const volume = calculateTankVolume();
    const phAdjustment = calculatePHAdjustment();
    const tempAdjustment = calculateTemperatureAdjustment();
    const waterChange = calculateWaterChange();
    
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'success',
      content: `📊 Water parameter report generated for ${volume.toFixed(1)} gallon tank`
    }]);
    
    return {
      volume,
      phAdjustment,
      tempAdjustment,
      waterChange
    };
  };

  const chartData = [
    { parameter: 'pH', current: waterParams.currentPH, target: waterParams.targetPH, optimal: 7.0 },
    { parameter: 'Temp', current: waterParams.currentTemp, target: waterParams.targetTemp, optimal: 76 },
    { parameter: 'Hardness', current: waterParams.currentHardness, target: waterParams.targetHardness, optimal: 8 },
    { parameter: 'Ammonia', current: waterParams.currentAmmonia, target: 0, optimal: 0 },
    { parameter: 'Nitrite', current: waterParams.currentNitrite, target: 0, optimal: 0 },
    { parameter: 'Nitrate', current: waterParams.currentNitrate, target: 20, optimal: 20 }
  ];

  const report = generateReport();

  return (
    <div className="aquarium-theme">
      <div className="fade-in">
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '24px',
          padding: '20px',
          background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(255, 152, 0, 0.15)'
        }}>
          <div style={{ 
            fontSize: '32px', 
            marginRight: '16px',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
          }}>🧮</div>
          <div>
            <h1 style={{ 
              margin: 0, 
              color: '#e65100', 
              fontSize: '28px',
              fontWeight: '700',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}>
              Water Parameter Calculator
            </h1>
            <p style={{ 
              margin: '4px 0 0 0', 
              color: '#f57c00', 
              fontSize: '16px',
              fontWeight: '500'
            }}>
              Calculate optimal water parameters and adjustments
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
          {/* Tank Information */}
          <Card className="calculator-form">
            <CardTitle>📏 Tank Information</CardTitle>
            <CardBody>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Shape:</label>
                  <DropDownList
                    data={['rectangular', 'cylindrical', 'hexagonal']}
                    value={tankInfo.shape}
                    onChange={(e) => setTankInfo({ ...tankInfo, shape: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Unit:</label>
                  <DropDownList
                    data={['inches', 'centimeters']}
                    value={tankInfo.unit}
                    onChange={(e) => setTankInfo({ ...tankInfo, unit: e.target.value })}
                  />
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Length:</label>
                  <NumericTextBox
                    value={tankInfo.length}
                    onChange={(e) => setTankInfo({ ...tankInfo, length: e.target.value || 0 })}
                    min={1}
                    max={200}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Width:</label>
                  <NumericTextBox
                    value={tankInfo.width}
                    onChange={(e) => setTankInfo({ ...tankInfo, width: e.target.value || 0 })}
                    min={1}
                    max={200}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Height:</label>
                  <NumericTextBox
                    value={tankInfo.height}
                    onChange={(e) => setTankInfo({ ...tankInfo, height: e.target.value || 0 })}
                    min={1}
                    max={200}
                  />
                </div>
              </div>
              
              <div style={{ 
                background: '#e3f2fd', 
                padding: '15px', 
                borderRadius: '8px', 
                textAlign: 'center',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1976d2'
              }}>
                Tank Volume: {calculateTankVolume().toFixed(1)} gallons
              </div>
            </CardBody>
          </Card>

          {/* Current Water Parameters */}
          <Card className="calculator-form">
            <CardTitle>💧 Current Water Parameters</CardTitle>
            <CardBody>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>pH Level:</label>
                  <NumericTextBox
                    value={waterParams.currentPH}
                    onChange={(e) => setWaterParams({ ...waterParams, currentPH: e.target.value || 0 })}
                    min={6.0}
                    max={8.5}
                    format="n2"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Target pH:</label>
                  <NumericTextBox
                    value={waterParams.targetPH}
                    onChange={(e) => setWaterParams({ ...waterParams, targetPH: e.target.value || 0 })}
                    min={6.0}
                    max={8.5}
                    format="n2"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Temperature (°F):</label>
                  <NumericTextBox
                    value={waterParams.currentTemp}
                    onChange={(e) => setWaterParams({ ...waterParams, currentTemp: e.target.value || 0 })}
                    min={65}
                    max={90}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Target Temp (°F):</label>
                  <NumericTextBox
                    value={waterParams.targetTemp}
                    onChange={(e) => setWaterParams({ ...waterParams, targetTemp: e.target.value || 0 })}
                    min={65}
                    max={90}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Hardness (dGH):</label>
                  <NumericTextBox
                    value={waterParams.currentHardness}
                    onChange={(e) => setWaterParams({ ...waterParams, currentHardness: e.target.value || 0 })}
                    min={0}
                    max={30}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Target Hardness:</label>
                  <NumericTextBox
                    value={waterParams.targetHardness}
                    onChange={(e) => setWaterParams({ ...waterParams, targetHardness: e.target.value || 0 })}
                    min={0}
                    max={30}
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Water Quality */}
          <Card className="calculator-form">
            <CardTitle>🔬 Water Quality</CardTitle>
            <CardBody>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Ammonia (ppm):</label>
                  <NumericTextBox
                    value={waterParams.currentAmmonia}
                    onChange={(e) => setWaterParams({ ...waterParams, currentAmmonia: e.target.value || 0 })}
                    min={0}
                    max={5}
                    format="n2"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Nitrite (ppm):</label>
                  <NumericTextBox
                    value={waterParams.currentNitrite}
                    onChange={(e) => setWaterParams({ ...waterParams, currentNitrite: e.target.value || 0 })}
                    min={0}
                    max={5}
                    format="n2"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Nitrate (ppm):</label>
                  <NumericTextBox
                    value={waterParams.currentNitrate}
                    onChange={(e) => setWaterParams({ ...waterParams, currentNitrate: e.target.value || 0 })}
                    min={0}
                    max={100}
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Recommendations */}
          <Card className="parameter-card">
            <CardTitle>💡 Recommendations</CardTitle>
            <CardBody>
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ color: '#1976d2', marginBottom: '10px' }}>pH Adjustment:</h4>
                <p><strong>Action:</strong> {report.phAdjustment.action}</p>
                {report.phAdjustment.amount > 0 && (
                  <p><strong>Amount:</strong> {report.phAdjustment.amount} {report.phAdjustment.product}</p>
                )}
                {report.phAdjustment.warning && (
                  <p style={{ color: '#ff9800', fontSize: '14px' }}>⚠️ {report.phAdjustment.warning}</p>
                )}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ color: '#1976d2', marginBottom: '10px' }}>Temperature Adjustment:</h4>
                <p><strong>Action:</strong> {report.tempAdjustment.action}</p>
                {Number(report.tempAdjustment.time) > 0 && (
                  <p><strong>Time:</strong> {report.tempAdjustment.time} hours</p>
                )}
                {report.tempAdjustment.warning && (
                  <p style={{ color: '#ff9800', fontSize: '14px' }}>⚠️ {report.tempAdjustment.warning}</p>
                )}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ color: '#1976d2', marginBottom: '10px' }}>Water Change:</h4>
                <p><strong>Percentage:</strong> {report.waterChange.percentage}%</p>
                <p><strong>Amount:</strong> {report.waterChange.amount} gallons</p>
                <p><strong>Reason:</strong> {report.waterChange.reason}</p>
              </div>

              <Button
                themeColor="primary"
                onClick={() => {
                  setNotifications(prev => [...prev, {
                    id: Date.now(),
                    type: 'info',
                    content: '📋 Detailed recommendations saved to your maintenance log'
                  }]);
                }}
              >
                Save Recommendations
              </Button>
            </CardBody>
          </Card>
        </div>

        {/* Parameter Comparison Chart */}
        <Card className="chart-container">
          <CardTitle>📊 Parameter Comparison</CardTitle>
          <CardBody>
            <Chart>
              <ChartValueAxis>
                <ChartValueAxisItem title={{ text: 'pH Level' }} min={6} max={8} />
                <ChartValueAxisItem name="temp" title={{ text: 'Temperature (°F)' }} min={70} max={85} />
                <ChartValueAxisItem name="hardness" title={{ text: 'Hardness (dGH)' }} min={0} max={20} />
                <ChartValueAxisItem name="toxins" title={{ text: 'Toxins (ppm)' }} min={0} max={50} />
              </ChartValueAxis>
              <ChartCategoryAxis>
                <ChartCategoryAxisItem categories={chartData.map(d => d.parameter)} />
              </ChartCategoryAxis>
              <ChartSeries>
                <ChartSeriesItem
                  type="column"
                  data={chartData.map(d => d.current)}
                  name="Current"
                  color="#2196f3"
                />
                <ChartSeriesItem
                  type="column"
                  data={chartData.map(d => d.target)}
                  name="Target"
                  color="#4caf50"
                />
                <ChartSeriesItem
                  type="column"
                  data={chartData.map(d => d.optimal)}
                  name="Optimal"
                  color="#ff9800"
                />
              </ChartSeries>
              <ChartLegend position="top" />
            </Chart>
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

export default ParameterCalculator;
