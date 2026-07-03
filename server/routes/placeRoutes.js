import express from "express";
import { createPlace, getPlaces, getPlaceById, updatePlace, deletePlace } from "../controllers/placeController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/', protect, createPlace);
router.get('/', getPlaces);
router.get('/:id', getPlaceById);
router.put('/:id', protect, updatePlace);
router.delete('/:id', protect, deletePlace);

export default router;