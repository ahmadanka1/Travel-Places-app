import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const PlaceDetail = () => {
    const { id } = useParams(); // get the :id param from the URL
    const { user } = useAuth();
    const [place, setPlace] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState('');
    const [rating, setrating] = useState(5);
    const navigate = useNavigate();

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
            toast.success('comment posted!');
        } catch (error) {
            toast.error('Failed to comment');
            console.error(error);
        }
    }

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this place?')) return;
        try {
            await axiosInstance.delete(`/places/${id}`);
            toast.success('Place deleted');
            navigate('/');
        } catch (error) {
            toast.error('Failed to delete place');
            console.error(error);
        }
    }

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm('Delete this comment?')) return;
        try {
            await axiosInstance.delete(`/places/comments/${commentId}`);
            setComments(comments.filter((c) => c._id !== commentId));
            toast.success('Comment deleted');
        } catch (error) {
            toast.error('Failed to delete comment');
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
                    {user && comment.user._id.toString() === user._id.toString() && <button onClick={() => handleDeleteComment(comment._id)}>Delete Comment</button>}
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

            {user && place.createdBy.toString() === user._id.toString() && (
                <>
                    <Link to={`/places/${id}/edit`}>Edit Place</Link>
                    <button onClick={handleDelete}>Delete Place</button>
                </>
            )}
        </div>
    );
};

export default PlaceDetail;