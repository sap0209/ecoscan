# EcoScan
EcoScan – AI-Powered Environmental Scanner

Overview
EcoScan is a web app that uses AI to analyze images of everyday items and explain their environmental impact, including whether they can be recycled.

Core Features

Live Camera Capture
Users can open their device camera, see a live preview, and take a photo of an item.

AI Analysis
The image is sent to an AI model (Google Gemini), which identifies the item and gives simple recycling and environmental information.

User Interface
The app has a clean and responsive design with loading messages, results display, and error handling.

State Management
The app keeps track of the camera status, captured image, results, and loading state to ensure smooth performance.

Technology Stack
Frontend: React
Framework: Next.js
Language: TypeScript
Styling: Tailwind CSS
AI: Google Gemini Vision API
Runtime: Node.js

How It Works
The user opens the scanner and allows camera access. They take a photo, which is converted into an image format and sent to the backend. The backend sends it to the AI model, which analyzes it and returns results. The app then displays the information to the user.

Environment Setup
The app requires a Google API key stored in a local environment file. The key is kept secure and only used on the backend.

Use Cases
EcoScan helps users learn how to recycle items properly and make more environmentally friendly choices.

Future Improvements
Possible updates include better recycling details, scan history, multiple object detection, and improved mobile performance.

Summary
EcoScan is a simple tool that combines camera input and AI to help users understand the environmental impact of everyday items.
