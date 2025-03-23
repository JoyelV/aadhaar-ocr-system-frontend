import { ToastContainer } from "react-toastify";
import AadhaarUpload from "./components/AadhaarUpload";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

const App: React.FC = () => {
  return (
    <div className="App">
      <AadhaarUpload />
      <ToastContainer aria-label="Toast Notifications" />
    </div>
  );
};

export default App;
