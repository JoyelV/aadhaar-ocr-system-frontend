# Aadhaar OCR System - Frontend

This is the frontend of the Aadhaar OCR System, built with React, TypeScript, and Tailwind CSS. It provides a responsive UI for users to upload Aadhaar card images (front and back), view parsed data, and access scan history. The frontend communicates with the backend API for OCR processing and data storage.

## Features
- Upload Aadhaar card images (front and back) via a user-friendly interface.
- Display parsed Aadhaar data (e.g., name, Aadhaar number, DOB, gender, address, pin code).
- View scan history for authenticated users.
- Responsive layout with side-by-side sections for upload and results.
- Error notifications using `react-toastify`.
- Authentication support for secure access.

## Tech Stack
- **Framework**: React
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Libraries**:
  - `react-toastify` for notifications
  - `react-icons` for icons (e.g., upload icon)
  - `axios` for API requests

## Prerequisites
- **Node.js** (v16 or higher)
- **npm** (v8 or higher) or **yarn**
- **Git** (to clone the repository)
- Backend API running (see [Backend README](../server/README.md))

## Project Structure
```
```
frontend/
├── public/                    # Static assets
├── src/
│   ├── components/            # Reusable React components (e.g., UploadForm, ResultDisplay)
│   ├── context/               # React context for global state (e.g., auth, scan data)
│   ├── services/              # API service functions (e.g., uploadAadhaar, getHistory)
│   ├── types/                 # TypeScript interfaces (e.g., AadhaarDetails)
│   ├── utils/                 # Utility functions
│   ├── App.tsx                # Main app component
│   ├── index.tsx              # Entry point
│   ├── App.module.css         # Component-specific styles
│   ├── index.css              # Global styles (Tailwind CSS)
│   └── global.d.ts            # Global TypeScript declarations
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── .env                       # Environment variables
└── package.json               # Dependencies and scripts
```
```
## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/JoyelV/aadhaar-ocr-system-frontend.git
cd aadhaar-ocr-system/frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the `frontend/` directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```
> Replace `REACT_APP_API_URL` with the deployed backend URL if applicable.

### 4. Tailwind CSS Configuration
Ensure `tailwind.config.js` is set up:
```javascript
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

And include Tailwind in `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5. Run the Frontend
```bash
npm start
```
The frontend will run at [http://localhost:3000](http://localhost:3000).

## Usage
1. **Login**: Authenticate using the login form (via `/api/auth/login`).
2. **Upload Aadhaar Cards**: Use the upload form to submit front and back images.
3. **View Results**: Parsed data (e.g., address, Aadhaar number) is displayed on the right.
4. **View History**: Access past scans via the history page (fetches from `/api/history/scans`).

## API Integration
The frontend interacts with the backend API:
- **POST /api/aadhaar/upload**: Uploads Aadhaar images for OCR processing.
- **GET /api/history/scans**: Retrieves scan history for the authenticated user.
- **POST /api/auth/login**: Authenticates users.

Ensure the backend is running and `REACT_APP_API_URL` points to the correct API endpoint.

## Deployment
### Vercel
1. Push the `frontend/` directory to a GitHub repository.
2. Import the repository in [Vercel](https://vercel.com).
3. Set the root directory to `frontend/`.
4. Configure environment variables (e.g., `REACT_APP_API_URL`).
5. Build command: `npm run build`
6. Output directory: `build`
7. Deploy the application.

## Development Notes
- **State Management**: Uses React Context for global state (e.g., user authentication, scan data).
- **Error Handling**: Displays user-friendly errors via `react-toastify`.
- **Type Safety**: TypeScript ensures type-safe API calls and component props.

## Future Improvements
- Add support for multiple languages in the UI.
- Enhance UI/UX with animations or loading states.
- Implement offline capabilities for temporary data storage.
- Add form validation for file uploads (e.g., size, type).

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feat/feature-name`).
3. Commit changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feat/feature-name`).
5. Create a Pull Request.

## License
Licensed under the [MIT License](LICENSE).
```

---