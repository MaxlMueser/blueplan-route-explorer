
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  Clock, 
  Star, 
  Users, 
  Share2, 
  Play,
  Search,
  Filter,
  Calendar,
  UserPlus
} from 'lucide-react';

const Community = () => {
  const [activeTab, setActiveTab] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');

  const popularRoutes = [
    {
      id: 1,
      name: "Sunset Photography Walk",
      creator: "Alex Chen",
      avatar: "AC",
      duration: "1.5 hours",
      rating: 4.9,
      participants: 156,
      description: "Perfect spots for golden hour photography",
      tags: ["Photography", "Nature", "Easy"],
      status: "active"
    },
    {
      id: 2,
      name: "Local Food Adventure",
      creator: "Maria Santos",
      avatar: "MS", 
      duration: "3 hours",
      rating: 4.8,
      participants: 203,
      description: "Hidden gems and local favorites",
      tags: ["Food", "Culture", "Walking"],
      status: "completed"
    },
    {
      id: 3,
      name: "Historic Architecture Tour",
      creator: "David Kim",
      avatar: "DK",
      duration: "2 hours", 
      rating: 4.7,
      participants: 89,
      description: "Discover the city's architectural heritage",
      tags: ["History", "Architecture", "Culture"],
      status: "active"
    }
  ];

  const activeRoutes = [
    {
      id: 1,
      name: "Morning Coffee Circuit",
      participants: 12,
      currentLocation: "Downtown Coffee District",
      timeRemaining: "45 min",
      leader: "Sarah Wilson"
    },
    {
      id: 2,
      name: "Art Gallery Hopping", 
      participants: 8,
      currentLocation: "Contemporary Art Museum",
      timeRemaining: "1h 20min",
      leader: "James Rodriguez"
    }
  ];

  const upcomingGroups = [
    {
      id: 1,
      name: "Weekend Market Explorer",
      date: "Saturday, 10:00 AM",
      participants: 6,
      maxParticipants: 12,
      organizer: "Lisa Chang"
    },
    {
      id: 2,
      name: "Night Photography Walk",
      date: "Friday, 7:00 PM", 
      participants: 15,
      maxParticipants: 20,
      organizer: "Mike Thompson"
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Community Routes
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover amazing routes shared by fellow explorers and join group adventures
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search routes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-8 bg-gray-100 rounded-lg p-1">
            <Button
              variant={activeTab === 'popular' ? 'default' : 'ghost'}
              className={`flex-1 ${activeTab === 'popular' ? 'gradient-primary text-white' : ''}`}
              onClick={() => setActiveTab('popular')}
            >
              Popular Routes
            </Button>
            <Button
              variant={activeTab === 'active' ? 'default' : 'ghost'}
              className={`flex-1 ${activeTab === 'active' ? 'gradient-primary text-white' : ''}`}
              onClick={() => setActiveTab('active')}
            >
              Live Routes
            </Button>
            <Button
              variant={activeTab === 'groups' ? 'default' : 'ghost'}
              className={`flex-1 ${activeTab === 'groups' ? 'gradient-primary text-white' : ''}`}
              onClick={() => setActiveTab('groups')}
            >
              Group Planning
            </Button>
          </div>

          {/* Popular Routes Tab */}
          {activeTab === 'popular' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularRoutes.map((route) => (
                <Card key={route.id} className="shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">{route.avatar}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{route.creator}</span>
                      </div>
                      {route.status === 'active' && (
                        <Badge className="bg-green-100 text-green-700">Live</Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{route.name}</CardTitle>
                    <p className="text-gray-600 text-sm">{route.description}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {route.duration}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                        {route.rating}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {route.participants}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {route.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1 gradient-primary text-white">
                        <Play className="w-4 h-4 mr-1" />
                        Start Route
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Active Routes Tab */}
          {activeTab === 'active' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Routes Happening Now</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeRoutes.map((route) => (
                  <Card key={route.id} className="shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{route.name}</CardTitle>
                        <Badge className="bg-green-100 text-green-700 animate-pulse">
                          Live
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          Currently at: {route.currentLocation}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          Time remaining: {route.timeRemaining}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-2" />
                          {route.participants} participants
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1 gradient-primary text-white">
                          <UserPlus className="w-4 h-4 mr-1" />
                          Join Route
                        </Button>
                        <Button size="sm" variant="outline">
                          View Live
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Group Planning Tab */}
          {activeTab === 'groups' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-900">Upcoming Group Routes</h2>
                <Button className="gradient-primary text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  Plan Group Route
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingGroups.map((group) => (
                  <Card key={group.id} className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <p className="text-gray-600 text-sm">Organized by {group.organizer}</p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          {group.date}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-2" />
                          {group.participants}/{group.maxParticipants} participants
                        </div>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="gradient-primary h-2 rounded-full" 
                          style={{width: `${(group.participants / group.maxParticipants) * 100}%`}}
                        ></div>
                      </div>

                      <Button size="sm" className="w-full gradient-primary text-white">
                        <UserPlus className="w-4 h-4 mr-1" />
                        Join Group
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
