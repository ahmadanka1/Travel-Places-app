import express from 'express';
import { createComment, deleteComment, getCommentsByPlace } from '../controllers/commentController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:placeId/comments', getCommentsByPlace);
router.post('/:placeId/comments', protect, createComment);
router.delete('/comments/:commentId', protect, deleteComment);

export default router;
