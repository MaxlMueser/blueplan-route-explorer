
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Clock, 
  Star, 
  CheckCircle, 
  Navigation, 
  Share2,
  Heart,
  Play
} from 'lucide-react';

interface RoutePreferences {
  availableTime: string;
  travelStyle: string;
  interests: string[];
  duration: string;
  transportation: string;
}

interface RouteSuggestionsProps {
  preferences: RoutePreferences | null;
}

const RouteSuggestions = ({ preferences }: RouteSuggestionsProps) => {
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);

  // Mock data for route suggestions
  const routes = [
    {
      id: 1,
      name: "Historic Arts District Explorer",
      description: "Discover local culture through galleries, museums, and historic landmarks",
      duration: "2.5 hours",
      distance: "3.2 km",
      rating: 4.8,
      reviews: 127,
      highlights: [
        { name: "Contemporary Art Museum", type: "partner", verified: true },
        { name: "Historic Central Square", type: "attraction" },
        { name: "Local Coffee Roasters", type: "partner", verified: true },
        { name: "Artisan Bookstore", type: "attraction" }
      ],
      transportation: "Walking",
      difficulty: "Easy"
    },
    {
      id: 2,
      name: "Culinary Adventure Trail",
      description: "A foodie's paradise with local markets, eateries, and culinary experiences",
      duration: "3 hours",
      distance: "2.8 km", 
      rating: 4.9,
      reviews: 89,
      highlights: [
        { name: "Farmers Market", type: "attraction" },
        { name: "Craft Brewery & Taproom", type: "partner", verified: true },
        { name: "Traditional Bakery", type: "partner", verified: true },
        { name: "Gourmet Food Hall", type: "attraction" }
      ],
      transportation: "Walking",
      difficulty: "Easy"
    },
    {
      id: 3,
      name: "Nature & Parks Circuit",
      description: "Peaceful route through green spaces and scenic viewpoints",
      duration: "2 hours", 
      distance: "4.1 km",
      rating: 4.7,
      reviews: 156,
      highlights: [
        { name: "Botanical Gardens", type: "attraction" },
        { name: "Scenic Overlook Point", type: "attraction" },
        { name: "Riverside Walking Trail", type: "attraction" },
        { name: "Historic Bridge", type: "attraction" }
      ],
      transportation: "Walking",
      difficulty: "Moderate"
    }
  ];

  if (!preferences) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">No Preferences Set</h1>
          <p className="text-gray-600">Please complete the route planner first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Your Personalized Routes
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Based on your preferences for {preferences.travelStyle} {preferences.duration} routes
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map Section */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg h-96 lg:h-[600px]">
                <CardContent className="p-0 h-full">
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="text-center text-blue-600">
                      <MapPin className="w-16 h-16 mx-auto mb-4" />
                      <p className="text-lg font-medium">Interactive Route Map</p>
                      <p className="text-sm opacity-75">View your personalized routes</p>
                    </div>
                    
                    {/* Mock route indicators */}
                    <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Route List */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Recommended Routes
              </h2>
              
              {routes.map((route, index) => (
                <Card 
                  key={route.id} 
                  className={`shadow-lg cursor-pointer transition-all duration-300 ${
                    selectedRoute === route.id 
                      ? 'ring-2 ring-primary shadow-xl' 
                      : 'hover:shadow-xl'
                  }`}
                  onClick={() => setSelectedRoute(route.id)}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{route.name}</CardTitle>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{route.rating}</span>
                        <span className="text-sm text-gray-500">({route.reviews})</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{route.description}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {route.duration}
                      </div>
                      <div className="flex items-center">
                        <Navigation className="w-4 h-4 mr-1" />
                        {route.distance}
                      </div>
                      <Badge variant="outline">{route.difficulty}</Badge>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Route Highlights:</h4>
                      {route.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-2 text-primary" />
                            <span>{highlight.name}</span>
                          </div>
                          {highlight.verified && (
                            <CheckCircle className="w-4 h-4 text-blue-500" />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-2 pt-4">
                      <Button 
                        size="sm" 
                        className="flex-1 gradient-primary text-white"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Start Route
                      </Button>
                      <Button size="sm" variant="outline">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteSuggestions;
