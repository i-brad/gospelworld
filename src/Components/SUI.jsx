import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Facebook from "../Assets/facebook-3.svg";
import Google from "../Assets/google-g-2015.svg";
import Logo from "../Assets/gospelworld.png";
import { auth, db } from "../firebase";
import { signInAction, signOutAction } from "../Redux/Actions/Auth";
import "../Styles/SUI.css";
import Input from "./Input";

function SUI() {
  let dispatch = useDispatch();
  const { Logged } = useSelector((state) => state.signReducer);
  const userRef = collection(db, "users");

  const [ErrorMessage, setErrorMessage] = useState("");
  const [ErrorOut, setErrorOut] = useState("");

  const [Login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [Register, setRegister] = useState({
    email: "",
    password: "",
    username: "",
  });

  const LogHandle = (e) => {
    let { name, value } = e.target;
    setLogin({ ...Login, [name]: value });
  };

  const RegHandle = (e) => {
    let { name, value } = e.target;
    setRegister({ ...Register, [name]: value });
  };

  const [pssL, setPssL] = useState(false);
  const [pssR, setPssR] = useState(false);

  const [lg, setLg] = useState(false);
  const [rg, setRg] = useState(false);
  const [op, setOp] = useState(true);

  const lgO = () => {
    setLg(true);
    setRg(false);
    setOp(false);
    setErrorMessage("");
  };

  const rgO = () => {
    setRg(true);
    setLg(false);
    setOp(false);
    setErrorMessage("");
  };

  const opn = () => {
    setOp(true);
    setRg(false);
    setLg(false);
  };

  const close = () => {
    document.querySelector(".sc").style.display = "none";
  };

  const showPL = (e) => {
    setPssL(!pssL);
    let inptL = document.querySelector("#passwordL");
    if (inptL.type === "password") {
      inptL.type = "text";
    } else {
      inptL.type = "password";
    }
  };

  const showPR = () => {
    setPssR(!pssR);
    let inptR = document.querySelector("#passwordR");
    if (inptR.type === "password") {
      inptR.type = "text";
    } else {
      inptR.type = "password";
    }
  };

  const loginFields = [
    {
      label: "emailL",
      name: "email",
      type: "email",
      placeholder: "Email address",
      Svg: MailOutlinedIcon,
      handle: LogHandle,
    },
    {
      label: "passwordL",
      name: "password",
      type: "password",
      placeholder: "Password",
      Svg: pssL ? VisibilityOutlinedIcon : VisibilityOffOutlinedIcon,
      show: showPL,
      className: "pss",
      handle: LogHandle,
    },
  ];

  const registerFields = [
    {
      label: "emailR",
      name: "email",
      type: "email",
      placeholder: "Email address",
      Svg: MailOutlinedIcon,
      handle: RegHandle,
    },
    {
      label: "passwordR",
      name: "password",
      type: "password",
      placeholder: "Password",
      Svg: pssR ? VisibilityOutlinedIcon : VisibilityOffOutlinedIcon,
      className: "pss",
      show: showPR,
      handle: RegHandle,
    },
    {
      label: "usernameR",
      name: "username",
      type: "text",
      placeholder: "what should we call you?",
      Svg: AccountCircleOutlinedIcon,
      handle: RegHandle,
    },
  ];

  const signInUser = () => {
    document.querySelector(".sui__loader").style.display = "block";
    signInWithEmailAndPassword(auth, Login.email, Login.password)
      .then(async (userCredential) => {
        let user = userCredential.user;

        const docRef = doc(db, "users", user.uid);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          dispatch(signInAction({ ...docSnap.data(), ...user }));
          //console.log("Document data:", docSnap.data());
        } else {
          dispatch(signInAction(user));
        }
        document.querySelector(".sui__loader").style.display = "none";
        opn();
        close();
      })
      .catch((error) => {
        setErrorMessage(error.message);
        document.querySelector(".sui__loader").style.display = "none";
      });
  };

  const signUpUser = () => {
    document.querySelector(".sui__loader").style.display = "block";
    createUserWithEmailAndPassword(auth, Register.email, Register.password)
      .then((userCredential) => {
        let user = userCredential.user;
        dispatch(signInAction({ username: Register.username, ...user }));
        let id = user.uid;

        setDoc(doc(userRef, id), {
          id,
          username: Register.username,
        });
        document.querySelector(".sui__loader").style.display = "none";
        opn();
        close();
      })
      .catch((error) => {
        document.querySelector(".sui__loader").style.display = "none";
        setErrorMessage(error.message);
      });
  };
  const logOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(signOutAction());
        opn();
        close();
      })
      .catch((error) => {
        setErrorOut(error.message);
      });
  };
  const signGoogle = () => {
    document.querySelector(".sui__loader").style.display = "block";
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        //const token = credential.accessToken;

        const user = result.user;
        dispatch(signInAction({ username: user.displayName, ...user }));
        let id = user.uid;
        setDoc(doc(userRef, id), {
          id,
          username: user.displayName,
        });
        document.querySelector(".sui__loader").style.display = "none";
        opn();
        close();
      })
      .catch((error) => {
        document.querySelector(".sui__loader").style.display = "none";
        setErrorMessage(error.message);
      });
  };
  return (
    <div className="sc">
      <div className="sui__cover">
        <div className="sui">
          <div className="sui__loader">
            <div className="sui__circle"></div>
          </div>
          <HighlightOffIcon className="close" onClick={close} />
          <div className={op ? "opn show" : "opn hide"}>
            <img src={Logo} alt="" />
            <h2>Every gospel songs.</h2>
            <h2>Free on GospelWorld.</h2>
            <p className={ErrorOut && "err"}>
              {ErrorOut?.split("(")[1]?.replace(")", "")}
            </p>
            {!Logged ? (
              <button className="lgn" onClick={lgO}>
                LOG IN
              </button>
            ) : (
              <button className="lgn" onClick={logOut}>
                LOG OUT
              </button>
            )}
            {!Logged && (
              <p>
                Don't have an account?{" "}
                <button className="sup" onClick={rgO}>
                  SIGNUP
                </button>
              </p>
            )}
          </div>
          <div className={lg ? "log show" : "log hide"}>
            <img src={Logo} alt="" />
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                signInUser();
              }}
            >
              <h2>Log in for personalize experience</h2>
              <p className={ErrorMessage && "err"}>
                {ErrorMessage?.split("(")[1]?.replace(")", "")}
              </p>
              {loginFields.map((details, index) => {
                return <Input key={index} details={details} />;
              })}
              <button className="rsp" type="button">
                Reset password
              </button>
              <button className="btn" type="submit">
                LOG IN
              </button>
            </form>
            <fieldset>
              <legend>OR</legend>
            </fieldset>
            <button className="oth" onClick={signGoogle} type="button">
              <img src={Google} alt="" />
              Continue with Google
            </button>
            <button className="oth" type="button">
              <img src={Facebook} alt="" />
              Continue with Facebook
            </button>
            <p>
              Don't have an account?{" "}
              <button className="sup" onClick={rgO} type="button">
                SIGNUP
              </button>
            </p>
          </div>
          <div className={rg ? "reg log show" : "reg log hide"}>
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                signUpUser();
              }}
            >
              <h2>Sign Up for free</h2>
              <h2>GospelWorld account</h2>
              <p className={ErrorMessage && "err"}>
                {ErrorMessage?.split("(")[1]?.replace(")", "")}
              </p>
              {registerFields.map((details, index) => {
                return <Input key={index} details={details} />;
              })}
              <button className="btn" type="submit">
                Continue
              </button>
            </form>
            <button className="bck" onClick={opn} type="button">
              Back
            </button>
            <fieldset>
              <legend>OR</legend>
            </fieldset>
            <button className="oth" onClick={signGoogle} type="button">
              <img src={Google} alt="" />
              Continue with Google
            </button>
            <button className="oth" type="button">
              <img src={Facebook} alt="" />
              Continue with Facebook
            </button>
            <p>
              Already an account?{" "}
              <button className="sup" onClick={lgO} type="button">
                LOGIN
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SUI;
