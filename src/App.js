import {ToastContainer} from 'react-toastify';
import AadhaarUpload from './components/AadhaarUpload';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
        <AadhaarUpload/>
        <ToastContainer/>
    </div>
  );
}

export default App;
