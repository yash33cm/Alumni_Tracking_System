import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useParams } from "react-router";
import { GetUserContext } from "../StateMangement/StateProvider";
import Spinner2 from "../components/Spinner2";
function AlumniPage() {
  const [{ token }, dispatch] = GetUserContext();
  const [alumni, setalumni] = useState([]);
  const [cllg, setcllg] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const { cllgid } = useParams();
  // const [allcollege, setallcollege] = useState([]);
  // const [flag, setflag] = useState(0);

  const rendercollege = async () => {
    setisLoading(true);
    const colleges = await fetch("http://localhost:3000/college", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await colleges.json();
    console.log(result);
    let college = result.find((clg) => clg.id === cllgid);
    setcllg(college.collegeName);
    console.log(college.alumni);
    setalumni(college.alumni);
    setisLoading(false);
  };

  useEffect(() => {
    rendercollege();
  }, []);

  const handleverify = async (userid) => {
    const verify = await fetch(`http://localhost:3000/admin/verify/${userid}`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(await verify.json());
    rendercollege();
  };

  const handledelete = async (userid) => {
    const verify = await fetch(`http://localhost:3000/admin/${userid}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(await verify.json());
    rendercollege();
  };
  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          backgroundColor: "#009ffd",
          paddingBottom: "20px",
          paddingTop: "20px",
        }}
      >
        {cllg}
      </h1>

      <Container style={{ marginTop: "20px", textAlign: "center" }}>
        <h3>List of Alumni to be verified</h3>
        <Table size="sm" responsive striped bordered hover>
          <thead>
            <tr style={{ backgroundColor: "#009ffd" }}>
              <th>Username</th>
              <th>MailId</th>
              <th>Year</th>
              <th>Program</th>
              <th>Course</th>
              <th>Verify</th>
              <th>delete</th>
            </tr>
          </thead>
          {isLoading && <Spinner2 />}
          {alumni.map((user) => (
            <tbody>
              <tr>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.graduated_year}</td>
                <td>{user.program}</td>
                <td>{user.course}</td>
                <td>
                  {user.verified ? (
                    "verified"
                  ) : (
                    <button
                      style={{
                        background: "transparent",
                        color: "green",
                        outline: "none",
                        border: "none",
                      }}
                      onClick={handleverify.bind(this, user._id)}
                    >
                      verify
                    </button>
                  )}
                </td>
                <td>
                  {user.verified ? (
                    "-"
                  ) : (
                    <button
                      style={{
                        background: "transparent",
                        color: "red",
                        outline: "none",
                        border: "none",
                      }}
                      onClick={handledelete.bind(this, user._id)}
                    >
                      delete
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </Container>
      {alumni.length === 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h4>No Alumni found</h4>
        </div>
      )}
    </div>
  );
}

export default AlumniPage;
