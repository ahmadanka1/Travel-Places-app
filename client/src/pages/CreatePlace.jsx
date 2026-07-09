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
            toast.success('Place Posted!', {
                className: '!border-l-4 !border-l-moss',
            });
            navigate(`/places/${response.data._id}`); // redirect to the new place's detail page
        } catch (err) {
            toast.error('Failed to create place');
            setError('Failed to create place', {
                className: '!border-l-4 !border-l-terracotta',
            });
        }
    };

    if (!user) return <p>You must be logged in to create a place.</p>;

    return (
        <div className="max-w-xl mx-auto px-6 py-10">
            <h1 className="font-display text-3xl font-semibold text-ink mb-6">
                Add a Place
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Enter Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="border border-stone/40 rounded-lg px-4 py-2 bg-parchment focus:outline-none focus:border-moss"
                />

                <textarea
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={4}
                    className="border border-stone/40 rounded-lg px-4 py-2 bg-parchment focus:outline-none focus:border-moss resize-none"
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border border-stone/40 rounded-lg px-4 py-2 bg-parchment focus:outline-none focus:border-moss"
                >
                    <option value="" disabled>Category</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="hike">Hike</option>
                    <option value="landmark">Landmark</option>
                    <option value="activity">Activity</option>
                </select>

                <input
                    type="text"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="border border-stone/40 rounded-lg px-4 py-2 bg-parchment focus:outline-none focus:border-moss"
                />

                <input
                    type="url"
                    placeholder="Paste image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="border border-stone/40 rounded-lg px-4 py-2 bg-parchment focus:outline-none focus:border-moss"
                />

                {error && <p className="text-terracotta text-sm">{error}</p>}

                <button
                    type="submit"
                    className="bg-moss text-parchment px-5 py-2.5 rounded-full hover:bg-moss/90 transition-colors mt-2"
                >
                    Create Place
                </button>
            </form>
        </div>
    );
};

export default CreatePlace;