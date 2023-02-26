import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { auth, firestore } from "config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

const isAuthenticated = false;

const initialState = {
  user: {},
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: payload.user };
    case "LOGOUT":
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("User Signed in", user);
        const idTokenResult = await user.getIdTokenResult();
        getUserData(user.uid);
        setLoading(false);
        // ...
      } else {
        // User is signed out
        // ...

        console.log("User Signed Out");
        console.log(state);
      }
    });

    // clean up

    // return () => unsubscribe();
  }, []);

  console.log(state);

  const getUserData = async (userId) => {
    const docRef = doc(firestore, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      dispatch({
        type: "LOGIN",
        payload: {
          user: docSnap.data(),
        },
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        dispatch,
        authentication: state.isAuthenticated,
        eventCreater: state.user,
        getUserData,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
