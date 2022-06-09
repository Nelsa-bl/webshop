// Components
import { useParams } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert'

// Styles
import './product-details.styles.scss'

// Types
import { CartItemType } from "../../App";

type Props = {
    data: CartItemType[] | undefined;
    isLoading: boolean;
    error: any;
    addToCart: (clikedItem: CartItemType) => void;
};

const ProductDetails: React.FC<Props> = ({ addToCart, data, isLoading, error }) => {
    
    // Get slug and convert to num
    const { id } = useParams() as { 
        id: string;
      }

      const n = Number(id);

    // When loading
    if (isLoading) return <Spinner animation={'border'} />;

    // If error
    if (error) return <Alert variant="danger">Someting went wrong!</Alert>
        
        return (
            <div className="shop-page-details">
                <Container>
                    <Row>
                        {data?.filter(   
                        s => s.id === n)
                        .map(item => (
                            <Col item key={item.id} xs={12} sm={12}>
                                <Row>
                                    <Col xs={12} md={6}>
                                        <div className='image-box'>
                                            <img className='img-fluid' src={`${item.image}`} alt={`${item.title}`}/>
                                        </div>
                                    </Col>
                                    <Col xs={12} sm={6}>
                                        <div className='info-box'>
                                            <span className='title'>{item.title}</span>
                                            <span className='category'>{item.category}</span>
                                            <span className='price'>{item.price} EUR</span>
                                            <span className='desc'>{item.description}</span>
                                            <div className='btn-box'>
                                            <Button className='addToBasket-btn' variant="primary" onClick={() => addToCart(item)}>Add to basket</Button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        ))}
                    </Row>
                </Container> 
            </div>
        )
    
}
    
export default ProductDetails;