# Deployment Guide: Digital Deadman

Digital Deadman is a Next.js application that requires a MongoDB database and a few environment variables.

## 1. Prerequisites

- A [Vercel](https://vercel.com) or [Render](https://render.com) account for hosting.
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account for the hosted database.

## 2. Set up MongoDB Atlas

1. Create a free cluster on MongoDB Atlas.
2. In the "Network Access" tab, add `0.0.0.0/0` to allow access from your hosting provider (or use a more restrictive set of IPs if your provider supports it).
3. In the "Database Access" tab, create a new user with `readWrite` permissions.
4. Click "Connect" -> "Drivers" -> "Node.js" to get your connection string. It will look like:
   ```text
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
   ```

## 3. Deploy to Vercel (Recommended)

1. Push your code to a GitHub repository.
2. Import the repository into Vercel.
3. Add the following Environment Variables in the Vercel dashboard:
   - `MONGODB_URI`: Your MongoDB Atlas connection string.
   - `MONGODB_DB_NAME`: `digitaldeadman` (or your preferred database name).
   - `AUTH_SECRET`: A long, random string (e.g., generated with `openssl rand -base64 32`).
4. Click **Deploy**.

## 4. Environment Variables Checklist

Ensure these are set in your production environment:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `MONGODB_DB_NAME` | Database name | `digitaldeadman` |
| `AUTH_SECRET` | Secret for session signing | `your-secure-secret` |

## 5. Security Notes

- **CORS**: The public API `/api/projects/[publicToken]` is open to all origins (`*`) by design to allow the embed script to work on any client site.
- **Rate Limiting**: Authentication and API endpoints are rate-limited using the `rate_limits` collection in your MongoDB database.
- **Handover Strategy**: This tool is designed for the phase *before* final handover. Once the client has full control of the codebase and hosting, they can remove the script. The real leverage is your control over the deployment until payment is received.
