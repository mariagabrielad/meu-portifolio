-- Rode no SQL Editor do Supabase.
-- Depois: Authentication > Providers > Email > desative "Allow new users to sign up"
-- e crie o seu usuário em Authentication > Users.

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) <= 254),
  message text not null check (char_length(message) between 20 and 2000),
  answered boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

create policy "visitantes enviam mensagens" on public.messages
  for insert to anon, authenticated with check (answered = false);
create policy "dono lê mensagens" on public.messages
  for select to authenticated using (true);
create policy "dono atualiza mensagens" on public.messages
  for update to authenticated using (true) with check (true);

create table public.featured_repos (
  repo_name text primary key,
  created_at timestamptz not null default now()
);

alter table public.featured_repos enable row level security;

create policy "todos veem destaques" on public.featured_repos
  for select to anon, authenticated using (true);
create policy "dono adiciona destaques" on public.featured_repos
  for insert to authenticated with check (true);
create policy "dono remove destaques" on public.featured_repos
  for delete to authenticated using (true);
