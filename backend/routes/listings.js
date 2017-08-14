import express from 'express';
import listingController from '../controllers/listingController';

const router = express.Router();

router.get('/', listingController.getAllListings);
router.post('/', listingController.createListing);
router.get('/:id', listingController.getListing);
router.delete('/:id', listingController.deleteListing);

module.exports = router;
