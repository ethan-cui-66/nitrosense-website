# Git Setup Guide for NitroSense Website

Follow these steps to fix the line ending issues and push to GitHub:

## Step 1: Fix Git Lock Issue

First, we need to remove a Git lock file that's preventing operations:

1. **Open Command Prompt as Administrator**
2. **Navigate to the project directory**:
   ```cmd
   cd C:\Users\ethan\conrad-website\nitrosense-website
   ```
3. **Remove the lock file**:
   ```cmd
   del .git\index.lock
   ```

## Step 2: Configure Git Line Endings

Configure Git to handle Windows line endings properly:

```cmd
git config core.autocrlf true
git config core.safecrlf false
```

## Step 3: Clean and Add Files

Now add files to Git (the .gitignore and .gitattributes files I created will handle the line ending issues):

```cmd
git add .gitignore
git add .gitattributes
git add README.md
git add package.json
git add package-lock.json
git add next.config.js
git add tailwind.config.ts
git add tsconfig.json
git add jest.config.js
git add jest.setup.js
git add postcss.config.js
git add .eslintrc.json
git add vercel.json
git add src/
```

## Step 4: Commit Your Changes

```cmd
git commit -m "Initial commit: NitroSense website with complete implementation"
```

## Step 5: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click the "+" icon in the top right
3. Select "New repository"
4. Name it `nitrosense-website`
5. Make it **Private** (for competition privacy)
6. Don't initialize with README (we already have one)
7. Click "Create repository"

## Step 6: Connect to GitHub and Push

Replace `YOUR_USERNAME` with your actual GitHub username:

```cmd
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/nitrosense-website.git
git push -u origin main
```

## Alternative: If You Still Get Line Ending Warnings

If you still see CRLF warnings, you can suppress them by running:

```cmd
git config core.safecrlf false
git config core.autocrlf input
```

Then try adding files again:

```cmd
git add .
git commit -m "Initial commit: NitroSense website"
git push -u origin main
```

## What Files Are Included

The repository will include:
- ✅ All source code (`src/` directory)
- ✅ Configuration files (package.json, next.config.js, etc.)
- ✅ Tests (`src/__tests__/` directory)
- ✅ Documentation (README.md)
- ✅ Deployment configuration (vercel.json)

The repository will **NOT** include:
- ❌ `node_modules/` (dependencies)
- ❌ `.next/` (build files)
- ❌ `out/` (export files)
- ❌ IDE files (.vscode, .idea)
- ❌ OS files (.DS_Store, Thumbs.db)

## Troubleshooting

**If you get "Permission denied" errors:**
- Make sure you're running Command Prompt as Administrator
- Check that no other Git processes are running

**If you get authentication errors when pushing:**
- You may need to set up a Personal Access Token
- Go to GitHub Settings > Developer settings > Personal access tokens
- Create a new token with "repo" permissions
- Use the token as your password when prompted

**If you still get line ending warnings:**
- The warnings are usually harmless and won't prevent the push
- The .gitattributes file will ensure consistent line endings for future commits

## Next Steps After Pushing

Once your code is on GitHub, you can:
1. Set up GitHub Actions for automated testing
2. Deploy to Vercel by connecting your GitHub repository
3. Share the repository with collaborators (if needed)

Remember to keep the repository **private** for competition purposes!