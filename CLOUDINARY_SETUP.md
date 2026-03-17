# 🌥️ Cloudinary Setup Guide

## ✅ What's Been Done:

1. ✅ Installed Cloudinary package
2. ✅ Added Cloudinary credentials to `.env`
3. ✅ Created Cloudinary utility functions
4. ✅ Replaced Firebase Storage with Cloudinary
5. ✅ All upload functions now use Cloudinary

---

## 🔧 **IMPORTANT: Create Upload Preset in Cloudinary**

Before your uploads will work, you need to create an **unsigned upload preset** in Cloudinary:

### **Step 1: Login to Cloudinary**

1. Go to: https://console.cloudinary.com/
2. Login with your account

### **Step 2: Create Upload Preset**

1. Click on **Settings** (gear icon) in top right
2. Click on **Upload** tab in left sidebar
3. Scroll down to **Upload presets** section
4. Click **Add upload preset**

### **Step 3: Configure Upload Preset**

Fill in the following:

**Upload preset name:** `uccopaints`

**Signing Mode:** Select **Unsigned** (IMPORTANT!)

**Folder:** Leave empty (we set it programmatically)

**Access mode:** **Public**

**Unique filename:** Check this box ✓

**Overwrite:** Uncheck this box

**Auto tagging:** Optional

**Click "Save"**

---

## 🎯 **Your Cloudinary Configuration:**

```
Cloud Name: dhotbollp
API Key: 458465477988242
API Secret: QM76yHmF09P1W0b5tAEOEUC71yo
Upload Preset: uccopaints (you just created this)
```

---

## 📁 **Folder Structure in Cloudinary:**

Your images will be organized like this:

```
uccopaints/
├── banners/
│   ├── banner1.jpg
│   ├── banner2.jpg
├── categories/
│   ├── category1.jpg
│   ├── category2.jpg
└── products/
    ├── product1.jpg
    ├── product2.jpg
```

---

## 🚀 **How It Works Now:**

### **When You Upload an Image:**

1. **Admin Panel** → Upload image file
2. **Image is compressed** (max 1MB, 1920px)
3. **Uploaded to Cloudinary** → `uccopaints/[folder]/`
4. **URL returned** → Saved to Firestore
5. **Image displayed** on website

### **Benefits of Cloudinary:**

- ✅ **Free tier:** 25GB storage, 25GB bandwidth/month
- ✅ **Automatic optimization:** Images auto-optimized
- ✅ **CDN delivery:** Fast loading worldwide
- ✅ **Image transformations:** Resize, crop, format on-the-fly
- ✅ **No Firebase Storage costs**

---

## 🔄 **What Changed:**

### **Before (Firebase Storage):**
```typescript
// Uploaded to Firebase Storage
// URL: https://firebasestorage.googleapis.com/...
```

### **After (Cloudinary):**
```typescript
// Uploaded to Cloudinary
// URL: https://res.cloudinary.com/dhotbollp/image/upload/...
```

---

## 🧪 **Testing:**

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Login to admin panel:**
   ```
   http://localhost:3000/admin/login
   ```

3. **Try uploading:**
   - Go to Banners → Add Banner
   - Upload an image file
   - Should upload to Cloudinary
   - Check Cloudinary dashboard to see the image

4. **Verify in Cloudinary:**
   - Go to: https://console.cloudinary.com/
   - Click **Media Library**
   - You should see your uploaded images in `uccopaints/` folder

---

## 📊 **Cloudinary Dashboard:**

### **View Your Images:**
1. Go to: https://console.cloudinary.com/
2. Click **Media Library**
3. Navigate to `uccopaints` folder
4. See all your uploaded images

### **Monitor Usage:**
1. Go to Dashboard
2. See storage used
3. See bandwidth used
4. See transformations used

### **Free Tier Limits:**
- Storage: 25 GB
- Bandwidth: 25 GB/month
- Transformations: 25,000/month
- More than enough for most websites!

---

## 🔐 **Security Notes:**

### **Upload Preset is Unsigned:**
- This allows client-side uploads
- Safe because we limit to specific folders
- No API secret exposed to client

### **API Secret:**
- Only used for server-side operations
- Not exposed in client code
- Stored securely in `.env`

### **For Production:**
- Consider implementing backend API for deletions
- Use signed uploads for more control
- Set up auto-moderation if needed

---

## 🛠️ **Troubleshooting:**

### **Issue: "Upload failed"**

**Solution:**
1. Make sure you created the upload preset named `uccopaints`
2. Make sure it's set to **Unsigned**
3. Check browser console for errors
4. Verify Cloudinary credentials in `.env`

### **Issue: "Invalid upload preset"**

**Solution:**
1. Go to Cloudinary Settings → Upload
2. Check the upload preset name is exactly: `uccopaints`
3. Make sure it's **Active** (toggle on)

### **Issue: "Images not displaying"**

**Solution:**
1. Check the image URL in Firestore
2. Should start with: `https://res.cloudinary.com/dhotbollp/`
3. Try opening the URL directly in browser
4. Check Cloudinary Media Library

---

## 📝 **Environment Variables:**

Your `.env` file now has:

```env
# Firebase (for Auth & Firestore)
VITE_FIREBASE_API_KEY=AIzaSyCNKMGcD8aI6cKGv235yEV73swLOt9iQXU
VITE_FIREBASE_AUTH_DOMAIN=uccopaints.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=uccopaints
VITE_FIREBASE_STORAGE_BUCKET=uccopaints.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=766158852191
VITE_FIREBASE_APP_ID=1:766158852191:web:395c40c7104f08009dcbea

# Cloudinary (for Image Storage)
VITE_CLOUDINARY_CLOUD_NAME=dhotbollp
VITE_CLOUDINARY_UPLOAD_PRESET=uccopaints
VITE_CLOUDINARY_API_KEY=458465477988242
VITE_CLOUDINARY_API_SECRET=QM76yHmF09P1W0b5tAEOEUC71yo
```

**Note:** The `VITE_CLOUDINARY_UPLOAD_PRESET` variable is now required. If not set, it defaults to `ml_default`.

---

## ✅ **What's Using What:**

| Service | Used For | Provider |
|---------|----------|----------|
| **Authentication** | Admin login | Firebase |
| **Database** | Store data | Firebase Firestore |
| **Image Storage** | Store images | **Cloudinary** ✨ |
| **Hosting** | Website hosting | Firebase/Hostinger |

---

## 🎉 **You're All Set!**

**Next Steps:**

1. ✅ Create upload preset in Cloudinary (see Step 2 above)
2. ✅ Restart your dev server: `npm run dev`
3. ✅ Test uploading an image in admin panel
4. ✅ Check Cloudinary Media Library to see your image
5. ✅ Deploy your website!

**Your images are now stored on Cloudinary!** 🌥️✨
