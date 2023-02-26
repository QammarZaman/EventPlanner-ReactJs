import { auth, firestore } from "config/firebase";
import { useAuthContext } from "context/AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const handleChange = (e) => {
    let { name, value } = e.target;
    setUserDetails((s) => ({ ...s, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    let { name, email, password } = userDetails;

    name = name.trim();
    email = email.trim();
    password = password.trim();

    if (!name || !password || !password) {
      return window.toastify("Please fill all fields", "error");
    }

    if (name.length < 3) {
      return window.toastify("Please enter a valid name", "error");
    }
    if (email.length < 5) {
      return window.toastify("Please enter a valid email", "error");
    }
    if (password.length < 6) {
      return window.toastify("Password length is less than 6", "error");
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        let user = userCredential.user;
        const idTokenResult = await user.getIdTokenResult();

        addDocument(user, name, email);

        window.toastify(
          "Your Account Has Been Created and you now will be redirecting to Home Page",
          "success"
        );

        navigate("/");
        // signIn(email, password);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addDocument = async (user, name, email) => {
    try {
      await setDoc(doc(firestore, "users", user.uid), {
        displayName: name,
        email,
        uid: user.uid,
      });
      dispatch({
        type: "LOGIN",
        payload: {
          user,
        },
      });
    } catch (err) {
      console.error(err);
    }
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
                <h2 class="text-center mb-4">Register</h2>

                <div class="ticket-form-body">
                  <div class="row">
                    <div class="col-lg-6 col-md-6 col-12">
                      <input
                        type="text"
                        name="name"
                        id="ticket-form-name"
                        class="form-control"
                        placeholder="Full name"
                        required
                        onChange={handleChange}
                      />
                    </div>

                    <div class="col-lg-6 col-md-6 col-12">
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
                  </div>

                  <input
                    type="password"
                    name="password"
                    id="ticket-form-password"
                    class="form-control"
                    placeholder="Password"
                    required
                    onChange={handleChange}
                  />

                  <div class="col-lg-6 col-md-10 col-8 mx-auto">
                    <button type="submit" class="form-control">
                      Register
                    </button>
                    <Link
                      to="/auth/login"
                      class="global_btn bg-primary form-control text-center mt-3 justify-content-center"
                    >
                      Already a User?
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

export default Register;
