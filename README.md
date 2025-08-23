# SwiftEats 🍔⚡

A modern **MERN fullstack food delivery app** with an **Admin Panel**, secure payments via **Stripe**, and API testing with **Postman**.

SwiftEats allows users to browse restaurants, add meals to cart, place orders, and pay online. Admins can manage menus, orders, and users.

---

## 📋 Features

* 👤 **User Authentication** – Secure sign up & login
* 🍴 **Browse & Order Food** – Add meals to cart, checkout easily
* 💳 **Stripe Payments** – Card payments with receipts
* 📦 **Order Management** – Track order statuses in real-time
* 🛠 **Admin Panel** – Manage restaurants, menus, users & orders
* 🌍 **REST API** – Tested and documented with Postman
* 📱 **Responsive UI** – Works across devices

---

## 🛠 Tech Stack

**Frontend:** ReactJS, React Router, Axios, TailwindCSS
**Backend:** Node.js, Express.js, MongoDB + Mongoose
**Payments:** Stripe Integration
**Testing:** Postman (API collections)

---

## 📂 Folder Structure

```
swifteats/
├─ client/      # React frontend
├─ server/      # Express backend
└─ README.md
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js (>= 16)
* MongoDB Atlas/local instance
* Stripe account

### Installation

```bash
git clone https://github.com/yourusername/swifteats.git
cd swifteats

# Backend
cd server && npm install

# Frontend
cd ../client && npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the **server** folder:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:5173
```

---

## ▶️ Running the App

**Backend**

```bash
cd server
npm run dev
```

**Frontend**

```bash
cd client
npm run dev
```

---

## 📡 API Endpoints

| Method | Endpoint      | Description     | Auth        |
| ------ | ------------- | --------------- | ----------- |
| GET    | /api/foods    | Get all foods   | No          |
| POST   | /api/foods    | Add new food    | Yes (Admin) |
| GET    | /api/orders   | Get user orders | Yes         |
| POST   | /api/orders   | Create order    | Yes         |
| POST   | /api/payments | Stripe checkout | Yes         |

---

## 💳 Stripe Integration

Orders are processed securely with Stripe:

1. Customers pay using credit/debit cards
2. Backend verifies payment with Stripe API
3. Order is marked as Paid and confirmation is sent

**Example request:**

```js
const res = await fetch("/api/payments", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ amount: 2999, currency: "usd" }),
});
```

---

## 🛠 Admin Panel

SwiftEats comes with a dedicated **admin dashboard** for managing the platform.

### Admin Features

✅ Manage menu items (add, update, delete)
✅ View all customer orders with statuses
✅ Update order statuses (Pending → Preparing → Out for Delivery → Completed)
✅ Manage users (block, remove, assign roles)
✅ Analytics dashboard (sales, orders, revenue)

### Access

* Admin panel runs inside the frontend at `/admin` route
* Login with admin credentials

**Example credentials (development)**

```text
Email: admin@test.com
Password: admin12345678
```

---

## 🔮 Future Enhancements

* 🛵 Delivery tracking in real time
* 🗺 Map integration for restaurants & deliveries
* 📊 Advanced analytics with charts

---

## 📄 License

**Restrictive License © 2025 M-Tech-cmd**

> This project is for personal and educational purposes only.
> You may not redistribute, sublicense, or use it for commercial purposes without explicit permission.
