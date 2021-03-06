import { useState } from "react";
import "./Login.scss";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  getIdToken,
} from "firebase/auth";
import { auth } from "../../service/firebase";
import { useHistory } from "react-router-dom";
import { Button, TextField, InputAdornment, ButtonGroup } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import PunchClockIcon from "@mui/icons-material/PunchClock";
import { Box } from "@mui/system";
import { login } from "../../service/session";
import { AlertBox } from "../Alert/AlertBox";
export function Login() {
  const [phone, setPhone] = useState("");
  const [OTP, setOtp] = useState(null);
  const [confirmationResult, setConfirmatioResult] = useState(null);
  const [alert, setAlert] = useState(null);
  let history = useHistory();

  const checkPhone = (e) => {
    if (!phone) {
    } else if (phone.length === 10) {
      onSignInSubmit(e);
    } else {
      setAlert(null);
      setAlert({ message: "Invalid Mobile Number", severnity: "error" });
    }
  };
  const configureCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          this.onSignInSubmit();
          console.log("Recaptcha verified");
        },
        defaultCountry: "IN",
      },
      auth
    );
  };
  const onSignInSubmit = async (e) => {
    e.preventDefault();
    const phoneNumber = "+91" + phone;
    console.log(phoneNumber);
    configureCaptcha();
    const appVerifier = window.recaptchaVerifier;
    try {
      let result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmatioResult(result);
      window.recaptchaVerifier.clear();
      setAlert(null);
      setAlert({ message: "OTP Send", severnity: "success" });
    } catch (error) {
      console.log(error.code, error.message);
      setAlert(null);
      setAlert({ message: error.message, severnity: "error" });
    }
  };
  //   Sign in with otp
  const signInWithOtp = async () => {
    let code = OTP;
    try {
      const result = await confirmationResult.confirm(code);
      if (result) {
        const user = result.user;
        const token = await getIdToken(user);
        login(user, token).then(() => {
          history.push("/home");
        });
        setAlert(null);
        setAlert({ message: "Logged In Successfully", severnity: "success" });
      }
    } catch (error) {
      setAlert(null);
      setAlert({ message: error.message, severnity: "error" });
    }
  };

  //   Sign in with Google
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const token = await getIdToken(user);
        login(user, token).then(() => {
          history.push("/home");
        });
      })
      .catch((error) => {
        setAlert(null);
        setAlert({ message: error.message, severnity: "error" });
      });
  };
  //   Sign in with Github
  const signInWithGithub = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const token = await getIdToken(user);
        login(user, token).then(() => {
          history.push("/home");
        });
        console.log(user);
      })
      .catch((error) => {
        setAlert(null);
        setAlert({ message: error.message, severnity: "error" });
      });
  };
  return (
    <div className="login">
      {alert && <AlertBox message={alert} />}
      <div id="sign-in-button"></div>
      <Box
        sx={{
          width: 300,
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          border: ".5px solid grey",
          padding: 2,
        }}
      >
        <div>
          <div className="title">Welcome To LinkTre</div>
          <hr />
          <ButtonGroup
            variant="filled-basic"
            aria-label="outlined primary button group"
            sx={{
              marginBottom: 2,
            }}
          >
            <TextField
              id="phone"
              label="Phone Number"
              variant="outlined"
              onChange={(e) => setPhone(e.target.value)}
              style={{ color: "white" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIphoneIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              color="primary"
              size="large"
              variant="contained"
              onClick={checkPhone}
            >
              Send
            </Button>
          </ButtonGroup>
          <br />
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
            sx={{
              marginBottom: 2,
            }}
          >
            <TextField
              id="otp"
              label="OTP"
              variant="outlined"
              onChange={(e) => setOtp(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PunchClockIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button color="primary" variant="contained" onClick={signInWithOtp}>
              Verify
            </Button>
          </ButtonGroup>
          <p>or</p>
          <ButtonGroup>
            <Button startIcon={<GoogleIcon />} onClick={signInWithGoogle}>
              Google
            </Button>
            <Button startIcon={<GitHubIcon />} onClick={signInWithGithub}>
              GitHub
            </Button>
          </ButtonGroup>
        </div>
      </Box>
    </div>
  );
}
