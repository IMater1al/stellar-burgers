import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '../../services/store';
import { userSelector } from '../../slices/userSlice';

export const AppHeader: FC = () => {
  const user = useAppSelector(userSelector);
  return <AppHeaderUI userName={user.name} />;
};
