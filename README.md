# ResQAI

## 1. Overview

ResQAI is an AI-powered disaster management and emergency response platform designed to help communities report disasters, monitor live incidents, receive emergency alerts, and access disaster-related assistance through an intelligent chatbot. The platform enables faster communication between citizens and emergency responders during floods, fires, earthquakes, cyclones, medical emergencies, and other disaster situations.

## 2. Problem Statement

During disasters, people often face difficulties in:

- Reporting incidents quickly
- Finding emergency assistance
- Accessing real-time disaster information
- Communicating with rescue agencies
- Receiving immediate safety guidance
  
ResQAI addresses these challenges by providing a centralized disaster intelligence platform with AI assistance, emergency reporting, live monitoring, and alert systems.

## 3. Features

### Home Dashboard:

- Attractive landing page
- Disaster statistics overview
- Quick navigation to major modules

### Disaster Reporting:

Report disasters with:
- Name
- Location
- Coordinates
- Description
- Severity Level
- Store reports in MongoDB

### Live Disaster Map

- View all disaster reports
- Satellite map integration
- Severity-based visualization
- Emergency service recommendations

### Analytics Dashboard

- Disaster statistics
- Active emergency monitoring
- Visual data insights

### SOS Emergency Module

- Emergency assistance interface
- Instant alert functionality
- Emergency response support

### AI Disaster Assistant

Powered using OpenRouter AI API

Answers questions related to:
- Floods
- Fires
- Earthquakes
- Cyclones
- First Aid
- Disaster Preparedness
- Emergency Response

### Emergency Notifications

- Browser notifications
- Emergency siren sound alerts

### Multi-Language Support

It supports:
- English
- Hindi
- Telugu
- Tamil
- Malayalam
- Kannada
- Urdu
  
## 4. Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Recharts
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### AI Integration

- OpenRouter API
- OpenAI SDK

### Other Tools

- Browser Notifications API
- Google Maps Embed API

## 5. Navigate to Project Folder

- cd ResQAI

## 6. Install Dependencies

### Backend

- cd backend
- npm install

### Frontend

- cd frontend
- npm install

## 7. Run the Project

- Start Backend
- cd backend
- npx nodemon server.js

- Backend runs on:
http://localhost:5000

- Start Frontend
- cd frontend
- npm run dev

- Frontend runs on:
http://localhost:5173

## 8. Project Structure
```
ResQAI
│
├── backend
│   │
│   ├── models
│   │   └── Report.js
│   │
│   ├── routes
│   │   └── reportRoutes.js
│   │
│   ├── uploads
│   │
│   ├── server.js
│   └── package.json
│
├── frontend
│   │
│   ├── public
│   │   └── sounds
│   │       └── siren.mp3
│   │
│   ├── src
│   │   │
│   │   ├── components
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── pages
│   │   │   ├── Home.jsx
│   │   │   ├── Report.jsx
│   │   │   ├── Map.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── SOS.jsx
│   │   │   └── Chatbot.jsx
│   │   │
│   │   ├── assets
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── LanguageContext.jsx
│   │   ├── translations.js
│   │   ├── sosTranslations.js
│   │   └── index.css
│   │
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 9. Screenshots

### Home Page
- This is the home page of ResQAI. Users can select their preferred language for a more comfortable and accessible experience
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2de11eab-e4b7-437e-9220-d14403b72c17" />

### Report Disaster
- When users click on the Report option in the navigation bar, they are directed to the disaster reporting form. After filling out and submitting the form, the reported incident is displayed on the map along with all the provided details and location information.
### Note:
- When the Live button is clicked, the incident details are displayed. After clicking OK, a siren sound is triggered for approximately 7–8 seconds to simulate an emergency alert
<img width="1920" height="1080" alt="Screenshot (2117)" src="https://github.com/user-attachments/assets/de3a56bd-287b-4f11-81fb-fc90b790d0c5" />

### Incident Details
- This page displays all the information submitted through the disaster reporting form, allowing users and responders to view complete incident details.
<img width="1920" height="1080" alt="Screenshot (2118)" src="https://github.com/user-attachments/assets/1a42a811-bcce-43f2-a0d8-401b8f7d4822" />

### Dashboard & Analytics
- The dashboard provides a visual overview of reported disasters through interactive charts and graphs. Users can analyze disaster statistics and trends using bar charts and other data visualizations.
<img width="1920" height="1080" alt="Screenshot (2120)" src="https://github.com/user-attachments/assets/5d2e38df-0f5a-4049-b967-3e39e2f2946c" />

### SOS Emergency Alert
- In emergency situations, users can instantly send an SOS alert by clicking the Send SOS Alert button. The system identifies and notifies the nearest emergency services based on the type of disaster. For example, in the event of a fire, the alert is directed to the nearest fire station.
<img width="1920" height="1080" alt="Screenshot (2121)" src="https://github.com/user-attachments/assets/ed857672-437e-4375-aba8-2fdf84b153cf" />

### AI Disaster Assistance Chatbot
- The AI-powered chatbot helps users by providing safety guidelines, emergency precautions, and disaster-related information. Users can ask questions about emergency preparedness, and the chatbot responds with relevant guidance and recommendations.
<img width="1920" height="1080" alt="Screenshot (2122)" src="https://github.com/user-attachments/assets/6f9baa54-6914-4c57-8dc8-61cc43dc2627" />

## 10. Demo 

- Deployment Link: https://res-qai-six.vercel.app
  
## 11. Future Enhancements

### AI Enhancements

- Disaster image classification
- Disaster prediction using Machine Learning
- Voice-enabled AI assistant

### Emergency Services

- Direct integration with emergency agencies
- Real-time responder tracking
- Ambulance and rescue dispatch system

### Mapping

- Interactive Leaflet maps
- Safe zone identification
- Live disaster heatmaps

### Mobile Features

- Android Application
- GPS-based alerts
- Offline emergency support

### Communication

- SMS alerts
- WhatsApp notifications
- Email alerts

## 12. Author

RAJESH CHOWDUVADA










