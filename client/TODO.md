## 🚫 Prevent Owner from Leaving Their Own Community

- [ ] In `leaveSub` controller:
  - Check if `user._id === subsaw.moderators[0]`
  - If true, block with a 400 or 403 response
  - Return: `You are the owner of this subsaw and cannot leave.`
- [ ] (Optional) On frontend:
  - If `isModerator === true` **and** `user._id === subsaw.moderators[0]`, disable or hide leave button
- [ ] In future: consider separating `owner` from `moderators` in schema

---

## 🧹 Cleanup: Prevent Duplicate Subscriber Entries

- [ ] In `createSubsaw`, remove the redundant `.push(user._id)` after creation — the user is already included in the `subscribers` array during initialization.
- [ ] Ensure that `joinSubsaw` doesn’t allow a user to be pushed into `subscribers` multiple times
  - Use `.some()` or `.includes()` check first
- [ ] (Optional) Add schema-level protection with `unique: true` on subscriber ObjectId array — though this may require custom handling since Mongoose doesn't fully enforce array uniqueness

When leaeving a subsaw, make sure they get rid of their moderator status on that subsaw.
When leaving a subsaw, make sure that the owner is not able to leave.

Make sure loginservice/signupservice doesn't actually retur any data, but only sets the cookies. setup the client to always refreshUser(). 