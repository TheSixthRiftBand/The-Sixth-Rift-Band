# Overview

The Sixth Rift is a modern full-stack web application showcasing a young band's music and online presence. Built as a single-page application, it features a band landing page with sections for member profiles, music player functionality, and contact information. The application demonstrates a complete modern web development stack with React frontend, Express backend, PostgreSQL database integration, and comprehensive UI components.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript for type safety and component-based development
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and data fetching
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **UI Components**: Comprehensive component library built on Radix UI primitives with shadcn/ui patterns

## Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API development
- **Language**: TypeScript with ES modules for modern JavaScript features
- **Database ORM**: Drizzle ORM for type-safe database operations and schema management
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development
- **Development Tools**: Hot module replacement via Vite integration in development mode

## Data Storage
- **Database**: PostgreSQL with Drizzle ORM for schema definition and migrations
- **Connection**: Neon Database serverless PostgreSQL for cloud-hosted database
- **Schema Management**: Code-first approach with TypeScript schema definitions
- **Validation**: Zod integration for runtime type validation and schema inference

## Authentication & Sessions
- **Session Store**: PostgreSQL-backed sessions using connect-pg-simple
- **User Management**: Basic user schema with username/password authentication model
- **Storage Abstraction**: Interface-based design allowing multiple storage implementations

## Development Environment
- **Package Management**: npm with lockfile for dependency consistency
- **Build Process**: Separate client and server build pipelines with esbuild for server bundling
- **Development Server**: Integrated Vite development server with Express API proxy
- **Code Quality**: TypeScript strict mode with comprehensive type checking

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18 with TypeScript, Vite build tooling, and modern development features
- **Database**: PostgreSQL via Neon Database serverless platform with Drizzle ORM
- **UI Library**: Radix UI primitives for accessible, unstyled components with custom styling

### Development & Build Tools
- **Vite Plugins**: Runtime error overlay, development banner, and cartographer for Replit integration
- **Build Tools**: esbuild for server bundling, PostCSS for CSS processing, Autoprefixer for browser compatibility
- **Type System**: TypeScript with strict configuration and path mapping for clean imports

### Utility Libraries
- **Styling**: Tailwind CSS with class-variance-authority for component variants, clsx for conditional classes
- **Date Handling**: date-fns for date manipulation and formatting
- **Form Management**: React Hook Form with Hookform resolvers for form validation
- **Icons**: Lucide React for consistent iconography throughout the application

### Third-Party Integrations
- **Fonts**: Google Fonts integration (Inter, Architects Daughter, DM Sans, Fira Code, Geist Mono)
- **External Assets**: Unsplash for placeholder images and band photography
- **Cloud Services**: Neon Database for managed PostgreSQL hosting