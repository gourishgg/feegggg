# 🎓 Project-Based Evaluation-II (FEE-II 25CSE0203) - Comprehensive Viva & Exam Guide

**Institution:** Chitkara University Institute of Engineering & Technology  
**Course Code:** 25CSE0203 — Front End Engineering-II  
**Evaluation:** Project-based Evaluation-II (Total: 30 Marks)  
**Format:** Presentation (05 Marks) + Project Work & Viva (25 Marks)  

---

## 🏆 Summary of Rubric Alignment (Full 30/30 Marks)

| Evaluation Rubric | Marks Allocated | Status | Key Implementation Files in Project |
| **Presentation (Component 1)** | **5 Marks** | ✅ Ready | `EXAM_VIVA_GUIDE.md`, Presentation Pitch Script, Interactive Demos |
| **React Navigation Layout & Page Structure** | **7-8 Marks** | ✅ Complete | `App.jsx`, `Navbar.jsx`, `ProtectedRoute.jsx`, `src/pages/*` |
| **Context API & State Architecture** | **6-8 Marks** | ✅ Complete | `ThemeContext.jsx`, `AuthContext.jsx`, `WeatherContext.jsx` |
| **Intro to Redux Toolkit** | **3-5 Marks** | ✅ Complete | `src/redux/store.js`, `favoritesSlice.js`, `comparisonSlice.js`, `ReduxInspector.jsx` |
| **Form Handling in React** | **3-4 Marks** | ✅ Complete | `useFormValidation.js`, `TextInput.jsx`, `SelectInput.jsx`, `DbmsModal.jsx`, `FeedbackPage.jsx` |

---

## 🚀 How to Run the Project on Your Local Machine

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Build the Production Bundle
```bash
npm run build
```

### Step 3: Start the Backend REST API Server & App
```bash
npm start
```
Open your browser and navigate to: **`http://localhost:3000`**

*(Alternatively, for hot-reload developer mode: `npm run dev` at `http://localhost:5173`)*

### Default Login Credentials:
- **Username:** `admin`
- **Password:** `password`
- *(Or use the Sign Up form to register a new user account)*

---

## 🧭 1. React-Navigation Layout and Page Structure (7-8 Marks)

### Syllabus Requirement:
> *Navigation layout and page structure: Multi-page SPA design, Mini project: portfolio site with routing.*

