# Sawwit Server - Backend Progress

---

## 🔥 Remaining TODOs

- [ ] Implement image file uploads for image posts (after core features are finished)
- [ ] Add comment fetching (basic GET top-level comments)
- [ ] (Optional) Add "load more replies" functionality for deep comment trees
- [ ] (Optional) Add voting on comments (currently only posts have voting)
- [ ] (Optional) Implement soft-deleting posts and comments

---

## ✅ Completed Features

### 🧩 Users
- Signup, login, logout endpoints
- JWT authentication using HTTP-only cookies
- `requireAuth` and `optionalAuth` middleware
- Validation for signup/login inputs
- Basic user profile (karma tracking)

### 🧩 Subsaws (Subreddit equivalents)
- Create subsaw
- Join and leave subsaw
- Fetch subsaws
- `validateSubsaw` middleware to ensure subsaws exist

### 🧩 Posts
- Create text posts
- Fetch individual posts
- Auto-upvote posts by their creator
- Voting on posts (upvote/downvote with karma adjustment)
- `validateCreatePost` for validating post creation inputs

### 🧩 Comments
- Comment creation
  - Supports commenting on Posts or replying to other Comments (polymorphic)
  - Uses `commentableType` ("Post" or "Comment") and `commentableId`
- Auto-upvote comments on creation
- Validation for comment content (no empty or only-spaces content, max 5000 characters)
- Parent existence validation (must comment on a real Post or Comment)
- Karma adjustment for comment authors
- Basic comment creation tests (Supertest + Jest)
  - Successful comment creation
  - Failure with invalid data (empty, too long, non-existent parent)

### 🧩 General
- Clean project structure (routers, controllers, models, validators, utils)
- Express-validator used for input validation
- MongoDB with Mongoose models
- Organized error handling (validation errors, 404s, 500s)
- Supertest + Jest integration for backend route testing
- Standardized backend routes (REST API)

---

## 💬 Notes

- **Image post upload functionality** will be added **later** after completing core client and backend flows.
- **Focus right now:** Get basic post/comment flows fully working first (posting, fetching, replying).

---
