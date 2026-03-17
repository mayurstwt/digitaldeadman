# Digital Deadman

**Stop getting ghosted by clients. Secure your final payout with one line of code.**

Digital Deadman is a tool for freelance developers to ensure they get paid for their work. It provides a simple script that can be included in client projects to display a subtle payment reminder or disable non-essential features if the final payment is pending.

## 🚀 Mission
"Build a payment-locked security script for freelance developers to ensure they get paid for their work after site handover."

## 🛠 Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Backend/Auth**: Supabase
- **Payments**: Stripe

## 📥 Getting Started

### Prerequisites
- Node.js 18+ 
- npm / pnpm / bun

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/mayurstwt/digitaldeadman.git
   cd digitaldeadman
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the landing page.

## 🤝 Contributing (Professional Workflow)

We follow a structured Git workflow to maintain code quality. Please follow these steps to contribute:

### 1. Create a Feature Branch
Always work on a new branch. Never push directly to `main`.
```bash
git checkout -b feat/your-feature-name
# or for fixes
git checkout -b fix/issue-description
```

### 2. Make Changes & Commit
Follow the naming conventions: `Components: PascalCase`, `Files: kebab-case`.
```bash
git add .
git commit -m "feat: descriptive message about your change"
```

### 3. Push to GitHub
```bash
git push -u origin your-branch-name
```

### 4. Open a Pull Request (PR)
1. Go to the [GitHub Repository](https://github.com/mayurstwt/digitaldeadman).
2. Click "Compare & pull request".
3. Describe your changes clearly.
4. Wait for review and approval before merging.

## 📏 Rules & Conventions
- **Naming**: `Components: PascalCase`, `Files: kebab-case`, `Environment Variables: UPPER_CASE`.
- **Design**: Clean, minimal, dark mode default, mobile-first.
- **Scope**: Refer to `project-bible.md` for the core mission and non-goals. Do not add features outside the mission without prior discussion.

---
Built for the freelance community. 💀 
