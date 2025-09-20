import React, { useState } from 'react';
import { Scheduler } from '@progress/kendo-react-scheduler';
import { Card, CardBody, CardTitle } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { TextBox } from '@progress/kendo-react-inputs';
import { Notification } from '@progress/kendo-react-notification';

interface MaintenanceTask {
  id: number;
  title: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimatedDuration: number; // in minutes
  category: 'water' | 'cleaning' | 'equipment' | 'health' | 'feeding';
  lastCompleted?: Date;
  nextDue?: Date;
  isCompleted: boolean;
}

const MaintenanceScheduler: React.FC = () => {
  const [tasks, setTasks] = useState<MaintenanceTask[]>([
    {
      id: 1,
      title: 'Water Change',
      description: 'Replace 25% of tank water with treated water',
      frequency: 'weekly',
      priority: 'high',
      estimatedDuration: 30,
      category: 'water',
      lastCompleted: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      nextDue: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
      isCompleted: false
    },
    {
      id: 2,
      title: 'Test Water Parameters',
      description: 'Check pH, ammonia, nitrite, nitrate, and temperature',
      frequency: 'weekly',
      priority: 'high',
      estimatedDuration: 15,
      category: 'water',
      lastCompleted: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      nextDue: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // 6 days from now
      isCompleted: false
    },
    {
      id: 3,
      title: 'Clean Filter Media',
      description: 'Rinse filter media in tank water to preserve beneficial bacteria',
      frequency: 'monthly',
      priority: 'medium',
      estimatedDuration: 20,
      category: 'equipment',
      lastCompleted: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      nextDue: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
      isCompleted: false
    },
    {
      id: 4,
      title: 'Gravel Vacuum',
      description: 'Vacuum substrate to remove debris and waste',
      frequency: 'weekly',
      priority: 'medium',
      estimatedDuration: 25,
      category: 'cleaning',
      lastCompleted: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      nextDue: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      isCompleted: false
    },
    {
      id: 5,
      title: 'Check Equipment',
      description: 'Inspect heater, filter, lights, and other equipment',
      frequency: 'weekly',
      priority: 'medium',
      estimatedDuration: 10,
      category: 'equipment',
      lastCompleted: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      nextDue: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      isCompleted: false
    },
    {
      id: 6,
      title: 'Trim Plants',
      description: 'Trim and prune aquatic plants to maintain healthy growth',
      frequency: 'monthly',
      priority: 'low',
      estimatedDuration: 30,
      category: 'cleaning',
      lastCompleted: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
      nextDue: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
      isCompleted: false
    }
  ]);

  const [newTask, setNewTask] = useState<Partial<MaintenanceTask>>({
    title: '',
    description: '',
    frequency: 'weekly',
    priority: 'medium',
    estimatedDuration: 15,
    category: 'cleaning'
  });

  const [notifications, setNotifications] = useState<any[]>([]);
  const [filter, setFilter] = useState({
    category: '',
    priority: '',
    status: ''
  });

  const frequencyOptions = ['daily', 'weekly', 'monthly', 'quarterly'];
  const priorityOptions = ['low', 'medium', 'high', 'critical'];
  const categoryOptions = ['water', 'cleaning', 'equipment', 'health', 'feeding'];
  const statusOptions = ['', 'completed', 'pending', 'overdue'];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return '#f44336';
      case 'high': return '#ff9800';
      case 'medium': return '#2196f3';
      case 'low': return '#4caf50';
      default: return '#666';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'water': return '💧';
      case 'cleaning': return '🧽';
      case 'equipment': return '🔧';
      case 'health': return '🏥';
      case 'feeding': return '🍽️';
      default: return '📋';
    }
  };

  const getTaskStatus = (task: MaintenanceTask) => {
    if (task.isCompleted) return 'completed';
    if (task.nextDue && task.nextDue < new Date()) return 'overdue';
    return 'pending';
  };

  const addTask = () => {
    if (!newTask.title || !newTask.description) {
      setNotifications(prev => [...prev, {
        id: Date.now(),
        type: 'error',
        content: 'Please fill in all required fields'
      }]);
      return;
    }

    const task: MaintenanceTask = {
      id: Math.max(...tasks.map(t => t.id)) + 1,
      title: newTask.title!,
      description: newTask.description!,
      frequency: newTask.frequency!,
      priority: newTask.priority!,
      estimatedDuration: newTask.estimatedDuration!,
      category: newTask.category!,
      isCompleted: false
    };

    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      frequency: 'weekly',
      priority: 'medium',
      estimatedDuration: 15,
      category: 'cleaning'
    });

    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'success',
      content: `✅ Task "${task.title}" added to maintenance schedule`
    }]);
  };

  const completeTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, isCompleted: true, lastCompleted: new Date() }
        : task
    ));

    const task = tasks.find(t => t.id === taskId);
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'success',
      content: `✅ Task "${task?.title}" marked as completed!`
    }]);
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'info',
      content: '🗑️ Task removed from maintenance schedule'
    }]);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter.category && task.category !== filter.category) return false;
    if (filter.priority && task.priority !== filter.priority) return false;
    if (filter.status && getTaskStatus(task) !== filter.status) return false;
    return true;
  });

  const overdueTasks = tasks.filter(task => getTaskStatus(task) === 'overdue');
  const dueSoonTasks = tasks.filter(task => {
    const status = getTaskStatus(task);
    return status === 'pending' && task.nextDue && 
           task.nextDue.getTime() - new Date().getTime() < 2 * 24 * 60 * 60 * 1000; // 2 days
  });

  // Convert tasks to Scheduler events
  const schedulerData: any[] = tasks.map(task => ({
    id: task.id,
    title: task.title,
    start: task.nextDue || new Date(),
    end: new Date((task.nextDue || new Date()).getTime() + task.estimatedDuration * 60 * 1000),
    description: task.description,
    isAllDay: false
  }));

  return (
    <div className="aquarium-theme">
      <div className="fade-in">
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '24px',
          padding: '20px',
          background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(156, 39, 176, 0.15)'
        }}>
          <div style={{ 
            fontSize: '32px', 
            marginRight: '16px',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
          }}>📅</div>
          <div>
            <h1 style={{ 
              margin: 0, 
              color: '#7b1fa2', 
              fontSize: '28px',
              fontWeight: '700',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}>
              Maintenance Scheduler
            </h1>
            <p style={{ 
              margin: '4px 0 0 0', 
              color: '#9c27b0', 
              fontSize: '16px',
              fontWeight: '500'
            }}>
              Keep your aquarium healthy with scheduled maintenance
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
          <Card className="parameter-card">
            <CardBody style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f44336' }}>
                {overdueTasks.length}
              </div>
              <div>Overdue Tasks</div>
            </CardBody>
          </Card>
          <Card className="parameter-card">
            <CardBody style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff9800' }}>
                {dueSoonTasks.length}
              </div>
              <div>Due Soon</div>
            </CardBody>
          </Card>
          <Card className="parameter-card">
            <CardBody style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4caf50' }}>
                {tasks.filter(t => t.isCompleted).length}
              </div>
              <div>Completed</div>
            </CardBody>
          </Card>
          <Card className="parameter-card">
            <CardBody style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2196f3' }}>
                {tasks.length}
              </div>
              <div>Total Tasks</div>
            </CardBody>
          </Card>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '20px' }}>
          {/* Task List */}
          <div>
            {/* Filters */}
            <Card className="parameter-card" style={{ marginBottom: '20px' }}>
              <CardTitle>🔍 Filter Tasks</CardTitle>
              <CardBody>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Category:</label>
                    <DropDownList
                      data={['', ...categoryOptions]}
                      value={filter.category}
                      onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Priority:</label>
                    <DropDownList
                      data={['', ...priorityOptions]}
                      value={filter.priority}
                      onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Status:</label>
                    <DropDownList
                      data={statusOptions}
                      value={filter.status}
                      onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Task List */}
            <Card className="parameter-card">
              <CardTitle>📋 Maintenance Tasks ({filteredTasks.length})</CardTitle>
              <CardBody>
                <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                  {filteredTasks.map(task => {
                    const status = getTaskStatus(task);
                    return (
                      <div
                        key={task.id}
                        className={`maintenance-item ${status === 'overdue' ? 'overdue' : status === 'pending' && task.nextDue && task.nextDue.getTime() - new Date().getTime() < 2 * 24 * 60 * 60 * 1000 ? 'due-soon' : ''}`}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '20px' }}>{getCategoryIcon(task.category)}</span>
                            <div>
                              <h4 style={{ margin: 0, fontSize: '16px' }}>{task.title}</h4>
                              <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>{task.description}</p>
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '5px' }}>
                            {!task.isCompleted && (
                              <Button
                                size="small"
                                themeColor="primary"
                                onClick={() => completeTask(task.id)}
                              >
                                ✓
                              </Button>
                            )}
                            <Button
                              size="small"
                              onClick={() => deleteTask(task.id)}
                            >
                              🗑️
                            </Button>
                          </div>
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                          <div style={{ display: 'flex', gap: '15px' }}>
                            <span style={{ 
                              color: getPriorityColor(task.priority),
                              fontWeight: 'bold'
                            }}>
                              {task.priority.toUpperCase()}
                            </span>
                            <span>⏱️ {task.estimatedDuration} min</span>
                            <span>🔄 {task.frequency}</span>
                          </div>
                          <div>
                            {task.isCompleted ? (
                              <span style={{ color: '#4caf50', fontWeight: 'bold' }}>COMPLETED</span>
                            ) : status === 'overdue' ? (
                              <span style={{ color: '#f44336', fontWeight: 'bold' }}>OVERDUE</span>
                            ) : task.nextDue ? (
                              <span>Due: {task.nextDue.toLocaleDateString()}</span>
                            ) : (
                              <span>No due date</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Add New Task & Calendar */}
          <div>
            {/* Add New Task */}
            <Card className="calculator-form" style={{ marginBottom: '20px' }}>
              <CardTitle>➕ Add New Task</CardTitle>
              <CardBody>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Title:</label>
                    <TextBox
                      value={newTask.title || ''}
                      onChange={(e) => setNewTask({ ...newTask, title: String(e.target.value || '') })}
                      placeholder="e.g., Clean Filter"
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Description:</label>
                    <TextBox
                      value={newTask.description || ''}
                      onChange={(e) => setNewTask({ ...newTask, description: String(e.target.value || '') })}
                      placeholder="Detailed description of the task"
                    />
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Category:</label>
                      <DropDownList
                        data={categoryOptions}
                        value={newTask.category}
                        onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Priority:</label>
                      <DropDownList
                        data={priorityOptions}
                        value={newTask.priority}
                        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Frequency:</label>
                      <DropDownList
                        data={frequencyOptions}
                        value={newTask.frequency}
                        onChange={(e) => setNewTask({ ...newTask, frequency: e.target.value })}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Duration (min):</label>
                      <TextBox
                        value={newTask.estimatedDuration?.toString() || ''}
                        onChange={(e) => setNewTask({ ...newTask, estimatedDuration: parseInt(String(e.target.value || '15')) || 15 })}
                        type="number"
                      />
                    </div>
                  </div>
                  
                  <Button
                    themeColor="primary"
                    onClick={addTask}
                    style={{ width: '100%' }}
                  >
                    Add Task
                  </Button>
                </div>
              </CardBody>
            </Card>

            {/* Calendar View */}
            <Card className="parameter-card">
              <CardTitle>📅 Schedule View</CardTitle>
              <CardBody>
                <div style={{ height: '400px' }}>
                  <Scheduler
                    data={schedulerData}
                    view="week"
                    height={350}
                  />
                </div>
              </CardBody>
            </Card>
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

export default MaintenanceScheduler;
