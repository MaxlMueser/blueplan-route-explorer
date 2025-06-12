
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Zap, 
  Heart, 
  Eye, 
  Sparkles,
  Building2,
  Landmark,
  Trees,
  Coffee,
  Bus,
  Bike,
  Car,
  MapPin
} from 'lucide-react';

interface RoutePreferences {
  availableTime: string;
  travelStyle: string;
  interests: string[];
  duration: string;
  transportation: string;
}

interface RoutePlannerProps {
  onPreferencesSubmit: (preferences: RoutePreferences) => void;
}

const RoutePlanner = ({ onPreferencesSubmit }: RoutePlannerProps) => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<RoutePreferences>({
    availableTime: '',
    travelStyle: '',
    interests: [],
    duration: '',
    transportation: ''
  });

  const travelStyles = [
    { id: 'relaxed', label: 'Relaxed & Calm', icon: <Heart className="w-5 h-5" />, color: 'bg-green-100 text-green-700' },
    { id: 'active', label: 'Active & Energetic', icon: <Zap className="w-5 h-5" />, color: 'bg-orange-100 text-orange-700' },
    { id: 'curious', label: 'Curious & Exploratory', icon: <Eye className="w-5 h-5" />, color: 'bg-purple-100 text-purple-700' },
    { id: 'spontaneous', label: 'Spontaneous & Open', icon: <Sparkles className="w-5 h-5" />, color: 'bg-pink-100 text-pink-700' }
  ];

  const interests = [
    { id: 'city', label: 'City Life & Shopping', icon: <Building2 className="w-5 h-5" /> },
    { id: 'culture', label: 'Culture & History', icon: <Landmark className="w-5 h-5" /> },
    { id: 'nature', label: 'Nature & Calm Spaces', icon: <Trees className="w-5 h-5" /> },
    { id: 'culinary', label: 'Culinary & Local', icon: <Coffee className="w-5 h-5" /> }
  ];

  const durations = [
    { id: 'short', label: 'Short trips', subtitle: 'Under 1 hour', icon: <Clock className="w-5 h-5" /> },
    { id: 'compact', label: 'Compact routes', subtitle: '1-2 hours', icon: <Clock className="w-5 h-5" /> },
    { id: 'extended', label: 'Extended routes', subtitle: '2-4 hours', icon: <Clock className="w-5 h-5" /> },
    { id: 'long', label: 'Long routes', subtitle: '4+ hours', icon: <Clock className="w-5 h-5" /> }
  ];

  const transportations = [
    { id: 'transit', label: 'Public Transit', icon: <Bus className="w-6 h-6" /> },
    { id: 'bicycle', label: 'Bicycle', icon: <Bike className="w-6 h-6" /> },
    { id: 'car', label: 'Car', icon: <Car className="w-6 h-6" /> },
    { id: 'walking', label: 'Walking', icon: <MapPin className="w-6 h-6" /> }
  ];

  const handleInterestToggle = (interestId: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId) 
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const handleSubmit = () => {
    if (preferences.travelStyle && preferences.duration && preferences.transportation && preferences.interests.length > 0) {
      onPreferencesSubmit(preferences);
      navigate('/suggestions');
    }
  };

  const isComplete = preferences.travelStyle && preferences.duration && preferences.transportation && preferences.interests.length > 0;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Plan Your Perfect Route
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tell us about your preferences and we'll create a personalized route just for you
            </p>
          </div>

          <div className="space-y-8">
            {/* Travel Style */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-6 h-6 mr-2 text-primary" />
                  What's your travel style?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {travelStyles.map((style) => (
                    <Button
                      key={style.id}
                      variant={preferences.travelStyle === style.id ? "default" : "outline"}
                      className={`h-auto p-4 justify-start ${
                        preferences.travelStyle === style.id 
                          ? 'gradient-primary text-white' 
                          : 'hover:bg-blue-50'
                      }`}
                      onClick={() => setPreferences(prev => ({ ...prev, travelStyle: style.id }))}
                    >
                      <div className="flex items-center space-x-3">
                        {style.icon}
                        <span className="font-medium">{style.label}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interests */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-6 h-6 mr-2 text-primary" />
                  What interests you? (Select all that apply)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {interests.map((interest) => (
                    <Button
                      key={interest.id}
                      variant={preferences.interests.includes(interest.id) ? "default" : "outline"}
                      className={`h-auto p-4 justify-start ${
                        preferences.interests.includes(interest.id) 
                          ? 'gradient-primary text-white' 
                          : 'hover:bg-blue-50'
                      }`}
                      onClick={() => handleInterestToggle(interest.id)}
                    >
                      <div className="flex items-center space-x-3">
                        {interest.icon}
                        <span className="font-medium">{interest.label}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Duration */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-6 h-6 mr-2 text-primary" />
                  How long do you want to explore?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {durations.map((duration) => (
                    <Button
                      key={duration.id}
                      variant={preferences.duration === duration.id ? "default" : "outline"}
                      className={`h-auto p-4 justify-start ${
                        preferences.duration === duration.id 
                          ? 'gradient-primary text-white' 
                          : 'hover:bg-blue-50'
                      }`}
                      onClick={() => setPreferences(prev => ({ ...prev, duration: duration.id }))}
                    >
                      <div className="flex items-center space-x-3">
                        {duration.icon}
                        <div className="text-left">
                          <div className="font-medium">{duration.label}</div>
                          <div className="text-sm opacity-75">{duration.subtitle}</div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Transportation */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Car className="w-6 h-6 mr-2 text-primary" />
                  How do you prefer to travel?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {transportations.map((transport) => (
                    <Button
                      key={transport.id}
                      variant={preferences.transportation === transport.id ? "default" : "outline"}
                      className={`h-20 flex-col ${
                        preferences.transportation === transport.id 
                          ? 'gradient-primary text-white' 
                          : 'hover:bg-blue-50'
                      }`}
                      onClick={() => setPreferences(prev => ({ ...prev, transportation: transport.id }))}
                    >
                      {transport.icon}
                      <span className="text-sm font-medium mt-2">{transport.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                size="lg"
                disabled={!isComplete}
                onClick={handleSubmit}
                className={`${
                  isComplete 
                    ? 'gradient-primary text-white hover:shadow-lg' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                } transition-all duration-300`}
              >
                Generate My Route
              </Button>
              {!isComplete && (
                <p className="text-sm text-gray-500 mt-2">
                  Please complete all sections to continue
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutePlanner;
