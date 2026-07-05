import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import PlaceCard from '../components/PlaceCard';

const Feed = () => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await axiosInstance.get('/places');
                setPlaces(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaces();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            {places.map((place) => (
                <PlaceCard key={place._id} place={place} />
            ))}
        </div>
    );
};

export default Feed;