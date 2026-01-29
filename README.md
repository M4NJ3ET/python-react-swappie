# Swappie – PG / Flat Swap Platform

Swappie is a full-stack web application designed to help users find suitable PG or flat swap matches.  
Users can register, log in, add their accommodation details, and view potential swap matches based on location and budget compatibility.

---

## Tech Stack

Frontend:
- React (JavaScript)
- Axios

Backend:
- FastAPI (Python)
- SQLAlchemy ORM
- MySQL
- python-dotenv

---

## Features

- User registration and login
- Forgot password and reset password
- Session-based authentication
- Add or update swap details
- Automatic swap matching logic
- View available swap matches
- Delete account with complete data removal
- Secure handling of environment variables

---

## 🗑️ Delete Account Feature

Swappie provides users with the ability to permanently delete their account and all associated data.

### How it works
- A **Delete Account** option is available on the user workspace/profile page.
- On clicking the button, a confirmation prompt is shown:

  > *“Are you sure you want to delete this account? You will lose all your data.”*

- The account is deleted **only after user confirmation**.

### Data Removal Scope
Once confirmed, the system permanently deletes:
- User record from the **main user table**
- User-related data from the **Swappie details table**
- User-related data from the **SwapMatch table**
- All swap matches associated with the user

### Key Highlights
- The deletion process is **irreversible**
- Prevents orphan records in the database
- Ensures data privacy and integrity
- Protects against accidental deletion via confirmation step

---
## Swap Matching Logic

Two users are considered a valid match when:
- The desired location of User A matches the current location of User B
- The desired location of User B matches the current location of User A
- The budget difference between both users is within an acceptable range

Duplicate matches and self-matching are prevented.

---
## Project Structure

python-react-swappie/

├── backend/

│   ├── main.py

│   ├── models.py

│   ├── database.py

│   ├── schemas.py

│   └── auth.py

├── frontend/

│   └── src/

├── .gitignore

└── README.md

---

## Environment Variables

Create a `.env` file inside the `backend` folder with the following content:

DB_USER=root  
DB_PASSWORD=your_mysql_password  
DB_NAME=my_project  

The `.env` file is excluded from version control for security reasons.

---

## How to Run the Project Locally

### Backend

Navigate to the backend folder and run:

pip install -r requirements.txt  
uvicorn main:app  

The backend will run on:
http://127.0.0.1:8000

API documentation is available at:
http://127.0.0.1:8000/docs

---

### Frontend

Navigate to the frontend folder and run:

npm install  
npm start  

The frontend will run on:
http://localhost:3000

---

## Demo Usage

- Register two users
- Log in using different browser sessions
- Add swap details for both users
- Open the “Match Available” section
- View matched users based on swap criteria

---

## Future Enhancements

- JWT-based authentication
- Accept or reject swap requests
- Notification system for new matches
- User profile enhancements
- Deployment using Docker or cloud services

---

## Author

Manjeet Bamel
