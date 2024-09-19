import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/store';

interface ProtectedRouteProps {
  children: ReactNode;
  anonymous?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  anonymous = false
}) => {
  const isLoggedIn = useAppSelector((store) => store.user.isLoggedIn);

  const location = useLocation();
  const from = location.state?.from || '/';

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
