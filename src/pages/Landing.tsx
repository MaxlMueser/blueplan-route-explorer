
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Clock, 
  Star, 
  Users, 
  ArrowRight, 
  Play,
  Compass,
  Camera,
  Coffee
} from 'lucide-react';

const Landing = () => {
  const [activeRouteIndex, setActiveRouteIndex] = useState(0);

  const featuredRoutes = [
    {
      id: 1,
      name: "Historic Downtown Discovery",
      duration: "2-3 hours",
      rating: 4.8,
      image: "/api/placeholder/300/200",
      type: "Culture & History",
      highlights: ["Art Museum", "Historic Square", "Local Café"],
      icon: <Camera className="w-5 h-5" />
    },
    {
      id: 2,
      name: "Nature & Parks Explorer",
      duration: "1-2 hours",
      rating: 4.9,
      image: "/api/placeholder/300/200",
      type: "Nature & Calm",
      highlights: ["Botanical Garden", "Scenic Overlook", "Hidden Trail"],
      icon: <Compass className="w-5 h-5" />
    },
    {
      id: 3,
      name: "Foodie Adventure Trail",
      duration: "3-4 hours",
      rating: 4.7,
      image: "/api/placeholder/300/200",
      type: "Culinary & Local",
      highlights: ["Food Market", "Local Brewery", "Artisan Bakery"],
      icon: <Coffee className="w-5 h-5" />
    },
    {
      id: 4,
      name: "Urban Shopping Circuit",
      duration: "2-3 hours",
      rating: 4.6,
      image: "/api/placeholder/300/200",
      type: "City Life & Shopping",
      highlights: ["Boutique District", "Design Gallery", "Rooftop Bar"],
      icon: <Users className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-gray-900 mb-6">
              Discover Your Perfect
              <span className="text-gradient block">Route Adventure</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              BluePlan creates personalized routes tailored to your interests, available time, 
              and travel style. Start exploring like never before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/planner">
                <Button size="lg" className="gradient-primary text-white hover:shadow-lg transition-all duration-300">
                  Plan Your Route
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                Download App
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-300 rounded-full opacity-30 animate-float" style={{animationDelay: '1s'}}></div>
      </section>

      {/* Featured Routes Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              Trending Route Adventures
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover popular routes created by our community and start your next adventure
            </p>
          </div>

          {/* Route Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredRoutes.map((route, index) => (
              <Card 
                key={route.id} 
                className="overflow-hidden card-hover cursor-pointer group"
                onMouseEnter={() => setActiveRouteIndex(index)}
              >
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <div className="text-blue-500">
                      {route.icon}
                    </div>
                  </div>
                  <Badge className="absolute top-3 left-3 gradient-primary text-white">
                    {route.type}
                  </Badge>
                  <div className="absolute top-3 right-3 bg-white/90 rounded-full p-1">
                    <div className="flex items-center space-x-1 text-sm">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{route.rating}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {route.name}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{route.duration}</span>
                  </div>
                  <div className="space-y-2 mb-4">
                    {route.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-3 h-3 mr-2 text-primary" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full gradient-primary text-white group-hover:shadow-lg transition-all duration-300"
                    size="sm"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Route
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 gradient-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-16">
              Why Choose BluePlan?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Personalized</h3>
                <p className="text-gray-600">Routes tailored to your unique preferences and available time</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Planning</h3>
                <p className="text-gray-600">AI-powered recommendations based on your interests and travel style</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Compass className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
                <p className="text-gray-600">Discover and share amazing routes with fellow explorers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-6">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of explorers who've discovered amazing routes with BluePlan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/planner">
                <Button size="lg" className="gradient-primary text-white hover:shadow-lg transition-all duration-300">
                  Create Your First Route
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
