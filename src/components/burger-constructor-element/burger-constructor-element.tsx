import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useAppDispatch } from '../../services/store';
import { moveDown, moveUp } from '../../slices/constructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useAppDispatch();
    const handleMoveDown = () => {
      dispatch(moveDown(ingredient._id));
    };

    const handleMoveUp = () => {
      dispatch(moveUp(ingredient._id));
    };

    const handleClose = () => {};

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
