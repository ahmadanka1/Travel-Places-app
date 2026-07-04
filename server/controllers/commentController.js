import Comment from '../models/Comment.js';
import Place from '../models/Place.js';


//get comments by place
export const getCommentsByPlace = async (req, res) => {
  try {
    
    const comments = await Comment.find({ place: req.params.placeId }).populate('user', 'name');
    return res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//create a comment
export const createComment = async (req, res) => {
    try {
        const place = await Place.findById(req.params.placeId);
        if(!place || place.isDeleted){
            return res.status(404).json({message: 'Place doesnt exist'});
        }
        const {text, rating} = req.body;
        const userId = req.user._id;
        const comment = await Comment.create({
            text,
            rating,
            place: place._id,
            user: userId,
        })
        return res.status(201).json(comment);
    } catch (error) {
        return res.status(500).json({message: error.message});

    }
};

//Delete Comment (hard delete)
export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){
            return res.status(404).json({message: 'comment doesnt exist'});
        }
        if(comment.user.toString() === req.user._id.toString()){
            const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);
            return res.status(200).json(deletedComment);
        }
        return res.status(403).json({ message: 'Not authorized to delete this comment' });
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};