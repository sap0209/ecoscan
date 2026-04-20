# EcoScan

EcoScan is a web-based application that uses artificial intelligence to analyze images of everyday items and provide insights about their environmental impact, including recyclability.

## Live Demo
(Add your Vercel link here after deployment)

## Overview

EcoScan allows users to capture an image using their device camera and analyze it using AI. The system identifies the object and returns structured information about its material, recyclability, and environmental impact.

## Core Features

- **Live Camera Capture**  
  Access the device camera and capture images in real time.

- **AI-Powered Analysis**  
  Uses the Google Gemini Vision API to identify objects and generate environmental insights.

- **Structured Output**  
  Returns clear, professional results including:
  - Object name  
  - Material  
  - Recyclability  
  - Recycling locations  
  - Environmental impact  
  - Disposal recommendations  

- **Responsive UI**  
  Clean interface with loading states, error handling, and smooth interactions.

## Tech Stack

- Frontend: React  
- Framework: Next.js (App Router)  
- Language: TypeScript  
- Styling: Tailwind CSS  
- Backend: Next.js API Routes  
- AI Integration: Google Gemini API  
- Runtime: Node.js  

## How It Works

1. User opens the scanner page  
2. Camera access is requested  
3. User captures an image  
4. Image is converted to base64  
5. Image is sent to backend API  
6. Backend sends request to Gemini API  
7. AI analyzes and returns results  
8. Results are displayed on screen  

## Environment Setup

Create a `.env.local` file:

```bash
GOOGLE_API_KEY=your_api_key_here