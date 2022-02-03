import { useEffect, useState } from "react";
import "./Login.scss";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../../service/firebase-config";
export function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(null);
  const [phoneErr, setPhoneErr] = useState(null);
  const [otpErr, setOtpErr] = useState(null);
  const checkPhone = (e) => {
    if (!phone) {
      setPhoneErr("Valid Mobile  Number Required!!");
    } else if (phone.length === 10) {
      onSignInSubmit(e);
    } else {
      setPhoneErr(null);
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
  let confirmationResult = null;
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
      console.log(error);
    }
  };
  //   Sign in with otp
  const signInWithOtp = async () => {
    const code = otp;
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
        console.log(user);
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
  return (
    <div className="login">
      <div className="container">
        <div className="title">Welcome To LinkTre</div>
        <hr></hr>
        <div className="form">
          <div id="sign-in-button"></div>
          <div className="form-control">
            <label>Enter Mobile Number</label>
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></input>
            <button onClick={checkPhone}>Send</button>
            <span className="error" id="auth-id-err">
              {phoneErr}
            </span>
          </div>
          <div className="form-control">
            <input
              type="text"
              placeholder="OTP"
              onChange={(e) => setOtp(e.target.value)}
            ></input>
            <button onClick={signInWithOtp}>Verify</button>
            <span className="error">{otpErr}</span>
          </div>
          <div className="form-control">
            <label style={{ textAlign: "center" }}>or</label>
            <button onClick={signInWithGoogle}>Google</button>
            <button onClick={signInWithGithub}>GitHub</button>
            <button onClick={signInWithFacebook}>Facebook</button>
          </div>
        </div>
      </div>
    </div>
  );
}
