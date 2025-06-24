
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar, DollarSign, Target, Plus, Edit, Trash2, Users } from 'lucide-react';
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
    target_audience: {}
  });

  useEffect(() => {
    loadBusinessAndCampaigns();
  }, []);

  const loadBusinessAndCampaigns = async () => {
    try {
      const { data: business } = await supabase
        .from('businesses')
        .select('id')
        .limit(1)
        .maybeSingle();

      if (business) {
        setBusinessId(business.id);
        
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
    let currentBusinessId = businessId;
    
    if (!currentBusinessId) {
      try {
        const { data: newBusiness, error } = await supabase
          .from('businesses')
          .insert([{
            name: 'Demo Business',
            owner_id: crypto.randomUUID()
          }])
          .select()
          .single();
        
        if (error) throw error;
        currentBusinessId = newBusiness.id;
        setBusinessId(currentBusinessId);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to create business. Please try again.",
          variant: "destructive"
        });
        return;
      }
    }

    setLoading(true);
    try {
      const campaignData = {
        title: newCampaign.title || 'Demo Campaign',
        description: newCampaign.description,
        business_id: currentBusinessId,
        budget: newCampaign.budget,
        start_date: newCampaign.start_date ? new Date(newCampaign.start_date).toISOString() : new Date().toISOString(),
        end_date: newCampaign.end_date ? new Date(newCampaign.end_date).toISOString() : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        target_audience: newCampaign.target_audience
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
        target_audience: {}
      });
      setShowCreateForm(false);
      
      toast({
        title: "Campaign Created",
        description: "Your ad campaign has been created and will be promoted to BluePlan users.",
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
        description: "The campaign has been removed from your listings.",
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
          <p className="text-muted-foreground">Create targeted advertising campaigns to reach more customers</p>
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
              Target specific audiences and promote your business to BluePlan users
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
                  placeholder="e.g., Summer Special Promotion"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget ($)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={newCampaign.budget}
                  onChange={(e) => setNewCampaign({...newCampaign, budget: parseFloat(e.target.value) || 100})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newCampaign.description}
                onChange={(e) => setNewCampaign({...newCampaign, description: e.target.value})}
                placeholder="Describe your campaign..."
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

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCampaign} disabled={loading} className="gradient-primary text-white">
                {loading ? 'Creating...' : 'Create Campaign'}
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">${campaign.budget}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{new Date(campaign.start_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">0 clicks</span>
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
              Create your first ad campaign to start attracting customers
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
