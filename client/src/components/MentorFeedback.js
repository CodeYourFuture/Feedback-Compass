import React, { useState, useEffect } from "react";
import Logo from "./Logo.png";
import axios from "axios";
import avatar from "./Avatar.png";
import "./StudentProfile.css";
import { useParams } from "react-router-dom";
import MentorViewSubmission from "./MentorViewSubmission";
import CourseProgressList from "./CourseProgressList";
import Badge from "@material-ui/core/Badge";
import { FaBell } from "react-icons/fa";

import Logout from "./Logout";

function MentorFeedback({ setUser }) {
  const [profilePhoto, setProfilePhto] = useState(avatar);
  const [studentDetails, setStudetDetails] = useState("");
  const [unMarked, setUnMarked] = useState();

  const unMarkedWork = (card) => {
    let totalUnMarkedWork = card.filter((p) => !p.body).length;
    setUnMarked(totalUnMarkedWork);
  };
  let { student_id, mentor_id } = useParams();

  useEffect(() => {
    axios
      .get(`/api/students/${student_id}`)
      .then(function (response, err) {
        if (response) {
          setStudetDetails(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [student_id]);

  return (
    <div>
      <div id="student-container">
        <div id="student-heading">
          <a href="/">
            <img id="logo" src={Logo} width="400" />
          </a>

          <h1 className="welcom">Student Feedback</h1>
          <div style={{ marginLeft: "30rem" }}>
            {unMarked === 1
              ? `There is a ${unMarked} unmarked submition`
              : unMarked > 1
              ? `There are  ${unMarked} unmarked submitions`
              : null}
            <Badge badgeContent={unMarked} color="secondary">
              <FaBell />
            </Badge>
          </div>
        </div>
        <div>
          <Logout setUser={setUser} />
        </div>

        <div id="student-body">
          <div id="student-profile">
            <div id="student-details">
              <img src={profilePhoto} id="avatar" />
              <div id="student-name-container">
                <h4 id="student-name">
                  {studentDetails
                    ? `${studentDetails.name} ${studentDetails.surname}`
                    : null}
                </h4>
                <h5 className="bio">
                  {studentDetails ? studentDetails.biography : null}
                </h5>
              </div>
            </div>
            <CourseProgressList id={student_id} />
          </div>

          <div id="feedback">
            <div>
              <MentorViewSubmission
                student_id={student_id}
                mentor_id={mentor_id}
                unMarkedWork={unMarkedWork}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MentorFeedback;
