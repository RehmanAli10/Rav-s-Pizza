import { Outlet, useNavigation } from 'react-router-dom';
import LoadingIndicator from './LoadingIndicator';
import CartOverview from '../features/cart/CartOverview';
import Header from './Header';
import { useSelector } from 'react-redux';

function AppLayout() {
  const data = useSelector((store) => store.cart);

  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <LoadingIndicator />}

      <Header />
      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl ">
          <Outlet />
        </main>
      </div>

      {data.cart.length > 0 && <CartOverview />}
    </div>
  );
}

export default AppLayout;
