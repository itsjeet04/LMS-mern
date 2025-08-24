📚 MERN Stack Learning Management System (LMS)
A feature-rich, full-stack Learning Management System built with the MERN stack (MongoDB, Express.js, React, Node.js). This platform allows instructors to create and manage courses, and students to enroll and track their progress. It includes secure authentication, payment integration, and a modern, responsive user interface.

✨ Features
User Authentication: Secure user registration and login system with JWT (JSON Web Tokens).

Role-Based Access Control: Distinct dashboards and permissions for Students and Admins.

Course Management: Admins can create, read, update, and delete courses and course content.

Lecture Management: Upload and manage video lectures for each course.

Cloudinary Integration: Seamless media management for course thumbnails and video lectures.

Subscription & Payments: Secure payment processing with Razorpay for course subscriptions.

Responsive UI: Modern, clean, and fully responsive user interface built with React and styled with Tailwind CSS.

Admin Dashboard: An intuitive dashboard for admins to view site statistics and manage all aspects of the platform.

User Profile Management: Users can view and update their profile information.

🛠️ Tech Stack
Technology

Description

MongoDB

NoSQL database for storing user data, courses, and application state.

Express.js

Backend web application framework for Node.js, used to build the RESTful APIs.

React

Frontend JavaScript library for building the user interface.

Node.js

JavaScript runtime for the server-side environment.

Tailwind CSS

A utility-first CSS framework for rapid UI development.

Cloudinary

Cloud-based service for image and video management.

Razorpay

Payment gateway for handling online subscriptions.

JWT

For secure user authentication and authorization.

Mongoose

Object Data Modeling (ODM) library for MongoDB and Node.js.

🚀 Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Make sure you have the following software installed on your system:

Node.js (v14.x or higher)

npm or yarn

MongoDB (make sure it's running on your local machine or have a cloud instance URI)

Installation
Clone the repository:

git clone https://github.com/itsjeet04/LMS-mern.git
cd LMS-mern

Install Backend Dependencies:

cd server
npm install

Install Frontend Dependencies:

cd ../client
npm install

Environment Variables
You'll need to create a .env file in the server directory. Use the .env.example file as a template.

# Port for the server to run on
PORT=5000

# Your MongoDB connection string
MONGO_URI=your_mongodb_connection_string

# URL of the frontend application
FRONTEND_URL=http://localhost:5173

# JWT secret and expiration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Cloudinary Credentials
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

# Razorpay Credentials
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret

# Email credentials for sending emails (e.g., password reset)
GMAIL_ID=your_gmail_address
APP_PASSWORD=your_gmail_app_password

🏃‍♂️ Usage
Start the Backend Server:
From the server directory, run:

npm run dev

The server will start on the port you specified in your .env file (e.g., http://localhost:5000).

Start the Frontend Development Server:
From the client directory, run:

npm run dev

The React application will open in your browser at http://localhost:5173.

🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

📧 Contact
Jeet - itsjeet04@email.com

Project Link: https://github.com/itsjeet04/LMS-mern
