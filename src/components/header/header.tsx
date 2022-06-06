// Components
import { Link } from "react-router-dom";
import Badge from 'react-bootstrap/Button'
import Container from "react-bootstrap/Container";

// Styles
import './header.styles.scss'

// Assets
import { ReactComponent as Logo } from '../../assets/logoipsum.svg'
import basketIcon from '../../assets/basket_icon.png';

type Props = {
    setCartIsOpen: (open: boolean) => void;
    getTotalItems: number;
}

const Header: React.FC<Props> = ({ setCartIsOpen, getTotalItems }) => (
    <div className="header">
        <Container>
            {/* Logo */}
            <Link to={`/`} ><Logo className="logo"/></Link>
                     
            {/* Basket btn */}
            <div className='float-end minibasket-btn' onClick={() => setCartIsOpen(true)} >  
                <span className='title'>Basket</span> 
                <img className='basket-icon' src={basketIcon} alt='basket'/> 
                <Badge className='badge'>{getTotalItems}</Badge>  
            </div>
        </Container>
    </div>
);

export default Header;