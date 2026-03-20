# LocalBiz Builder 🚀

LocalBiz Builder is a powerful, modern platform designed to help local businesses create and manage their professional websites instantly. It provides an intuitive dashboard for business owners to showcase their products, services, and manage their online presence with ease.

## ✨ Features

- **Instant Website Creation**: Launch your business site in minutes with customizable templates.
- **Business Dashboard**: Manage your products, services, and business information from a central location.
- **Custom Themes**: Personalize your website's look and feel with flexible theme configurations.
- **Product & Service Catalogs**: Easy-to-manage listings for what you offer.
- **Analytics**: Track visitor interactions and business performance.
- **Responsive Design**: Websites look great on desktop, tablet, and mobile.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js with Vite
- **Styling**: Tailwind CSS, Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite (via Prisma ORM)
- **Authentication**: JWT & Bcryptjs
- **Logging**: Morgan

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd LocalBiz
   ```

2. **Setup the Backend**:
   ```bash
   cd server
   npm install
   # Create a .env file based on .env.example if available
   # Initialize the database
   npx prisma generate
   npx prisma db push
   ```

3. **Setup the Frontend**:
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the Backend**:
   ```bash
   cd server
   npm run dev
   ```

2. **Start the Frontend**:
   ```bash
   cd client
   npm run dev
   ```

The application will typically be available at `http://localhost:5173` for the frontend and `http://localhost:5000` (or as configured) for the backend.

## 📁 Project Structure

```text
LocalBiz/
├── client/          # Vite + React frontend
│   ├── src/        # Application logic and components
│   └── public/     # Static assets
└── server/          # Express backend
    ├── src/        # API routes, controllers, and middleware
    └── prisma/      # Database schema and migrations
```

## 📄 License

This project is licensed under the ISC License.
