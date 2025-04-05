import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { showError } from '../helpers';

const Login = () => {
  const handleLoginSuccess = async (credentialResponse) => {
    window.location.href = 'http://localhost:4000/api/auth/google/login';
  };

  return (
    <GoogleOAuthProvider clientId='299282953393-kn18d7es4lst9shrbp36eoskvgm04maf.apps.googleusercontent.com'>
      <div className='login'>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => showError('Login Failed')}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;