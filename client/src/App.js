import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./style/style.css"
import Header from "./components/layouts/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile/UploadAvatar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Loader from "./sevices/loader";
import AuthState from "./contexts/AuthContext/AuthState";
import ProfilePage from "./pages/Profile/ProfilePage";
import EditProfilePage from "./pages/Profile/EditProfile";
import DetailPost from "./pages/Home/DetailPost";

function App() {
  return (
    <BrowserRouter>
    <AuthState>
      <div className="container">
        <Header />
        <div className="main-content">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/loading" element={<Loader/>} />
          <Route path="/profile/edit-profile" element={<EditProfilePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          
          <Route path="detail-post/:postId" element={<DetailPost />} />
        </Routes>
        </div>
      </div>
      </AuthState>
    </BrowserRouter>
  );
}

export default App;
