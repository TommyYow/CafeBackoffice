# Cafe Backoffice Management System

A full-stack application for managing cafe operations with a React frontend and .NET Core backend.

## Tech Stack

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **UI Library**: Ant Design v5
- **State Management**: React Query (TanStack Query)
- **Form Handling**: React Hook Form
- **Data Grid**: AG Grid
- **Routing**: React Router v7
- **HTTP Client**: Axios

### Backend
- **.NET Version**: .NET 8.0
- **Architecture**: Clean Architecture (Domain, Application, Infrastructure, API layers)
- **API**: ASP.NET Core Web API
- **Dependency Injection**: Autofac
- **Mediator Pattern**: MediatR
- **Database Access**: Entity Framework Core
- **Database**: PostgreSQL
- **API Documentation**: Swagger/OpenAPI

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- .NET SDK 8.0
- PostgreSQL

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd CafeBackofficeBE
   ```

2. Restore the required NuGet packages:
   ```
   dotnet restore
   ```

3. Set up your PostgreSQL database connection string in `src/CafeBackoffice/appsettings.json`

4. Run the application:
   ```
   cd src/CafeBackoffice
   dotnet run
   ```

5. The API will be available at `http://localhost:5123`
   - API documentation can be accessed at `http://localhost:5123/swagger`

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd CafeBackofficeFE
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or if you use yarn:
   ```
   yarn
   ```

3. Configure the API URL in the `.env` file if necessary:
   ```
   VITE_API_URL=http://localhost:5123
   ```

4. Start the development server:
   ```
   npm run dev
   ```
   or with yarn:
   ```
   yarn dev
   ```

5. The frontend will be available at `http://localhost:5173`

## Features

- Modern, responsive UI built with Ant Design
- Clean Architecture design for maintainable backend code
- Database migrations handled automatically
- Swagger documentation for easy API testing
- Type-safe frontend with TypeScript
- CORS configured for local development
