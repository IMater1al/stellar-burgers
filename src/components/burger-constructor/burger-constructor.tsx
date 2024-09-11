import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppSelector } from '../../services/store';
import {
  bunSelector,
  ingredientsSelector,
  orderModalDataSelector,
  orderRequestSelector
} from '../../slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  const bun = useAppSelector(bunSelector);
  const ingredients = useAppSelector(ingredientsSelector);
  const orderRequest = useAppSelector(orderRequestSelector);
  const orderModalData = useAppSelector(orderModalDataSelector);

  const constructorItems = {
    bun: bun,
    ingredients: ingredients || []
  };

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

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
