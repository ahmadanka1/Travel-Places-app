import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const PlaceCard = ({ place }) => {
    return (
        <Link to={`/places/${place._id}`} className="block bg-parchment border border-stone/30 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-40 bg-moss/10 flex items-center justify-center">
                {place.images?.[0] ? (
                    <img src={place.images[0]}
                        alt={place.title}
                        className="w-full h-full object-cover" />
                ) : (
                    <span className="text-moss/50 text-sm font-display italic">No photo yet</span>
                )}
            </div>
            <div className="px-4 py-4" >
                <span className="inline-block text-[10px] uppercase tracking-wide text-moss border border-dashed border-moss rounded-full px-3 py-0.5 mb-3">{place.category}</span>
                <h3 className="font-display text-2xl font-semibold text-ink mb-1.5 leading-snug">{place.title}</h3>
                <p className="text-base text-stone flex items-center gap-1">
                    <MapPin size={16} />
                    {place.location}
                </p>
            </div>
        </Link>
    );
};

export default PlaceCard;