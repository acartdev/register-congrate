# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` - Starts Next.js development server on port 3000
- **Build**: `npm run build` - Creates production build
- **Start production**: `npm start` - Starts production server
- **Lint**: `npm run lint` - Runs ESLint with Next.js TypeScript rules
- **Format**: `npm run format` - Formats code with Prettier
- **Database Migration**: `npm run generate` - Runs Prisma migrations with init name
- **Database Reset**: `npm run reset:schema` - Resets database schema (force, no seed)

## Project Architecture

This is a Next.js 15 React application for a graduation registration system ("ระบบลงทะเบียนรับปริญญา") built with TypeScript and Material-UI.

### Key Architecture Patterns

- **App Router**: Uses Next.js 13+ app directory structure with route groups
- **Route Groups**: 
  - `(auth)` - Authentication pages (login, register)
  - `(main)` - Main application pages with shared layout
- **State Management**: Zustand stores for global state in `src/_store/`
- **Component Structure**: Reusable components in `src/components/` with dialog and drawer subdirectories
- **Type Safety**: Comprehensive TypeScript models in `src/model/` and schemas in `src/schema/`

### Core Technologies

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Library**: Material-UI v7 with custom theme
- **Forms**: React Hook Form with Zod validation
- **State**: Zustand for global state management
- **Server State**: TanStack Query (React Query) for API state management
- **Database**: Prisma ORM with PostgreSQL (Docker Compose setup)
- **API**: Next.js API routes with Axios for HTTP client
- **Styling**: Material-UI emotion-based styling
- **Charts**: ApexCharts for data visualization
- **Date Handling**: Day.js with MUI date pickers

### Directory Structure

- `src/_store/` - Zustand state stores (menu management, snackbar)
- `src/app/(auth)/` - Authentication flow pages
- `src/app/(main)/` - Main application pages with shared layout
- `src/components/` - Reusable UI components
- `src/model/` - TypeScript interfaces and enums
- `src/schema/` - Zod validation schemas
- `src/data/` - Mock data and static data
- `src/helper/` - Utility functions
- `src/theme/` - Material-UI theme configuration
- `src/backend-service/` - Server-side business logic
  - `repository/` - Data access layer with Prisma
  - `services/` - Business logic and authentication services
- `src/providers/` - React context providers (Query, Theme)
- `src/hook/` - Custom React hooks

### User Roles and Permissions

The application has role-based access with UserRole (ADMIN, STUDENT, TEACHER) and Permission levels (ADMIN, STAFF_TEACHER, STAFF_STUDENT, VIEW) defined in user.model.ts.

### Layout System

- Root layout provides ThemeProvider and Kanit font
- Main layout includes navigation, menu drawer, and snackbar notifications
- Uses Container from Material-UI for consistent spacing

### State Management Patterns

- Menu management store handles dropdown menus and user selection
- Snackbar store manages global notifications
- Form state managed with React Hook Form and Zod validation
- TanStack Query handles server state with 3 retries, no window focus refetch

### Authentication & Security

- JWT-based authentication with server-side validation
- Cookie-based session management via helper functions
- Role-based access control with middleware protection
- Zod schema validation for all forms with Thai language error messages

### Database & API Architecture

- **Repository Pattern**: Data access abstracted through repository layer
- **Service Layer**: Business logic separated from API routes
- **API Routes**: RESTful endpoints in `src/app/api/` directory
- **Prisma Integration**: Generated client in `src/generated/prisma/`
- **Environment**: PostgreSQL with Docker Compose for local development