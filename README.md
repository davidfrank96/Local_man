# Local Man

Local Man is a discovery platform built to help people find hidden food spots, local vendors, roadside favorites, and neighborhood gems that are usually invisible on larger delivery platforms.

The goal is simple:

Help users discover authentic local food experiences while helping small vendors get visibility without needing expensive delivery partnerships or heavy platform fees.


# Problem

Many of the best food spots are not listed on major delivery platforms.

Street vendors, roadside cooks, local bukas, amala spots, suya stands, akara sellers, and neighborhood favorites often rely only on word of mouth.

At the same time:

* Users miss out on cheaper, better, and more authentic food options nearby
* Small vendors struggle to get discovered
* Bigger platforms usually prioritize larger restaurants and chain businesses
* Hidden local spots remain invisible online

Local Man is designed to close that gap.

---

# Vision

Local Man aims to become the platform people use when they want to discover the places locals actually know.

The platform is focused on:

* Hidden food spots
* Local street food
* Budget-friendly meals
* Neighborhood favorites
* Late-night food spots
* Small vendors and local businesses
* Real local discovery beyond traditional delivery apps

The long-term vision is to start in Nigeria and eventually expand into other regions where local vendors are underserved by mainstream platforms.

---

# Current Version

This version is currently a frontend-only landing page and waitlist experience.

It includes:

* Hero section with waitlist call-to-action
* Storytelling around the Local Man mission
* Hidden food spot examples
* Local discovery map-inspired section
* Vendor-focused messaging
* Mobile responsive layout
* Theme switcher
* Waitlist form UI
* Custom domain deployment support

Backend, database, authentication, analytics, and waitlist storage will be added later.

---

# Tech Stack

Frontend:

* React
* Vite
* Tailwind CSS
* Lucide React Icons

Deployment:

* DigitalOcean App Platform
* Custom domain via Namecheap

Future Backend Plans:

* Node.js
* Express
* PostgreSQL
* Email waitlist capture
* Vendor onboarding
* Authentication
* Admin dashboard
* Analytics

---

# Folder Structure

```text
client/
  public/
  src/
    App.jsx
    main.jsx
    index.css

server/
database/
README.md
```

---

# Getting Started

## Clone the Repository

```bash
git clone <repository-url>
cd Local_man
```

## Install Dependencies

```bash
cd client
npm install
```

## Run Locally

```bash
npm run dev
```

The frontend will start locally on:

```text
http://localhost:5173
```

---

# Build for Production

```bash
npm run build
```

Production files will be generated inside:

```text
dist/
```

---

# Deployment

The frontend is deployed using DigitalOcean App Platform as a Static Site.

Recommended settings:

```text
Source Directory: client
Build Command: npm install && npm run build
Output Directory: dist
```

Custom domain support is handled through:

* Namecheap
* DigitalOcean DNS
* App Platform domain settings

---

# Roadmap

## Phase 1

* Landing page
* Waitlist experience
* Mobile responsive UI
* Brand messaging
* Domain setup

## Phase 2

* Backend API
* Waitlist storage
* Email collection
* Database integration
* Analytics
* Form handling

## Phase 3

* User accounts
* Vendor accounts
* Discovery map
* Food spot listings
* Reviews and ratings
* Search and filtering
* Nearby recommendations

## Phase 4

* Mobile app
* Push notifications
* Location-based recommendations
* Vendor dashboards
* Sponsored listings
* Partnerships with local businesses

---

# Key Message

Local Man is not just another food platform.

It is built around the idea that some of the best food experiences are still offline, hidden, local, and discovered through people rather than algorithms.

The platform exists to help people discover those places — and help local vendors grow.

