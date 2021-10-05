import { BrowserRouter as Router, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { GetUserContext } from "../StateMangement/StateProvider";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import logo from "../images/logo.png";
import "../App.css";
function Login() {
  //below we are using getusercontext to fetch the data from that usercontext store
  //here that is role and token data fetched
  //dispatch is used to alter this data by pushing the new state generated
  const [{ token, role }, dispatch] = GetUserContext();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // console.log(token, role);

  const handleSubmitLogin = async (e) => {
    try {
      e.preventDefault();

      if (email.length === 0 || password.length === 0) {
        throw new Error("Fill all fields");
      }
      const result = {
        email,
        password,
      };

      // console.log(result);
      const loginUser = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        body: JSON.stringify(result),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(loginUser);
      // console.log(loginUser);
      if (loginUser.status === 201 || loginUser.status === 200) {
        const login = await loginUser.json();
        console.log(login);
        //here we have used the dispatch to change the existing data in the usercontext
        alert("you are logged in");
        dispatch({
          type: "LOGIN",
          token: login.token,
          role: login.role,
          userid: login.userid,
          name: login.username,
        });
      } else if (loginUser.status === 401) {
        throw new Error("you are not verified by the admin");
      } else {
        throw new Error("Email/Password is wrong");
      }
    } catch (error) {
      alert(error.message);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <Container className="container-margin">
      <Row>
        <Col>
          <h2 style={{ textAlign: "center" }}>
            <img src={logo} width="100px"></img>
          </h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form
            style={{
              border: "1px solid lightgrey",
              padding: "10px 7px 5px 7px",
              borderRadius: "10px",
              boxShadow: "2px 2px lightgrey",
              backgroundColor: "white",
              boxShadow: "0px 2px 10px -4px grey",
            }}
            className="form"
            onSubmit={handleSubmitLogin}
          >
            <h3 style={{ textAlign: "center" }}>Login</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <b>Email address:</b>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                <b>Password:</b>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div className="d-grid gap-2 login-button">
              <Button variant="outline-primary" type="submit">
                Submit
              </Button>
            </div>
            <p style={{ textAlign: "center", marginBottom: "20px" }}>
              New to Alumni Union?
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "blue" }}
              >
                {" "}
                Sign up
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
