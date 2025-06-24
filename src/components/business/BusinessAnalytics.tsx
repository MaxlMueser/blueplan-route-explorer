
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Eye, Target, MapPin, Calendar } from 'lucide-react';

const BusinessAnalytics = () => {
  const [timeframe, setTimeframe] = useState('7d');

  const overviewData = [
    { name: 'Mon', views: 45, visits: 8, conversions: 3 },
    { name: 'Tue', views: 52, visits: 12, conversions: 5 },
    { name: 'Wed', views: 38, visits: 6, conversions: 2 },
    { name: 'Thu', views: 61, visits: 15, conversions: 7 },
    { name: 'Fri', views: 78, visits: 22, conversions: 11 },
    { name: 'Sat', views: 95, visits: 35, conversions: 18 },
    { name: 'Sun', views: 67, visits: 18, conversions: 8 },
  ];

  const audienceData = [
    { name: '18-24', value: 15, color: '#3b82f6' },
    { name: '25-34', value: 35, color: '#8b5cf6' },
    { name: '35-44', value: 28, color: '#06b6d4' },
    { name: '45-54', value: 15, color: '#10b981' },
    { name: '55+', value: 7, color: '#f59e0b' },
  ];

  const hourlyData = [
    { hour: '6AM', visitors: 2 },
    { hour: '8AM', visitors: 5 },
    { hour: '10AM', visitors: 8 },
    { hour: '12PM', visitors: 15 },
    { hour: '2PM', visitors: 12 },
    { hour: '4PM', visitors: 18 },
    { hour: '6PM', visitors: 25 },
    { hour: '8PM', visitors: 32 },
    { hour: '10PM', visitors: 20 },
    { hour: '12AM', visitors: 8 },
  ];

  const topLocations = [
    { location: 'Downtown Area', visits: 45, percentage: 35 },
    { location: 'University District', visits: 32, percentage: 25 },
    { location: 'Shopping Center', visits: 25, percentage: 20 },
    { location: 'Residential North', visits: 15, percentage: 12 },
    { location: 'Business District', visits: 10, percentage: 8 },
  ];

  const timeframes = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Business Analytics</h2>
          <p className="text-muted-foreground">Track your business performance and customer insights</p>
        </div>
        <div className="flex gap-2">
          {timeframes.map((tf) => (
            <Button
              key={tf.value}
              variant={timeframe === tf.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe(tf.value)}
            >
              {tf.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="gradient-primary text-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-blue-100">Total Views</CardTitle>
              <Eye className="w-4 h-4 text-blue-200" />
            </div>
            <div className="text-3xl font-bold">2,847</div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-300" />
              <span className="text-xs text-blue-100">+12% from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Actual Visits</CardTitle>
              <MapPin className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">324</div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-xs text-muted-foreground">+8% from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
              <Target className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">11.4%</div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-xs text-muted-foreground">+2.3% from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Visit Duration</CardTitle>
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">45m</div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-xs text-muted-foreground">+5m from last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Views vs Visits Trend</CardTitle>
              <CardDescription>Track how app views translate to actual visits</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={overviewData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="views" fill="#3b82f6" name="Views" />
                  <Bar dataKey="visits" fill="#10b981" name="Visits" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>See how users progress from viewing to visiting</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={overviewData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="conversions" stroke="#f59e0b" strokeWidth={2} name="Conversions" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Age Demographics</CardTitle>
                <CardDescription>Age distribution of your visitors</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={audienceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {audienceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Visitor Interests</CardTitle>
                <CardDescription>Top interests that led visitors to your business</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { interest: 'Local Food', percentage: 45, count: 156 },
                  { interest: 'Pet-friendly', percentage: 32, count: 112 },
                  { interest: 'Date Night', percentage: 28, count: 98 },
                  { interest: 'Family Dining', percentage: 24, count: 84 },
                  { interest: 'Outdoor Seating', percentage: 18, count: 63 },
                ].map((item) => (
                  <div key={item.interest} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">{item.interest}</Badge>
                      <span className="text-sm text-muted-foreground">{item.count} visitors</span>
                    </div>
                    <div className="text-sm font-medium">{item.percentage}%</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="locations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Visitor Locations</CardTitle>
              <CardDescription>Areas where most of your visitors come from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topLocations.map((location, index) => (
                  <div key={location.location} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{location.location}</p>
                        <p className="text-sm text-muted-foreground">{location.visits} visits</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{location.percentage}%</p>
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-primary rounded-full" 
                          style={{ width: `${location.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hourly Visitor Pattern</CardTitle>
              <CardDescription>When are your visitors most active</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="visitors" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Peak Hours</CardTitle>
                <CardDescription>Your busiest times</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { time: '8:00 PM', visitors: 32, change: '+15%' },
                  { time: '6:00 PM', visitors: 25, change: '+8%' },
                  { time: '4:00 PM', visitors: 18, change: '+5%' },
                ].map((item) => (
                  <div key={item.time} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.time}</p>
                      <p className="text-sm text-muted-foreground">{item.visitors} visitors</p>
                    </div>
                    <Badge variant="secondary" className="text-green-600">
                      {item.change}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quiet Hours</CardTitle>
                <CardDescription>Less busy periods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { time: '6:00 AM', visitors: 2, change: '-5%' },
                  { time: '10:00 AM', visitors: 8, change: '-2%' },
                  { time: '12:00 AM', visitors: 8, change: '+1%' },
                ].map((item) => (
                  <div key={item.time} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.time}</p>
                      <p className="text-sm text-muted-foreground">{item.visitors} visitors</p>
                    </div>
                    <Badge variant="outline" className="text-muted-foreground">
                      {item.change}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessAnalytics;
