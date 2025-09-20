import React, { useState } from 'react';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { Card, CardBody, CardTitle } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { TextBox } from '@progress/kendo-react-inputs';
import { Notification } from '@progress/kendo-react-notification';

interface FishSpecies {
  id: number;
  name: string;
  scientificName: string;
  size: string;
  temperament: string;
  pH: { min: number; max: number };
  temperature: { min: number; max: number };
  hardness: { min: number; max: number };
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tankSize: string;
  diet: string;
  lifespan: string;
  origin: string;
  image: string;
  description: string;
  compatibility: string[];
}

const FishSpeciesDatabase: React.FC = () => {
  const [selectedFish, setSelectedFish] = useState<FishSpecies | null>(null);
  const [filteredData, setFilteredData] = useState<FishSpecies[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  const fishData: FishSpecies[] = [
    {
      id: 1,
      name: 'Neon Tetra',
      scientificName: 'Paracheirodon innesi',
      size: '1.5 inches',
      temperament: 'Peaceful',
      pH: { min: 6.0, max: 7.0 },
      temperature: { min: 68, max: 78 },
      hardness: { min: 1, max: 12 },
      difficulty: 'Beginner',
      tankSize: '10+ gallons',
      diet: 'Omnivore',
      lifespan: '5-8 years',
      origin: 'South America',
      image: '🐠',
      description: 'Small, colorful schooling fish perfect for community tanks. Known for their bright blue and red stripes.',
      compatibility: ['Guppies', 'Platies', 'Corydoras', 'Small Tetras']
    },
    {
      id: 2,
      name: 'Betta Fish',
      scientificName: 'Betta splendens',
      size: '2.5 inches',
      temperament: 'Aggressive (males)',
      pH: { min: 6.5, max: 7.5 },
      temperature: { min: 76, max: 82 },
      hardness: { min: 2, max: 15 },
      difficulty: 'Beginner',
      tankSize: '5+ gallons',
      diet: 'Carnivore',
      lifespan: '2-3 years',
      origin: 'Southeast Asia',
      image: '🐟',
      description: 'Beautiful, long-finned fish with vibrant colors. Males are territorial and should be kept alone.',
      compatibility: ['Snails', 'Shrimp', 'Bottom feeders']
    },
    {
      id: 3,
      name: 'Angelfish',
      scientificName: 'Pterophyllum scalare',
      size: '6 inches',
      temperament: 'Semi-aggressive',
      pH: { min: 6.0, max: 7.5 },
      temperature: { min: 75, max: 82 },
      hardness: { min: 3, max: 8 },
      difficulty: 'Intermediate',
      tankSize: '30+ gallons',
      diet: 'Omnivore',
      lifespan: '10-12 years',
      origin: 'South America',
      image: '🐠',
      description: 'Elegant, triangular fish with long flowing fins. Can be territorial during breeding.',
      compatibility: ['Large Tetras', 'Corydoras', 'Plecos', 'Gouramis']
    },
    {
      id: 4,
      name: 'Discus',
      scientificName: 'Symphysodon discus',
      size: '8 inches',
      temperament: 'Peaceful',
      pH: { min: 6.0, max: 7.0 },
      temperature: { min: 82, max: 86 },
      hardness: { min: 1, max: 4 },
      difficulty: 'Advanced',
      tankSize: '55+ gallons',
      diet: 'Omnivore',
      lifespan: '10-15 years',
      origin: 'South America',
      image: '🐠',
      description: 'The "king of aquarium fish" with stunning colors and patterns. Requires pristine water conditions.',
      compatibility: ['Cardinal Tetras', 'Rummy Nose Tetras', 'Corydoras', 'Plecos']
    },
    {
      id: 5,
      name: 'Guppy',
      scientificName: 'Poecilia reticulata',
      size: '2 inches',
      temperament: 'Peaceful',
      pH: { min: 7.0, max: 8.5 },
      temperature: { min: 72, max: 82 },
      hardness: { min: 8, max: 25 },
      difficulty: 'Beginner',
      tankSize: '10+ gallons',
      diet: 'Omnivore',
      lifespan: '1-3 years',
      origin: 'South America',
      image: '🐠',
      description: 'Colorful, hardy fish that breed easily. Great for beginners and community tanks.',
      compatibility: ['Platies', 'Mollies', 'Swordtails', 'Corydoras']
    },
    {
      id: 6,
      name: 'Oscar',
      scientificName: 'Astronotus ocellatus',
      size: '12 inches',
      temperament: 'Aggressive',
      pH: { min: 6.0, max: 8.0 },
      temperature: { min: 74, max: 81 },
      hardness: { min: 5, max: 20 },
      difficulty: 'Intermediate',
      tankSize: '75+ gallons',
      diet: 'Carnivore',
      lifespan: '10-18 years',
      origin: 'South America',
      image: '🐠',
      description: 'Large, intelligent fish with personality. Can recognize their owners and learn tricks.',
      compatibility: ['Large Cichlids', 'Plecos', 'Large Catfish']
    }
  ];

  const [data, setData] = useState<FishSpecies[]>(fishData);
  const [filter, setFilter] = useState({
    difficulty: '',
    temperament: '',
    search: ''
  });

  const difficultyOptions = ['', 'Beginner', 'Intermediate', 'Advanced'];
  const temperamentOptions = ['', 'Peaceful', 'Semi-aggressive', 'Aggressive'];

  const handleFilterChange = (field: string, value: string) => {
    const newFilter = { ...filter, [field]: value };
    setFilter(newFilter);
    
    let filtered = fishData;
    
    if (newFilter.difficulty) {
      filtered = filtered.filter(fish => fish.difficulty === newFilter.difficulty);
    }
    
    if (newFilter.temperament) {
      filtered = filtered.filter(fish => fish.temperament === newFilter.temperament);
    }
    
    if (newFilter.search) {
      filtered = filtered.filter(fish => 
        fish.name.toLowerCase().includes(newFilter.search.toLowerCase()) ||
        fish.scientificName.toLowerCase().includes(newFilter.search.toLowerCase())
      );
    }
    
    setFilteredData(filtered);
  };

  const handleRowClick = (event: any) => {
    const fish = event.dataItem;
    setSelectedFish(fish);
  };

  const addToTank = (fish: FishSpecies) => {
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'success',
      content: `✅ ${fish.name} added to your tank! Remember to check water parameters.`
    }]);
  };

  const checkCompatibility = (fish1: FishSpecies, fish2: FishSpecies) => {
    // Simple compatibility check based on temperament and size
    if (fish1.temperament === 'Aggressive' && fish2.temperament === 'Peaceful') {
      return false;
    }
    if (fish1.temperament === 'Semi-aggressive' && fish2.temperament === 'Peaceful') {
      return false;
    }
    return true;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#4caf50';
      case 'Intermediate': return '#ff9800';
      case 'Advanced': return '#f44336';
      default: return '#666';
    }
  };

  const getTemperamentColor = (temperament: string) => {
    switch (temperament) {
      case 'Peaceful': return '#4caf50';
      case 'Semi-aggressive': return '#ff9800';
      case 'Aggressive': return '#f44336';
      default: return '#666';
    }
  };

  return (
    <div className="aquarium-theme">
      <div className="fade-in">
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '24px',
          padding: '20px',
          background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(76, 175, 80, 0.15)'
        }}>
          <div style={{ 
            fontSize: '32px', 
            marginRight: '16px',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
          }}>🐠</div>
          <div>
            <h1 style={{ 
              margin: 0, 
              color: '#2e7d32', 
              fontSize: '28px',
              fontWeight: '700',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}>
              Freshwater Fish Database
            </h1>
            <p style={{ 
              margin: '4px 0 0 0', 
              color: '#388e3c', 
              fontSize: '16px',
              fontWeight: '500'
            }}>
              Discover and learn about freshwater fish species
            </p>
          </div>
        </div>

        {/* Filters */}
        <Card className="parameter-card" style={{ marginBottom: '20px' }}>
          <CardTitle>🔍 Search & Filter Fish</CardTitle>
          <CardBody>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Search:</label>
                <TextBox
                  value={filter.search}
                  onChange={(e) => handleFilterChange('search', String(e.target.value || ''))}
                  placeholder="Search by name or scientific name..."
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Difficulty:</label>
                <DropDownList
                  data={difficultyOptions}
                  value={filter.difficulty}
                  onChange={(e) => handleFilterChange('difficulty', e.target.value || '')}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Temperament:</label>
                <DropDownList
                  data={temperamentOptions}
                  value={filter.temperament}
                  onChange={(e) => handleFilterChange('temperament', e.target.value || '')}
                />
              </div>
            </div>
          </CardBody>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '20px' }}>
          {/* Fish Grid */}
          <div>
            <Card className="parameter-card">
              <CardTitle>Fish Species ({filteredData.length || data.length} species)</CardTitle>
              <CardBody>
                <Grid
                  data={filteredData.length > 0 ? filteredData : data}
                  style={{ height: '600px' }}
                  onRowClick={handleRowClick}
                >
                  <GridColumn field="image" title="🐠" width="60px" />
                  <GridColumn field="name" title="Name" width="150px" />
                  <GridColumn field="scientificName" title="Scientific Name" width="180px" />
                  <GridColumn 
                    field="difficulty" 
                    title="Difficulty" 
                    width="100px"
                    cells={{
                      data: (props) => (
                        <span 
                          style={{ 
                            color: getDifficultyColor(props.dataItem.difficulty),
                            fontWeight: 'bold'
                          }}
                        >
                          {props.dataItem.difficulty}
                        </span>
                      )
                    }}
                  />
                  <GridColumn 
                    field="temperament" 
                    title="Temperament" 
                    width="120px"
                    cells={{
                      data: (props) => (
                        <span 
                          style={{ 
                            color: getTemperamentColor(props.dataItem.temperament),
                            fontWeight: 'bold'
                          }}
                        >
                          {props.dataItem.temperament}
                        </span>
                      )
                    }}
                  />
                  <GridColumn field="size" title="Size" width="80px" />
                  <GridColumn field="tankSize" title="Min Tank" width="100px" />
                </Grid>
              </CardBody>
            </Card>
          </div>

          {/* Fish Details */}
          <div>
            {selectedFish ? (
              <Card className="fish-species-card">
                <CardTitle>
                  {selectedFish.image} {selectedFish.name}
                </CardTitle>
                <CardBody>
                  <div style={{ marginBottom: '15px' }}>
                    <strong>Scientific Name:</strong> {selectedFish.scientificName}
                  </div>
                  
                  <div style={{ marginBottom: '15px' }}>
                    <strong>Description:</strong>
                    <p style={{ marginTop: '5px', fontSize: '14px' }}>{selectedFish.description}</p>
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <strong>Water Parameters:</strong>
                    <div style={{ marginTop: '8px', fontSize: '14px' }}>
                      <div>pH: {selectedFish.pH.min} - {selectedFish.pH.max}</div>
                      <div>Temperature: {selectedFish.temperature.min}°F - {selectedFish.temperature.max}°F</div>
                      <div>Hardness: {selectedFish.hardness.min} - {selectedFish.hardness.max} dGH</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <strong>Care Requirements:</strong>
                    <div style={{ marginTop: '8px', fontSize: '14px' }}>
                      <div>Size: {selectedFish.size}</div>
                      <div>Tank Size: {selectedFish.tankSize}</div>
                      <div>Diet: {selectedFish.diet}</div>
                      <div>Lifespan: {selectedFish.lifespan}</div>
                      <div>Origin: {selectedFish.origin}</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <strong>Compatible Fish:</strong>
                    <div style={{ marginTop: '8px', fontSize: '14px' }}>
                      {selectedFish.compatibility.join(', ')}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Button
                      themeColor="primary"
                      onClick={() => addToTank(selectedFish)}
                    >
                      Add to Tank
                    </Button>
                    <Button
                      onClick={() => setSelectedFish(null)}
                    >
                      Close
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ) : (
              <Card className="parameter-card">
                <CardTitle>Select a Fish</CardTitle>
                <CardBody>
                  <p>Click on any fish in the table to view detailed information, care requirements, and water parameters.</p>
                </CardBody>
              </Card>
            )}
          </div>
        </div>

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

export default FishSpeciesDatabase;
