// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @next/next/no-img-element */
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { FirebaseError } from 'firebase/app';
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';

import { authUtils } from '../firebase/auth.utils';

const Login: React.FC = () => {
  const [values, setValues] = useState<{
    showPass: boolean;
  }>({
    showPass: false,
  });

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter();

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await authUtils.login(email, password);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push('/home');
    } catch (error) {
      const err = error as FirebaseError;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions, no-alert
      err.code === 'auth/user-not-found' && alert('User not found');
    }
  };

  const handlePassVisibilty = () => {
    setValues({
      ...values,
      showPass: !values.showPass,
    });
  };

  return (
    <Box
      sx={{
        paddingTop: '75px',
        paddingBottom: '75px',
        height: '70%',
      }}
    >
      <Container
        sx={{
          borderRadius: '15px',
          backgroundColor: 'whitesmoke',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '600px',
          maxWidth: '100%',
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          style={{ minHeight: '80vh' }}
        >
          <Grid item xs={6}>
            <Paper
              elevation={1}
              sx={{ padding: 5, marginRight: '30px', marginLeft: '50px' }}
            >
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
                      type={values.showPass ? 'text' : 'password'}
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
                      Sign In
                    </Button>
                  </Grid>
                </Grid>
                <Box sx={{ marginTop: '5px' }}>
                  <Typography align="center">
                    Nemáte účet?
                    <Link
                      sx={{ marginLeft: '5px' }}
                      href="/register"
                      underline="none"
                    >
                      Registrovat
                    </Link>
                  </Typography>
                </Box>
              </form>
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <img
              src="./img/Zamek_pce_2.jpg"
              alt="description_of_your_image"
              style={{ width: '90%', height: 'auto' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// eslint-disable-next-line import/no-default-export
export default Login;
