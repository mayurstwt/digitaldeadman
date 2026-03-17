# Digital Deadman

**Add a visible payment bar to a client website until the final invoice is paid.**

Digital Deadman is a small embeddable script for freelance developers. You deploy this app once, then copy one script tag into a client website. If the project is still unpaid, the script injects a fixed top bar across the site.

## What Exists Now

- A landing page that explains the product visually.
- A real embeddable script served from `/embed/bar`.
- A zero-backend MVP flow based on `data-*` attributes on the script tag.

## How The Current MVP Works

1. Deploy this app.
2. Copy the script tag from the landing page or the snippet below.
3. Paste it into the client website.
4. Keep `data-ddm-status="pending"` while payment is still open.
5. Change it to `paid` when the invoice is settled.

If status is `pending`, the bar appears. If status is `paid`, nothing is injected.

## Script Snippet

```html
<script
  defer
  src="https://your-domain.com/embed/bar"
  data-ddm-status="pending"
  data-ddm-project="Marketing site"
  data-ddm-client="Acme Studio"
  data-ddm-contact-email="you@example.com"
  data-ddm-invoice-url="https://payments.example.com/invoice/123"
></script>
```

## Script Options

- `data-ddm-status`: `pending` shows the bar, `paid` hides it.
- `data-ddm-project`: Project name shown in the default message.
- `data-ddm-client`: Client name shown in the default message.
- `data-ddm-contact-email`: Optional mailto link in the bar.
- `data-ddm-invoice-url`: Optional invoice/payment URL button.
- `data-ddm-message`: Optional custom bar message. If set, it overrides the default generated text.
- `data-ddm-accent`: Optional button color, for example `#dc2626`.
- `data-ddm-text-color`: Optional text color, for example `#fff7ed`.

## How To Apply This On A Client Website

### Plain HTML

Paste the script before `</body>`:

```html
<script
  defer
  src="https://your-domain.com/embed/bar"
  data-ddm-status="pending"
  data-ddm-project="Portfolio website"
  data-ddm-client="Client Name"
  data-ddm-contact-email="freelancer@example.com"
></script>
```

### Next.js / React

Put it in the global layout or the page that should stay protected:

```tsx
<script
  defer
  src="https://your-domain.com/embed/bar"
  data-ddm-status="pending"
  data-ddm-project="Marketing site"
  data-ddm-client="Client Name"
  data-ddm-contact-email="freelancer@example.com"
></script>
```

### Webflow / Framer / CMS

Add the same script inside custom code injection for the site footer or global custom code area.

## Local Development

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the app:

```bash
npm run dev
```

3. Open `http://localhost:3000`.

4. Test the script directly at `http://localhost:3000/embed/bar`.

## Testing On A Real Client Project

1. Deploy this app to your own domain or a Vercel URL.
2. Copy the script tag and replace `https://your-domain.com` with that live URL.
3. Paste the script into the client project.
4. Visit the client site and confirm the bar appears.
5. Change `data-ddm-status` from `pending` to `paid` and redeploy the client site.
6. Refresh the client site and confirm the bar is gone.

## Important Limitation

If the client fully controls the code and hosting, they can remove the script. This MVP is meant for the phase before final code or deployment handover, when the freelancer still controls release.

Built for freelancers who need clean leverage on final payment.
