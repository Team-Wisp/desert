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
    <div className="w-1/2 flex flex-col justify-center items-center bg-[#F5F5F5] px-12 space-y-6">
      {!isLoggedIn ? (
        <>
          <Button onClick={onSignup}>Sign Up</Button>
          <Button onClick={onLogin} variant="secondary">
            Log In
          </Button>
        </>
      ) : (
        <Button onClick={onLogout} variant="danger">
          Logout
        </Button>
      )}
    </div>
  );
};

export default LandingRight;
