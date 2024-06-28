import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="Header"> 
            <ul>
                <li><Link to={'/'}>Movie List</Link></li>
                <li><Link to={'/favourites'}>Favorite</Link></li>
                <li>Add Movie</li>
            </ul>
        </div>
    );
}


export default Header;