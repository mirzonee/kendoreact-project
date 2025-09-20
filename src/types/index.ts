// Water Parameter Types
export interface WaterParameter {
  id: string;
  name: string;
  value: number;
  unit: string;
  optimalRange: {
    min: number;
    max: number;
  };
  status: 'optimal' | 'warning' | 'danger';
  lastUpdated: Date;
}

export interface WaterParameterReading {
  id: string;
  parameterId: string;
  value: number;
  timestamp: Date;
  notes?: string;
}

// Fish Species Types
export interface FishSpecies {
  id: string;
  name: string;
  scientificName: string;
  family: string;
  size: {
    min: number;
    max: number;
    unit: 'cm' | 'inches';
  };
  lifespan: {
    min: number;
    max: number;
    unit: 'years';
  };
  waterParameters: {
    temperature: { min: number; max: number; unit: '°F' | '°C' };
    pH: { min: number; max: number };
    hardness: { min: number; max: number; unit: 'dGH' };
    ammonia: { min: number; max: number; unit: 'ppm' };
    nitrite: { min: number; max: number; unit: 'ppm' };
    nitrate: { min: number; max: number; unit: 'ppm' };
  };
  temperament: 'peaceful' | 'semi-aggressive' | 'aggressive';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  diet: string[];
  habitat: string;
  imageUrl?: string;
  description: string;
}

// Maintenance Types
export interface MaintenanceTask {
  id: string;
  title: string;
  description: string;
  type: 'water_change' | 'filter_cleaning' | 'parameter_test' | 'equipment_check' | 'feeding' | 'other';
  frequency: {
    interval: number;
    unit: 'days' | 'weeks' | 'months';
  };
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimatedDuration: number; // in minutes
  lastPerformed?: Date;
  nextDue: Date;
  isCompleted: boolean;
  notes?: string;
}

// Calculator Types
export interface TankDimensions {
  length: number;
  width: number;
  height: number;
  unit: 'cm' | 'inches';
}

export interface TankShape {
  type: 'rectangular' | 'cylindrical' | 'bow-front' | 'hexagonal';
  dimensions: TankDimensions;
}

export interface WaterChangeCalculation {
  tankVolume: number;
  currentParameter: number;
  targetParameter: number;
  waterChangePercentage: number;
  waterChangeVolume: number;
  unit: 'liters' | 'gallons';
}

// Educational Content Types
export interface EducationalArticle {
  id: string;
  title: string;
  category: 'beginner' | 'intermediate' | 'advanced' | 'maintenance' | 'health' | 'breeding';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  readTime: number; // in minutes
  content: string;
  tags: string[];
  author: string;
  publishedDate: Date;
  lastUpdated: Date;
  imageUrl?: string;
}

// Component Props Types
export interface WaterParameterDashboardProps {
  parameters: WaterParameter[];
  readings: WaterParameterReading[];
  onParameterUpdate: (parameterId: string, value: number) => void;
  onAddReading: (reading: Omit<WaterParameterReading, 'id'>) => void;
}

export interface FishSpeciesDatabaseProps {
  species: FishSpecies[];
  onSpeciesSelect: (species: FishSpecies) => void;
  onFilterChange: (filters: FishSpeciesFilters) => void;
}

export interface FishSpeciesFilters {
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  temperament?: 'peaceful' | 'semi-aggressive' | 'aggressive';
  size?: 'small' | 'medium' | 'large';
  family?: string;
}

export interface ParameterCalculatorProps {
  tankShape: TankShape;
  onCalculationComplete: (result: WaterChangeCalculation) => void;
}

export interface MaintenanceSchedulerProps {
  tasks: MaintenanceTask[];
  onTaskComplete: (taskId: string) => void;
  onTaskAdd: (task: Omit<MaintenanceTask, 'id'>) => void;
  onTaskUpdate: (taskId: string, updates: Partial<MaintenanceTask>) => void;
}

export interface EducationalContentProps {
  articles: EducationalArticle[];
  onArticleSelect: (article: EducationalArticle) => void;
  onCategoryFilter: (category: EducationalArticle['category']) => void;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Chart Data Types
export interface ChartDataPoint {
  x: string | number | Date;
  y: number;
  label?: string;
}

export interface ParameterChartData {
  parameter: string;
  data: ChartDataPoint[];
  color: string;
  unit: string;
}

// Notification Types
export interface NotificationData {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  duration?: number;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  label: string;
  action: () => void;
  style?: 'primary' | 'secondary';
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'password' | 'select' | 'textarea' | 'date' | 'checkbox';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    custom?: (value: any) => string | null;
  };
}

export interface FormData {
  [key: string]: any;
}

export interface FormErrors {
  [key: string]: string | null;
}
