# Digital Deadman

> **Mission:** Build a simple payment-protection bar that freelance developers can add to client websites before final handover, so unpaid projects stay visibly protected until payment is complete.

Digital Deadman allows freelancers to create projects, generate embeddable scripts, and manage project states (`pending` vs `paid`) from a private dashboard.

## 🚀 Key Features

- **Freelancer Dashboard:** Manage multiple projects and their payment statuses.
- **Dynamic Embed Script:** A single script tag that injects a customized "Project Overdue" bar if the status is `pending`.
- **Domain Protection:** Restrict embed script execution to specific allowed domains.
- **Secure Management:** Unique `manageToken` for secure project editing without exposed IDs.
- **Public API:** Lightweight endpoint for the embed script to check project status.

## 🛠 Tech Stack

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **Auth:** Custom session-based authentication (Cookie-based)
- **Language:** TypeScript

## 📂 Project Structure

```text
├── src/
│   ├── app/            # Next.js App Router routes & Server Actions
│   │   ├── api/        # Public and internal API endpoints
│   │   ├── create/     # Project creation page
│   │   ├── embed/      # Embed script generation logic (/embed/bar)
│   │   ├── faq/        # Frequently Asked Questions page
│   │   ├── login/      # User login page
│   │   ├── register/   # User registration page
│   │   ├── projects/   # Project dashboard and management pages
│   │   └── actions.ts  # Centralized Server Actions for database mutations
│   ├── components/     # Shared UI components (Buttons, Modals, etc.)
│   ├── lib/            # Core business logic, DB utils, and Auth
│   │   ├── auth.ts     # User session management logic
│   │   ├── mongodb.ts  # Database connection client (Singleton pattern)
│   │   ├── projects.ts # Project CRUD, token generation, and state logic
│   │   ├── users.ts    # User CRUD and password hashing (logic)
│   │   └── session.ts  # JWT/Session token signing and verification
│   └── proxy.ts        # Script proxying logic for the /embed/bar endpoint
├── public/             # Static assets (images, fonts, etc.)
├── project-bible.md    # Core mission and design principles (MUST READ)
└── DEPLOYMENT.md       # Hosting and production setup guide
```

## 📋 Comprehensive MVP Overview

Newbies can explore these key routes to understand the flow:
- **Landing Page (`/`):** Explains the product value proposition.
- **Register (`/register`):** Create a new freelancer account.
- **Login (`/login`):** Access your existing dashboard.
- **Dashboard (`/projects`):** List of all your active and archived projects.
- **Create Project (`/create`):** Form to start a new protection project.
- **Project Detail (`/projects/[manageToken]`):** Where you copy your embed script and toggle status.
- **Edit Project (`/projects/[manageToken]/edit`):** Update project details or allowed domains.
- **Public API (`/api/projects/[publicToken]`):** The endpoint the embed script hits to check status.

## ⚙️ Getting Started

### 1. Prerequisites

- **Node.js:** Ensure you have version 20 or higher installed (`node -v`).
- **MongoDB:** You need a running MongoDB instance. This can be local (`brew tap mongodb/brew && brew install mongodb-community`) or a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### 2. Local Setup

1. **Clone and Install:**
   ```bash
   git clone <repo-url>
   cd digitaldeadman
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the root directory. Use `.env.example` as a template:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017
   MONGODB_DB_NAME=digitaldeadman
   AUTH_SECRET=a-very-long-random-string-here
   ```

3. **Run Development Server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## 🏗 Architecture & Internal Flow

### The Token System (Security Layer)
To protect freelancer privacy, we use two distinct tokens for every project:
- **`manageToken` (Private):** A high-entropy random string used in management URLs. If someone knows this, they can control the project. Keep this private to the freelancer.
- **`publicToken` (Public):** A separate random string used by the embed script. It only allows *reading* a limited set of public data (project name, status) but *not* modifying it.

### The Embed Life Cycle
1. **Request:** The client's browser loads the `<script src=".../embed/bar" ...>`.
2. **Proxy:** The `/embed/bar` route (managed via `proxy.ts`) serves the JavaScript payload.
3. **Execution:** The script runs on the client site, reads the `data-ddm-project-token` attribute.
4. **Validation:** It calls the Public API on our server. The server checks:
    - Does the token exist?
    - Is the current `Origin` (domain) allowed in the project's `allowedDomains` list?
5. **Injection:** If valid and `status === 'pending'`, it injects a `<style>` block and a fixed `<div>` (the bar) into the DOM.

### Database Schema (MongoDB)
- **`users`:** Stores freelancer accounts (`email`, `passwordHash`).
- **`projects`:** Stores project metadata (`projectName`, `status`, `tokens`, `allowedDomains`, `ownerUserId`).
- **`rate_limits`:** Tracks IP-based requests to prevent brute force or API abuse.

## 🧪 Detailed Local Testing Guide

Testing an embed locally can be tricky because `localhost:3000` (our app) needs to be reachable by the "client" site.

1. **Expose your app:** Use `ngrok http 3000`. This gives you a URL like `https://xyz.ngrok-free.app`.
2. **Generate Script:** Copy the script tag from your project page, but replace `localhost:3000` with your `ngrok` URL.
3. **Paste in Client Site:** Drop that script into another project's HTML (even just a file like `index.html` opened in your browser).
4. **Toggle Status:** In your Digital Deadman dashboard, switch between `Pending` and `Paid`. Refresh the client site to see the bar appear/disappear!

## 🔐 Handover Strategy & Leverage

It's vital for new developers to understand that this tool is a **leverage mechanism**, not an un-bypassable lock. 
- If the client has the source code and knows how to search for `<script>`, they can remove it.
- **The Ideal Use:** Add the script *while you still control the deployment*. Once the final invoice is paid, you mark it as `Paid` (bar disappears), and then you hand over the clean source code (optionally removing the script entirely).

## 📄 Documentation Links

- **[Project Bible](file:///home/mayur/Desktop/Projects/small-builds/digitaldeadman/project-bible.md):** The core "spec" for the project. Read this first!
- **[Deployment Guide](file:///home/mayur/Desktop/Projects/small-builds/digitaldeadman/DEPLOYMENT.md):** How to put this live on Vercel or Render.

## 🤝 Contributing

1. **Read the Bible:** Seriously, read `project-bible.md`.
2. **Server Actions:** All data mutations (creates, updates, deletes) MUST happen in `src/app/actions.ts`.
3. **Linting:** We use ESLint. Run `npm run lint` before opening a PR.

