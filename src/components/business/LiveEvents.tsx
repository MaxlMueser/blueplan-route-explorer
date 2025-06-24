import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, DollarSign, Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const LiveEvents = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [events, setEvents] = useState<any[]>([]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    event_date: '',
    duration_hours: 2,
    price: 0,
    max_attendees: 50
  });

  useEffect(() => {
    loadBusinessAndEvents();
  }, []);

  const loadBusinessAndEvents = async () => {
    try {
      // Get first business (demo mode)
      const { data: business } = await supabase
        .from('businesses')
        .select('id')
        .limit(1)
        .maybeSingle();

      if (business) {
        setBusinessId(business.id);
        
        // Load events for this business
        const { data: eventsData } = await supabase
          .from('live_events')
          .select('*')
          .eq('business_id', business.id)
          .order('event_date', { ascending: false });

        if (eventsData) {
          setEvents(eventsData);
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleCreateEvent = async () => {
    if (!businessId) {
      toast({
        title: "Business Required",
        description: "Please create a business profile first.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const eventData = {
        ...newEvent,
        business_id: businessId,
        event_date: new Date(newEvent.event_date).toISOString()
      };

      const { data, error } = await supabase
        .from('live_events')
        .insert([eventData])
        .select()
        .single();

      if (error) throw error;

      setEvents([data, ...events]);
      setNewEvent({
        title: '',
        description: '',
        event_date: '',
        duration_hours: 2,
        price: 0,
        max_attendees: 50
      });
      setShowCreateForm(false);
      
      toast({
        title: "Event Created",
        description: "Your live event has been created and will be promoted to BluePlan users.",
      });
    } catch (error) {
      console.error('Error creating event:', error);
      toast({
        title: "Error",
        description: "Failed to create event. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('live_events')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setEvents(events.filter(event => event.id !== id));
      toast({
        title: "Event Deleted",
        description: "The event has been removed from your listings.",
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: "Error",
        description: "Failed to delete event.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Live Events</h2>
          <p className="text-muted-foreground">Create and manage events to attract more customers</p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="gradient-primary text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Live Event</CardTitle>
            <CardDescription>
              Events are promoted to BluePlan users based on their interests and location
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  placeholder="e.g., Happy Hour Special"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxAttendees">Max Attendees</Label>
                <Input
                  id="maxAttendees"
                  type="number"
                  value={newEvent.max_attendees}
                  onChange={(e) => setNewEvent({...newEvent, max_attendees: parseInt(e.target.value)})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                placeholder="Describe your event..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date">Date & Time</Label>
                <Input
                  id="date"
                  type="datetime-local"
                  value={newEvent.event_date}
                  onChange={(e) => setNewEvent({...newEvent, event_date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (hours)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={newEvent.duration_hours}
                  onChange={(e) => setNewEvent({...newEvent, duration_hours: parseInt(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Entry Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={newEvent.price}
                  onChange={(e) => setNewEvent({...newEvent, price: parseFloat(e.target.value)})}
                  placeholder="0 for free events"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateEvent} disabled={loading} className="gradient-primary text-white">
                {loading ? 'Creating...' : 'Create Event ($25/event)'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {event.title}
                    <Badge variant={event.status === 'active' ? 'default' : 'secondary'}>
                      {event.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => deleteEvent(event.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{new Date(event.event_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{new Date(event.event_date).toLocaleTimeString()} ({event.duration_hours}h)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{event.current_attendees}/{event.max_attendees}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{event.price === 0 ? 'Free' : `$${event.price}`}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {Math.round((event.current_attendees / event.max_attendees) * 100)}% full
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {events.length === 0 && !showCreateForm && (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No events yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first live event to start attracting customers
            </p>
            <Button onClick={() => setShowCreateForm(true)} className="gradient-primary text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Event
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LiveEvents;
