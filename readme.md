[🇧🇷 Leia em Português](readme.pt-br.md)

# Switchy

#### Download on Play Store: https://play.google.com/store/apps/details?id=com.ferreira.switchy

**Switchy** is a complete social media platform composed of a mobile application (React Native/Expo) and a robust API (Node.js). The project allows users to share updates, interact with posts, and connect with other users in a dynamic and responsive environment.

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Architecture and Design](#-architecture-and-design)
  - [Backend (Switchy API)](#backend-switchy-api)
  - [Frontend (Switchy App)](#frontend-switchy-app)
- [Technologies Used](#-technologies-used)
- [Prerequisites](#-prerequisites)
- [Installation and Execution](#-installation-and-execution)
  - [Configuring the API](#configuring-the-api)
  - [Configuring the App](#configuring-the-app)
- [API Documentation](#-api-documentation)

---

## 🚀 About the Project

**Switchy** was developed with the goal of creating a fluid social experience. It implements modern software development concepts, clearly separating responsibilities between frontend and backend, and using design patterns that ensure scalability and maintainability.

The application focuses on short text posts (microblogging), allowing link previews and rich integration with external content.

---

## ✨ Features

### 🔐 Authentication and Users

- **Q/A and Login**: Secure authentication via JWT.
- **Password Recovery**: Full access recovery flow.
- **User Profile**: Profile editing and viewing other users' profiles.
- **Search**: Search for users and content on the platform.

### 📱 Feed and Interactions

- **Posts**: Creation of text posts (512 character limit).
- **Link Preview**: Automatic preview of links shared in posts.
- **Social Interactions**: Comments and like system (implicit in social features).
- **Notifications**: Notification center for relevant activities.

---

## 🏗 Architecture and Design

The project follows an architecture based on **Modules** (conceptually separated by `api` and `app` folders) with a strong emphasis on **Clean Code** and separation of concerns.

### Backend (Switchy API)

The API was built following **Domain-Driven Design (DDD)** principles and **Dependency Injection**.

- **Dependency Injection**: Uses `InversifyJS` to manage dependencies, making the code highly testable and decoupled.
- **Repository Pattern**: Data layer abstraction to facilitate database switching or mocking in tests.
- **Layers**:
  - `Controllers`: Handle HTTP requests.
  - `Services`: Contain business logic.
  - `Repositories`: Direct access to the database (MongoDB).
  - `Domain`: Domain type definitions and interfaces.

### Frontend (Switchy App)

The mobile application uses a component-based architecture and modern state management.

- **React Query (@tanstack/react-query)**: Server state management, caching, and optimistic updates.
- **Context API**: Global application state management (such as user session).
- **Repository Pattern**: Also applied in the frontend (`src/repositories`) to centralize API calls, decoupling components from network logic.
- **Componentization**: Interface built with reusable components (`ButtonDefault`, `SnackBar`, etc.).

---

## 🛠 Technologies Used

### Backend (Node.js)

- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (JSON Web Token) & Bcrypt
- **Documentation**: Swagger (Swagger UI Express)
- **Email**: Nodemailer
- **DI Container**: InversifyJS

### Frontend (Mobile)

- **Framework**: React Native (via Expo)
- **Language**: TypeScript
- **State Management**: React Query & Context API
- **Forms**: React Hook Form
- **Navigation**: React Navigation (Stack & Tab)
- **HTTP Client**: Axios
- **Secure Storage**: Expo Secure Store
- **Integrations**: Link Preview JS, Embed Instagram

---

## 📦 Prerequisites

Before you begin, ensure you have installed on your machine:

- **Node.js** (LTS version recommended)
- **NPM** or **Yarn**
- **MongoDB** (Local or Atlas URI)
- **Expo CLI** (Optional, but recommended: `npm install -g expo-cli`)
- Physical device or emulator (Android Studio/Xcode) to run the app.

---

## ⚙️ Installation and Execution

Clone the repository:

```bash
git clone https://github.com/your-username/switchy.git
cd switchy
```

### Configuring the API

1. Navigate to the API folder:

   ```bash
   cd switchy_api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root of `switchy_api` based on `example.env`:

   ```env
   PORT=3333
   DB_PASSWORD=your_password
   DB_USER=your_user
   DB_NAME=switchy_db
   DB_URL=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   TOKEN_EXPIRES=1d
   REFRESH_TOKEN_EXPIRES=2d
   ENCRYPT_SALT=10
   ```

4. Run the API (Development Mode):
   This will start the server and automatically generate Swagger documentation.
   ```bash
   npm run dev
   ```

### Configuring the App

1. In a new terminal, navigate to the app folder:

   ```bash
   cd switchy_app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root of `switchy_app` based on `example.env`:

   ```env
   # Replace with your machine's IP if running on physical device/emulator
   EXPO_PUBLIC_API_URL=http://localhost:3333
   ```

4. Run the application:

   ```bash
   npm start
   ```

   - Press `a` to open in Android emulator.
   - Press `i` to open in iOS simulator.
   - Or scan the QR Code with the Expo Go app on your phone.

---

## 📖 API Documentation

With the API running, you can access the complete endpoint documentation via Swagger UI.

Access in your browser:

```
http://localhost:3333/api-docs
```

To update Swagger documentation after code changes:

```bash
npm run swagger
```

---

## 📱 Build and Deploy

### App (Expo)

To generate production builds using EAS (Expo Application Services):

```bash
# Build for Production
eas build --profile production

# Submit to Play Store (Android)
eas submit --platform android
```
