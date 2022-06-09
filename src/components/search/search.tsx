// Styles
import './search.styles.scss'

type Props = {
    search: string;
    handleChange: (e: { target: { value: string; } }) => void;
}

const SearchItem: React.FC<Props> = ({ handleChange, search }) => (

        <div className="shop-page">
                <input type="search"
          // Onchange set new state by taking input value
           onChange={handleChange}
           value={search}
          className="searchInput" 
          placeholder="Search products" />
    </div>
);

export default SearchItem;