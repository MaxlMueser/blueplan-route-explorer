
-- Create businesses table for business owners
CREATE TABLE public.businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  address TEXT,
  phone TEXT,
  email TEXT,
  category TEXT,
  google_place_id TEXT,
  website_url TEXT,
  images TEXT[], -- Array of image URLs
  tags TEXT[], -- Array of tags like "pet-friendly", "family-friendly", etc.
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create live_events table
CREATE TABLE public.live_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMPTZ NOT NULL,
  duration_hours INTEGER DEFAULT 2,
  price DECIMAL(10,2),
  max_attendees INTEGER,
  current_attendees INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'completed')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create ads table for business advertisements
CREATE TABLE public.ads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  target_audience JSONB, -- Store targeting criteria
  budget DECIMAL(10,2),
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create analytics table for tracking business insights
CREATE TABLE public.business_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  metric_type TEXT NOT NULL, -- 'views', 'visits', 'conversions', etc.
  metric_value INTEGER NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for businesses
CREATE POLICY "Business owners can view their own businesses" 
  ON public.businesses FOR SELECT 
  USING (owner_id = auth.uid());

CREATE POLICY "Business owners can create businesses" 
  ON public.businesses FOR INSERT 
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Business owners can update their own businesses" 
  ON public.businesses FOR UPDATE 
  USING (owner_id = auth.uid());

-- RLS Policies for live_events
CREATE POLICY "Business owners can view their own events" 
  ON public.live_events FOR SELECT 
  USING (business_id IN (SELECT id FROM public.businesses WHERE owner_id = auth.uid()));

CREATE POLICY "Business owners can create events for their businesses" 
  ON public.live_events FOR INSERT 
  WITH CHECK (business_id IN (SELECT id FROM public.businesses WHERE owner_id = auth.uid()));

CREATE POLICY "Business owners can update their own events" 
  ON public.live_events FOR UPDATE 
  USING (business_id IN (SELECT id FROM public.businesses WHERE owner_id = auth.uid()));

-- RLS Policies for ads
CREATE POLICY "Business owners can view their own ads" 
  ON public.ads FOR SELECT 
  USING (business_id IN (SELECT id FROM public.businesses WHERE owner_id = auth.uid()));

CREATE POLICY "Business owners can create ads for their businesses" 
  ON public.ads FOR INSERT 
  WITH CHECK (business_id IN (SELECT id FROM public.businesses WHERE owner_id = auth.uid()));

CREATE POLICY "Business owners can update their own ads" 
  ON public.ads FOR UPDATE 
  USING (business_id IN (SELECT id FROM public.businesses WHERE owner_id = auth.uid()));

-- RLS Policies for business_analytics
CREATE POLICY "Business owners can view their own analytics" 
  ON public.business_analytics FOR SELECT 
  USING (business_id IN (SELECT id FROM public.businesses WHERE owner_id = auth.uid()));

-- Create some sample analytics data for demonstration
INSERT INTO public.business_analytics (business_id, metric_type, metric_value, date)
SELECT 
  (SELECT id FROM public.businesses LIMIT 1),
  metric_type,
  FLOOR(RANDOM() * 100 + 1)::INTEGER,
  CURRENT_DATE - INTERVAL '1 day' * generate_series
FROM (
  VALUES ('views'), ('visits'), ('conversions'), ('ad_clicks')
) AS metrics(metric_type),
generate_series(0, 29) -- Last 30 days
WHERE EXISTS (SELECT 1 FROM public.businesses LIMIT 1);
