# Sublog - Subscription Tracking App 📅💸

**Sublog** is a user-friendly subscription tracking app that helps you stay on top of your subscriptions by sending timely reminders. With **Sublog**, you can easily manage all your subscriptions and receive email notifications a day before they renew. Never miss a payment again! 🛎️

This app is built using **React** (with **TypeScript**), **Framer Motion**, **Zustand**, and **Tailwind CSS** on the front-end. The back-end is powered by **Express.js** and MongoDB, with authentication and email notifications handled through JWT and Qstash.

---

## Features ✨

- **Track all your subscriptions** in one place.
- **Reminders via email** one day before your subscription renews.
- **Mobile-responsive** design for seamless use across devices.
- **Light and dark modes** for your preferred UI experience.
- **Analytics dashboard** to get an overview of your subscription spending and renewal dates.
- **Predefined subscription categories** (e.g., sports, entertainment, news).
- **Currency options** for multiple currencies (USD, EUR, BIRR, etc.).
- **Flexible renewal frequency** options (daily, weekly, monthly, yearly).
- **Automatic expiration update** for subscriptions that have passed their renewal date.
  
---

## Tech Stack 🛠️

### Frontend:
- **React** with **TypeScript**
- **Tanstack Query** for fetching
- **Framer Motion** for smooth animations
- **Zustand** for state management
- **Tailwind CSS** for styling
- **Vite** for fast development and bundling

### Backend:
- **Express.js** for the RESTful API
- **MongoDB** with **Mongoose** for database storage
- **JWT (JSON Web Tokens)** for user authentication
- **Qstash/Nodemailer** for email notifications


---

## How It Works 🔄

### Mongoose Subscription Schema

The app uses a **Subscription model** defined in Mongoose, which contains the following fields:

- **name**: Subscription name (2-100 characters)
- **price**: Subscription price (greater than 0)
- **currency**: Currency of the subscription (defaults to 'USD')
- **frequency**: Frequency of renewal ('daily', 'weekly', 'monthly', 'yearly')
- **category**: Subscription category (e.g., sports, news, entertainment)
- **paymentMethod**: Payment method used
- **status**: Subscription status ('active', 'cancelled', 'expired', default is 'active')
- **startDate**: Subscription start date (must be a valid past or current date)
- **renewalDate**: Subscription renewal date (optional, auto-calculated)
- **user**: Reference to the user who owns the subscription

### Subscription Expiry and Reminders

Before saving a subscription, the following happens automatically:

- **Pre-save hook**:
  - If no **renewalDate** is provided, it's automatically calculated based on the frequency.
  - If the **renewalDate** has passed, the subscription status is updated to 'expired'.
  
- **Email Reminder**: A day before the renewal date, users receive an email reminder that their subscription is about to renew.

---

## Project Setup ⚙️

### Environment Variables 🔑

Make sure to set up the following environment variables for the app to work properly:

- `EMAIL_PASSWORD`: Your email password for sending reminders.
- `ACCOUNT_EMAIL`: The sender email address.
- `MONGO_URI`: The URI for connecting to your MongoDB database.
- `JWT_SECRET`: Secret key for JWT authentication.
- `QSTASH_CURRENT_SIGNING_KEY` & `QSTASH_NEXT_SIGNING_KEY`: For Qstash email service.
- `QSTASH_URL`: URL for Qstash service.
- `QSTASH_TOKEN`: Token for Qstash.
- `SERVER_URL`: The URL of your backend server.
- **Frontend**:
  - `VITE_API_URL`: The API URL for the frontend to communicate with the backend.

### Installation Steps 🚀

1. Clone the repository:
   ```bash
   git clone https://github.com/NahomT23/subscription-tracker.git
   ```

2. Install dependencies for both the frontend and backend:
   - Frontend:
     ```bash
     cd frontend
     npm install
     ```
   - Backend:
     ```bash
     cd backend
     npm install
     ```

3. Set up your environment variables in a `.env` file:
   ```bash
   touch .env
   ```

4. Run the app:
   - Start the backend server:
     ```bash
     npm start
     ```
   - Start the frontend:
     ```bash
     npm run dev
     ```

5. Open your browser and navigate to `http://localhost:3000` to view the app.

