import React from "react";
import { Button } from "react-bootstrap";

function IndividualCollege(props) {
  return (
    <tbody>
      <tr>
        <td>
          <div
            style={{
              display: "flex",
              height: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h5>{props.cllgName}</h5>
          </div>
        </td>
        <td>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              className="m-3 sm-w5 md-w10"
              // size="md"
              onClick={props.cllgselect.bind(this, props.collegeId)}
              variant="primary"
              style={{ minWidth: "50%" }}
            >
              Alumni
            </Button>

            <Button
              style={{ minWidth: "50%" }}
              className="m-3 sm-w5 md-w10"
              // size="md"
              onClick={props.postselect.bind(this, props.collegeId)}
              variant="primary"
            >
              View Post
            </Button>
          </div>
        </td>
      </tr>
    </tbody>
  );
}

export default IndividualCollege;
