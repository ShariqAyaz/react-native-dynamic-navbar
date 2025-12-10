# Development Workflow

## Working on Package While Using in Your App

### Option 1: npm link (Recommended for Development)

1. **Link the package locally**
   ```bash
   cd /Users/shariqayaztech/Projects/RumiApp/react-native-dynamic-navbar
   npm link
   ```

2. **Link in your app**
   ```bash
   cd /Users/shariqayaztech/Projects/RumiApp/rumiapp
   npm link react-native-dynamic-navbar
   ```

3. **Watch mode for auto-rebuild**
   ```bash
   cd /Users/shariqayaztech/Projects/RumiApp/react-native-dynamic-navbar
   npm run build -- --watch
   ```

Now any changes in the package will automatically reflect in your app!

### Option 2: Direct File Sync (Simple)

Keep your component in BOTH places and sync manually:

**In your app**: `/rumiapp/src/components/DynamicNavbar.tsx`
**In package**: `/react-native-dynamic-navbar/src/DynamicNavbar.tsx`

When you make changes:
```bash
# Copy from app to package
cp /Users/shariqayaztech/Projects/RumiApp/rumiapp/src/components/DynamicNavbar.tsx \
   /Users/shariqayaztech/Projects/RumiApp/react-native-dynamic-navbar/src/

# Build package
cd /Users/shariqayaztech/Projects/RumiApp/react-native-dynamic-navbar
npm run build

# Commit to package repo
git add .
git commit -m "Add new feature"
git push origin main
```

### Option 3: Use the Package Repo as Source (Best Long-term)

1. Work directly in the package folder
2. Use npm link to test in your app
3. When ready, publish and update your app to use the published version

## Recommended Workflow for RTL/LTR Feature

1. **Develop in your app first** (faster iteration)
   - Make changes in `/rumiapp/src/components/DynamicNavbar.tsx`
   - Test immediately in your app
   - See results instantly

2. **Once working, sync to package**
   ```bash
   # Copy to package
   cp /Users/shariqayaztech/Projects/RumiApp/rumiapp/src/components/DynamicNavbar.tsx \
      /Users/shariqayaztech/Projects/RumiApp/react-native-dynamic-navbar/src/
   
   # Build
   cd /Users/shariqayaztech/Projects/RumiApp/react-native-dynamic-navbar
   npm run build
   
   # Test, commit, push
   git add .
   git commit -m "feat: Add RTL/LTR support"
   git push origin main
   ```

3. **When ready to publish**
   ```bash
   cd /Users/shariqayaztech/Projects/RumiApp/react-native-dynamic-navbar
   npm version minor  # 0.1.0 -> 0.2.0
   npm publish
   ```

## Quick Sync Script

Create this helper script in your home directory:

```bash
#!/bin/bash
# ~/sync-navbar.sh

echo "Syncing DynamicNavbar..."
cp /Users/shariqayaztech/Projects/RumiApp/rumiapp/src/components/DynamicNavbar.tsx \
   /Users/shariqayaztech/Projects/RumiApp/react-native-dynamic-navbar/src/

cd /Users/shariqayaztech/Projects/RumiApp/react-native-dynamic-navbar
npm run build
echo "✅ Synced and built!"
```

Make it executable:
```bash
chmod +x ~/sync-navbar.sh
```

Use it:
```bash
~/sync-navbar.sh
```
