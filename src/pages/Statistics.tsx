
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingUp, MapPin, Clock, Star, Target, Award } from 'lucide-react';

const Statistics = () => {
  // Sample data - in a real app this would come from your backend
  const completionRate = 73;
  const totalRoutes = 28;
  const completedRoutes = 20;
  const averageRating = 4.6;
  const totalDistance = 156.8;
  const totalTime = '42h 15m';

  const monthlyData = [
    { month: 'Jan', routes: 3, completed: 2 },
    { month: 'Feb', routes: 5, completed: 4 },
    { month: 'Mar', routes: 4, completed: 3 },
    { month: 'Apr', routes: 6, completed: 5 },
    { month: 'May', routes: 7, completed: 4 },
    { month: 'Jun', routes: 3, completed: 2 }
  ];

  const routeTypes = [
    { name: 'Nature', value: 35, color: '#22C55E' },
    { name: 'Culture', value: 25, color: '#3A7BFF' },
    { name: 'City', value: 25, color: '#F59E0B' },
    { name: 'Culinary', value: 15, color: '#EF4444' }
  ];

  const recentAchievements = [
    { icon: '🏆', title: 'Route Explorer', description: 'Completed 20 routes' },
    { icon: '⭐', title: 'High Rated', description: 'Average 4.6 star rating' },
    { icon: '🚶', title: 'Walker', description: 'Walked 50+ kilometers' },
    { icon: '📍', title: 'City Explorer', description: 'Visited 15 new places' }
  ];

  const getMotivationalMessage = () => {
    if (completionRate >= 80) {
      return {
        message: "Amazing! You're a route completion champion! 🏆",
        color: "text-green-600",
        bgColor: "bg-green-50"
      };
    } else if (completionRate >= 60) {
      return {
        message: "Great progress! Keep exploring to reach 80%! 🚀",
        color: "text-blue-600",
        bgColor: "bg-blue-50"
      };
    } else {
      return {
        message: "Let's boost that completion rate! Start a new route today! 💪",
        color: "text-orange-600",
        bgColor: "bg-orange-50"
      };
    }
  };

  const motivation = getMotivationalMessage();

  const chartConfig = {
    routes: {
      label: "Total Routes",
      color: "#3A7BFF",
    },
    completed: {
      label: "Completed",
      color: "#22C55E",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="animate-fade-in">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">
              Your Route Statistics
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Track your progress and discover your exploration patterns
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <Card className="glass-effect border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{totalRoutes}</p>
                <p className="text-sm text-gray-600">Total Routes</p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{completedRoutes}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{averageRating}</p>
                <p className="text-sm text-gray-600">Avg Rating</p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{totalDistance}km</p>
                <p className="text-sm text-gray-600">Distance</p>
              </CardContent>
            </Card>
          </div>

          {/* Completion Rate & Motivation */}
          <Card className={`glass-effect border-0 shadow-lg mb-8 ${motivation.bgColor}`}>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Route Completion Rate</h3>
                  <p className={`text-lg ${motivation.color} font-medium`}>{motivation.message}</p>
                </div>
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#E5E7EB"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#3A7BFF"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${completionRate * 2.51} 251.2`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-gray-900">{completionRate}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Monthly Progress */}
            <Card className="glass-effect border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Monthly Progress
                </CardTitle>
                <CardDescription>Your route activity over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[200px]">
                  <BarChart data={monthlyData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="routes" fill="#3A7BFF" name="Total Routes" />
                    <Bar dataKey="completed" fill="#22C55E" name="Completed" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Route Types Distribution */}
            <Card className="glass-effect border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Route Preferences</CardTitle>
                <CardDescription>Your favorite types of routes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={routeTypes}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {routeTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {routeTypes.map((type) => (
                    <div key={type.name} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: type.color }}
                      />
                      <span className="text-sm text-gray-600">{type.name}: {type.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <Card className="glass-effect border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Recent Achievements
              </CardTitle>
              <CardDescription>Celebrating your exploration milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {recentAchievements.map((achievement, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 text-center">
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <h4 className="font-semibold text-gray-900 mb-1">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
