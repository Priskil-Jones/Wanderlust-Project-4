//Shorter Normal Function Syntax
function wrapAsync(fn) {
    return function(req, res, next) {
        fn(req, res, next).catch(next);
    };
}

module.exports = wrapAsync;


//Longer Normal Function Syntax:
// function wrapAsync(fn) {
//     return function(req, res, next) {
//         fn(req, res, next).catch((err) => {
//             next(err);
//         });
//     };
// }
// module.exports = wrapAsync;




//Longer Arrow Function Syntax:
// const asyncWrap = (fn) => {
//     return (req, res, next) => {
//         fn(req, res, next).catch((err) => {
//             next(err);
//         });
//     };
// };
// module.exports = asyncWrap;

// Shorter Arrow Function Syntax: 
// const asyncWrap = (fn) => {
//     return (req, res, next) => {
//         fn(req, res, next).catch(next);
//     };
// };
// module.exports = asyncWrap;