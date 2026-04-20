# EcoScan
EcoScan is a web-based application that uses artificial intelligence to analyze images of everyday items and provide information about their environmental impact, including recyclability. The application integrates real-time camera functionality with AI image recognition to help users make more sustainable choices.

Overview:

EcoScan allows users to capture an image using their device camera and send it to an AI model for analysis. The system processes the image and returns a short description of the item along with guidance on whether it can be recycled and its environmental impact.

Core Features:

Live Camera Capture
The application accesses the user’s device camera and displays a live video stream. Users can capture an image with a single click. The captured frame is processed using a canvas element and converted into a base64 image format for analysis.

AI-Powered Analysis:
Captured images are sent to a backend API route, which communicates with the Google Gemini Vision model. The AI identifies the object and provides concise environmental insights, including recyclability information.

Interactive User Interface:
The interface is built with a modern, responsive design. It includes clear visual feedback such as loading indicators, status messages, and error handling to improve usability.

State Management:
The application manages multiple states including camera availability, captured image data, analysis results, loading status, and errors. This ensures a smooth and responsive user experience.

Technology Stack:

Frontend: React
Framework: Next.js (App Router)
Language: TypeScript
Styling: Tailwind CSS
Backend Integration: Google Gemini Vision API
Runtime Environment: Node.js

Project Structure:

The project is organized using the Next.js App Router structure. The main scanner interface is located in the scanner directory, while the backend API route responsible for AI communication is located in the api/analyze directory. Global styles and layout files are defined at the root of the app directory.

How It Works:

When the user opens the scanner page, the application requests access to the device camera and displays a live video stream. The user captures an image, which is converted into a base64-encoded PNG using a canvas. When the user clicks analyze, the image data is sent to the backend API route. The backend sends the image to the Google Gemini API along with a prompt. The AI processes the image and returns a response containing item identification and environmental insights. The frontend then displays the results to the user. The user can reset the interface to perform another scan.

Environment Setup:

The application requires a Google API key to access the Gemini Vision API. This key is stored securely in a local environment file and is never exposed to the frontend. All API requests are handled through the backend using secure headers.

Development:

To run the application locally, install dependencies and start the development server. The project also supports building for production, running a production server, and linting for code quality.

Key Concepts:

This project demonstrates real-time camera integration, image processing using canvas, base64 encoding for API communication, backend API routing in Next.js, secure handling of environment variables, and integration with an external AI service.

Use Cases:

EcoScan can be used as an educational tool to promote sustainability, help users identify recyclable materials, and encourage environmentally responsible decisions in everyday life.

Future Improvements:

Potential improvements include adding location-based recycling guidelines, tracking scan history, supporting multiple object detection, providing more detailed environmental metrics, and enhancing mobile performance.

Summary:

EcoScan combines real-time image capture with AI analysis to create a simple and effective tool for understanding the environmental impact of everyday objects.nes camera input and AI to help users understand the environmental impact of everyday items.
