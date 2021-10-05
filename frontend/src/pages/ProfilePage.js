import Button from "@restart/ui/esm/Button";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GetUserContext } from "../StateMangement/StateProvider";

function ProfilePage() {
  const { userid } = useParams();
  const [username, setusername] = useState("");
  const [{ token, role }, dispatch] = GetUserContext();
  const [profile, setprofile] = useState({});
  const getUserData = async () => {
    const data = await fetch(`http://localhost:3000/user/profile/${userid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const jsondata = await data.json();
    const { profiledetails } = jsondata;
    console.log(profiledetails);
    setprofile(profiledetails);
    setusername(profiledetails.username);
  };

  const handleedit = async () => {
    const editz = await fetch(`http://localhost:3000/user/profile/${userid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ username }),
    });
    const response = await editz.json();
    console.log(response);
    dispatch({
      type: "LOGIN",
      token,
      role,
      userid,
      name: username,
    });
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "50px",
        height: "auto",
        textTransform: "capitalize",
      }}
    >
      <div
        style={{
          justifyContent: "center",
          backgroundColor: "white",
          boxShadow: "0px 2px 10px -4px grey",
          alignItems: "center",
          flexDirection: "column",
          padding: "30px",
          borderRadius: "5px",
          textTransform: "capitalize",
        }}
      >
        <h1>Profile @{profile.username}</h1>

        <p>user email: {profile.email}</p>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <p>
            username:
            <input
              style={{
                backgroundColor: "transparent",
                width: "100px",
                border: "none",
              }}
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
          </p>

          <Button
            onClick={handleedit}
            style={{
              outline: "none",
              height: "30px",
              backgroundColor: "#f3f2ef",
              color: "black",
              borderRadius: "5px",
              border: "1px solid grey",
            }}
          >
            Edit
          </Button>
        </div>
        <p>college: {profile.college}</p>
        <p>graduate year: {profile.graduated_year}</p>
        <p>course: {profile.course}</p>
        <p>program: {profile.program}</p>
      </div>
    </div>
  );
}

export default ProfilePage;
