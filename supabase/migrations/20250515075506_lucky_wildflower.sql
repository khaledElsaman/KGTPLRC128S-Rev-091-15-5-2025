/*
  # Schema update for GTPL Regulation features

  1. New Tables
    - `gtpl_regulation_index` - Stores regulation article index information
    - `gtpl_regulation_content` - Stores full regulation article content
  
  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to read data
*/

-- Create the regulation index table
CREATE TABLE IF NOT EXISTS gtpl_regulation_index (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter VARCHAR NOT NULL,
  article_number VARCHAR NOT NULL,
  article_title_en VARCHAR NOT NULL,
  article_title_ar VARCHAR NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create the regulation content table
CREATE TABLE IF NOT EXISTS gtpl_regulation_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES gtpl_regulation_index(id),
  article_text_en TEXT NOT NULL,
  article_text_ar TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE gtpl_regulation_index ENABLE ROW LEVEL SECURITY;
ALTER TABLE gtpl_regulation_content ENABLE ROW LEVEL SECURITY;

-- Create policies for read access
CREATE POLICY "Allow read access for authenticated users on regulation index"
  ON gtpl_regulation_index
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow read access for authenticated users on regulation content"
  ON gtpl_regulation_content
  FOR SELECT
  TO authenticated
  USING (true);