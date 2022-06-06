// Components
import { Link } from "react-router-dom";
import { Row, Col, Container } from 'react-bootstrap';
import Card from "react-bootstrap/Card";
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert'
import Searchs from "../search/search";

// Styles
import './products.styles.scss'

// Types
import { CartItemType } from "../../App";

type Props = {
    cartItems: CartItemType[];
    data: CartItemType[] | undefined;
    isLoading: boolean;
    error: any;
    addToCart: (clikedItem: CartItemType) => void;
    search: string;
    handleChange: (e: { target: { value: string; } }) => void;
};

const ShopPage: React.FC<Props> = ({ cartItems, addToCart, search, handleChange, data, isLoading, error }) => {


    // When loading
    if (isLoading) return <Spinner animation={'border'} />;

    // If error
    if (error) return <Alert variant="danger">Someting went wrong!</Alert>
        
        return (
            <div className="shop-page">
                <Container>
                    <Searchs handleChange={handleChange}/>
                    <Row>
                        {data?.filter(   
                        s => s.title.toLowerCase().includes(search.toLocaleLowerCase()) || 
                        s.description.toLowerCase().includes(search.toLocaleLowerCase()))
                        .map(item => (
                            <Col item key={item.id} xs={12} sm={6} md={4} lg={3}>
                                <CardGroup>
                                    <Card>
                                        <div className='imageHolder'>
                                            <Card.Img className="img-fluid" variant="top" src={`${item.image}`} alt={`${item.title}`} />
                                        </div>

                                        <Card.Body>
                                            <Card.Title>
                                                <Link to={`/products/${item.id}`} >{item.title} </Link>                              
                                            </Card.Title>
                                            <span className='price'>{item.price} EUR</span>
                                            {/* <Card.Text>
                                            {item.description}
                                            </Card.Text> */}
                                        </Card.Body>
                                        <span className='category-box'>{item.category}</span>
                                        <Card.Footer>
                                            <Button className='addToBasket-btn' variant="primary" onClick={() => addToCart(item)}>Add to basket</Button>
                                        </Card.Footer>
                                            
                                    </Card>
                                </CardGroup>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        )
    
}

export default ShopPage;