import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
// import Spinner2 from "../components/Spinner2";
import Spinner3 from "../components/Spinner3";

function PostPage() {
  function getRandomColor() {
    var letters = "BCDEF".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  }

  const { cllgid } = useParams();
  //   const [allcollege, setallcollege] = useState([]);
  const [collegePost, setcollegePost] = useState([]);
  const [cllg, setcllg] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const getallcollege = async () => {
    setisLoading(true);
    const colleges = await fetch("http://localhost:3000/college", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await colleges.json();
    let college = result.find((clg) => clg.id === cllgid);
    setcllg(college.collegeName);
    console.log(college.collegePost);
    setcollegePost(college.collegePost);
    setisLoading(false);
  };
  useEffect(() => {
    getallcollege();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        flexDirection: "column",
      }}
    >
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
      {isLoading && <Spinner3 />}

      <div className="wrapper">
        {collegePost.length === 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
            }}
          >
            <h2>OOPS!! No posts yet!!!</h2>
          </div>
        )}
        {collegePost.map((post) => (
          <div className="card" style={{ backgroundColor: getRandomColor() }}>
            <h3 className="card-title">{post.eventTitle}</h3>
            <p className="card-content">Description : {post.description}</p>
            <button className="card-btn">
              Created at : {new Date(post.createdAt).toLocaleDateString()}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostPage;
