import Button from '../../ui/Button';
import { decreaseItemQunatity, increaseItemQuantity } from './cartSlice';
import { useDispatch } from 'react-redux';

function UpdateQuantity({ pizzaID, currentQuantity }) {
  const dispatch = useDispatch();

  function handleQunatityIncrement() {
    dispatch(increaseItemQuantity(pizzaID));
  }

  function handleQunatityDecrement() {
    dispatch(decreaseItemQunatity(pizzaID));
  }

  return (
    <div className="flex items-center gap-4">
      <div className="space-x-2">
        <Button type={'round'} onClick={handleQunatityIncrement}>
          +
        </Button>
        <span>{currentQuantity}</span>
        <Button type={'round'} onClick={handleQunatityDecrement}>
          -
        </Button>
      </div>
    </div>
  );
}

export default UpdateQuantity;
