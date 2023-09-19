import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AuthContext from "../contexts/AuthContext/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import authAPI from "../sevices/authAPI";

function Register() {
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      rePassword: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError(null);
        await authAPI.register(values);
        console.log(`value: ${values}`);
        navigate("/login");
      } catch (error) {
        setError(error.respone.data.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const { handleSubmit, handleChange } = formik;

  if (auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="fullname">
          <Form.Label>Fullname</Form.Label>
          <Form.Control onChange={handleChange} placeholder="Full name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="rePassword">
          <Form.Label>Re-Enter the password</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Register;
