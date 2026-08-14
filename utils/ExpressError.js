class ExpressError extends Error {         // ExpressError = Our Class,    Error = Javascript built-in Class
    constructor(statusCode, message) {     // Constructor runs auto whenever you create an object using "new"
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ExpressError;


//When this line runs: 
// statusCode = 404
// message = "Page not found"
// These values are passed into constructor


// super() = Initialize the Parent Error class  (required before using 'this')

// 'this' refers to the new ExpressError object being created
// this.statusCode = Stores the passed statusCode as a Property of the object
// this.message = Stores the passed message as a Property of the object

// example:
// {
//     statusCode: 404,
//     message: "Not Found";
// }