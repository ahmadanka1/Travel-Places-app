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
        <div className="max-w-6xl mx-auto px-6 py-8">
            <h1 className="font-display text-3xl font-semibold text-ink mb-6">Explore Places</h1>

            {places.length === 0 ? (
                <p classname="text-stone">No places posted yet. Be the first!</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {places.map((place) => (
                        <PlaceCard key={place._id} place={place} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Feed;