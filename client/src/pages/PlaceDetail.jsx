import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { MapPin } from 'lucide-react';

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
            toast.success('comment posted!', {
                className: '!border-l-4 !border-l-moss',
            });
        } catch (error) {
            toast.error('Failed to comment', {
                className: '!border-l-4 !border-l-terracotta',
            });
            console.error(error);
        }
    }

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this place?')) return;
        try {
            await axiosInstance.delete(`/places/${id}`);
            toast.success('Place deleted', {
                className: '!border-l-4 !border-l-moss',
            });
            navigate('/');
        } catch (error) {
            toast.error('Failed to delete place', {
                className: '!border-l-4 !border-l-terracotta',
            });
            console.error(error);
        }
    }

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm('Delete this comment?')) return;
        try {
            await axiosInstance.delete(`/places/comments/${commentId}`);
            setComments(comments.filter((c) => c._id !== commentId));
            toast.success('Comment deleted', {
                className: '!border-l-4 !border-l-moss',
            });
        } catch (error) {
            toast.error('Failed to delete comment', {
                className: '!border-l-4 !border-l-terracotta',
            });
            console.error(error);
        }
    }

    if (loading) return <p>Loading...</p>;
    if (!place) return <p>Place not found</p>;

    return (
        <div className="max-w-3xl mx-auto px-6 py-10">
            <span className="inline-block text-xs uppercase tracking-wide text-moss border border-dashed border-moss rounded-full px-3 py-0.5 mb-3">
                {place.category}
            </span>

            <h1 className="font-display text-4xl font-semibold text-ink mb-2">
                {place.title}
            </h1>

            <p className="flex items-center gap-1 text-stone mb-6">
                <MapPin size={16} />
                {place.location}
            </p>

            <p className="text-ink leading-relaxed mb-8">{place.description}</p>

            {user && place.createdBy.toString() === user._id.toString() && (
                <div className="flex gap-3 mb-8">
                    <Link
                        to={`/places/${id}/edit`}
                        className="text-sm border border-stone/40 text-ink px-4 py-1.5 rounded-full hover:bg-stone/10 transition-colors"
                    >
                        Edit Place
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="text-sm border border-terracotta text-terracotta px-4 py-1.5 rounded-full hover:bg-terracotta/10 transition-colors"
                    >
                        Delete Place
                    </button>
                </div>
            )}

            <hr className="border-stone/30 mb-8" />

            <h2 className="font-display text-2xl font-semibold text-ink mb-4">
                Comments
            </h2>

            <div className="space-y-4 mb-8">
                {comments.length === 0 ? (
                    <p className="text-stone text-sm">No comments yet.</p>
                ) : (
                    comments.map((comment) => (
                        <div
                            key={comment._id}
                            className="bg-moss/5 border border-stone/20 rounded-lg p-4"
                        >
                            <div className="flex items-center justify-between mb-1">
                                <strong className="text-ink text-sm">{comment.user.name}</strong>
                                <span className="text-terracotta text-sm">{comment.rating}/5</span>
                            </div>
                            <p className="text-ink text-sm mb-2">{comment.text}</p>
                            {user && comment.user._id.toString() === user._id.toString() && (
                                <button
                                    onClick={() => handleDeleteComment(comment._id)}
                                    className="text-xs text-stone hover:text-terracotta transition-colors"
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>

            {user ? (
                <form onSubmit={handleCommentSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Type a comment"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="border border-stone/40 rounded-lg px-4 py-2 bg-parchment focus:outline-none focus:border-moss"
                    />
                    <div className="flex items-center gap-3">
                        <select
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="border border-stone/40 rounded-lg px-3 py-2 bg-parchment"
                        >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <button
                            type="submit"
                            className="bg-moss text-parchment px-5 py-2 rounded-full hover:bg-moss/90 transition-colors"
                        >
                            Post Comment
                        </button>
                    </div>
                </form>
            ) : (
                <p className="text-stone text-sm">
                    <Link to="/login" className="text-moss underline">
                        Log in
                    </Link>{' '}
                    to leave a comment.
                </p>
            )}
        </div>
    );
};

export default PlaceDetail;