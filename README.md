## SCOPE v1.0
A exclusive newsarticle service membership application with 3 Subscription levels for articles on different levels. 

Backend uses a Node.js express application with typescript that seamlessly integrates with Stripe and Stripe Subscriptions. The platform provides an intuitive interface for users to explore articles on his user level, account page with option to Cancel subscription. Using Stripe webhooks to communicate with Stripe and do tasks in our own MySQL database.

Frontend is using React with typescript, connected to our api backend. Key features include registration, user authentication, allowing only logged-in users a place to view full articles on his plan, and a checkout process via Stripe Checkout when selecting a new plan. Upon successful payment the user gets access to his new plan instantly. When canceling the user has his plan until the end date.

The application includes an admin section where admin can add new articles and select which plan the article should be shown on.

This project was developed as part of a student group project at Medieinstitutet in 2024.

## Getting Started
To run this project, you first need to ensure that you have Node.js installed on your computer. Visit https://nodejs.org/ and follow the installation instructions if you don't already have Node.js installed.

### Step 1: Clone the project
Clone this project to your local computer.

### Step 2: Install dependencies:
Backend: 

    "@types/bcrypt": "^5.0.2",
    "@types/express-session": "^1.18.0",
    "@types/passport-local": "^1.0.38",
    "bcrypt": "^5.1.1",
    "cookie-parser": "^1.4.6",
    "dotenv": "^16.4.5",
    "ejs": "^3.1.10",
    "ejs-layout": "^1.0.15",
    "ejs-mate": "^4.0.0",
    "express": "^4.19.2",
    "express-ejs-layouts": "^2.5.1",
    "express-session": "^1.18.0",
    "js-cookie": "^3.0.5",
    "mysql2": "^3.10.0",
    "nodemon": "^3.1.2",
    "passport": "^0.7.0",
    "passport-local": "^1.0.0",
    "passport-session": "^1.0.2",
    "stripe": "^15.10.0"


And frontend:

    "axios": "^1.7.2",
    "js-cookie": "^3.0.5",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.23.1",
    "react-toastify": "^10.0.5"

### Step 3: The Database
Create a MySql db and upload the sql file.

### Step 4: The ENV file
Put the .env content in a new .env file in your folder root/backend folder.

It should contain: 
DB_HOST, DB_NAME, DB_USER, DB_PASS, STRIPE_PRIVATE_KEY and ENDPOINT_SECRET

Add mysql connection and stripe here.

### Step 5: Start
Start the application by running on backend: npm start
and on client run: npm run dev
