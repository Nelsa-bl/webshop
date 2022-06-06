import { useState, lazy, Suspense } from 'react';
import { useQuery } from 'react-query';
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

// Components
import Container from "react-bootstrap/Container";
import { Spinner } from 'react-bootstrap';
import { HashRouter as BrowserRouter, Routes, Route, } from "react-router-dom";
const Basket = lazy(() => import('./components/basket/basket'));
const Header = lazy(() => import('./components/header/header'));
const ProductDetails = lazy(() => import('./components/product-details/product-details'));
const ShopPage = lazy(() => import('./components/products/products'));

// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const App = () => {

    // Api get products
    const getProducts = async (): Promise<CartItemType[]> => {
      return await (await fetch('https://fakestoreapi.com/products')).json();
    }
  
    // Get ptoducts
    const { data, isLoading, error } = useQuery<CartItemType[]>(
      'products',
      getProducts
      );
      
    // State for basket
    const [cartIsOpen, setCartIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([] as CartItemType[]);

    // Search
    const [search, setSearch]: [string, (search: string) => void] = useState("");

    // Search onChange new value
    const handleChange = (e: { target: { value: string; }; }) => {
      setSearch(e.target.value);
    };

    // Total basket items
    const getTotalItems = (items: CartItemType[]) => 
      items.reduce((ack: number, item) => ack + item.amount, 0);

    // Add to basket
    const handleAddToCart = (clikedItem: CartItemType) => {
      setCartItems(prev => {
        const isItemInBasket = prev.find(item => item.id === clikedItem.id )

        if(isItemInBasket) {
          return prev.map(item => (
            item.id === clikedItem.id ? { ...item, amount: item.amount + 1 } : item
          ))
        }
        // First time called
        return [...prev, {...clikedItem, amount: 1 }];
      });
    };

    // Remove form Basket
    const handleRemoveFromCart = (id: number) => {
      setCartItems(prev => (
        prev.reduce((ack, item) => {
          if(item.id === id) {
            if(item.amount === 1) return ack;
            return [...ack, {...item, amount: item.amount - 1}]
          }
          else {
            return [...ack, item];
          }
        }, [] as CartItemType[])
      ))
    };

  return (
    <Suspense fallback={<Spinner animation={'border'} />}>
      <BrowserRouter>

      <Header 
          setCartIsOpen={setCartIsOpen} 
          getTotalItems={getTotalItems(cartItems)} 
          />

      <Container>   
        {/* Bsket Drawer   */}  
        <Basket 
          cartItems={cartItems} 
          addToCart={handleAddToCart} 
          removeFromCart={handleRemoveFromCart}
          cartIsOpen={cartIsOpen}
          setCartIsOpen={setCartIsOpen}   
        />  
      </Container>

        <Routes>
          <Route path="/" element={<ShopPage 
          addToCart={handleAddToCart} 
          cartItems={cartItems} 
          search={search} 
          handleChange={handleChange} 
          data={data}
          isLoading={isLoading}
          error={error} />} />

          <Route path="products/:id" element={<ProductDetails 
          addToCart={handleAddToCart}
          cartItems={cartItems} 
          search={search} 
          handleChange={handleChange} 
          data={data}
          isLoading={isLoading}
          error={error}/>} />

          <Route
          path="*" element={
          <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
          </main>
          }/>
        </Routes>

      </BrowserRouter>
      </Suspense>
  );
}

export default App;
