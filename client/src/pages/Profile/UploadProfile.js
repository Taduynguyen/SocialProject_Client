import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import userAPI from "../../sevices/userAPI";
import Loader from "../../sevices/loader";

const UploadProfile = () => {
  const [loading, setLoading] = useState(false);

  const { auth } = useContext(AuthContext);
  const user = auth.user;

  const formik = useFormik({
    initialValues: {
      fullname: "",
      address: "",
      phoneNumber: "",
      about: "",
    },
    onSubmit: async (values) => {
      try {
        console.log(formik.values);
        setLoading(true);
        const response = await userAPI.uploadProfile(values);
        console.log(response);
      } catch (error) {
        console.log(`Upload profile error: ${error}`);
      } finally {
        setLoading(false);
      }
    },
  });

  const { handleSubmit, handleChange, setValues } = formik;

  useEffect(() => {
    setValues({
      fullname: user.fullname || "",
      address: user.address || "",
      phoneNumber: user.phoneNumber || "",
      about: user.about || "",
    });
  }, [user, setValues]);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="fullname" className="mb-3">
        <Form.Label>FullName</Form.Label>
        <Form.Control
          value={formik.values.fullname}
          onChange={handleChange}
          type="text"
        />
      </Form.Group>
      <Form.Group controlId="address" className="mb-3">
        <Form.Label>address</Form.Label>
        <Form.Control
          value={formik.values.address}
          onChange={handleChange}
          type="text"
        />
      </Form.Group>
      <Form.Group controlId="phoneNumber" className="mb-3">
        <Form.Label>PhoneNumber</Form.Label>
        <Form.Control
          value={formik.values.phoneNumber}
          onChange={handleChange}
          type="text"
        />
      </Form.Group>
      <Form.Group controlId="about" className="mb-3">
        <Form.Label>About</Form.Label>
        <Form.Control
          value={formik.values.about}
          onChange={handleChange}
          type="text"
        />
      </Form.Group>
      <Button type="submit">{loading ? <Loader /> : "Submit"}</Button>
    </Form>
  );
};

export default UploadProfile;
