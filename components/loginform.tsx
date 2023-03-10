import React, { useState } from "react";
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

const Login: React.FC = () => {
  const [values, setValues] = useState<{
    email: string;
    pass: string;
    showPass: boolean;
  }>({
    email: "",
    pass: "",
    showPass: false,
  });

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
              <form>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <TextField
                      type="email"
                      fullWidth
                      label="Enter your email"
                      placeholder="Email Address"
                      variant="outlined"
                      required
                      value={values.email}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          email: e.target.value,
                        })
                      }
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
                      value={values.pass}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          pass: e.target.value,
                        })
                      }
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
                      Sign In
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

export default Login;