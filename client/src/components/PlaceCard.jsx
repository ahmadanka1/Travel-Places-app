import { Link } from 'react-router-dom';

const PlaceCard = ({ place }) => {
    return (
        <div>
            <Link to={`/places/${place._id}`}>
                <h3>{place.title}</h3>
            </Link>
            <p>{place.category}</p>
            <p>{place.location}</p>
        </div>
    );
};

export default PlaceCard;