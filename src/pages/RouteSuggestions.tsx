
import { useState, useEffect } from 'react';
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
import { supabase } from '@/integrations/supabase/client';

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
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    loadBusinessData();
  }, []);

  const loadBusinessData = async () => {
    try {
      // Load businesses
      const { data: businessData } = await supabase
        .from('businesses')
        .select('*')
        .limit(10);

      // Load live events
      const { data: eventData } = await supabase
        .from('live_events')
        .select(`
          *,
          businesses(name, address, category)
        `)
        .eq('status', 'active')
        .gte('event_date', new Date().toISOString())
        .limit(5);

      if (businessData) setBusinesses(businessData);
      if (eventData) setEvents(eventData);
    } catch (error) {
      console.error('Error loading business data:', error);
    }
  };

  // Enhanced route data with real business data and attractive images
  const routes = [
    {
      id: 1,
      name: "Historic Arts District Explorer",
      description: "Discover local culture through galleries, museums, and historic landmarks",
      duration: "2.5 hours",
      distance: "3.2 km",
      rating: 4.8,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=250&fit=crop",
      mapImage: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop",
      highlights: [
        ...businesses.slice(0, 2).map(business => ({
          name: business.name || "Local Business",
          type: "partner",
          verified: true,
          category: business.category
        })),
        { name: "Historic Central Square", type: "attraction" },
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
      image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400&h=250&fit=crop",
      mapImage: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=300&fit=crop",
      highlights: [
        { name: "Farmers Market", type: "attraction" },
        ...businesses.filter(b => b.category?.toLowerCase().includes('restaurant') || b.category?.toLowerCase().includes('bar')).slice(0, 2).map(business => ({
          name: business.name || "Local Eatery",
          type: "partner",
          verified: true,
          category: business.category
        })),
        { name: "Gourmet Food Hall", type: "attraction" }
      ],
      transportation: "Walking",
      difficulty: "Easy"
    },
    {
      id: 3,
      name: "Live Events & Entertainment",
      description: "Experience the vibrant nightlife and live events happening now",
      duration: "4 hours",
      distance: "2.1 km",
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=250&fit=crop",
      mapImage: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=300&fit=crop",
      highlights: [
        ...events.slice(0, 3).map(event => ({
          name: event.title || "Live Event",
          type: "event",
          verified: true,
          business: event.businesses?.name,
          time: new Date(event.event_date).toLocaleTimeString()
        })),
        { name: "Entertainment District", type: "attraction" }
      ],
      transportation: "Walking",
      difficulty: "Easy"
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
              <Card className="shadow-lg h-96 lg:h-[600px] overflow-hidden">
                <CardContent className="p-0 h-full">
                  {selectedRoute ? (
                    <div className="relative w-full h-full">
                      <img
                        src={routes.find(r => r.id === selectedRoute)?.mapImage}
                        alt="Route Map"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                        <p className="text-sm font-medium text-gray-900">
                          {routes.find(r => r.id === selectedRoute)?.name}
                        </p>
                        <p className="text-xs text-gray-600">Interactive Route View</p>
                      </div>
                      {/* Mock route indicators */}
                      <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-red-500 rounded-full animate-pulse border-2 border-white shadow-lg"></div>
                      <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-white shadow-lg"></div>
                      <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-blue-500 rounded-full animate-pulse border-2 border-white shadow-lg"></div>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="text-center text-blue-600">
                        <MapPin className="w-16 h-16 mx-auto mb-4" />
                        <p className="text-lg font-medium">Interactive Route Map</p>
                        <p className="text-sm opacity-75">Select a route to view the map</p>
                      </div>
                    </div>
                  )}
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
                  className={`shadow-lg cursor-pointer transition-all duration-300 overflow-hidden ${
                    selectedRoute === route.id 
                      ? 'ring-2 ring-primary shadow-xl' 
                      : 'hover:shadow-xl'
                  }`}
                  onClick={() => setSelectedRoute(route.id)}
                >
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={route.image}
                      alt={route.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-2 right-2">
                      <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">{route.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-3">
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
                        <Navigation className="w-4 h-4 mr-1" />
                        {route.distance}
                      </div>
                      <Badge variant="outline">{route.difficulty}</Badge>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Route Highlights:</h4>
                      {route.highlights.slice(0, 3).map((highlight, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-2 text-primary" />
                            <span className="truncate">{highlight.name}</span>
                          </div>
                          {highlight.verified && (
                            <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          )}
                        </div>
                      ))}
                      {route.highlights.length > 3 && (
                        <p className="text-xs text-gray-500">+{route.highlights.length - 3} more stops</p>
                      )}
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