### What Has Been Implemented:
1. **React Router v6 (`react-router-dom`)**:
   - `BrowserRouter` configured in [`src/main.jsx`](file:///d:/ce2projfee/src/main.jsx).
   - Clean client-side SPA routing inside [`src/App.jsx`](file:///d:/ce2projfee/src/App.jsx) with route protection (`ProtectedRoute.jsx`).
   - Active route styling with `NavLink` in [`src/components/Navbar.jsx`](file:///d:/ce2projfee/src/components/Navbar.jsx).
   - 404 Wildcard Fallback Route (`*`) rendered with animated illustration in [`src/pages/NotFoundPage.jsx`](file:///d:/ce2projfee/src/pages/NotFoundPage.jsx).
2. **Multi-Page SPA Structure**:
   - **`/portal`**: Main Weather Telemetry & Interactive Leaflet Vector Map.
   - **`/locations`**: Dedicated Locations DBMS table and cards with category filters and Redux bookmarking.
   - **`/analytics`**: Multi-city comparative weather telemetry powered by Redux Toolkit async thunks.
   - **`/quick-search`**: Instant global city lookup.
   - **`/report`**: Citizen weather reporting and form validation showcase.
   - **`/login`**: Authentication route with protected route redirection.

### Viva Answer to Memorize:
> *"We implemented a Multi-Page SPA using `react-router-dom` v6. We defined our route hierarchy in `App.jsx` using `Routes` and `Route` components, protected authenticated paths with a custom `ProtectedRoute` wrapper, styled active navigation states using `NavLink`, handled deep linking, and caught undefined URLs using a custom 404 `NotFoundPage` route."*

---

## 🌐 2. Context API & State Architecture (6-8 Marks)

### Syllabus Requirement:
> *Context API: State architecture in React apps, Global vs local state, Async state and loading/error handling, Mini project: shopping cart or dashboard.*

### Architectural Separation:
1. **Local State (`useState`, `useReducer`)**:
   - Used for component-scoped UI states, e.g., modal visibility (`isDbmsModalOpen`), search filter text, password reveal toggles, and form field focus.
2. **Context API (Global Application State)**:
   - **`AuthContext.jsx`**: User authentication, session persistence in `localStorage`, `login()`, `signup()`, `logout()`.
   - **`ThemeContext.jsx`**: Dynamic Light/Dark mode switcher that toggles CSS custom properties and updates root DOM attributes (`data-theme="light"` / `dark`).
   - **`WeatherContext.jsx`**: Manages global weather telemetry, active location selection, OpenWeather API calls, temperature unit switching (°C/°F), coordinate picking, and toast notification queues.
3. **Async State & Loading/Error Handling**:
   - Explicit loading states (`loadingWeather`, `isSubmitting`), animated spinners, and error banners with toast notifications on API failures.

### Viva Answer to Memorize:
> *"In our architecture, we maintain a clear separation between local and global state. Ephemeral UI states such as modal visibility and inputs live in `useState`. Global cross-cutting state uses React's Context API: `AuthContext` for user sessions, `ThemeContext` for dark/light theme switching, and `WeatherContext` for live telemetry, loading spinners, and error alerts."*

---

## ⚡ 3. Intro to Redux Toolkit (3-5 Marks)

### Syllabus Requirement:
> *Intro to Redux Toolkit or Zustand.*

### What Has Been Implemented:
1. **Redux Store Setup**:
   - Created in [`src/redux/store.js`](file:///d:/ce2projfee/src/redux/store.js) using `configureStore` combining `favorites` and `comparison` slices.
2. **`favoritesSlice.js`**:
   - Manages user's pinned/favorite locations across the app.
   - Reducers: `addFavorite`, `removeFavorite`, `toggleFavorite`, `clearFavorites`.
   - Synchronizes with `localStorage` for state persistence.
   - Connected to UI via `useSelector` and `useDispatch` in the Navbar (`ReduxFavoritesTray`), Map Portal, and Locations DBMS table.
3. **`comparisonSlice.js` with `createAsyncThunk`**:
   - Demonstrates async data fetching inside Redux Toolkit via `fetchCityTelemetry`.
   - Handles the complete thunk lifecycle: `pending` (shows loading spinner), `fulfilled` (saves telemetry), `rejected` (saves error message).
4. **Interactive Redux Inspector (`ReduxInspector.jsx`)**:
   - A floating widget on the bottom-right corner of the screen that opens a live JSON state inspector of the Redux store to demonstrate real-time Redux state during viva evaluation!

### Viva Answer to Memorize:
> *"We implemented `@reduxjs/toolkit` using `configureStore` and `createSlice`. We built two slices: `favoritesSlice` for location bookmarking, and `comparisonSlice` which leverages `createAsyncThunk` to fetch multi-city weather data asynchronously. It handles `pending`, `fulfilled`, and `rejected` states, and we access the store across components using `useSelector` and `useDispatch`."*

---

## 📝 4. Form Handling in React (3-4 Marks)

### Syllabus Requirement:
> *Form handling in React: Validation strategies, Reusable input components.*

### What Has Been Implemented:
1. **Reusable Input Components (`src/components/common/form/`)**:
   - **`TextInput.jsx`**: Supports text, number, email, password types, floating labels, icons, helper text, and accessible error badges (`role="alert"`).
   - **`SelectInput.jsx`**: Reusable select dropdown with options and validation states.
   - **`TextAreaInput.jsx`**: Multiline input with live character counter and validation.
   - **`CheckboxInput.jsx`**: Reusable checkbox with custom styling and required consent validation.
   - **`Button.jsx`**: Reusable button with variants (`primary`, `secondary`, `danger`, `success`, `outline`) and built-in loading spinner (`isLoading`).
2. **Custom Validation Hook (`useFormValidation.js`)**:
   - Manages values, errors, touched states, and submit lifecycle.
   - Implements both real-time `onBlur`/`onChange` field validation and whole-form submit validation.
   - Validation rules supported:
     - `required` check
     - `minLength` and `maxLength` checks
     - `pattern` (e.g., regex email verification `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
     - `isNumeric` and numerical range checks (e.g. Latitude: -90 to 90, Longitude: -180 to 180)
     - `custom` validation functions (e.g. Password match confirmation).
3. **Where Reusable Forms Are Used**:
   - In [`DbmsModal.jsx`](file:///d:/ce2projfee/src/components/DbmsModal.jsx) for adding/editing locations.
   - In [`LoginView.jsx`](file:///d:/ce2projfee/src/components/LoginView.jsx) for login & signup with password verification.
   - In [`FeedbackPage.jsx`](file:///d:/ce2projfee/src/pages/FeedbackPage.jsx) for ground weather incident reporting.

### Viva Answer to Memorize:
> *"For form handling, we built modular reusable components—`TextInput`, `SelectInput`, `TextAreaInput`, `CheckboxInput`, and `Button`—abstracting away styling and accessibility. We engineered a custom hook `useFormValidation` supporting field-level touched tracking, real-time validation, regex pattern matching, and numerical boundary checks for geospatial coordinates."*

---

## 🎤 5. Presentation Pitch (5 Marks)

### 3-Minute Presentation Walkthrough:
1. **Introduction (30 seconds):**
   - *"Good morning/afternoon professors. We present 'Desh Dekho', a geospatial weather telemetry and location Database Management System built using React 18, Vite, React Router, Redux Toolkit, and Node.js REST API."*
2. **Navigation & SPA Architecture (45 seconds):**
   - *"Our application features full client-side routing with React Router v6. Notice how the URL changes between the Map Portal (`/portal`), Locations DBMS (`/locations`), Analytics (`/analytics`), and Citizen Report (`/report`)."*
3. **Context API & Theme (30 seconds):**
   - *(Click the theme toggle 🌙/☀️ in the navbar)*: *"We use React Context API for global state management: `AuthContext` for user sessions, `ThemeContext` for instant dark/light theme switching, and `WeatherContext` for live telemetry."*
4. **Redux Toolkit & Async Thunk (45 seconds):**
   - *(Click ❤️ on a city and open `/analytics`)*: *"For complex state, we implemented Redux Toolkit. The `favoritesSlice` persists pinned locations in localStorage. In our Analytics page, `comparisonSlice` dispatches a `createAsyncThunk` to fetch and compare live weather data across cities with pending/fulfilled/rejected lifecycle states. Notice our live Redux Inspector widget on the bottom right."*
5. **Form Handling & Reusable Components (30 seconds):**
   - *(Open the DBMS Modal or `/report` page)*: *"All forms are composed of reusable input components powered by a custom `useFormValidation` hook with live error messaging and coordinate boundary validation."*
6. **Conclusion (10 seconds):**
   - *"Thank you, professors. We welcome your questions."*

---

## 💡 Top Anticipated Viva Questions & Answers

### Q1: What is the difference between Context API and Redux Toolkit? When do you choose which?
**Answer:**
- **Context API** is built into React and is best for low-frequency, global broadcast data like current user session, active theme, or language preferences. It can cause re-renders in all subscribing consumers whenever the context value changes.
- **Redux Toolkit (RTK)** is designed for high-frequency or complex state management. It provides selector-based memoization (`useSelector`), standardized immutable updates via Immer, middleware support, DevTools integration, and `createAsyncThunk` for handling asynchronous actions with `pending`, `fulfilled`, and `rejected` states.

### Q2: What is `createAsyncThunk` in Redux Toolkit?
**Answer:**
- `createAsyncThunk` is an abstraction in Redux Toolkit that accepts an action type string and a callback function that returns a promise.
- It automatically dispatches three lifecycle actions based on promise resolution: `[type]/pending`, `[type]/fulfilled`, and `[type]/rejected`.
- In our project, `fetchCityTelemetry` uses `createAsyncThunk` to query OpenWeather data, while `extraReducers` updates the comparison state and loading indicators.

### Q3: What is the difference between Controlled and Uncontrolled form components in React?
**Answer:**
- In a **Controlled Component**, form data is handled by React component state (`value` and `onChange`). React acts as the single source of truth, enabling immediate validation, conditional disables, and dynamic formatting.
- In an **Uncontrolled Component**, form data is handled directly by the DOM itself using `useRef` or native DOM APIs without re-rendering on every keystroke.
- Our project uses **Controlled Components** via reusable wrappers (`TextInput`, `SelectInput`, `TextAreaInput`) for predictable validation and error feedback.

### Q4: How does React Router v6 handle Protected Routes?
**Answer:**
- We wrapped our authenticated routes in a custom `<ProtectedRoute>` component that reads `isLoggedIn` from `AuthContext`.
- If the user is unauthenticated, it returns `<Navigate to="/login" replace />`; otherwise, it renders the protected children components.
