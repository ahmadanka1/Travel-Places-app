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
            toast.success('Place updated!', {
                className: '!border-l-4 !border-l-moss',
            });
            navigate(`/places/${id}`); // redirect after a successful edit
        } catch (err) {
            toast.error('Failed to update place', {
                className: '!border-l-4 !border-l-terracotta',
            });
            setError('Failed to update place');
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="max-w-xl mx-auto px-6 py-10">
            <h1 className="font-display text-3xl font-semibold text-ink mb-6">
                Edit Place
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
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditPlace;