import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import UpdateQuantity from './UpdateQuantity';
import { getCurrentQuantityById } from './cartSlice';
import { useSelector } from 'react-redux';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantityById);

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between ">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <div className="flex gap-4">
          <UpdateQuantity pizzaId={pizzaId} currentQuantity={currentQuantity} />
          <Button type={'small'}>Delete</Button>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
