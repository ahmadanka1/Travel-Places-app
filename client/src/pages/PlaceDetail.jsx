import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';

const PlaceDetail = () => {
    const { id } = useParams(); // get the :id param from the URL
    const { user } = useAuth();
    const [place, setPlace] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState('');
    const [rating, setrating] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const placeRes = await axiosInstance.get(`/places/${id}`);
                const commentsRes = await axiosInstance.get(`/places/${id}/comments`);

                setPlace(placeRes.data);
                setComments(commentsRes.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]); // make the page refresh or fetch whenever id changes

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post(`/places/${id}/comments`, { text, rating });
            const commentsRes = await axiosInstance.get(`/places/${id}/comments`);

            setComments(commentsRes.data);
            setText('');

        } catch (error) {
            console.error(error);
        }
    }

    if (loading) return <p>Loading...</p>;
    if (!place) return <p>Place not found</p>;

    return (
        <div>
            <h1>{place.title}</h1>
            <p>{place.category}</p>
            <p>{place.location}</p>
            <p>{place.description}</p>

            <h2>Comments</h2>
            {comments.map((comment) => (
                <div key={comment._id}>
                    <strong>{comment.user.name}</strong>: {comment.text} ({comment.rating}/5)
                </div>
            ))}
            {user ? (
                <form onSubmit={handleCommentSubmit}>
                    <input
                        type="text"
                        placeholder="Type a comment"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <button type="submit">Post Comment</button>
                </form>
            ) : (
                <p>Log in to leave a comment.</p>
            )}
        </div>
    );
};

export default PlaceDetail;