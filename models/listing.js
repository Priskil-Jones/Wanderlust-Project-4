const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({          //const listingSchema = new mongoose.Schema  (Other way of writing)
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {                
        url: {
            type: String,
            // Default (Schema option):
            // If the image field is NOT provided (undefined or null),
            // MongoDB automatically stores this default image URL.     
            default: "https://images.unsplash.com/photo-1783586879543-3378ba2eede0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

            // Set / Setter Function (Schema option):
            // If the user provides an empty string (""),
            // replace it with the default image URL.
            // Otherwise, keep the user-entered URL.
            set: (v) => v === "" ? "https://images.unsplash.com/photo-1783586879543-3378ba2eede0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
        },
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
            type: String,       // Value must be a String
            enum: ['Point'],    // 'Only "Point" word is allowed  (enum)
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    category: {
        type: String,
        enum: ["Trending", "Rooms", "Iconic cities", "Mountains", "Castles", "Amazing Pools", "Camping", "Farms", "Arctic"],
    }
});

listingSchema.post("findOneAndDelete", async(listing)=> {
    if(listing) {
        await Review.deleteMany({ _id: {$in: listing.reviews} });  //Deletes all reviews from the Review Collection
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;


    // Default (Schema option):
    // If the image field is NOT provided (undefined or null),
    // MongoDB automatically stores this default image URL.
    
    // Set / Setter Function (Schema option):
    // If the user provides an empty string (""),
    // replace it with the default image URL.
    // Otherwise, keep the user-entered URL.