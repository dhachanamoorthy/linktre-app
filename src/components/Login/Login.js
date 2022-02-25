import { useEffect, useState } from "react";
import "./Login.scss";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "../../service/firebase-config";
import { useHistory } from "react-router-dom";
import { Button, TextField, InputAdornment, ButtonGroup,Divider } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import PunchClockIcon from '@mui/icons-material/PunchClock';
import { Box, color } from "@mui/system";
import { login } from "../../service/SessionManager";
export function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(null);
  let history = useHistory();

  const checkPhone = (e) => {
    if (!phone) {
    } else if (phone.length === 10) {
      onSignInSubmit(e);
    } else {

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
  var confirmationResult = null;
  const onSignInSubmit = async (e) => {
    e.preventDefault();
    const phoneNumber = "+91" + phone;
    console.log(phoneNumber);
    configureCaptcha();
    const appVerifier = window.recaptchaVerifier;
    try {
      confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      console.log("confirmation result", confirmationResult);
    } catch (error) {
      console.log(error.code,error.message);
    }
  };
  //   Sign in with otp
  const signInWithOtp = async () => {
    let code = otp;
    try {
      console.log("verify otp", confirmationResult);
      const result = await confirmationResult.confirm(code);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  //   Sign in with Google
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        login(user,token);
        if(user){
            history.push("/home");
        }

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  //   Sign in with Github
  const signInWithGithub = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        login(user,token)
        if(user){
            history.push("/home");
        }
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GithubAuthProvider.credentialFromError(error);
        console.log(error);
        // ...
      });
  };
  //   Sign in with facebook
  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log(error);
      });
  };

  const errorHandler = (err)=>{

  }
  return (
    <div className="login">
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
          <hr/>
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
              color="secondary"
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
            <Button
              color="secondary"
              variant="contained"
              onClick={signInWithOtp}
            >
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
