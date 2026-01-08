@echo off
echo Setting up Git configuration...
git config core.autocrlf true
git config core.safecrlf false
echo Git configuration complete!

echo Adding files to Git...
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

echo Files added successfully!
echo You can now run: git commit -m "Initial commit: NitroSense website"
echo Then: git remote add origin YOUR_GITHUB_REPO_URL
echo Finally: git push -u origin main
pause