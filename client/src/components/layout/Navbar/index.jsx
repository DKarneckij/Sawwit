import NavbarLoggedOut from '@layout/navbar/NavbarLoggedOut';
import NavbarLoggedIn from '@layout/navbar/NavbarLoggedIn';
import { useAuth } from '@contexts/authContext';

const Navbar = () => {
  const { user, loading } = useAuth();

  if (loading) return null; // or a loading spinner
  return user ? <NavbarLoggedIn /> : <NavbarLoggedOut />;
};

export default Navbar;
