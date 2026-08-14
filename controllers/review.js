const Review = require("../models/review.js");         //Review Model
const Listing = require("../models/listing.js");       //Listing Model


module.exports.createReview = async (req, res)=> {
    let { id } = req.params;
    console.log(id);
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteReview = async (req, res)=> {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});  //Delete review from the Listing Collection
    await Review.findByIdAndDelete(reviewId);    //Deletes review from the Review Collection
    req.flash("delete", "Review Deleted!");

    res.redirect(`/listings/${id}`);
}