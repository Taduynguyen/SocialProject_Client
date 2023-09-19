import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import authAPI from "../sevices/authAPI";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext/AuthContext";
import Loader from "../sevices/loader";

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const nagigate = useNavigate();
  const { auth, handleLogin } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError(null);
        const response = await authAPI.login(values);
        console.log(response);
        const { accessToken } = response.data;
        // Save accessToken to local storage
        localStorage.setItem("accessToken", accessToken);

        // Call logic after login successfully
        await handleLogin();
        // Redirect to homepage
        nagigate("/");
      } catch (error) {
        console.log(`error: ${error}`);
        setError(error.response.data.message);
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

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        {error && (
          <p
            style={{
              color: "red",
              margin: "10px 0",
            }}
          >
            {error}
          </p>
        )}
        <Button variant="primary" type="submit">
          {loading ? <Loader /> : "Submit"}
        </Button>
      </Form>
    </div>
  );
}

export default Login;
