// Styles
import './search.styles.scss'

type Props = {
    handleChange: (e: { target: { value: string; } }) => void;
}

const SearchItem: React.FC<Props> = ({ handleChange }) => (

        <div className="shop-page">
                <input type="search"
          // Onchange set new state by taking input value
           onChange={handleChange}
          className="searchInput" 
          placeholder="Search products" />
    </div>
);

export default SearchItem;