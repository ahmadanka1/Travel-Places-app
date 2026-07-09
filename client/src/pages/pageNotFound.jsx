import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center">
      <h1 className="font-display text-6xl font-semibold text-ink mb-4">
        404
      </h1>
      <p className="text-stone mb-8">
        This page doesn't exist — looks like you've wandered off the map.
      </p>
      <Link
        to="/"
        className="bg-moss text-parchment px-5 py-2.5 rounded-full hover:bg-moss/90 transition-colors"
      >
        Back to the Feed
      </Link>
    </div>
  );
};

export default NotFound;