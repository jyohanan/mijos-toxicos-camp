-- Run this in your Supabase SQL editor

create table registrations (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),

  -- Athlete info
  athlete_first_name text not null,
  athlete_last_name text not null,
  athlete_age integer not null,
  athlete_dob date not null,
  gender text not null,
  sport text not null check (sport in ('football', 'soccer')),
  position text,
  school_name text not null,
  grade text not null,
  shirt_size text not null,

  -- Parent/guardian
  parent_name text not null,
  parent_email text not null,
  parent_phone text not null,

  -- Emergency contact
  emergency_name text not null,
  emergency_phone text not null,

  -- Medical
  medical_notes text,
  insurance_provider text,

  -- Optional
  social_handle text,
  heard_from text,

  -- Scholarship
  scholarship_interest boolean default false,

  -- Waivers
  waiver_accepted boolean not null default false,
  waiver_signed_at timestamp with time zone,

  -- Payment
  stripe_session_id text unique,
  stripe_payment_intent text,
  payment_status text default 'pending' check (payment_status in ('pending', 'paid', 'refunded')),
  amount_paid integer, -- in cents

  -- Admin
  is_scholarship boolean default false,
  notes text
);

-- Index for admin queries
create index on registrations (payment_status);
create index on registrations (sport);
create index on registrations (created_at desc);

-- Settings (key-value store for admin-configurable options)
create table settings (
  key text primary key,
  value text not null,
  updated_at timestamp with time zone default now()
);

-- Default settings
insert into settings (key, value) values
  ('max_registrations', '1000'),
  ('max_football', '500'),
  ('max_soccer', '500'),
  ('registration_open', 'true');

-- Additional content settings (run this if settings table already exists)
insert into settings (key, value) values
  ('camp_date', 'June 13, 2026'),
  ('camp_location', 'TBD'),
  ('camp_time', '7:30 AM – 5:00 PM'),
  ('registration_price', '100')
on conflict (key) do nothing;

-- Enable Row Level Security
alter table registrations enable row level security;
alter table settings enable row level security;

-- Block all public (anon) access to registrations
-- Only the service_role key (used in API routes) can read/write
create policy "No public access to registrations"
  on registrations for all
  using (false);

-- Block all public (anon) access to settings
-- Only the service_role key can read/write
create policy "No public access to settings"
  on settings for all
  using (false);
