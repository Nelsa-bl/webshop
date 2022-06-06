// Components
import BasketItem from '../basket-item/basket-item';
import Offcanvas from 'react-bootstrap/Offcanvas' 

// Styles
import './basket.styles.scss'

// Types
import { CartItemType } from '../../App';

type Props = {
    cartItems: CartItemType[];
    addToCart: (clikedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
    cartIsOpen: boolean;
    setCartIsOpen: (open: boolean) => void;
};

const Basket: React.FC<Props> = ({ cartItems, addToCart, removeFromCart, cartIsOpen, setCartIsOpen }) => {
    // Total amount
    const calculateTotal = (items: CartItemType[])  => 
    items.reduce((ack: number , item) => ack + item.amount * item.price, 0)

    return (
        <div>
        <Offcanvas placement='end' show={cartIsOpen} onHide={() => setCartIsOpen(false)} > 
            <Offcanvas.Header closeButton>  
                <Offcanvas.Title>
                <div className='total-amount-box'>
                    {cartItems.length === 0 ? 
                        <span className='basket-headline'>Basket </span> : 
                        <div>
                            <span className='basket-headline'>Basket </span>
                             <span className='total-amount-box-left'>Total: </span>
                            <span className='total-amount-box-right'>{calculateTotal(cartItems).toFixed(2)} EUR</span>
                        </div>
                    }   
                </div>               
                </Offcanvas.Title>  
            </Offcanvas.Header>  
            <Offcanvas.Body>  
                {cartItems.length === 0 ? <p>Basket is empty.</p> : null}
                {cartItems.map(item => (
                    <BasketItem 
                        key={item.id}
                        item={item}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                    />
                ))} 
            </Offcanvas.Body>  
        </Offcanvas>              
        </div>
    );
};

export default Basket;