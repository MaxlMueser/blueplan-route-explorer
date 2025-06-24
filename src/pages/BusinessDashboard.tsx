
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Store, Calendar, Target, BarChart3 } from 'lucide-react';
import BusinessProfile from '@/components/business/BusinessProfile';
import LiveEvents from '@/components/business/LiveEvents';
import AdCampaigns from '@/components/business/AdCampaigns';
import BusinessAnalytics from '@/components/business/BusinessAnalytics';

const BusinessDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-4">Business Dashboard</h1>
          <p className="text-gray-600 text-lg">
            Manage your business presence on BluePlan and connect with more customers
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Store className="w-4 h-4" />
              Business Profile
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Live Events
            </TabsTrigger>
            <TabsTrigger value="ads" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Ad Campaigns
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="gradient-primary text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-blue-100">Total Views</CardTitle>
                  <div className="text-3xl font-bold">2,847</div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-blue-100">+12% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Visits</CardTitle>
                  <div className="text-3xl font-bold">324</div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">+8% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Events</CardTitle>
                  <div className="text-3xl font-bold">3</div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">2 upcoming this week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Ad Campaigns</CardTitle>
                  <div className="text-3xl font-bold">2</div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">1 active campaign</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Get started with your business on BluePlan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => setActiveTab('events')}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Live Event
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => setActiveTab('ads')}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Launch Ad Campaign
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => setActiveTab('profile')}
                  >
                    <Store className="w-4 h-4 mr-2" />
                    Update Business Info
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest business updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">New customer visited via BluePlan</span>
                      <span className="text-xs text-muted-foreground ml-auto">2h ago</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Live event "Happy Hour" started</span>
                      <span className="text-xs text-muted-foreground ml-auto">5h ago</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Ad campaign reached 1,000 views</span>
                      <span className="text-xs text-muted-foreground ml-auto">1d ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <BusinessProfile />
          </TabsContent>

          <TabsContent value="events">
            <LiveEvents />
          </TabsContent>

          <TabsContent value="ads">
            <AdCampaigns />
          </TabsContent>

          <TabsContent value="analytics">
            <BusinessAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BusinessDashboard;
