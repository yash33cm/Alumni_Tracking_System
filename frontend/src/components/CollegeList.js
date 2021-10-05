import React from "react";
import IndividualCollege from "./IndividualCollege";

function CollegeList(props) {
  return props.colleges.map((college) => {
    return (
      <IndividualCollege
        key={college.id}
        collegeId={college.id}
        cllgName={college.collegeName}
        cllgselect={props.selectcllg}
        postselect={props.selectpost}
      />
    );
  });
}

export default CollegeList;
