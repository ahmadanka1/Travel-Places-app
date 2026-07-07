import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const CreatePlace = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!category) {
                setError('Please select a category');
                return;
            }
            const response = await axiosInstance.post('/places', {
                title,
                description,
                category,
                location,
                images: [imageUrl], // wrap single URL in an array
            });
            toast.success('Place Posted!');
            navigate(`/places/${response.data._id}`); // redirect to the new place's detail page
        } catch (err) {
            toast.error('Failed to create place');
            setError('Failed to create place');
        }
    };

    if (!user) return <p>You must be logged in to create a place.</p>;

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
            <button type="submit">Create Place</button>
        </form>
    );
};

export default CreatePlace;