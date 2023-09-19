import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import postAPI from "../../sevices/postAPI";
import Loader from "../../sevices/loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LeftSideBar() {
  const [loading, setLoading] = useState(false);
  const {
    auth: { user },
  } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);

  const formik = useFormik({
    initialValues: {
      owner: user.fullname,
      status: "",
      coverImage: "",
      content: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        values.coverImage = selectedFile;

        const response = await postAPI.addNewPost(values);
        console.log(response);
        toast.success("Bài viết đã được đăng thành công");
        resetForm();
        setSelectedFile(null);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const { handleSubmit, handleChange } = formik;

  return (
    <div>
      <h3><i>Thêm Bài Viết Mới</i></h3>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="status">
          <Form.Label>Tiêu đề</Form.Label>
          <Form.Control value={formik.values.status} onChange={handleChange} type="text" />
        </Form.Group>
        <Form.Group controlId="coverImage">
          <Form.Label>Thêm Hình Ảnh</Form.Label>
          <Form.Control
            name="coverImage"
            onChange={handleFileChange}
            label="Chọn tệp hình ảnh"
            type="file"
            custom
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="content">
          <Form.Label>Nội dung</Form.Label>
          <Form.Control value={formik.values.content} onChange={handleChange} as="textarea" rows={3} />
        </Form.Group>
        <Button type="submit">{loading ? <Loader /> : "Đăng"}</Button>
      </Form>
    </div>
  );
}

export default LeftSideBar;
