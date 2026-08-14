const express = require("express");
const router = express.Router({mergeParams: true});

const Review = require("../models/review.js");       //Review Model     //Review related things:
const Listing = require("../models/listing.js");     //Listing Model
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isReviewAuthor, validateReview } = require("../middleware.js");

const reviewController = require("../controllers/review.js");



router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));  //Reviews (POST Route)

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview)); //Reviews (DELETE Route)

module.exports = router;