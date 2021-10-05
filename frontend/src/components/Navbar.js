import React, { useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import { GetUserContext } from "../StateMangement/StateProvider";
import fav from "../images/fav_icon.png";
export default function NavbarComp() {
  const [state, dispatch] = GetUserContext();
  const history = useHistory();

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  const handlelogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    console.log(state.token, state.role);
    history.push("/login");
  };
  return (
    <div className="heading">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <Navbar.Brand>
              <img
                alt=""
                src={fav}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              Alumni Union
            </Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ">
            <Nav className="ms-auto">
              {state.role === "ADMIN" ? (
                <Nav.Link>
                  <NavLink
                    to="/admin"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Admin
                  </NavLink>
                </Nav.Link>
              ) : (
                ""
              )}
              {state.role === "ADMIN" ? (
                ""
              ) : state.token ? (
                <Nav.Link>
                  <NavLink
                    to="/"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Home
                  </NavLink>
                </Nav.Link>
              ) : (
                ""
              )}
              {!state.token ? (
                <Nav.Link>
                  <NavLink
                    to="/register"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Register
                  </NavLink>
                </Nav.Link>
              ) : (
                ""
              )}
              {state.role === "ADMIN" ? (
                <Nav.Link>
                  <NavLink
                    to="/post"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Posts
                  </NavLink>
                </Nav.Link>
              ) : (
                ""
              )}
              {state.role === "USER" ? (
                <Nav.Link>
                  <NavLink
                    to={`/profile/${state.userid}`}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    profile
                  </NavLink>
                </Nav.Link>
              ) : (
                ""
              )}
              {!state.token ? (
                <Nav.Link>
                  <NavLink
                    to="/login"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Login
                  </NavLink>
                </Nav.Link>
              ) : (
                ""
              )}
              {state.token ? (
                <Nav.Link
                  style={{ textDecoration: "none", color: "white" }}
                  onClick={handlelogout}
                >
                  Logout
                </Nav.Link>
              ) : (
                ""
              )}
              {/* remove when loggedin */}
              {/* <NavDropdown title="More" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Connect</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
