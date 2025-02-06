CREATE TABLE "tutoriels" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "titre" VARCHAR NOT NULL,
  "content" TEXT NOT NULL,
  "categorie" VARCHAR NOT NULL,
  "prenom" VARCHAR NOT NULL,
  "nom" VARCHAR NOT NULL,
  "email" VARCHAR NOT NULL,
  "dateCreation" TIMESTAMPTZ DEFAULT NOW(),
  "dateModification" TIMESTAMPTZ DEFAULT NOW(),
  "image" TEXT
);

-- Ajout des politiques RLS
ALTER TABLE public.tutoriels ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture à tous
CREATE POLICY "Permettre la lecture des tutoriels à tous"
ON public.tutoriels FOR SELECT
TO anon
USING (true);

-- Politique pour permettre l'insertion à tous
CREATE POLICY "Permettre l'insertion de tutoriels à tous"
ON public.tutoriels FOR INSERT
TO anon
WITH CHECK (true);

-- Politique pour permettre la mise à jour à tous
CREATE POLICY "Permettre la mise à jour des tutoriels à tous"
ON public.tutoriels FOR UPDATE
TO anon
USING (true);

-- Politique pour permettre la suppression à tous
CREATE POLICY "Permettre la suppression des tutoriels à tous"
ON public.tutoriels FOR DELETE
TO anon
USING (true);




CREATE TABLE ressources (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "titre" VARCHAR NOT NULL,
    "description" TEXT,
    "type" VARCHAR NOT NULL CHECK (type IN ('article', 'video', 'cours', 'outil')),
    "url" VARCHAR NOT NULL,
    "image_url" VARCHAR,
    "dateCreation" TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    "dateModification" TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    "prenom" VARCHAR NOT NULL,
    "nom" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL
);




-- Ajout des politiques RLS
ALTER TABLE public.ressources ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture à tous
CREATE POLICY "Permettre la lecture des ressources à tous"
ON public.ressources FOR SELECT
TO anon
USING (true);

-- Politique pour permettre l'insertion à tous
CREATE POLICY "Permettre l'insertion de ressources à tous"
ON public.ressources FOR INSERT
TO anon
WITH CHECK (true);

-- Politique pour permettre la mise à jour à tous
CREATE POLICY "Permettre la mise à jour des ressources à tous"
ON public.ressources FOR UPDATE
TO anon
USING (true);

-- Politique pour permettre la suppression à tous
CREATE POLICY "Permettre la suppression des ressources à tous"
ON public.ressources FOR DELETE
TO anon
USING (true);


-- Drop the existing table if it exists
DROP TABLE IF EXISTS projets;

-- Create the projets table with appropriate constraints
CREATE TABLE projets (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "titre" text NOT NULL,  -- Make titre NOT NULL to avoid null constraint errors
    "description" text NOT NULL,  -- Keep description NOT NULL
    "type" text NOT NULL,  -- Keep type NOT NULL
    "image" text,
    "technologies" text[] DEFAULT '{}',
    "lien_github" text,
    "lien_demo" text,
    "date_creation" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    "prenom" text NOT NULL,
    "nom" text NOT NULL,
    "email" text NOT NULL
);

-- Enable Row Level Security
ALTER TABLE projets ENABLE ROW LEVEL SECURITY;

-- Policy to allow reading projects for all
CREATE POLICY "Permettre la lecture des projets à tous"
ON projets FOR SELECT
TO anon
USING (true);

-- Policy to allow inserting projects for all
CREATE POLICY "Permettre l'insertion de projets à tous"
ON projets FOR INSERT
TO anon
WITH CHECK (true);

-- Policy to allow updating projects for all
CREATE POLICY "Permettre la mise à jour des projets à tous"
ON projets FOR UPDATE
TO anon
USING (true);

-- Policy to allow deleting projects for all
CREATE POLICY "Permettre la suppression à tous"
ON projets FOR DELETE
TO anon
USING (true);



-- Création du bucket pour les images de projets
insert into storage.buckets (id, name)
values ('project-images', 'project-images');

-- Politique d'upload public
create policy "Allow public upload"
on storage.objects
for insert
to public
with check (bucket_id = 'project-images');

-- Politique de lecture publique
create policy "Allow public read"
on storage.objects
for select
to public
using (bucket_id = 'project-images');