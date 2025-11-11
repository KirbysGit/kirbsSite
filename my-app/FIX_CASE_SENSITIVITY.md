# Fix Case Sensitivity Issue

The folder `Utils` (uppercase) exists on GitHub but imports use `utils` (lowercase).
On Linux (Vercel), these are different folders.

## Solution: Force Git to Rename the Folder

Run these commands in your terminal (from the my-app directory):

```bash
# 1. Remove the old Utils folder from git cache (but keep files locally)
git rm -r --cached src/components/Utils

# 2. Add the utils folder with correct case
git add src/components/utils

# 3. Commit the change
git commit -m "Fix case sensitivity: Utils -> utils"

# 4. Push to GitHub
git push
```

## Alternative: If the above doesn't work

```bash
# 1. Rename the folder locally (Windows will handle this)
# Manually rename: src/components/Utils -> src/components/utils

# 2. Remove from git cache
git rm -r --cached src/components/Utils

# 3. Add the new folder
git add src/components/utils

# 4. Commit and push
git commit -m "Fix case sensitivity: Utils -> utils"
git push
```

## Verify All Imports Use Lowercase

All imports should use lowercase `utils`:
- ✅ `./components/utils/imagePreloader.js`
- ✅ `./components/utils/imageMap.js`
- ✅ `@/components/utils/logoMap.js`
- ✅ `@/components/utils/brandColors.js`

