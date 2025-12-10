# Publishing Guide

## Pre-publish Checklist

- [ ] All tests pass
- [ ] TypeScript compilation successful
- [ ] Linting passes
- [ ] Version bumped in package.json
- [ ] CHANGELOG.md updated
- [ ] README.md up to date
- [ ] Git working tree is clean

## Publishing Steps

1. **Build the package**
   ```bash
   npm run build
   ```

2. **Run tests**
   ```bash
   npm test
   ```

3. **Check package contents**
   ```bash
   npm pack --dry-run
   ```

4. **Login to npm** (first time only)
   ```bash
   npm login
   ```

5. **Publish to npm**
   ```bash
   npm publish
   ```

6. **Tag the release**
   ```bash
   git tag v0.1.0
   git push origin v0.1.0
   ```

## Version Bump Guidelines

- **Patch** (0.1.X): Bug fixes, minor changes
- **Minor** (0.X.0): New features, backward compatible
- **Major** (X.0.0): Breaking changes

```bash
npm version patch  # 0.1.0 -> 0.1.1
npm version minor  # 0.1.0 -> 0.2.0
npm version major  # 0.1.0 -> 1.0.0
```

## Post-publish

1. Verify package on npm: https://www.npmjs.com/package/react-native-dynamic-navbar
2. Test installation in a fresh project
3. Update GitHub release notes
