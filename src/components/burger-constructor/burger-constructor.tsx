import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  bunSelector,
  ingredientsSelector
} from '../../slices/constructorSlice';
import {
  fetchOrderBurger,
  orderModalDataSelector,
  orderRequestSelector
} from '../../slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { userSelector } from '../../slices/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(userSelector);

  const bun = useAppSelector(bunSelector);
  const ingredients = useAppSelector(ingredientsSelector);
  const orderRequest = useAppSelector(orderRequestSelector);
  const orderModalData = useAppSelector(orderModalDataSelector);

  const constructorItems = {
    bun: bun,
    ingredients: ingredients || []
  };

  const orderIngredients = [...ingredients, bun!, bun!];

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user.name) return navigate('/login');

    dispatch(fetchOrderBurger(orderIngredients.map((ing) => ing?._id)));
  };

  const closeOrderModal = () => {
    navigate('/feed');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
