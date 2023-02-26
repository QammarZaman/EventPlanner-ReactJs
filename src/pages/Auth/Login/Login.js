import { auth } from "config/firebase";
import { useAuthContext } from "context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [userDetails, setUserDetails] = useState({});
  const { dispatch } = useAuthContext();
  const handleChange = (e) => {
    let { name, value } = e.target;
    setUserDetails((s) => ({ ...s, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    let { email, password } = userDetails;
    email = email.trim();
    password = password.trim();
    if (!email || !password) {
      window.toastify("Please fill all fields", "error");
      return;
    }

    if (password.length < 6) {
      window.toastify("Password length is less than 6", "error");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        let { user } = userCredential;

        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "LOGIN",
          payload: {
            user,
          },
        });
        // navigate("/dashboard");
      })
      .catch((eror) => {
        window.toastify(`Error ${eror}`, "error");
        console.log(eror);
      });
  };
  return (
    <>
      <section class="ticket-section section-padding">
        <div class="section-overlay"></div>

        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-10 mx-auto">
              <form
                class="custom-form ticket-form mb-5 mb-lg-0"
                onSubmit={handleSubmit}
              >
                <h2 class="text-center mb-4">Login</h2>

                <div class="ticket-form-body">
                  <div class="row">
                    <div class="col-lg-12 col-md-12 col-12">
                      <input
                        type="email"
                        name="email"
                        id="ticket-form-email"
                        pattern="[^ @]*@[^ @]*"
                        class="form-control"
                        placeholder="Email address"
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <div class="col-lg-12 col-md-12 col-12">
                      <input
                        type="password"
                        name="password"
                        id="ticket-form-password"
                        class="form-control"
                        placeholder="Password"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div class="col-lg-4 col-md-10 col-8 mx-auto">
                    <button type="submit" class="form-control">
                      Login
                    </button>
                    <Link
                      to="/auth/register"
                      class="global_btn bg-primary form-control text-center mt-3 justify-content-center"
                    >
                      Not a user?
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
