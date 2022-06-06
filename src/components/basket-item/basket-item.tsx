// Components
import Button from 'react-bootstrap/Button'

// Styles
import './basket-item.styles.scss'; 

// Types
import { CartItemType } from '../../App';

type Props = {
    item: CartItemType;
    addToCart: (clikedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

const BasketItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
    
    <div className='basket-item'>
        <div className='basket-item-image'>
            <img src={`${item.image}`} alt={`${item.title}`} />
        </div>

        <span className='title'>{item.title}</span>
        <span className='price'>{item.price} EUR</span>

        <div className='btn_add_remove'>
            <Button className='reduce-btn' variant="primary" onClick={() => removeFromCart(item.id)}>-</Button>
            <span className='amount'>{item.amount}</span>
            <Button className='add-btn' variant="primary" onClick={() => addToCart(item)}>+</Button>
        </div>
        
        <div className='total'>
            <div className='total-left float-start'>
                Sub total: 
            </div>
            <div className='total-right float-end'>
                {(item.amount * item.price).toFixed(2)} EUR
            </div>
        </div>          
    </div>
);

export default BasketItem;