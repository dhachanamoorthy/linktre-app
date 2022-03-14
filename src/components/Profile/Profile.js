import { useEffect, useState, useRef } from "react";
import {
  Grid,
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  TextField,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { NavBar } from "../NavBar/NavBar";
import { AlertBox } from "../Alert/AlertBox";
import {
  setStorage,
  getStorage as getLocalStorage,
} from "../../service/storage";
import * as api from "../../service/api";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { STORAGE } from "../../constants/storage.constants";
export function Profile() {
  const user = JSON.parse(getLocalStorage(STORAGE.USER));
  const [isLoading, setIsLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [alert, setAlert] = useState(null);
  const [newUser, setNewUser] = useState(user);
  const [isImageUploading, setisImageUploading] = useState(false);
  let imageEle = useRef(null);
  const handleNameChange = (name) => {
    setNewUser((prevState) => {
      return { ...prevState, ...{ username: name } };
    });
  };
  const handleEmailChange = (email) => {
    setNewUser((prevState) => {
      return { ...prevState, ...{ email: email } };
    });
  };
  const handleMobileChange = (mobile) => {
    setNewUser((prevState) => {
      return { ...prevState, ...{ mobile: mobile } };
    });
  };
  const validateEmail = (email) => {
    var emailRegex =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return emailRegex.test(email);
  };
  const validatePhone = (phone) => {
    var phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };
  const updateUser = async () => {
    const result = await api.updateUser(newUser);
  };
  const selectImage = () => {
    imageEle.current.click();
  };
  const uploadImage = (e) => {
    setisImageUploading(true);
    const fileName = new Date().toISOString() + "-" + user.uuid;
    const storage = getStorage();
    const storageRef = ref(storage, "profile_pic/" + fileName);
    const task = uploadBytesResumable(storageRef, e.target.files[0]);
    task.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        getDownloadURL(task.snapshot.ref).then(async (url) => {
          console.log("File available at", url);
          user.image_url = url;
          console.log(user);
          await updateUser(user);
          setStorage(STORAGE.USER, JSON.stringify(user));
          setAlert({
            message: "Profile Pictured Uploaded",
            type: "success",
          });
          setAlert(null);
          setisImageUploading(false);
        });
      }
    );
  };
  useEffect(() => {
    if (
      (user.username !== newUser?.username ||
        user.mobile !== newUser?.mobile ||
        user.email !== newUser?.email) &&
      validatePhone(newUser?.mobile) &&
      validateEmail(newUser?.email)
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [newUser]);
  return (
    <Grid>
      <NavBar isLoading={isLoading} />
      <input
        type="file"
        id="image"
        ref={imageEle}
        onChange={uploadImage}
        style={{ display: "none" }}
      />
      {alert && <AlertBox message={alert} />}
      <Card>
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar
              src={user?.image_url}
              sx={{
                height: 64,
                mb: 2,
                width: 64,
              }}
            />
            <Typography color="textPrimary" gutterBottom variant="h5">
              {user?.username}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <LoadingButton
            size="small"
            onClick={selectImage}
            fullWidth
            endIcon={<CloudUploadIcon />}
            loading={isImageUploading}
            loadingPosition="end"
            variant="contained"
          >
            Upload Picture
          </LoadingButton>
        </CardActions>
      </Card>
      <Card>
        <CardHeader
          subheader="These valuable informations are protected"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="*username"
                label="Username"
                name="firstName"
                onChange={(e) => handleNameChange(e.target.value)}
                defaultValue={user?.username}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                disabled={user.email ? true : false}
                onChange={(e) => {
                  handleEmailChange(e.target.value);
                }}
                defaultValue={user?.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                disabled={user.mobile ? true : false}
                onChange={(e) => handleMobileChange(e.target.value)}
                defaultValue={user?.mobile}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button
            color="primary"
            variant="contained"
            disabled={btnDisabled}
            onClick={updateUser}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </Grid>
  );
}
