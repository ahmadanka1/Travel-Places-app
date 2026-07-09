import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import PlaceCard from '../components/PlaceCard';
import { useAuth } from '../context/AuthContext';

const MyPlaces = () => {
  const { user } = useAuth();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axiosInstance.get('/places');
        // filter response.data down to only this user's places
        const myplaces = response.data.filter(
            (place) => place.createdBy.toString() === user._id.toString()
        );
        setPlaces(myplaces);
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
      <h1>My Places</h1>
      {places.length === 0 ? (
        <p>You haven't posted any places yet.</p>
      ) : (
        places.map((place) => <PlaceCard key={place._id} place={place} />)
      )}
    </div>
  );
};

export default MyPlaces;