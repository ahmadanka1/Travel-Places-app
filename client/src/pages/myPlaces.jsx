import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import PlaceCard from '../components/PlaceCard';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

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
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="font-display text-3xl font-semibold text-ink mb-6">
        My Places
      </h1>

      {places.length === 0 ? (
        <p className="text-stone">
          You haven't posted any places yet.{' '}
          <Link to="/create" className="text-moss underline">
            Create your first one
          </Link>
          .
        </p>
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

export default MyPlaces;