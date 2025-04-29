import React from 'react';
import { useRouter } from 'next/router';

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleSignUp = () => {
    router.push('/signup'); // Redirect to the signup page
  };

  const handleLogin = () => {
    router.push('/login'); // Redirect to the login page
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Home Page</h1>
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={handleSignUp}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Sign Up
        </button>
        <button
          onClick={handleLogin}
          style={{
            padding: '10px 20px',
            backgroundColor: '#008CBA',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default HomePage;