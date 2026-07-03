import Place from '../models/Place.js';


//Create a Place
export const createPlace =async (req, res) => {
    try {
        const { title, description, category, location, images } = req.body;

        const place = await Place.create({
            title,
            description,
            category,
            location,
            images,
            createdBy:req.user._id ,
        });
        res.status(201).json(place);
    } catch (error) {
        res.status(500).json({message: error.message});
    };
};

//Get all Places
export const getPlaces = async (req, res) => {
    try {
        const places = await Place.find({ isDeleted: false });
        res.status(200).json(places);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//Get single Place by Id
export const getPlaceById = async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);
        if(!place || place.isDeleted){
           return res.status(404).json({message: 'Place Not found'});
        }
        res.status(200).json(place);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//Update the place
export const updatePlace = async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);
        if(!place){
            return res.status(404).json({message: 'place doesnt exist'});
        }
        if(place.createdBy.toString() === req.user._id.toString()){
           const updatedPlace = await Place.findByIdAndUpdate(place._id, req.body, {new: true});
            return res.status(200).json(updatedPlace);
        }

        return res.status(403).json({message: 'Not authorized to update this place'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete a place (soft delete)
export const deletePlace = async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);
        if(!place){
            return res.status(404).json({message: 'place doesnt exist'});
        }
        if(place.createdBy.toString() === req.user._id.toString()){
            place.isDeleted = true;
           const deletedPlace = await place.save();
            return res.status(200).json(deletedPlace);
        }

        return res.status(403).json({message: 'Not authorized to delete this place'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};