# White Screen Issue - Troubleshooting Guide

## Problem
The application shows a white screen when opened in the browser.

## Likely Causes

### 1. Missing Clerk API Key (Most Common)
The application requires a Clerk authentication key to function.

**Solution:**
1. Create a `.env` file in the root directory
2. Add your Clerk publishable key:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
   ```
3. Restart the development server

**To get a Clerk key:**
1. Go to [clerk.com](https://clerk.com)
2. Create an account and new application
3. Copy the publishable key from your dashboard

### 2. Import/Module Errors
The new functional hooks might have import issues.

**Solution:**
- Check browser console for JavaScript errors
- Verify all import paths are correct
- Ensure TypeScript compilation is successful

### 3. Environment Configuration Issues
Missing or incorrect environment variables.

**Solution:**
1. Check if `.env` file exists
2. Verify `VITE_API_URL` is set correctly
3. Ensure `NODE_ENV` is set to `development`

## Quick Fix Steps

### Step 1: Check Browser Console
1. Open browser developer tools (F12)
2. Go to Console tab
3. Look for error messages
4. Note any specific error details

### Step 2: Verify Environment Variables
1. Create `.env` file in project root
2. Add required variables:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
   VITE_API_URL=http://localhost:3001
   NODE_ENV=development
   ```

### Step 3: Restart Development Server
1. Stop the current server (Ctrl+C)
2. Run `npm run dev` again
3. Clear browser cache and refresh

### Step 4: Check Network Tab
1. Open browser developer tools
2. Go to Network tab
3. Refresh the page
4. Look for failed API requests

## Temporary Workaround

If you need to test the app without Clerk authentication:

1. **Comment out Clerk imports** in `client/App.tsx`
2. **Remove ClerkProvider wrapper**
3. **Use static data** instead of dynamic hooks

## Debug Commands

```bash
# Check for TypeScript errors
npm run typecheck

# Check for build errors
npm run build

# Check development server logs
npm run dev
```

## Common Error Messages

- **"Missing Clerk Publishable Key"** → Set VITE_CLERK_PUBLISHABLE_KEY
- **"Failed to fetch"** → Check API endpoints and server status
- **"Module not found"** → Check import paths and file existence
- **"Type error"** → Check TypeScript compilation

## Next Steps

1. Set up Clerk authentication properly
2. Verify all environment variables
3. Check server API endpoints
4. Test with minimal configuration first

## Support

If the issue persists:
1. Check browser console for specific errors
2. Verify all environment variables are set
3. Ensure development server is running
4. Check if backend API is accessible
