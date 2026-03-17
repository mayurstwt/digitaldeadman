# Digital Deadman

Digital Deadman lets a freelancer create a project, generate an embeddable script, install it on a client website, and switch that project between `pending` and `paid` from a private management page.

## Current MVP

- Landing page with product explanation, FAQ, and demo snippet
- Register page at `/register`
- Login page at `/login`
- Freelancer dashboard at `/projects`
- Project creation flow at `/create`
- Session-protected project management page at `/projects/[manageToken]`
- Edit flow at `/projects/[manageToken]/edit`
- Public embed script at `/embed/bar`
- Live project-state API at `/api/projects/[publicToken]`

## How It Works

1. Run or deploy this app.
2. Register at `/register` or login at `/login`.
3. Open `/create`.
4. Create a new project.
5. Review all projects from `/projects`.
6. Copy the generated script from the project page.
7. Paste that script into the client website.
8. Keep the project status as `pending` until the invoice is paid.
9. Mark the project as `paid` from the project page or dashboard to hide the bar.
10. Edit project details or archive old projects from the freelancer dashboard when needed.

## Local Testing

### Start the app

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### Create a test project

1. Visit `http://localhost:3000/create`
2. Register a user account or login
3. Fill in the form
4. Submit it
5. You will land on a management URL like:

```text
http://localhost:3000/projects/your-manage-token
```

6. Copy the embed script from that page

### Test on a local client website

Paste the generated script into any local site:

```html
<script
  defer
  src="http://localhost:3000/embed/bar"
  data-ddm-project-token="your-public-token"
></script>
```

Examples:
- Plain HTML site running on `http://127.0.0.1:5500`
- Another Next.js app running on `http://localhost:3001`
- Vite app running on `http://localhost:5173`

If your project has allowed domains configured, make sure the domain you are testing on matches that list.

### Toggle the status

1. Go back to your private project page
2. Click `Mark Pending` to show the bar
3. Click `Mark Paid` to hide the bar
4. Refresh the client website after each change

## Embed Script

The generated embed looks like this:

```html
<script
  defer
  src="https://your-domain.com/embed/bar"
  data-ddm-project-token="paste-token-from-your-dashboard"
></script>
```

Replace `https://your-domain.com` with the URL where this app is deployed.

## Authentication

App routes for project management require a signed-in user session:

- `/create`
- `/projects`
- `/projects/:manageToken`
- `/projects/:manageToken/edit`

Users register as freelancers and only see/manage their own projects.

## Allowed Domains

When creating a project, you can provide a comma-separated list such as:

```text
clientsite.com, www.clientsite.com
```

If allowed domains are set, the bar will only appear when the script runs on those domains. If you leave the field empty, the embed works on any domain.

## Deployment

See [DEPLOYMENT.md](file:///home/mayur/Desktop/Projects/small-builds/digitaldeadman/DEPLOYMENT.md) for full hosting and database setup instructions.

## Important: Handover Strategy

Digital Deadman relies on the freelancer's control of the deployment **before** final handover.
- If the client fully controls the codebase and hosting, they can delete the script or bypass the domain checks.
- This is not a bug, but a fundamental design choice: the tool provides leverage while you still manage the release process.
- Once payment is complete, you can mark the project as `paid` and (optionally) remove the script before final source code delivery.

## Storage and Configuration

The current MVP stores project records and rate limits in MongoDB. Set:

```text
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB_NAME=digitaldeadman
AUTH_SECRET=your-secure-auth-secret
```

