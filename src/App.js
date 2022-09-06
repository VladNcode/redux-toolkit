import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import { calcTotal, getCartItems } from './features/cart/cartSlice';
import Modal from './components/Modal';

function App() {
	const { cartItems, isLoading } = useSelector(store => store.cart);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(calcTotal());
	}, [cartItems, dispatch]);

	useEffect(() => {
		dispatch(getCartItems());
	}, []);

	const { isOpen } = useSelector(state => state.modal);

	if (isLoading) {
		return (
			<div className="loading">
				<h1>Loading...</h1>
			</div>
		);
	}

	return (
		<main>
			{isOpen && <Modal />}
			<Navbar />
			<CartContainer />
		</main>
	);
}
export default App;
