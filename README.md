# To Do

## Discuss

- Will staff share computers? This matters in case we want to track who took notes, saved records, etc.

Define 'share computer'. GMV has 3 computers/tablets that nurses will use on any clinc day. For example: Tablet 1 this week may be used by me. But next week Tablet 1 might be used by you or Mike.

If you mean share the same computer/tablets while they're working on that same day? For example: I might use Tablet 1 now but then later Mike later would use Tablet 1, then I would say typically not. However, the you're creating logins for everyone so I think it'll be fine. We can discuss more. Lmk!

## Code

- Finish History Section
- Create hook for local storage state management
- Add Metrics Builder back in
- Add Metrics Table
- ...Alpha Review...
- Load Medications into DynamoDB
- Add Medications Builder
- Add Medications Table
- Backend Tests
- Frontend Tests

## Data Flow

- GET
  - onSuccess -> updateContext
  - onContextUpdate -> updateLocalStorage
- POST/PUT/DELETE
  - Put in Database
  - onSuccess -> updateContext
  - onContextUpdate -> updateLocalStorage
