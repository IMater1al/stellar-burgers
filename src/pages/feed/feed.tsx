import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchFeeds, ordersSelector } from '../../slices/orderSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useAppDispatch();
  const orders: TOrder[] = useAppSelector(ordersSelector);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeeds());
      }}
    />
  );
};
