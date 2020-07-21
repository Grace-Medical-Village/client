- 1 -> Triage
- Patient Sign In -> Get Number
- Triage -> Records Data (2 people)
- 2 -> Doctor
- Nothing is recorded
- Doctor records in physical medical records
- 3 -> Rx
- Wait for prescriptions
- Record pharmaceuticals (Rx)
- End of Visit

## To Do List

### index.html

- Add back `React.StrictMode` (antd issue)

### Header Component

- Test out light theme

## To Do

### Auth/Users

- [x] React Context for user logged in
- [x] Entry Screen -> Select your role
- [x] Logout -> Button dropdown -> Change Role / Logout
- [ ] Add header to login/auth screen

### New Patient

- [x] Language tracking
- [x] Country
- [x] Add Hispanic to `New Patient Form`
- [x] On refresh, it's on the dashboard, but `new-patient` in the URL and New Patient form is showing
- [ ] Check if patient has been here before

### Patient Dashboard

- How are we going to search for recurring patients?
- **Name search functionality**
- Don't always do bloodwork -> boolean logic to show if available
- Clean up form
- Track Hyptertension, Cholesterol, Diabetes
- Need charts over time
- Create 2/4 Mock patients
- Types in the top right
- Name, Gender, Age
- Entry for new data points
- Type(s)
- Drop downs for data (if available)
