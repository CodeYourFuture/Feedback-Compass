import React, { useState, useEffect } from "react";
import Logo from "./Logo.png";
import axios from "axios";
import avatar from "./Avatar.png";
import { useParams } from "react-router-dom";
import "./StudentProfile.css";

let student_id;

function StudentProfile() {
  const [profilePhoto, setProfilePhto] = useState(avatar);
  const [studentDetails, setStudentDetails] = useState();
  const [feedback, setFeedback] = useState();

  console.log(studentDetails);
  // console.log(studentDetails.biography);

  let { id } = useParams();
  console.log(id);

  ////-----------Biography Section------------------>
  const [bio, setBio] = useState("about you...");
  const [submitBio, setSubmitBio] = useState();
  console.log(submitBio);
  const handleBioSubmit = () => {
    console.log(submitBio);
    return submitBio;
    // e.preventDefault();
    // setBio(submitBio);
    // document.getElementById("student-bio").value = "";
  };

  useEffect(() => {
    // axios.get('/feedback', {
    //   params: {
    //     ID:
    //   }
    // })
    axios
      .get(`http//localhost:3100/api/feedback/${student_id}`, {
        student_id: id,
        title: "JAVASCRIPT-WEEK-1",
      })
      .then(function (response) {
        if (response) {
          setFeedback(response);
          console.log(response);
        }
      })
      .catch(function (error) {
        if (error) {
          console.log(error);
        }
      });
  }, [student_id]);

  useEffect(() => {
    axios
      .get(`/api/students/${id}`)
      .then(function (response) {
        if (response.data) {
          console.log(response.data);
          setStudentDetails(response.data);
          console.log(response.data.biography);
          setSubmitBio(responde.data.biography);
        }
      })
      .catch(function (error) {
        if (error) {
        }
      });
  }, [id]);

  //------------ Modules list  handling -------->
  const [moduleTitle, setModuleTitle] = useState("");
  const [comment, setComment] = useState("");
  const [isCommented, setIsCommented] = useState("");
  const [data, setData] = useState("");

  const handleComentBtn = (e) => {
    e.preventDefault();
    document.getElementById("comment-input").value = "";

    setIsCommented(comment);

    axios
      .put("api/students/comments/3/2", {
        response: comment,
      })
      .then(function (response) {
        if (response) {
          alert("comment posted");
        }
      })
      .catch(function (error) {
        if (error) {
        }
      });
  };

  return (
    <div>
      <div id="student-container">
        <div id="student-heading">
          <img id="logo" src={Logo} width="210" height="150" />
          <h1 className="welcom">Track Your Feedback</h1>
        </div>
        <div id="student-body">
          <div id="student-profile">
            <img src={profilePhoto} id="avatar" />
            <a href="#">Add a profile</a>

            <h4>
              {studentDetails &&
                `${studentDetails.name} ${studentDetails.surname}`}
            </h4>
            <h5>{bio}</h5>
            <input
              id="student-bio"
              placeholder="add your biography"
              type="text"
              name="bio"
              onChange={(e) => {
                setSubmitBio(e.target.value);
              }}
            />
            <button id="modules" onClick={handleBioSubmit}>
              save
            </button>
            <div id="modules-container">
              <h2>Modules</h2>
              <select
                id="modules"
                name="HTML"
                onChange={(e) =>
                  setModuleTitle(e.target.name + "-" + e.target.value)
                }
              >
                <option>HTML</option>
                <option>WEEK-1</option>
                <option>WEEK-2</option>
                <option>WEEK-3</option>
              </select>

              <select
                id="modules"
                name="CSS"
                onChange={(e) =>
                  setModuleTitle(e.target.name + " " + e.target.value)
                }
              >
                <option>CSS</option>
                <option>WEEK-1</option>
                <option>WEEK-2</option>
                <option>WEEK-3</option>
              </select>

              <select
                id="modules"
                name="Javascript"
                onChange={(e) =>
                  setModuleTitle(e.target.name + "-" + e.target.value)
                }
              >
                <option>JAVASCRIPT</option>
                <option>WEEK-1</option>
                <option>WEEK-2</option>
                <option>WEEK-3</option>
              </select>

              <select
                id="modules"
                name="React"
                onChange={(e) =>
                  setModuleTitle(e.target.name + " " + e.target.value)
                }
              >
                <option>React</option>
                <option>WEEK-1</option>
                <option>WEEK-2</option>
                <option>WEEK-3</option>
              </select>

              <select
                id="modules"
                name="Node.js"
                onChange={(e) =>
                  setModuleTitle(e.target.value + " " + e.target.name)
                }
              >
                <option>Node.js</option>
                <option>WEEK-1</option>
                <option>WEEK-2</option>
                <option>WEEK-3</option>
              </select>

              <select
                id="modules"
                name="SQL"
                onChange={(e) =>
                  setModuleTitle(e.target.value + " " + e.target.name)
                }
              >
                <option>SQL</option>
                <option>WEEK-1</option>
                <option>WEEK-2</option>
                <option>WEEK-3</option>
              </select>
            </div>
          </div>

          <div id="feedback-panel">
            <div id="single-feedback">
              <h1>{moduleTitle} Feedback</h1>
              <p>{feedback}</p>

              <p>
                _______________________________________________________________________________
              </p>
              <p>{isCommented}</p>
              <div id="comment">
                <input
                  id="comment-input"
                  placeholder="write a comment"
                  type="text"
                  name="comment"
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <div id="buttons">
                  <button id="comment-btn" onClick={handleComentBtn}>
                    Comment
                  </button>
                  <button id="comment-btn">Edit comment</button>
                  <button id="comment-btn">Delete comment</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
