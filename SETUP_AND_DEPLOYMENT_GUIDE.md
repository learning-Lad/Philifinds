# PhiliFinds - Complete Setup & Deployment Guide

## 📋 Table of Contents
1. [Running in VS Code (Local Development)](#running-in-vs-code)
2. [What to Remove & Keep](#what-to-remove--keep)
3. [Deployment Preparation](#deployment-preparation)
4. [Deployment Options](#deployment-options)

---

## 🚀 Running in VS Code (Local Development)

### Option A: Run Next.js App (Recommended for Production)

#### Step 1: Open Project in VS Code
```bash
# If you're not in the project directory
cd /workspaces/default/code

# Open VS Code
code .
```

#### Step 2: Navigate to Next.js Migration Folder
```bash
cd nextjs-migration
```

#### Step 3: Install Dependencies
```bash
# Using npm
npm install

# OR using pnpm (faster, recommended)
pnpm install

# OR using yarn
yarn install
```

#### Step 4: Set Up Environment Variables
```bash
# Copy the example file
cp .env.example .env.local

# Open .env.local in VS Code and add your API keys
code .env.local
```

Add your actual API keys:
```env
# Supabase (Get from https://app.supabase.com)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...your_anon_key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...your_service_role_key

# OpenAI (Get from https://platform.openai.com/api-keys)
OPENAI_API_KEY=sk-proj-...your_openai_key

# Google Maps (Get from https://console.cloud.google.com)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...your_google_maps_key

# App URL (change for production)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### Step 5: Set Up Supabase Database
1. Go to [app.supabase.com](https://app.supabase.com)
2. Create a new project or select existing one
3. Go to **SQL Editor**
4. Copy and paste the SQL from `nextjs-migration/README.md` (lines 98+)
5. Run the SQL to create tables

#### Step 6: Run Development Server
```bash
npm run dev
# OR
pnpm dev
# OR
yarn dev
```

The app will be available at: **http://localhost:3000**

#### Step 7: Open in Browser
Open your browser and navigate to `http://localhost:3000`

---

### Option B: Run Current React/Vite App (Quick Testing)

```bash
# From the root directory
cd /workspaces/default/code

# This is already set up in Figma Make
# The Vite dev server is already running
```

**Note:** The React/Vite app doesn't have backend functionality. Use Next.js for full features.

---

## 🗑️ What to Remove & Keep

### FOR DEPLOYMENT - Files/Folders to REMOVE

When you're ready to deploy the Next.js app, you can safely **remove** these files/folders from the root directory:

#### ❌ Remove (Figma Make Specific Files)
```
/workspaces/default/code/
├── __figma__entrypoint__.ts          ❌ Figma Make only
├── default_shadcn_theme.css          ❌ Not needed
├── vite.config.ts                    ❌ Vite specific
├── guidelines/                       ❌ Figma Make guidelines
├── ATTRIBUTIONS.md                   ❌ Optional
├── IMPLEMENTATION_SUMMARY.md         ❌ Optional
├── MIGRATION_GUIDE.md                ❌ Optional (keep for reference)
├── QUICKSTART.md                     ❌ Optional
```

#### ❌ Remove (React/Vite Source Files - After Migration)
```
/workspaces/default/code/
├── src/                              ❌ React/Vite app (after you migrate components)
│   ├── app/
│   ├── imports/
│   └── styles/
```

#### ⚠️ Remove (Development Only)
```
/workspaces/default/code/
├── node_modules/                     ⚠️ Will be regenerated on deployment
├── .git/                             ✅ KEEP (unless making fresh repo)
```

---

### FOR DEPLOYMENT - Files/Folders to KEEP

#### ✅ Keep (Move to Production)
```
/workspaces/default/code/nextjs-migration/
├── app/                              ✅ Next.js app (pages & routes)
├── lib/                              ✅ Utilities & Supabase config
├── public/                           ✅ Static assets (if you add any)
├── .env.example                      ✅ Template for others
├── .env.local                        ⚠️ DON'T COMMIT (keep locally only)
├── .gitignore                        ✅ Git ignore rules
├── next.config.mjs                   ✅ Next.js config
├── package.json                      ✅ Dependencies
├── tailwind.config.ts                ✅ Tailwind config
├── tsconfig.json                     ✅ TypeScript config
├── README.md                         ✅ Documentation
```

#### ✅ Keep (Project Documentation)
```
/workspaces/default/code/
├── README.md                         ✅ Main project README
├── .env.example                      ✅ Environment variables template
├── package.json                      ✅ If you want to keep mono-repo
```

---

## 📦 Deployment Preparation

### Step 1: Create Clean Production Directory

```bash
# Create a new directory for production
mkdir philifinds-production
cd philifinds-production

# Copy Next.js app contents
cp -r ../code/nextjs-migration/* .
cp ../code/nextjs-migration/.env.example .
cp ../code/nextjs-migration/.gitignore .

# Copy any additional files you want
cp ../code/README.md ./README-PROJECT.md
```

### Step 2: Update React Components to Next.js

You mentioned you need to migrate updated React components. Here's the structure:

**React (Current)** → **Next.js (Target)**
```
src/app/pages/Home.tsx           → app/page.tsx
src/app/pages/ItineraryBuilder.tsx → app/itinerary/page.tsx
src/app/pages/Dashboard.tsx      → app/dashboard/page.tsx
src/app/pages/Admin.tsx          → app/admin/page.tsx
src/app/pages/Login.tsx          → app/login/page.tsx

src/app/components/              → app/components/
src/lib/                         → lib/ (already exists)
```

**Key Changes Needed:**
1. Add `'use client'` directive at the top of interactive components
2. Replace `react-router` imports with Next.js `next/navigation`
   - `useNavigate()` → `useRouter()` from `'next/navigation'`
   - `<Link>` → `<Link>` from `'next/link'`
3. Keep component logic the same

### Step 3: Environment Variables for Production

**IMPORTANT:** Never commit `.env.local` to Git!

Update `.env.local` for production:
```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
OPENAI_API_KEY=sk-...your_openai_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

### Step 4: Initialize Git Repository

```bash
cd philifinds-production

# Initialize new Git repo
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - PhiliFinds Next.js app"

# Create GitHub repository (via GitHub CLI or web)
gh repo create philifinds --public --source=. --remote=origin

# OR manually add remote
git remote add origin https://github.com/yourusername/philifinds.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 5: Test Production Build Locally

```bash
# Build the app
npm run build

# Test production build
npm run start

# Visit http://localhost:3000 to verify
```

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - Easiest)

**Why Vercel?**
- Created by Next.js team
- Zero configuration for Next.js
- Automatic deployments from Git
- Free tier available
- Built-in environment variables management

**Steps:**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click **"New Project"**
4. Import your GitHub repository
5. Configure:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./` (or leave blank)
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)
6. Add Environment Variables:
   - Click **"Environment Variables"**
   - Add all variables from your `.env.local`:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `OPENAI_API_KEY`
     - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
     - `NEXT_PUBLIC_APP_URL` (use your Vercel domain)
7. Click **"Deploy"**

**After Deployment:**
- URL: `https://your-app.vercel.app`
- Automatic deployments on Git push
- Preview deployments for PRs

---

### Option 2: Netlify

**Steps:**
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click **"Add new site"** → **"Import an existing project"**
4. Connect GitHub repository
5. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
6. Add Environment Variables in **Site settings** → **Environment variables**
7. Deploy

---

### Option 3: Railway

**Why Railway?**
- Great for full-stack apps
- Supports databases, Redis, etc.
- $5/month credit on free tier

**Steps:**
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your repository
5. Add environment variables
6. Deploy

---

### Option 4: Self-Hosted (VPS - DigitalOcean, AWS, etc.)

**Requirements:**
- Node.js 18+ installed on server
- PM2 or similar process manager
- Nginx for reverse proxy

**Quick Setup:**
```bash
# On your VPS
git clone https://github.com/yourusername/philifinds.git
cd philifinds

# Install dependencies
npm install

# Create .env.local with production values
nano .env.local

# Build
npm run build

# Install PM2
npm install -g pm2

# Start with PM2
pm2 start npm --name "philifinds" -- start

# Save PM2 process
pm2 save
pm2 startup
```

**Nginx Config:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🎯 Recommended Workflow

### For Development
```bash
1. Work in: /nextjs-migration/
2. Run: npm run dev
3. Test: http://localhost:3000
4. Commit changes to Git
```

### For Deployment
```bash
1. Create clean production directory
2. Copy nextjs-migration contents
3. Migrate updated React components
4. Test build: npm run build
5. Push to GitHub
6. Deploy to Vercel (easiest)
```

---

## 🔑 Important Security Notes

### ❌ NEVER Commit These Files:
- `.env.local`
- `.env`
- `node_modules/`
- `.next/`

### ✅ Your `.gitignore` Should Include:
```gitignore
# dependencies
node_modules/
.pnp
.pnp.js

# testing
coverage/

# next.js
.next/
out/
build/

# production
dist/

# environment variables
.env
.env.local
.env.production.local
.env.development.local
.env.test.local

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
```

---

## 📞 Need Help?

### Common Issues:

**1. Port 3000 already in use**
```bash
# Kill process on port 3000
npx kill-port 3000

# OR run on different port
PORT=3001 npm run dev
```

**2. Module not found errors**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**3. Supabase connection errors**
- Verify your `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check `NEXT_PUBLIC_SUPABASE_ANON_KEY` is valid
- Ensure RLS policies are set up in Supabase

**4. OpenAI API errors**
- Verify `OPENAI_API_KEY` starts with `sk-`
- Check you have credits in OpenAI account
- Ensure API key has proper permissions

---

## 🎉 Summary

### Quick Start Checklist
- [ ] Navigate to `nextjs-migration/`
- [ ] Run `npm install`
- [ ] Copy `.env.example` to `.env.local`
- [ ] Add API keys to `.env.local`
- [ ] Set up Supabase database
- [ ] Run `npm run dev`
- [ ] Open http://localhost:3000

### Deployment Checklist
- [ ] Create production directory
- [ ] Migrate updated components
- [ ] Test `npm run build`
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Add environment variables in Vercel
- [ ] Test production URL

---

**Good luck with PhiliFinds! 🇵🇭✈️**
