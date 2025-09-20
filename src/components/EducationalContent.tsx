import React, { useState } from 'react';
import { Card, CardBody, CardTitle } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import { Notification } from '@progress/kendo-react-notification';

interface Article {
  id: number;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: number;
  content: string;
  tips: string[];
  warnings: string[];
}

const EducationalContent: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);

  const articles: Article[] = [
    {
      id: 1,
      title: 'Understanding the Nitrogen Cycle',
      category: 'Water Chemistry',
      difficulty: 'Beginner',
      readTime: 8,
      content: `
        The nitrogen cycle is the most important biological process in your aquarium. It's how beneficial bacteria convert toxic waste into less harmful substances.

        <h3>Stage 1: Ammonia Production</h3>
        <p>Fish waste, uneaten food, and decaying plants produce ammonia (NH3), which is highly toxic to fish even in small amounts.</p>

        <h3>Stage 2: Nitrite Formation</h3>
        <p>Nitrosomonas bacteria convert ammonia into nitrite (NO2-), which is still toxic but less so than ammonia.</p>

        <h3>Stage 3: Nitrate Formation</h3>
        <p>Nitrobacter bacteria convert nitrite into nitrate (NO3-), which is relatively safe in low concentrations and can be removed through water changes.</p>

        <h3>Why This Matters</h3>
        <p>Understanding this cycle helps you maintain a healthy tank. New tanks need time to establish these beneficial bacteria colonies before adding fish.</p>
      `,
      tips: [
        'Test water parameters regularly during cycling',
        'Add fish gradually to avoid overwhelming the bacteria',
        'Don\'t clean your filter media with tap water',
        'Use a water conditioner to remove chlorine'
      ],
      warnings: [
        'Never add fish to an uncycled tank',
        'Don\'t overfeed - excess food increases ammonia',
        'Avoid cleaning everything at once - preserve beneficial bacteria'
      ]
    },
    {
      id: 2,
      title: 'Choosing the Right Fish for Your Tank',
      category: 'Fish Care',
      difficulty: 'Beginner',
      readTime: 6,
      content: `
        Selecting compatible fish is crucial for a peaceful and healthy aquarium community.

        <h3>Consider Tank Size</h3>
        <p>Each fish needs adequate space to swim and establish territory. Overcrowding leads to stress, aggression, and poor water quality.</p>

        <h3>Water Parameter Compatibility</h3>
        <p>Fish from different regions may have different pH, temperature, and hardness requirements. Choose fish with similar needs.</p>

        <h3>Temperament Matching</h3>
        <p>Aggressive fish will stress peaceful species. Research each fish's temperament before adding to your community.</p>

        <h3>Schooling vs. Territorial Fish</h3>
        <p>Schooling fish need groups of 6+ individuals, while territorial fish may need their own space or specific tank mates.</p>
      `,
      tips: [
        'Start with hardy, beginner-friendly species',
        'Research adult size, not just juvenile size',
        'Consider the fish\'s natural habitat',
        'Plan your community before buying fish'
      ],
      warnings: [
        'Don\'t mix aggressive and peaceful fish',
        'Avoid overstocking your tank',
        'Some fish are not suitable for beginners',
        'Always quarantine new fish before adding to main tank'
      ]
    },
    {
      id: 3,
      title: 'Water Testing and Parameter Management',
      category: 'Water Chemistry',
      difficulty: 'Intermediate',
      readTime: 10,
      content: `
        Regular water testing is essential for maintaining a healthy aquarium environment.

        <h3>Essential Tests</h3>
        <p><strong>pH:</strong> Measures acidity/alkalinity. Most freshwater fish prefer 6.5-7.5.</p>
        <p><strong>Ammonia:</strong> Should always be 0 ppm in established tanks.</p>
        <p><strong>Nitrite:</strong> Should always be 0 ppm in established tanks.</p>
        <p><strong>Nitrate:</strong> Should be kept below 40 ppm, ideally under 20 ppm.</p>
        <p><strong>Temperature:</strong> Most tropical fish prefer 75-80°F.</p>
        <p><strong>Hardness:</strong> General hardness (GH) and carbonate hardness (KH) affect fish health.</p>

        <h3>Testing Frequency</h3>
        <p>Test weekly in established tanks, daily during cycling, and immediately if fish show signs of stress.</p>

        <h3>Interpreting Results</h3>
        <p>Learn what each parameter means and how to adjust them safely. Sudden changes can shock fish.</p>
      `,
      tips: [
        'Keep a testing log to track trends',
        'Test at the same time each week',
        'Use quality test kits for accurate results',
        'Test before and after water changes'
      ],
      warnings: [
        'Don\'t make sudden parameter changes',
        'Some test kits have expiration dates',
        'Tap water may contain chlorine or chloramine',
        'Always use water conditioner'
      ]
    },
    {
      id: 4,
      title: 'Aquarium Filtration Systems',
      category: 'Equipment',
      difficulty: 'Intermediate',
      readTime: 12,
      content: `
        Proper filtration is crucial for maintaining water quality and fish health.

        <h3>Types of Filtration</h3>
        <p><strong>Mechanical:</strong> Removes physical debris and particles from the water.</p>
        <p><strong>Biological:</strong> Uses beneficial bacteria to break down toxic waste.</p>
        <p><strong>Chemical:</strong> Removes dissolved substances like medications or tannins.</p>

        <h3>Filter Types</h3>
        <p><strong>HOB (Hang-on-Back):</strong> Easy to maintain, good for smaller tanks.</p>
        <p><strong>Canister:</strong> Powerful filtration for larger tanks, more maintenance required.</p>
        <p><strong>Sponge:</strong> Gentle filtration, great for fry and shrimp tanks.</p>
        <p><strong>Internal:</strong> Compact but less efficient than external filters.</p>

        <h3>Maintenance</h3>
        <p>Clean mechanical media regularly, but preserve biological media to maintain beneficial bacteria colonies.</p>
      `,
      tips: [
        'Choose a filter rated for your tank size or larger',
        'Don\'t clean all filter media at once',
        'Use filter media designed for your filter type',
        'Consider multiple filter types for better water quality'
      ],
      warnings: [
        'Don\'t replace all filter media at once',
        'Avoid cleaning biological media with tap water',
        'Some filters can be too powerful for certain fish',
        'Always turn off filter before maintenance'
      ]
    },
    {
      id: 5,
      title: 'Common Fish Diseases and Treatments',
      category: 'Health',
      difficulty: 'Advanced',
      readTime: 15,
      content: `
        Early detection and proper treatment of fish diseases can save your fish and prevent spread to other tank inhabitants.

        <h3>Common Diseases</h3>
        <p><strong>Ich (White Spot):</strong> White spots on fish, caused by parasites. Treat with increased temperature and medication.</p>
        <p><strong>Fin Rot:</strong> Frayed or disintegrating fins, often caused by poor water quality or bacterial infection.</p>
        <p><strong>Dropsy:</strong> Swollen abdomen and raised scales, usually indicates internal organ failure.</p>
        <p><strong>Velvet:</strong> Gold or rust-colored dust on fish, another parasitic disease.</p>

        <h3>Prevention</h3>
        <p>Maintain excellent water quality, quarantine new fish, and avoid overstocking to prevent most diseases.</p>

        <h3>Treatment</h3>
        <p>Identify the disease correctly before treating. Some medications can harm beneficial bacteria or other fish.</p>
      `,
      tips: [
        'Quarantine new fish for 2-4 weeks',
        'Maintain excellent water quality',
        'Don\'t overmedicate your tank',
        'Remove carbon from filter during treatment'
      ],
      warnings: [
        'Some diseases are highly contagious',
        'Medications can harm beneficial bacteria',
        'Don\'t mix different medications',
        'Some fish are sensitive to certain treatments'
      ]
    },
    {
      id: 6,
      title: 'Aquatic Plant Care',
      category: 'Plants',
      difficulty: 'Intermediate',
      readTime: 9,
      content: `
        Live plants enhance your aquarium's beauty and help maintain water quality by absorbing nitrates and providing oxygen.

        <h3>Plant Requirements</h3>
        <p><strong>Lighting:</strong> Different plants need different light intensities and durations.</p>
        <p><strong>Substrate:</strong> Some plants need nutrient-rich substrate, others can grow in gravel.</p>
        <p><strong>CO2:</strong> Carbon dioxide supplementation can promote faster growth.</p>
        <p><strong>Fertilizers:</strong> Plants need nutrients like nitrogen, phosphorus, and potassium.</p>

        <h3>Beginner Plants</h3>
        <p>Java Fern, Anubias, Amazon Sword, and Cryptocoryne are hardy plants good for beginners.</p>

        <h3>Maintenance</h3>
        <p>Trim plants regularly, remove dead leaves, and prune to maintain desired shape and size.</p>
      `,
      tips: [
        'Start with easy, low-light plants',
        'Don\'t bury rhizome plants in substrate',
        'Use plant-specific fertilizers',
        'Consider CO2 injection for advanced setups'
      ],
      warnings: [
        'Some plants can be toxic to fish',
        'Don\'t over-fertilize - can cause algae blooms',
        'Some fish will eat certain plants',
        'Dead plant matter can affect water quality'
      ]
    }
  ];

  const categories = ['All', 'Water Chemistry', 'Fish Care', 'Equipment', 'Health', 'Plants'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const filteredArticles = articles.filter(article => {
    if (selectedCategory !== 'All' && article.category !== selectedCategory) return false;
    if (selectedDifficulty !== 'All' && article.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#4caf50';
      case 'Intermediate': return '#ff9800';
      case 'Advanced': return '#f44336';
      default: return '#666';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Water Chemistry': return '🧪';
      case 'Fish Care': return '🐠';
      case 'Equipment': return '🔧';
      case 'Health': return '🏥';
      case 'Plants': return '🌱';
      default: return '📚';
    }
  };

  const saveArticle = (article: Article) => {
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'success',
      content: `📖 Article "${article.title}" saved to your favorites`
    }]);
  };

  const shareArticle = (article: Article) => {
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'info',
      content: `🔗 Article "${article.title}" link copied to clipboard`
    }]);
  };

  return (
    <div className="aquarium-theme">
      <div className="fade-in">
        <h1 style={{ marginBottom: '20px', color: '#1976d2', fontSize: '28px' }}>
          📚 Educational Content
        </h1>

        {/* Filters */}
        <Card className="parameter-card" style={{ marginBottom: '20px' }}>
          <CardTitle>🔍 Filter Articles</CardTitle>
          <CardBody>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Category:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Difficulty:</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                >
                  <option value="All">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
          </CardBody>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: selectedArticle ? '1fr 400px' : '1fr', gap: '20px' }}>
          {/* Articles List */}
          <div>
            <Card className="parameter-card">
              <CardTitle>📖 Articles ({filteredArticles.length})</CardTitle>
              <CardBody>
                <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                  {filteredArticles.map(article => (
                    <div
                      key={article.id}
                      className="fish-species-card"
                      style={{ cursor: 'pointer', marginBottom: '15px' }}
                      onClick={() => setSelectedArticle(article)}
                    >
                      <CardTitle>
                        {getCategoryIcon(article.category)} {article.title}
                      </CardTitle>
                      <CardBody>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                          <div style={{ display: 'flex', gap: '15px', fontSize: '14px' }}>
                            <span style={{ 
                              color: getDifficultyColor(article.difficulty),
                              fontWeight: 'bold'
                            }}>
                              {article.difficulty}
                            </span>
                            <span>⏱️ {article.readTime} min read</span>
                            <span>📂 {article.category}</span>
                          </div>
                        </div>
                        <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                          {article.content.substring(0, 150)}...
                        </p>
                      </CardBody>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Article Detail */}
          {selectedArticle && (
            <div>
              <Card className="educational-content">
                <CardTitle>
                  {getCategoryIcon(selectedArticle.category)} {selectedArticle.title}
                </CardTitle>
                <CardBody>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', gap: '15px', fontSize: '14px' }}>
                      <span style={{ 
                        color: getDifficultyColor(selectedArticle.difficulty),
                        fontWeight: 'bold'
                      }}>
                        {selectedArticle.difficulty}
                      </span>
                      <span>⏱️ {selectedArticle.readTime} min read</span>
                      <span>📂 {selectedArticle.category}</span>
                    </div>
                    <Button
                      size="small"
                      onClick={() => setSelectedArticle(null)}
                    >
                      ✕
                    </Button>
                  </div>

                  <div 
                    dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                    style={{ marginBottom: '20px' }}
                  />

                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ color: '#4caf50', marginBottom: '10px' }}>💡 Pro Tips:</h4>
                    <ul>
                      {selectedArticle.tips.map((tip, index) => (
                        <li key={index} style={{ marginBottom: '5px' }}>{tip}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ color: '#f44336', marginBottom: '10px' }}>⚠️ Warnings:</h4>
                    <ul>
                      {selectedArticle.warnings.map((warning, index) => (
                        <li key={index} style={{ marginBottom: '5px' }}>{warning}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Button
                      themeColor="primary"
                      onClick={() => saveArticle(selectedArticle)}
                    >
                      💾 Save Article
                    </Button>
                    <Button
                      onClick={() => shareArticle(selectedArticle)}
                    >
                      🔗 Share
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          )}
        </div>

        {/* Quick Reference */}
        <Card className="parameter-card" style={{ marginTop: '20px' }}>
          <CardTitle>📋 Quick Reference</CardTitle>
          <CardBody>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div>
                <h4 style={{ color: '#1976d2', marginBottom: '10px' }}>🔬 Water Parameters</h4>
                <ul style={{ fontSize: '14px', margin: 0 }}>
                  <li>pH: 6.5-7.5 (most fish)</li>
                  <li>Temperature: 75-80°F</li>
                  <li>Ammonia: 0 ppm</li>
                  <li>Nitrite: 0 ppm</li>
                  <li>Nitrate: &lt; 40 ppm</li>
                </ul>
              </div>
              <div>
                <h4 style={{ color: '#1976d2', marginBottom: '10px' }}>🧽 Maintenance</h4>
                <ul style={{ fontSize: '14px', margin: 0 }}>
                  <li>Water change: 25% weekly</li>
                  <li>Test water: Weekly</li>
                  <li>Clean filter: Monthly</li>
                  <li>Gravel vacuum: Weekly</li>
                  <li>Check equipment: Weekly</li>
                </ul>
              </div>
              <div>
                <h4 style={{ color: '#1976d2', marginBottom: '10px' }}>🐠 Fish Care</h4>
                <ul style={{ fontSize: '14px', margin: 0 }}>
                  <li>Feed 2-3 times daily</li>
                  <li>Only what they eat in 2-3 min</li>
                  <li>Quarantine new fish</li>
                  <li>Observe behavior daily</li>
                  <li>Research compatibility</li>
                </ul>
              </div>
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

export default EducationalContent;
