# Aadhaar OCR System

This application allows users to upload Aadhaar card images (front and back), parse the text using OCR, and display the extracted information. The frontend is built with **React**, **TypeScript**, and **Tailwind CSS**, while the backend uses **Node.js**, **Express.js**, and **MongoDB** for storing and processing data.

## Features
- Upload Aadhaar card images (front and back).
- Perform OCR to extract text from the images.
- Display parsed data, such as the address after "SIO".
- Responsive UI with a side-by-side layout: upload section on the left, parsed data on the right.
- Backend API to handle image uploads and OCR processing.
- Data persistence using MongoDB.

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Other Libraries**:
  - `react-toastify` for notifications
  - `react-icons` for icons (e.g., upload icon)

## Prerequisites
Before setting up the project, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** (v8 or higher) or **yarn**
- **MongoDB** (local installation or a cloud instance like MongoDB Atlas)
- **Git** (to clone the repository)

## Project Structure
```
aadhaar-ocr-system/
├── client/                     # Frontend (React, TypeScript, Tailwind CSS)
│   ├── src/
│   │   ├── components/         # React components (e.g., UploadSection, ParsedDataView)
│   │   │   ├── AadhaarUpload/
│   │   │   │   ├── AadhaarUpload.tsx
│   │   │   │   ├── ParsedDataView.tsx
│   │   │   │   └── AadhaarUpload.module.css
│   │   │   └── UploadSection.tsx
│   │   ├── services/           # API service functions (e.g., orcService.ts)
│   │   ├── types/              # TypeScript type definitions (e.g., Aadhaar.ts)
│   │   ├── utils/              # Utility functions (e.g., fileValidator.ts, constants.ts)
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── tailwind.css        # Tailwind CSS configuration
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   └── tailwind.config.js
├── server/                     # Backend (Node.js, Express.js, MongoDB)
│   ├── src/
│   │   ├── controllers/        # Request handlers (e.g., ocrController.ts)
│   │   ├── models/             # Mongoose models (e.g., Aadhaar.ts)
│   │   ├── routes/             # API routes (e.g., ocrRoutes.ts)
│   │   ├── middleware/         # Middleware (e.g., fileUpload.ts)
│   │   ├── utils/              # Utility functions (e.g., ocrProcessor.ts)
│   │   ├── app.ts              # Express app setup
│   │   └── server.ts           # Entry point for the server
│   ├── package.json
│   └── tsconfig.json
├── README.md                   # Project documentation
└── .gitignore
```

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/JoyelV/aadhaar-ocr-system-frontend.git
cd aadhaar-ocr-system
```

### 2. Backend Setup (`server/`)

#### Install Dependencies
```bash
cd server
npm install
```

#### Configure Environment Variables
Create a `.env` file in the `server/` directory and add the following:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aadhaar-ocr-system
# Add any OCR API keys or other secrets here if needed
```

- Replace `MONGODB_URI` with your MongoDB connection string (e.g., from MongoDB Atlas if using the cloud version).
- Ensure MongoDB is running locally (`mongod`) or accessible via the URI.

#### Run the Backend
```bash
npm run dev
```
The backend server will start on `http://localhost:5000`.

### 3. Frontend Setup (`client/`)

#### Install Dependencies
```bash
cd client
npm install
```

#### Configure Tailwind CSS
Ensure Tailwind CSS is set up correctly. The `tailwind.config.js` should look like this:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

The `client/src/tailwind.css` file should include:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### Run the Frontend
```bash
npm start
```
The React app will start on `http://localhost:3000`.

### 4. Test the Application
- Open `http://localhost:3000` in your browser.
- Upload Aadhaar card images (front and back) using the upload section on the left.
- Click "PARSE AADHAAR" to process the images.
- View the parsed data (e.g., address after "SIO") on the right side under "API RESPONSE".

## API Endpoints
The backend provides the following API endpoints:

- **POST `/api/ocr/upload`**
  - Upload Aadhaar card images and process them via OCR.
  - Request: `multipart/form-data` with `front` and `back` fields for the images.
  - Response: JSON object with parsed data (e.g., `{ address: "..." }`).

Example request using `curl`:
```bash
curl -X POST http://localhost:5000/api/ocr/upload \
  -F "front=@/path/to/front-image.jpg" \
  -F "back=@/path/to/back-image.jpg"
```

## Deployment

### Deploy to Vercel (Frontend)
1. Push your code to a GitHub repository.
2. Log in to Vercel, import your repository, and configure the project settings:
   - Set the root directory to `client/`.
   - Framework preset: React.
   - Build command: `npm run build`.
   - Output directory: `build`.
3. Deploy the app. Vercel will automatically deploy on every push to the `main` branch.

### Deploy Backend (on Render)
1. Push the `server/` directory to a separate Git repository.
2. On Render/Heroku:
   - Set up a new app and link your repository.
   - Add environment variables (e.g., `MONGODB_URI`, `PORT`).
   - Deploy the app.
3. Update the frontend (`client/src/services/orcService.ts`) to point to your backend URL (e.g., `https://aadhaar-ocr-backend-g1c6.onrender.com`).

## Development Notes
- **OCR Processing**: The backend currently assumes an OCR service (e.g., a custom implementation or third-party API like Tesseract.js). You’ll need to implement or integrate an OCR library in `server/src/utils/ocrProcessor.ts`.
- **MongoDB Schema**: The `Aadhaar` model in `server/src/models/Aadhaar.ts` should define the structure of the parsed data (e.g., `{ address: String }`).
- **Error Handling**: The frontend uses `react-toastify` for error notifications (e.g., "Upload both front and back images").
- **File Validation**: The `validateFile` utility in `client/src/utils/fileValidator.ts` ensures only valid image files are uploaded.

## Future Improvements
- Add user authentication to secure the application.
- Improve OCR accuracy with better preprocessing of images.
- Add support for more Aadhaar card fields (e.g., name, Aadhaar number).
- Implement caching for faster API responses.

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License
This project is licensed under the MIT License.