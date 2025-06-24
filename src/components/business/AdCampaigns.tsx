import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Target, DollarSign, Calendar, BarChart, Plus, Edit, Pause, Play, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const AdCampaigns = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [campaigns, setCampaigns] = useState<any[]>([]);

  const [newCampaign, setNewCampaign] = useState({
    title: '',
    description: '',
    budget: 100,
    start_date: '',
    end_date: '',
    target_audience: ''
  });

  useEffect(() => {
    loadBusinessAndCampaigns();
  }, []);

  const loadBusinessAndCampaigns = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get business ID
      const { data: business } = await supabase
        .from('businesses')
        .select('id')
        .eq('owner_id', user.id)
        .maybeSingle();

      if (business) {
        setBusinessId(business.id);
        
        // Load campaigns for this business
        const { data: campaignsData } = await supabase
          .from('ads')
          .select('*')
          .eq('business_id', business.id)
          .order('created_at', { ascending: false });

        if (campaignsData) {
          setCampaigns(campaignsData);
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleCreateCampaign = async () => {
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
      const campaignData = {
        ...newCampaign,
        business_id: businessId,
        start_date: new Date(newCampaign.start_date).toISOString(),
        end_date: new Date(newCampaign.end_date).toISOString(),
        target_audience: { audience: newCampaign.target_audience }
      };

      const { data, error } = await supabase
        .from('ads')
        .insert([campaignData])
        .select()
        .single();

      if (error) throw error;

      setCampaigns([data, ...campaigns]);
      setNewCampaign({
        title: '',
        description: '',
        budget: 100,
        start_date: '',
        end_date: '',
        target_audience: ''
      });
      setShowCreateForm(false);
      
      toast({
        title: "Campaign Created",
        description: "Your ad campaign is now live and promoting your business to BluePlan users.",
      });
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast({
        title: "Error",
        description: "Failed to create campaign. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleCampaignStatus = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'active' ? 'paused' : 'active';
      const { error } = await supabase
        .from('ads')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setCampaigns(campaigns.map(campaign => 
        campaign.id === id 
          ? { ...campaign, status: newStatus }
          : campaign
      ));
    } catch (error) {
      console.error('Error updating campaign:', error);
    }
  };

  const deleteCampaign = async (id: string) => {
    try {
      const { error } = await supabase
        .from('ads')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCampaigns(campaigns.filter(campaign => campaign.id !== id));
      toast({
        title: "Campaign Deleted",
        description: "The ad campaign has been removed.",
      });
    } catch (error) {
      console.error('Error deleting campaign:', error);
      toast({
        title: "Error",
        description: "Failed to delete campaign.",
        variant: "destructive"
      });
    }
  };

  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Ad Campaigns</h2>
          <p className="text-muted-foreground">Promote your business to targeted BluePlan users</p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="gradient-primary text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Ad Campaign</CardTitle>
            <CardDescription>
              Target specific user interests and locations to maximize your reach
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Campaign Title</Label>
                <Input
                  id="title"
                  value={newCampaign.title}
                  onChange={(e) => setNewCampaign({...newCampaign, title: e.target.value})}
                  placeholder="e.g., Weekend Special Offer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget ($)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={newCampaign.budget}
                  onChange={(e) => setNewCampaign({...newCampaign, budget: parseInt(e.target.value)})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Ad Description</Label>
              <Textarea
                id="description"
                value={newCampaign.description}
                onChange={(e) => setNewCampaign({...newCampaign, description: e.target.value})}
                placeholder="Describe what you're promoting..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newCampaign.start_date}
                  onChange={(e) => setNewCampaign({...newCampaign, start_date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newCampaign.end_date}
                  onChange={(e) => setNewCampaign({...newCampaign, end_date: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Select onValueChange={(value) => setNewCampaign({...newCampaign, target_audience: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food-lovers">Food Lovers</SelectItem>
                  <SelectItem value="nightlife">Nightlife Enthusiasts</SelectItem>
                  <SelectItem value="families">Families with Children</SelectItem>
                  <SelectItem value="couples">Couples & Romance</SelectItem>
                  <SelectItem value="business">Business Professionals</SelectItem>
                  <SelectItem value="tourists">Tourists & Visitors</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCampaign} disabled={loading} className="gradient-primary text-white">
                {loading ? 'Creating...' : 'Launch Campaign'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {campaign.title}
                    <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                      {campaign.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{campaign.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toggleCampaignStatus(campaign.id, campaign.status)}
                  >
                    {campaign.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => deleteCampaign(campaign.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">$0</div>
                    <div className="text-xs text-muted-foreground">of ${campaign.budget}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">0</div>
                    <div className="text-xs text-muted-foreground">Impressions</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">0</div>
                    <div className="text-xs text-muted-foreground">Clicks</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">{new Date(campaign.start_date).toLocaleDateString()}</div>
                    <div className="text-xs text-muted-foreground">Start Date</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">{new Date(campaign.end_date).toLocaleDateString()}</div>
                    <div className="text-xs text-muted-foreground">End Date</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">0%</div>
                  <div className="text-xs text-muted-foreground">CTR</div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <strong>Target:</strong> {campaign.target_audience?.audience || 'Not specified'}
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `0%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {campaigns.length === 0 && !showCreateForm && (
        <Card>
          <CardContent className="text-center py-12">
            <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No campaigns yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first ad campaign to reach more customers
            </p>
            <Button onClick={() => setShowCreateForm(true)} className="gradient-primary text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Campaign
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdCampaigns;
