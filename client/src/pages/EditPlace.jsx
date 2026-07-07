import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const EditPlace = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const response = await axiosInstance.get(`/places/${id}`);
                const place = response.data;

                // pre-fill each piece of state with the fetched place's data
                setTitle(place.title);
                setDescription(place.description);
                setCategory(place.category);
                setLocation(place.location);
                setImageUrl(place.images?.[0] || ''); // grab the first image if it exists, else empty string

                // ownership check — redirect if this user didn't create the place
                if (place.createdBy.toString() !== user?._id?.toString()) {
                    navigate('/');
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlace();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!category) {
            setError('Please select a category');
            return;
        }
        try {
            await axiosInstance.put(`/places/${id}`, {
                title,
                description,
                category,
                location,
                images: [imageUrl],
            });
            toast.success('Place updated!');
            navigate(`/places/${id}`); // redirect after a successful edit
        } catch (err) {
            toast.error('Failed to update place');
            setError('Failed to update place');
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Enter Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required />

            <textarea placeholder='Enter Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required />

            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="" disabled>Category</option>
                <option value={'restaurant'}>Restaurant</option>
                <option value={'hike'}>Hike</option>
                <option value={'landmark'}>Landmark</option>
                <option value={'activity'}>Activity</option>
            </select>

            <input type='text' placeholder='Enter location' value={location}
                onChange={(e) => setLocation(e.target.value)}
                required />

            <input type='url' placeholder='paste image url' value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
            />

            {error && <p>{error}</p>}
            <button type="submit">Edit Place</button>
        </form>
    );
};

export default EditPlace;