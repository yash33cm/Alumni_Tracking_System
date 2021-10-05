export const initialState = JSON.parse(
  localStorage.getItem("state") || {
    role: "",
    token: null,
    college: null,
    username: null,
    userid: null,
  }
);

// export const initialState = JSON.parse(JSON.stringify(localStorage.getItem("state")));
// console.log(initialState);
// // {
// //   role: "",
// //   token: null,
// //   // college: null,
// //   username: null,
// //   userid: null,
// // };
//above is the initial state that is null in this case

//below with the help of reducer function we can alter the state depending upon the
//action props i.e action.type and action.payload ,payloads in our case is token and role
//we can add further if we want
export const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        role: action.role,
        token: action.token,
        userid: action.userid,
        username: action.name,
      };
    case "LOGOUT":
      return {
        ...state,
        role: "",
        token: null,
        userid: null,
        username: null,
      };
    // case "VIEWCOLLEGE":
    //   return {
    //     ...state,
    //     college: action.cllg,
    //   };
    default:
      return {
        state,
      };
  }
};
