# Gardening and Construction Services Web Application Documentation

## Overview

The **Gardening and Construction Services Website** is a responsive web application designed to showcase the services, projects, and expertise of a family-owned gardening and construction business. It provides an intuitive platform for potential clients to explore services, view featured projects, and connect with the business through inquiries. The application also includes an admin dashboard for efficient management of the business's offerings.

## Key Features

### **Home Page**

A visually appealing landing page introducing the business with featured services and project showcases.

### **Service Details**

A section dedicated to exploring indoor and outdoor services, complete with descriptions and images.

### **Project Portfolio**

A featured projects section highlighting completed works with high-quality images.

### **Admin Dashboard**

A secure backend for administrators to manage services, projects, inquiries, and media.

---

## Features

### 1. **Home Page**

- A dynamic and modern homepage welcoming users to "Nordic Gazon."
- Prominent call-to-action buttons such as "Browse Services" for easy navigation.
- A dedicated "Our Services" section to explore indoor and outdoor services.
- Featured projects section showcasing high-quality completed works.

### 2. **Service Management**

Admins can:

- Add, update, view, and delete available services.
- Categorize services for better client exploration.
- Highlight key services on the homepage.

### 3. **Project Portfolio**

- A gallery of featured projects is displayed for clients to review the company’s expertise.
  Admins can:
- Add new projects with descriptions and images.
- Update existing project details and images.
- Control which projects appear as "featured."

### 4. **Client Inquiries**

Clients can:

- Submit inquiries via a user-friendly contact form.
  Admins can:
- View and manage client inquiries.
- Respond to inquiries directly via the admin dashboard.
- Store inquiries for future reference and tracking.

### 5. **Media Management**

Admins can:

- Upload and manage images related to services and projects.
- Organize the media library to ensure content relevancy and consistency.

### 6. **Admin Dashboard**

- A protected area for administrators to manage:
  - Services
  - Projects
  - Client inquiries
  - Media assets
- User management functionalities, including adding new admin users and assigning access levels.

---

## Technology Stack

To ensure consistency and compatibility, the following specific versions of technologies are used:

- **Frontend**:
  - **React.js**: v19.0.0
  - **Node.js**: v20.10.0
  - **npm**: v10.2.3
- **Backend**:
  - **Flask**: v3.0.3
  - **Python**: v3.10.11
- **Database**:
  - **MongoDB Atlas**: Cluster running MongoDB v8.0.3
- **Deployment**:
  - **Docker**: v27.3.1
  - **Docker Compose**: v2.30.3

_Note_: Ensure that your local development environment matches these versions to prevent compatibility issues.

---

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- **Python 3.8+**
- **Node.js 14+** and **npm**
- **MongoDB** (local instance or access to a remote instance)

### Backend Setup (Flask)

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>/backend
   ```
2. **Set Up a Virtual Environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate #on windows use : venv\Scripts\Activate
   ```
3. **Install BACKEND Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
4. **Configure Env Variables**:

- Create a `.env` file in the root directory of the project.
- Add your MongoDB Atlas connection string to the `.env` file.
- Add your Flask app configuration to the `.env` file.

5. **Run the Backend**:
   ```bash
   flask run
   ```

### FrontEnd Setup (Flask )

1. **Navigate to the frontend Directory**:
   ```bash
   cd <repository-directory>/frontend
   ```
2. **Install Frontend dependencies** :
   ```bash
   npm install
   ```
3. **Configure Environment Variables** :

- Create a `.env` file in the root directory of the project.
- Add the React API Url variable
  ```bash
  REACT_APP_API_URL=http://127.0.0.1:5000
  ```

4. **Start the Frontend** :

   ```bash
   npm start

   ```

### Database setup:

1. MongoDB Connection:

- If using a local MongoDB instance, ensure it is running on the default port 27017.
- If using MongoDB Atlas, ensure the URI includes your database credentials and database name.
  -example of a MongoDb URI:

  ```bash
  " mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database-name>?retryWrites=true&w=majority "

  ```

2. Database initialization:

- Upon starting the backend, the necessary collections (services, projects, inquiries) will be created automatically if they do not already exist.

<!-- # Gardening and Construction Services Web Application Documentation

## Overview

The **Gardening and Construction Services Website** is designed to help a family-owned gardening and construction business showcase their projects and manage inquiries from potential clients. The application includes an admin dashboard for managing services, projects, client inquiries, and media related to the company’s offerings.

This application allows clients to explore the company's services and contact them for more information or requests, while administrators can manage service details, project portfolios, client communications, and media assets in a secure environment.

## Features

### 1. **Service Management**

Admins can:

- Add, update, view, and delete available services offered by the company.
- Tag services with relevant categories (e.g., deck building, garden design) to make it easier for clients to explore.

### 2. **Project Portfolio**

Admins can:

- Add and update project descriptions.
- Upload project images to showcase completed work.
- Display projects on the website's front end for potential clients to review.

### 3. **Client Inquiries**

- Clients can inquire about the company’s services by filling out a contact form.
- Admins receive these inquiries and can respond to clients directly through the admin dashboard.
- Inquiry details, including the service of interest and client contact information, are stored for future reference.

### 4. **Media Management**

Admins can:

- Upload images related to services and completed projects.
- Manage the media library to ensure only up-to-date and relevant images are displayed on the website.

### 5. **Admin Dashboard**

- A protected area where administrators can log in to manage all aspects of the application.
- Admins can add and manage users, including granting specific access levels to new admin users.
- Admin functions include service and project management, responding to client inquiries, and media management.

## Technology Stack

- **Backend**: Flask server
- **Database**: MongoDB Atlas
- **Frontend**: React Js
- **Deployment**: (To be decided, potentially using Heroku for the backend and Vercel or Netlify for the frontend)

## Potential Features to Discuss (Future Enhancements)

- **User Reviews & Testimonials**: Allow clients to leave reviews or testimonials for projects.
<!-- - **Booking System**: Enable clients to schedule consultations directly through the website. -->

<!-- - **Project Progress Tracking**: Provide clients with a secure way to track the progress of ongoing projects.
- **Enhanced Search Filters**: Allow clients to filter services or projects by categories, locations, or project types.
- **Service Pricing Estimator**: Give clients a preliminary quote by selecting services and entering project details.  -->

<!-- ## ######################################################################################### -->

<!-- # Gardening and Construction Services Website

A professional web application for a gardening and construction business that offers various services such as deck building and garden design. This application includes an admin dashboard for managing services, projects, client inquiries, and media.

## Project Overview

This project is designed to help a family-owned gardening and construction business manage their services and portfolio while allowing potential clients to inquire about services. The application includes an admin interface where services and projects can be managed.

### Features

- **Service Management**: Admins can add, update, view, and delete services.
- **Project Portfolio**: Admins can manage projects and showcase them on the frontend.
- **Client Inquiries**: Clients can contact the business through a form, and inquiries are stored for the admin to respond.
- **Media Management**: Admins can upload and manage images related to services and projects.
- **Admin Dashboard**: A protected dashboard for admin users to manage the entire application.

### Technology Stack

- **Backend**: Flask (Python)
- **Database**: MongoDB Atlas
- **Frontend**: (To be decided)
- **Deployment**: (To be decided, but likely Heroku for the backend and Vercel or Netlify for the frontend) -->
