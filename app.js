if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const express = require("express");                         //require Packages
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require('connect-mongo').default;
const { createWebCryptoAdapter } = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");             //Manages Login, Logout, User sessions, Authentication
const LocalStrategy = require("passport-local");  //Login methods like: Google Login, Facebook Login etc
const User = require("./models/user.js");         //User Model

const port = 8080;
const DB_URL = process.env.MONGO_URL;

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

const ExpressError = require("./utils/ExpressError.js");           //require own files
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const store = MongoStore.create({
    mongoUrl: DB_URL,
    cryptoAdapter: createWebCryptoAdapter({
        secret: process.env.SECRET,
    }),
    touchAfter: 24 * 3600,
});

store.on("error", (err)=> {
    console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());      //Stores logged-in user's id in the session
passport.deserializeUser(User.deserializeUser());  //Retreive full user details from thr stored session id

app.use((req, res, next)=> {
    res.locals.successMsg = req.flash("success");        //saved in "successMsg" inside res.locals{  }
    res.locals.errorMsg = req.flash("error");
    res.locals.deleteMsg = req.flash("delete");
    res.locals.currUser = req.user;
    next();
});


app.use("/listings", listingRouter);              //important
app.use("/listings/:id/reviews", reviewRouter);   //important
app.use("/", userRouter);



main()
    .then(() => {
        console.log("Connection Successful from app.js");
    })
    .catch((err) => {
        console.log("err");
    });

async function main() {
    await mongoose.connect(DB_URL);
}

app.listen(port, () => {
    console.log(`Server is listening to port: ${port}`);
});


app.all("/{*any}", (req, res, next)=> {
    next(new ExpressError(404, "Page not found"));
});

//Error Handler
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { err });
    // res.status(statusCode).send(message);
    // res.send("Something went wrong");
});


