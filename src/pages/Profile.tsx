
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User, MapPin, Phone, Mail, Users, Settings } from 'lucide-react';

const Profile = () => {
  const [personalData, setPersonalData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [routePreferences, setRoutePreferences] = useState({
    travelStyle: 'relaxed',
    interests: ['nature'],
    duration: 'compact',
    transportation: 'walking'
  });

  const [friends] = useState([
    { id: 1, name: 'Alex Johnson', avatar: '👤', status: 'online' },
    { id: 2, name: 'Sarah Chen', avatar: '👤', status: 'offline' },
    { id: 3, name: 'Mike Rodriguez', avatar: '👤', status: 'online' }
  ]);

  const travelStyles = [
    { id: 'relaxed', label: 'Relaxed & Calm', icon: '🧘' },
    { id: 'active', label: 'Active & Energetic', icon: '⚡' },
    { id: 'curious', label: 'Curious & Exploratory', icon: '🔍' },
    { id: 'spontaneous', label: 'Spontaneous & Open', icon: '🎲' }
  ];

  const interests = [
    { id: 'city', label: 'City & Shopping', icon: '🏙️' },
    { id: 'culture', label: 'Culture & History', icon: '🏛️' },
    { id: 'nature', label: 'Nature & Calm', icon: '🌿' },
    { id: 'culinary', label: 'Culinary & Local', icon: '🍽️' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="animate-fade-in">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">
              Profile & Settings
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Manage your preferences and connect with friends for better route planning
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <Card className="glass-effect border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Update your personal details for better location services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={personalData.name}
                    onChange={(e) => setPersonalData({...personalData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={personalData.email}
                    onChange={(e) => setPersonalData({...personalData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+1 (555) 123-4567"
                    value={personalData.phone}
                    onChange={(e) => setPersonalData({...personalData, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Home Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main St, City, State"
                    value={personalData.address}
                    onChange={(e) => setPersonalData({...personalData, address: e.target.value})}
                  />
                </div>
                <Button className="w-full gradient-primary text-white">
                  <MapPin className="w-4 h-4 mr-2" />
                  Update Location
                </Button>
              </CardContent>
            </Card>

            {/* Friends List */}
            <Card className="glass-effect border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Friends
                </CardTitle>
                <CardDescription>
                  Connect with friends for group route planning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  {friends.map((friend) => (
                    <div key={friend.id} className="flex items-center justify-between p-3 rounded-lg bg-blue-50/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          {friend.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{friend.name}</p>
                          <p className={`text-sm ${friend.status === 'online' ? 'text-green-600' : 'text-gray-500'}`}>
                            {friend.status}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Message
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  Add Friends
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Default Route Preferences */}
          <Card className="glass-effect border-0 shadow-lg mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Default Route Preferences
              </CardTitle>
              <CardDescription>
                Set your default preferences for faster route planning
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Travel Style */}
              <div>
                <Label className="text-base font-medium mb-4 block">Travel Style</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {travelStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setRoutePreferences({...routePreferences, travelStyle: style.id})}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        routePreferences.travelStyle === style.id
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      <div className="text-2xl mb-2">{style.icon}</div>
                      <p className="text-sm font-medium">{style.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Interests */}
              <div>
                <Label className="text-base font-medium mb-4 block">Interests</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {interests.map((interest) => (
                    <button
                      key={interest.id}
                      onClick={() => {
                        const newInterests = routePreferences.interests.includes(interest.id)
                          ? routePreferences.interests.filter(i => i !== interest.id)
                          : [...routePreferences.interests, interest.id];
                        setRoutePreferences({...routePreferences, interests: newInterests});
                      }}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        routePreferences.interests.includes(interest.id)
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      <div className="text-2xl mb-2">{interest.icon}</div>
                      <p className="text-sm font-medium">{interest.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button className="gradient-primary text-white px-8">
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
