# Firebase / Firestore Setup (recommended rules & deployment)

This document contains recommended Cloud Firestore security rule examples for development and production, and quick notes on deploying and testing rules with the Firebase CLI.

---

## Important safety note

- Never leave permissive (public) rules in production. Use development rules only while actively developing, and revert to stricter rules before shipping.
- Always test security rules with the Firestore emulator or `firebase emulators:start` before deploying.

---

## Development (quick, temporary)

Use these rules only while actively developing. They either require authentication for reads/writes or allow temporary time-limited access so you can iterate quickly.

1) Require authentication (simple dev rule)

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // allow read/write only to authenticated users
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

2) Time-limited open dev rule (use carefully)

Replace the timestamp with a short future date. This temporarily allows open access until the given date/time.

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow reads and writes for everyone until Dec 31, 2025 UTC
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 12, 31);
    }
  }
}
```

Be sure to remove or tighten this rule before your project goes public.

---

## Production (recommended starting point)

The exact rules depend on your app requirements. Below is a conservative example suitable for many apps where `tips` and `pledges` are readable by anyone but write/create operations require authentication and some validation.

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Tips collection: public read, auth required to create
    match /tips/{tipId} {
      allow read: if true; // tips are public

      // create only for authenticated users and validate fields
      allow create: if request.auth != null
        && request.resource.data.keys().hasAll(['text', 'date'])
        && request.resource.data.text is string
        && request.resource.data.text.size() <= 1000;

      // disallow updates/deletes by default; require server process or stricter checks
      allow update, delete: if false;
    }

    // Pledges collection: public read, auth required to create
    match /pledges/{pledgeId} {
      allow read: if true;

      allow create: if request.auth != null
        && request.resource.data.keys().hasAll(['name', 'pledgeText'])
        && request.resource.data.pledgeText is string
        && request.resource.data.pledgeText.size() <= 2000;

      // allow owners to delete/update their own pledge (if you set ownerUid on create)
      allow update, delete: if request.auth != null
        && resource.data.ownerUid == request.auth.uid;
    }

    // Default: deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

Notes:
- Validate required fields and types on create/update using `request.resource.data` checks. This protects against malformed data.
- Limit sizes where appropriate (e.g., `.size()` checks) to prevent abuse and large writes.
- Consider rules to prevent spam (rate limiting isn't built-in — use Cloud Functions or app-side protections).

---

## Testing rules locally (recommended)

1. Install and login with Firebase CLI (if not installed):

```bash
npm install -g firebase-tools
firebase login
```

2. Initialize Firestore rules locally (if you haven't):

```bash
firebase init firestore
```

3. Start the emulator to test rules and your app against a local Firestore instance:

```bash
firebase emulators:start --only firestore
```

Use the Firebase Emulator UI (usually at http://localhost:4000) to inspect data and test reads/writes.

---

## Deploying rules

If you have the Firebase CLI configured in the project and `firestore.rules` is present (or your rules file is configured in `firebase.json`), deploy only Firestore rules with:

```bash
firebase deploy --only firestore:rules
```

If you need to deploy the entire project (hosting, functions, rules, etc.) use:

```bash
firebase deploy
```

---

## Additional recommendations

- Use the Firestore emulator for automated tests and CI.
- Use role-based claims if you need admin-level actions from trusted backends.
- Regularly review and tighten rules as your app matures.

If you'd like, I can add a `firestore.rules` file with one of these examples and wire it into `firebase.json` for you.
