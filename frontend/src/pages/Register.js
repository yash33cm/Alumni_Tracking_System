import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "../App.css";
import logo from "../images/logo.png";
function Register() {
  const history = useHistory();
  const [collegeId, setCollegeId] = useState("");
  const [username, setUsername] = useState("");
  const [college, setCollege] = useState("");
  const [program, setProgram] = useState("");
  const [course, setCourse] = useState("");
  const [testcourse, setTestcourse] = useState([]);
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCpassword] = useState("");
  const [allcollege, setallcollege] = useState([]);
  const [testprogram, settestprogram] = useState([]);
  // const [alumniId, setalumniId] = useState("");
  // const [selectcllg, setselectcllg] = useState("");

  const getallcollege = async () => {
    const colleges = await fetch("http://localhost:3000/college", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await colleges.json();
    console.log(result);
    setallcollege(result);
  };

  useEffect(() => {
    getallcollege();
  }, []);

  useEffect(() => {
    if (college.length > 0) {
      const cllgcourses = allcollege.filter(
        (cllg) => cllg.collegeName === college
      );
      // setCourse(cllgcourses);
      const id = cllgcourses.map((cllg) => cllg.id);
      const collegecourse = cllgcourses.map((cllg) => cllg.courses);
      const collegeprogram = cllgcourses.map((cllg) => cllg.programs);
      setTestcourse(collegecourse);
      settestprogram(collegeprogram);
      setCollegeId(id);
    }
  }, [college]);

  const addalumnicollege = async (alumniId) => {
    try {
      const addingalumni = await fetch(
        `http://localhost:3000/college/alumni/${collegeId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ alumni: alumniId }),
        }
      );
      if (addingalumni.status === 200 || addingalumni.status === 201) {
        console.log(await addingalumni.json());
        alert("you are registered");
        history.push("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (
        !username ||
        !email ||
        !password ||
        !college ||
        !program ||
        !year ||
        !password ||
        !Cpassword ||
        !course
      ) {
        throw new Error("Fill all the fields");
      }
      const result = {
        username,
        email,
        college,
        program,
        course,
        graduated_year: year,
        password,
        Cpassword,
        verified: false,
      };

      console.log(result);
      const registerUser = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        body: JSON.stringify(result),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (registerUser.status === 200 || registerUser.status === 201) {
        const user = await registerUser.json();
        console.log(user);
        const { _id } = user.result;
        addalumnicollege(_id);
      } else {
        throw new Error("internal server problem");
      }
    } catch (error) {
      alert(error.message);
      // setalumniId("");
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
      <Form
        style={{
          // border: "2px solid grey",
          padding: "15px 8px 10px 8px",
          borderRadius: "5px",
          boxShadow: "2px 2px lightgrey",
          backgroundColor: "white",
          marginBottom: "50px",
        }}
        className="form"
        onSubmit={handleSubmit}
      >
        <h3 style={{ textAlign: "center" }}>Register</h3>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>
            <b>Username:</b>
          </Form.Label>
          <Form.Control
            type="text"
            name="username"
            id=""
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="formBasic">
          <Form.Label>College:</Form.Label>
          <Form.Control
            type="text"
            name=""
            id=""
            value={college}
            onChange={(e) => setCollege(e.target.value)}
          />
        </Form.Group> */}

        <Form.Group className="mb-3" controlId="formBasic">
          <Form.Label>
            <b>College:</b>
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setCollege(e.target.value)}
          >
            <option>Select Your College</option>
            {allcollege.map((cllg) => (
              <option value={cllg.collegeName}>{cllg.collegeName}</option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="formBasicProgram">
          <Form.Label>Program:</Form.Label>
          <Form.Control
            type="text"
            name=""
            id=""
            value={program}
            onChange={(e) => setProgram(e.target.value)}
          />
        </Form.Group> */}

        <Form.Group className="mb-3" controlId="cpurse">
          <Form.Label>
            <b>Program:</b>
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setProgram(e.target.value)}
          >
            <option>Select Your College Program</option>
            {testprogram
              ? testprogram.map((college) =>
                  college.map((cllg) => <option value={cllg}>{cllg}</option>)
                )
              : ""}
          </Form.Select>
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="cpurse">
          <Form.Label>Course:</Form.Label>
          <Form.Control
            type="text"
            name=""
            id=""
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
        </Form.Group> */}

        <Form.Group className="mb-3" controlId="cpurse">
          <Form.Label>
            <b>Course:</b>
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setCourse(e.target.value)}
          >
            <option>Select Your Course</option>
            {testcourse
              ? testcourse.map((college) =>
                  college.map((cllg) => <option value={cllg}>{cllg}</option>)
                )
              : ""}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="year">
          <Form.Label>
            <b>Graduation year:</b>
          </Form.Label>
          <Form.Control
            type="number"
            min="1900"
            max="2099"
            step="1"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            <b>Email address:</b>
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your Email"
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
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            <b>Confirm Password:</b>
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Confirm Password"
            value={Cpassword}
            onChange={(e) => setCpassword(e.target.value)}
          />
        </Form.Group>
        <div className="login-button d-grid gap-2">
          <Button variant="outline-success" className="m-20" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default Register;
