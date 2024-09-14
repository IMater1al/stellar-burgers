import { Preloader } from '@ui';
import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { isLoadingSelector, userSelector } from '../../slices/userSlice';

interface ProtectedRouteProps {
  children: ReactNode;
  onlyUnAuth?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth
}) => {
  const isLoading = useAppSelector(isLoadingSelector);
  const user = useAppSelector(userSelector);

  if (isLoading) {
    return <Preloader />;
  }

  if (!user.name && onlyUnAuth) {
    return <Navigate replace to='/login' />;
  }

  if (!onlyUnAuth && user.name) {
    return <Navigate replace to='/' />;
  }

  return children;
};
