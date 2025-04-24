## 🚫 Prevent Owner from Leaving Their Own Community

- [ ] In `leaveSub` controller:
  - Check if `user._id === subsaw.moderators[0]`
  - If true, block with a 400 or 403 response
  - Return: `You are the owner of this subsaw and cannot leave.`

- [ ] (Optional) On frontend:
  - If `isModerator === true` **and** `user._id === subsaw.moderators[0]`, disable or hide leave button

- [ ] In future: consider separating `owner` from `moderators` in schema
