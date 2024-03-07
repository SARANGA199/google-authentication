import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Link as MuiLink, Avatar, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { getGoogleUrl } from '../utils/getGoogleUrl.ts';

const LoginPage = () => {
  const location = useLocation();
  let from = ((location.state as any)?.from?.pathname as string) || '/';
  const [authCode, setAuthCode] = useState<string | null>(null); // State to hold the auth code
  const [userData, setUserData] = useState<any>(null); // State to hold user data

  useEffect(() => {
    // Function to parse the URL and extract the auth code
    const parseUrlParams = () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      setAuthCode(code);
    };

    // Check if the URL contains the auth code
    if (window.location.search.includes('code=')) {
      parseUrlParams();
    }
  }, []);

  const handleGoogleLogin = () => {
    const googleUrl = getGoogleUrl(from); 
    window.location.href = googleUrl;
  };

  const handleFetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/google/auth/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({
          auth_code: authCode,
        }),
      });
      const userData = await response.json();
      setUserData(userData);
      console.log('User data:', userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#2363eb' }}>
      <Box width='27rem'>
        <Typography variant='h6' component='p' sx={{ my: '1.5rem', textAlign: 'center', color: 'white' }}>
          Login with Google to continue
        </Typography>
        <Box width='100%' sx={{ backgroundColor: '#e5e7eb', p: { xs: '1rem', sm: '2rem' }, borderRadius: 2 }}>
          <MuiLink
            onClick={handleGoogleLogin}
            sx={{
              backgroundColor: '#f5f6f7',
              borderRadius: 1,
              py: '0.6rem',
              columnGap: '1rem',
              textDecoration: 'none',
              color: '#393e45',
              cursor: 'pointer',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: '#fff',
                boxShadow: '0 1px 13px 0 rgb(0 0 0 / 15%)',
              },
            }}
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            Google
          </MuiLink>

     
          <Box sx={{ height: '3rem' }}></Box>


          {authCode && (
            <MuiLink
              onClick={handleFetchUserData}
              sx={{
                color: '#000',
                cursor: 'pointer',
                display: 'inline-block',
                textDecoration: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                backgroundColor: '#f5f6f7',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: '#fff',
                  boxShadow: '0 1px 13px 0 rgb(0 0 0 / 15%)',
                },
              }}
            >
              Show user details
            </MuiLink>
)}
        </Box>
        {userData && (
          <Box mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Paper sx={{ p: 2, maxWidth: 400 }}>
              <Avatar alt={userData.Name} src={userData.Picture} sx={{ width: 100, height: 100, margin: 'auto' }} />
              <Typography variant="h6" align="center">{userData.Name}</Typography>
              <Typography variant="subtitle1" align="center">{userData.Email}</Typography>
            </Paper>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default LoginPage;
