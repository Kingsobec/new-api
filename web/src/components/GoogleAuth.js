import React from 'react';

const Login = () => {
  const handleGoogleLogin = () => {
    // Redirect to your Go backend to start Google OAuth
    window.location.href =
      'https://71c4-197-210-79-131.ngrok-free.app/api/auth/google/login';
  };

  return (
    <div className='flex justify-center mt-10'>
      <button
        onClick={handleGoogleLogin}
        className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow'
      >
        Login with Google
      </button>
    </div>
  );
};

export default Login;
