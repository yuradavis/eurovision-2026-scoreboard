# Firebase + Authentication — Setup Instructions

## 1. Install Firebase

```bash
npm install firebase@^10.14.1
```

---

## 2. Files to Add / Replace

Copy these files into your project (replacing existing files where noted):

| File | Action |
|------|--------|
| `src/firebase.js` | **NEW** — Firebase initialization |
| `src/context/AuthContext.jsx` | **NEW** — Auth context & provider |
| `src/context/AppContext.jsx` | **REPLACE** — auth state removed (now in AuthContext) |
| `src/services/auth.js` | **REPLACE** — real Firebase implementation |
| `src/services/db.js` | **REPLACE** — real Firestore implementation |
| `src/components/auth/ProtectedRoute.jsx` | **NEW** — protected route wrapper |
| `src/hooks/useAuthUser.js` | **NEW** — convenience auth hook |
| `src/App.jsx` | **REPLACE** — wrapped with AuthProvider |
| `src/components/layout/Navbar.jsx` | **REPLACE** — shows avatar/name/logout |
| `src/components/layout/MobileMenu.jsx` | **REPLACE** — auth-aware mobile menu |
| `src/pages/Login.jsx` | **REPLACE** — real Google sign-in |
| `package.json` | **REPLACE** — adds firebase dependency |
| `firestore.rules` | **NEW** — Firestore security rules |

---

## 3. Enable Google Authentication in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/) → your project
2. **Authentication** → **Sign-in method** → **Google** → **Enable**
3. Add your authorized domain:
   - For local dev: `localhost` is already included
   - For GitHub Pages: add `<your-username>.github.io`

---

## 4. Deploy Firestore Security Rules

```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login
firebase login

# Initialize (select Firestore, don't overwrite existing files except rules)
firebase init firestore

# Deploy rules only
firebase deploy --only firestore:rules
```

Or paste the contents of `firestore.rules` directly in:
Firebase Console → Firestore Database → Rules → Edit

---

## 5. Create Firestore Database (if not done)

1. Firebase Console → **Firestore Database** → **Create database**
2. Choose **production mode** (rules are already set in `firestore.rules`)
3. Select region closest to your users (e.g. `europe-west1` for Basel)

---

## 6. GitHub Pages — Add Authorized Domain

In Firebase Console → Authentication → Settings → Authorized domains:
```
<your-github-username>.github.io
```

---

## 7. Verify Everything Works

```bash
npm run dev
```

1. Click **Login** → Google popup opens
2. Sign in → redirected to Home
3. Navbar shows avatar + first name + "Вийти"
4. Refresh page → still logged in (session persists)
5. Click "Вийти" → logged out, navbar shows Login button
6. Check Firestore Console → `users` collection has your document

---

## Architecture Notes

### Auth Flow
```
Firebase onAuthStateChanged
  └── AuthContext.currentUser (Firebase User)
  └── AuthContext.firestoreUser (Firestore profile with role)
       └── Navbar reads currentUser for avatar/name
       └── ProtectedRoute reads currentUser for access control
```

### Provider Order in App.jsx
```jsx
<AuthProvider>       // Firebase auth (outermost — no deps)
  <AppProvider>      // UI state, phase
    <Routes>
```

### Using Auth in Any Component
```jsx
import { useAuth } from '../context/AuthContext'

const { currentUser, isAuthenticated, signOut, firestoreUser } = useAuth()
```

### Protecting a Route (Stage 3 ready)
```jsx
import ProtectedRoute from './components/auth/ProtectedRoute'

// In App.jsx Routes:
<Route element={<ProtectedRoute />}>
  <Route path="/vote/semi-1" element={<VoteSemi1 />} />
</Route>

// Admin only:
<Route element={<ProtectedRoute requiredRole="admin" />}>
  <Route path="/admin" element={<Admin />} />
</Route>
```

### Firestore User Document Structure
```json
{
  "uid": "abc123",
  "displayName": "Maria Ivanova",
  "email": "maria@example.com",
  "photoURL": "https://...",
  "role": "user",
  "createdAt": "<Firestore Timestamp>",
  "updatedAt": "<Firestore Timestamp>"
}
```
