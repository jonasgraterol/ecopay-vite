# EcoPay Frontend

A modern React application for buying and selling cryptocurrency, built with Vite, React Query, and Tailwind CSS.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Deployment

This application is configured for deployment on Netlify.

### Environment Variables

Set the following environment variables in your Netlify project settings:

```
VITE_API_URL=https://your-api-url.com
```

### Automatic Deployments

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Manual Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy to Netlify
netlify deploy
```

## Environment Configuration

- `.env.development` - Development environment variables
- `.env.production` - Production environment variables

Make sure to set the correct API URL in your environment files:

```env
VITE_API_URL=https://your-api-url.com
```
