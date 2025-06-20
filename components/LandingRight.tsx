import Button from './Button';

interface LandingRightProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
}

const LandingRight: React.FC<LandingRightProps> = ({
  isLoggedIn,
  onLogin,
  onSignup,
  onLogout,
}) => {
  return (
    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center h-full bg-white px-8 lg:px-16 space-y-8 min-h-[50vh] lg:min-h-screen">
      {!isLoggedIn ? (
        <>
          <Button onClick={onSignup} variant="primary" size="large">Sign Up</Button>
          <Button onClick={onLogin} variant="secondary" size="large">Log In</Button>
        </>
      ) : (
        <Button onClick={onLogout} variant="danger" size="large">Logout</Button>
      )}
    </div>
  );
};

export default LandingRight;
