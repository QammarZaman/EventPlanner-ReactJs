import { auth } from "config/firebase";
import { useAuthContext } from "context/AuthContext";
import { signOut } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { authentication, dispatch } = useAuthContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch({
          type: "LOGOUT",
          payload: null,
        });
        navigate("/");
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <>
      <div
        id="sticky-wrapper"
        className="sticky-wrapper"
        style={{ height: "83px" }}
      >
        <nav class="navbar navbar-expand-lg">
          <div class="container">
            <Link class="navbar-brand" href="index.html">
              Event Planner
            </Link>
            {!authentication ? (
              <>
                <Link
                  to="/auth/login"
                  class="btn custom-btn d-lg-none ms-auto me-5"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  class="btn custom-btn d-lg-none ms-auto me-4"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/events/add-event"
                  class="btn custom-btn d-lg-none ms-auto me-4"
                >
                  Add Event
                </Link>
                <button
                  class="btn custom-btn d-lg-none ms-auto me-4"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}

            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav align-items-lg-center ms-auto me-lg-5">
                <li class="nav-item">
                  <Link class="nav-link click-scroll" to="/">
                    Home
                  </Link>
                </li>

                <li class="nav-item">
                  <Link class="nav-link click-scroll" to="/events">
                    Events
                  </Link>
                </li>
                {authentication ? (
                  <>
                    <li class="nav-item">
                      <Link class="nav-link click-scroll" to="events/my-events">
                        My Events
                      </Link>
                    </li>
                  </>
                ) : (
                  ""
                )}
              </ul>
              {!authentication ? (
                <>
                  <Link
                    to="/auth/login"
                    class="btn custom-btn d-lg-block me-3 d-none"
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth/register"
                    class="btn custom-btn d-lg-block d-none"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/events/add-event"
                    class="btn custom-btn d-lg-block me-3 d-none"
                  >
                    Add Event
                  </Link>
                  <button
                    class="btn custom-btn d-lg-block me-3 d-none"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
