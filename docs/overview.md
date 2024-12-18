# EatEasy Project Overview

## Next.js Features Implementation

### 1. App Router & Server Components

- Using the new `/app` directory structure
- Implementing server components for improved performance
- Route groups: Using (auth) group for authentication related pages

### 2. Server Actions

- Authentication actions in `/app/lib/actions/auth/`:
  - `login` and `signUp` actions for user authentication
  - JWT token management with `jwt-service.ts`
- NocoDb integration through server actions

### 3. Internationalization

- Using `next-intl` for i18n support
- Locale handling in route structure: `[locale]`
- Language switcher component for dynamic locale changes

### 4. State Management

- Using Zustand for client-side state management
- Persistent storage with zustand/middleware
- Key stores:
  - `useAuthStore`: Managing authentication state
  - `useSidebarToggle`: Managing sidebar UI state

### 5. UI Components

- Custom components built with:
  - Radix UI primitives
  - Tailwind CSS
  - Class Variance Authority (cva) for variant management
- Component categories:
  - Common UI components (buttons, forms, etc.)
  - Layout components (Sidebar, Navbar)
  - Authentication components

### 6. TypeScript Integration

- Full TypeScript support throughout the application
- Type-safe server actions
- Zod schemas for form validation
- Type definitions for API responses

### 7. Middleware

- Authentication middleware for protected routes
- Locale handling middleware for i18n support
- API route protection

### Key Features

1. Authentication System
2. Multi-language Support
3. Dark/Light Theme
4. Responsive Layout
5. Form Validation
6. Toast Notifications
