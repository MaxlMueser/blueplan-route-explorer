
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, DollarSign, Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LiveEvents = () => {
  const { toast } = useToast();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Happy Hour Special',
      description: 'Half price drinks and appetizers',
      date: '2024-01-20',
      time: '17:00',
      duration: 3,
      price: 0,
      maxAttendees: 50,
      currentAttendees: 23,
      status: 'active'
    },
    {
      id: 2,
      title: 'Live Jazz Night',
      description: 'Featuring local jazz musicians',
      date: '2024-01-25',
      time: '20:00',
      duration: 4,
      price: 15,
      maxAttendees: 80,
      currentAttendees: 45,
      status: 'active'
    }
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: 2,
    price: 0,
    maxAttendees: 50
  });

  const handleCreateEvent = () => {
    const event = {
      id: Date.now(),
      ...newEvent,
      currentAttendees: 0,
      status: 'active'
    };
    setEvents([event, ...events]);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      duration: 2,
      price: 0,
      maxAttendees: 50
    });
    setShowCreateForm(false);
    toast({
      title: "Event Created",
      description: "Your live event has been created and will be promoted to BluePlan users.",
    });
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
    toast({
      title: "Event Deleted",
      description: "The event has been removed from your listings.",
    });
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
                  value={newEvent.maxAttendees}
                  onChange={(e) => setNewEvent({...newEvent, maxAttendees: parseInt(e.target.value)})}
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
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Start Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (hours)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={newEvent.duration}
                  onChange={(e) => setNewEvent({...newEvent, duration: parseInt(e.target.value)})}
                />
              </div>
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

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateEvent} className="gradient-primary text-white">
                Create Event ($25/event)
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
                  <span className="text-sm">{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{event.time} ({event.duration}h)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{event.currentAttendees}/{event.maxAttendees}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{event.price === 0 ? 'Free' : `$${event.price}`}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {Math.round((event.currentAttendees / event.maxAttendees) * 100)}% full
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
