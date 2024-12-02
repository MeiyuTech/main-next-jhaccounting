# Thanksgiving Feature

- [ ] Form System (validation)
- [ ] Collect visitor comment, address and email address
- [ ] Send email to them

# TODO

- [X] favicon.ico should have no background!!!!!
- [X] Add News Feature (SEO)
- [X] Delete Blog Folder
- [X] Image Optimization
  - Currently marked in page.tsx and about/page.tsx
  - Need to implement proper image optimization strategy
- [X] OpenGraph Image Generation
- [ ] Fix onClick event handling in Link component with legacyBehavior
  - Issue in Header.tsx with NavigationMenuLink
  - Remove legacyBehavior and implement proper event handling
- [X] Add i18n translations for missing keys in About section
- [ ] Optimize image loading and implement proper image placeholders
- [ ] Add error boundaries for better error handling
- [ ] Implement proper SEO meta tags
- [ ] Add loading states for dynamic content
- [ ] Add unit tests and integration tests
- [ ] Add proper documentation for components and utilities
- [ ] Add Display order Feature for News page
  - Currently marked in news/page.tsx
  - Need to implement sorting/filtering functionality
- [ ] Move components to root folder or lib to app folder
- [ ] Format bullet points (•) for Tax Credits submenu items in `Header.tsx` instead of hardcoding them in translations
  - Currently, bullet points are hardcoded in `en-us.json`
  - Should be implemented as part of the menu rendering logic in `Header.tsx`

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Jiahua US Accounting Website

## Environment Setup

### Supabase Configuration

1. Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=<your_supabase_project_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
```

2. Deployment Steps

- Local development: Use `.env.local` file
- Production: Add environment variables in your deployment platform (e.g., Vercel)
  - Go to Project Settings
  - Navigate to Environment Variables section
  - Add both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - Redeploy the application

3. Database Setup

- Create `contact_submissions` table:

  ```sql
  create table public.contact_submissions (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default now(),
    name varchar not null,
    email varchar not null,
    phone varchar,
    wechat varchar,
    address text,
    message text not null,
    staus varchar
  );
  ```
- Enable Row Level Security and create policies:

  ```sql
  -- Enable Row Level Security (RLS)
  alter table public.contact_submissions enable row level security;

  -- Allow inserts for all users
  alter policy "Enable insert for all users"
  on "public"."contact_submissions"
  to public
  for insert
  with check (
    true
  );
  ```
