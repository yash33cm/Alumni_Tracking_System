import React, { useEffect, useState } from "react";
import Carousal from "../components/carousal";
import { GetUserContext } from "../StateMangement/StateProvider";
import Footer from "../components/footer";
function Dashboard() {
  // function getRandomColor() {
  //   var letters = "BCDEF".split("");
  //   var color = "#";
  //   for (var i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * letters.length)];
  //   }
  //   return color;
  // }
  const [{ userid, token }, dispatch] = GetUserContext();
  const [collegePost, setcollegePost] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [cllg, setcllg] = useState("");
  const getallcollege = async (name) => {
    setisLoading(true);
    const colleges = await fetch("http://localhost:3000/college", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await colleges.json();
    let nameclg = result.find((clg) => clg.collegeName === name);
    setcllg(name);
    // console.log(college.collegePost);
    setcollegePost(nameclg.collegePost);
    setisLoading(false);
  };
  const getuser = async () => {
    const user = await fetch(`http://localhost:3000/user/profile/${userid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const result = await user.json();
    const college = result.profiledetails.college;
    getallcollege(college);
  };

  useEffect(() => {
    if (token) {
      getuser();
    }
  }, [token]);
  return (
    <>
      <Carousal></Carousal>
      <div
        style={{
          display: "flex",
          height: "100vh",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <br />

        <h1
          style={{
            textAlign: "center",
            paddingBottom: "20px",
          }}
        >
          {cllg} Posts:
        </h1>

        <div style={{ marginBottom: "500px" }}>
          {collegePost.map((post) => (
            <div
              className="card"
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                border: "1px solid lightgrey",
                boxShadow: "0px 2px 10px -4px grey",
              }}
            >
              <h3 className="card-title">{post.eventTitle}</h3>
              <p className="card-content">Description : {post.description}</p>
              <button className="card-btn">
                Created at : {new Date(post.createdAt).toLocaleDateString()}
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Dashboard;
