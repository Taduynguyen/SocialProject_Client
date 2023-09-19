import React, { useContext, useState } from "react";
import userAPI from "../../sevices/userAPI";
import AuthContext from "../../contexts/AuthContext/AuthContext";

function UploadAvatar() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    auth: { user },
    fetchCurrentUser,
  } = useContext(AuthContext);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("avatar", selectedFile);
      console.log(formData);

      // Make the API request to upload file
      await userAPI.uploadAvatar(formData);
      await fetchCurrentUser();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1>Upload Avatar</h1>
      {loading && <p>Upload avatar in progress...</p>}
      <input type="file" onChange={handleFileChange} accept="image/*"/>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadAvatar;
