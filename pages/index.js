import React, { useState } from 'react';
import Head from 'next/head';

const WeddingGanttChart = () => {
  const [tasks, setTasks] = useState([
    // Pre-week tasks
    { id: 1, name: "Confirm hymns with officiant", category: "Planning", start: "2025-07-21", duration: 1, assignee: "Sarah", priority: "high" },
    { id: 2, name: "Finalize guest count (Tim/Amber)", category: "Planning", start: "2025-07-21", duration: 2, assignee: "Tim/Amber", priority: "high" },
    { id: 3, name: "Purchase shoes", category: "Shopping", start: "2025-07-21", duration: 3, assignee: "You", priority: "medium" },
    { id: 4, name: "Get Zac's outfits (Fri & Sun)", category: "Shopping", start: "2025-07-21", duration: 3, assignee: "You", priority: "medium" },
    { id: 5, name: "Order/confirm centerpieces", category: "Decor", start: "2025-07-22", duration: 2, assignee: "Sarah", priority: "high" },
    { id: 6, name: "Confirm marriage license", category: "Legal", start: "2025-07-22", duration: 1, assignee: "Couple", priority: "high" },
    { id: 7, name: "Buy card box", category: "Shopping", start: "2025-07-23", duration: 1, assignee: "Sarah", priority: "medium" },
    
    // Friday tasks
    { id: 8, name: "Get final head count", category: "Coordination", start: "2025-07-25", duration: 0.5, assignee: "Tim/Amber", priority: "high" },
    { id: 9, name: "Centerpiece pickup/delivery", category: "Logistics", start: "2025-07-25", duration: 0.5, assignee: "Sarah", priority: "medium" },
    { id: 10, name: "Iron tablecloths", category: "Prep", start: "2025-07-25", duration: 1, assignee: "Volunteers", priority: "low" },
    { id: 11, name: "Assemble bouquet/boutonnieres", category: "Flowers", start: "2025-07-25", duration: 2, assignee: "Maggie", priority: "medium" },
    { id: 12, name: "Assemble dried flowers & mint boxes", category: "Prep", start: "2025-07-25", duration: 1, assignee: "Volunteers", priority: "low" },
    
    // Saturday setup (4pm start)
    { id: 13, name: "Table delivery", category: "Setup", start: "2025-07-26", duration: 1, assignee: "Rental Company", priority: "high" },
    { id: 14, name: "Tent setup (3 tents)", category: "Setup", start: "2025-07-26", duration: 2, assignee: "Dad + helpers", priority: "high" },
    { id: 15, name: "Set up beverage stations", category: "Setup", start: "2025-07-26", duration: 1, assignee: "Team A", priority: "medium" },
    { id: 16, name: "Arrange serving ware & plates", category: "Setup", start: "2025-07-26", duration: 1, assignee: "Team B", priority: "medium" },
    { id: 17, name: "Table decorating", category: "Decor", start: "2025-07-26", duration: 2, assignee: "Decoration Team", priority: "medium" },
    { id: 18, name: "Get ice & final supplies", category: "Logistics", start: "2025-07-26", duration: 1, assignee: "Mohammad", priority: "low" },
    { id: 19, name: "Set up garbage/cleanup stations", category: "Setup", start: "2025-07-26", duration: 0.5, assignee: "Volunteers", priority: "low" },
    
    // Sunday wedding day
    { id: 20, name: "Email DJ confirmation", category: "Coordination", start: "2025-07-27", duration: 0.5, assignee: "Sarah", priority: "high" },
    { id: 21, name: "Morning meeting with Kim", category: "Coordination", start: "2025-07-27", duration: 0.5, assignee: "Kim", priority: "medium" },
    { id: 22, name: "Flower setup & assembly", category: "Flowers", start: "2025-07-27", duration: 1, assignee: "Maggie + Kim", priority: "high" },
    { id: 23, name: "Bring items from home", category: "Logistics", start: "2025-07-27", duration: 0.5, assignee: "Family", priority: "high" },
    { id: 24, name: "Set up card box & QR codes", category: "Setup", start: "2025-07-27", duration: 0.5, assignee: "You", priority: "medium" },
    { id: 25, name: "Place mints at tables", category: "Setup", start: "2025-07-27", duration: 0.5, assignee: "Volunteers", priority: "low" },
    { id: 26, name: "Final tent decorating", category: "Decor", start: "2025-07-27", duration: 1, assignee: "Decoration Team", priority: "medium" },
    { id: 27, name: "Coordinate speeches", category: "Event", start: "2025-07-27", duration: 0.5, assignee: "You", priority: "medium" },
    
    // Monday cleanup
    { id: 28, name: "Tent pickup", category: "Cleanup", start: "2025-07-28", duration: 1, assignee: "Rental Company", priority: "medium" }
  ]);

  const [filter, setFilter] = useState('all');

  const dates = ['2025-07-21', '2025-07-22', '2025-07-23', '2025-07-24', '2025-07-25', '2025-07-26', '2025-07-27', '2025-07-28'];
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'];

  const getCategoryColor = (category) => {
    const colors = {
      'Planning': 'bg-blue-500',
      'Shopping': 'bg-purple-500',
      'Decor': 'bg-pink-500',
      'Legal': 'bg-red-500',
      'Coordination': 'bg-green-500',
      'Logistics': 'bg-yellow-500',
      'Prep': 'bg-orange-500',
      'Flowers': 'bg-emerald-500',
      'Setup': 'bg-indigo-500',
      'Event': 'bg-rose-500',
      'Cleanup': 'bg-gray-500'
    };
    return colors[category] || 'bg-gray-400';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': 'border-red-400 border-2',
      'medium': 'border-yellow-400 border-2',
      'low': 'border-green-400 border-2'
    };
    return colors[priority] || 'border-gray-400';
  };

  const getTaskPosition = (taskStart, taskDuration) => {
    const startIndex = dates.indexOf(taskStart);
    if (startIndex === -1) return { left: '0%', width: '0%' };
    
    const left = (startIndex / dates.length) * 100;
    const width = (taskDuration / dates.length) * 100;
    
    return { left: `${left}%`, width: `${Math.max(width, 2)}%` };
  };

  const toggleTaskComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter(task => task.category === filter);

  const categories = [...new Set(tasks.map(task => task.category))];

  return (
    <>
      <Head>
        <title>Wedding Planning Gantt Chart</title>
        <meta name="description" content="Wedding planning timeline and task management" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="p-6 bg-white min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Wedding Planning Gantt Chart</h1>
          <p className="text-gray-600 mb-4">Track all wedding preparation tasks leading up to the big day</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded text-sm ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              All Tasks
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-3 py-1 rounded text-sm ${filter === category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mb-4 p-3 bg-gray-50 rounded">
            <h3 className="font-semibold mb-2">Legend:</h3>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-4 h-3 border-red-400 border-2 bg-gray-300"></div>
                <span>High Priority</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-3 border-yellow-400 border-2 bg-gray-300"></div>
                <span>Medium Priority</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-3 border-green-400 border-2 bg-gray-300"></div>
                <span>Low Priority</span>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Date headers */}
            <div className="flex mb-2">
              <div className="w-80 flex-shrink-0"></div>
              <div className="flex-1 flex">
                {dates.map((date, index) => (
                  <div key={date} className="flex-1 text-center">
                    <div className="font-semibold text-sm text-gray-700">{dayLabels[index]}</div>
                    <div className="text-xs text-gray-500">{date.split('-')[2]}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tasks */}
            <div className="space-y-1">
              {filteredTasks.map(task => {
                const position = getTaskPosition(task.start, task.duration);
                return (
                  <div key={task.id} className="flex items-center h-10">
                    <div className="w-80 flex-shrink-0 pr-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={task.completed || false}
                          onChange={() => toggleTaskComplete(task.id)}
                          className="w-4 h-4"
                        />
                        <div className="flex-1">
                          <div className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                            {task.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {task.assignee} • {task.category}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 relative h-6 bg-gray-100 rounded">
                      <div
                        className={`absolute h-full rounded ${getCategoryColor(task.category)} ${getPriorityColor(task.priority)} ${task.completed ? 'opacity-50' : ''}`}
                        style={position}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded">
          <h3 className="font-semibold text-blue-800 mb-2">Key Milestones:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• <strong>Friday:</strong> Final preparations and assembly work</li>
            <li>• <strong>Saturday 4pm:</strong> Major setup begins (tables, tents, decorating)</li>
            <li>• <strong>Sunday morning:</strong> Final touches and wedding day coordination</li>
            <li>• <strong>Monday:</strong> Cleanup and equipment pickup</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default WeddingGanttChart;