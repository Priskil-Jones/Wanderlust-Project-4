const Listing = require("../models/listing.js");      //Listing Model\

const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;

module.exports.index = async (req, res) => {                //Index/Show Route
    const { category, search } = req.query;        //req.query = Information after ? int the url
    let allListings = await Listing.find({});

    //Category filter
    if (category) {       
        allListings = allListings.filter((listing)=> {
            return listing.category === category;
        });
    }

    //Search filter
    if (search) {   
    allListings = allListings.filter((listing) => {

        return (     //here, return give true or false. And so, filter keeps search data if true, otherwise not.
            listing.title.toLowerCase().includes(search.toLowerCase()) ||
            listing.location.toLowerCase().includes(search.toLowerCase()) ||
            listing.country.toLowerCase().includes(search.toLowerCase()) ||
            listing.category.toLowerCase().includes(search.toLowerCase())
        );

    });
}

    res.render("listings/index.ejs", { allListings });
}

module.exports.renderNewForm = (req, res) => {                 //New/Create Route
    res.render("listings/new.ejs");                
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const idData = await Listing.findById(id).populate({ path: "reviews", populate: {path: "author"} }).populate("owner");
    if (!idData) {
        req.flash("error", "Listing you requested for does not exist");
        return res.redirect("/listings");     //return = Exit the route after completing the res.redirect work.
    }
    console.log(idData);
    res.render("listings/show.ejs", { idData });
}

module.exports.createListing = async (req, res, next) => {

    const response = await maptilerClient.geocoding.forward(req.body.listing.location, { limit: 1 });

    let url =  req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);   //4th way (new Listing = Creates a Mongoose Document)
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    newListing.geometry = response.features[0].geometry;

    let savedListing = await newListing.save(); // Now, save/insert into the "listing" collection in MongoDB
    console.log(savedListing);
    
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}

module.exports.renderEditForm = async (req, res) => {           // Edit/Update Route
    let { id } = req.params;
    let editData = await Listing.findById(id);
    if (!editData) {
        req.flash("error", "Listing you requested for does not exist");
        return res.redirect("/listings");     //return = Exit the route after completing the res.redirect work.
    }

    let originalImageUrl = editData.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250,c_fill,q_auto,f_auto")
    res.render("listings/edit.ejs", { editData, originalImageUrl });
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let updatedListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        updatedListing.image = { url, filename };
        await updatedListing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedList = await Listing.findByIdAndDelete(id);    //Deletes Listing from the Listing Collections (Reviews are also deleted)
    console.log(deletedList);                              //And triggers the Post middleware in listing.js
    req.flash("delete", "Listing Deleted!");
    res.redirect("/listings");
}