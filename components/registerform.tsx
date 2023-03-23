import React, { useState } from "react";
import { authUtils } from "../firebase/auth.utils";
import { FormEvent } from "react";
import { useRouter } from 'next/router'
import { FirebaseError } from "firebase/app";
import {
  Container,
  Button,
  Grid,
  Paper,
  TextField,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Register: React.FC = () => {
  const [values, setValues] = useState<{
    showPass: boolean;
  }>({
    showPass: false,
  });

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const router = useRouter()
  const handleForm = async (event: FormEvent) => {
      event.preventDefault()
      await authUtils.register(email, password);
      return router.push("/home")
  }

  const handlePassVisibilty = () => {
    setValues({
      ...values,
      showPass: !values.showPass,
    });
  };

  return (
    <Box sx={{
      paddingTop: "75px",
      paddingBottom: "75px",
      height: "70%",
    }}>
      <Container sx={{
        borderRadius:"15px",
        backgroundColor: "whitesmoke",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: "600px",
        maxWidth: "100%",
      }} >
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          style={{ minHeight: "80vh" }}
        >
          <Grid item xs={6}>
            <Paper elevation={1} sx={{ padding: 5, marginRight:"30px", marginLeft:"50px" }}>
              <form onSubmit={handleForm}>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <TextField
                      type="email"
                      fullWidth
                      label="Enter your email"
                      placeholder="Email Address"
                      variant="outlined"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>

                  <Grid item>
                    <TextField
                      type={values.showPass ? "text" : "password"}
                      fullWidth
                      label="Password"
                      placeholder="Password"
                      variant="outlined"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handlePassVisibilty}
                              aria-label="toggle password visibility"
                              edge="end"
                            >
                              {values.showPass ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item>
                    <Button type="submit" fullWidth variant="contained">
                      Register
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <img src="./img/Zamek_pce_2.jpg" alt="description_of_your_image" style={{ width: "90%", height: "auto", }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Register;