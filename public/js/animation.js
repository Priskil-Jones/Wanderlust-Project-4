//gsap.from() = Start the button with these properties, then bring to its normal CSS values/properties
//gsap.to = start from default css values and then go to/convert to my CSS values/properties


//Listing animation
gsap.from(".animation-card", {  //gsap.from = Start with these properties/value and then return to own css value
    opacity: 0,                 // So, in that way animation happens
    y: 30,
    duration: 1,
    stagger: 0.1,
    ease: "power"
});


//Search btn animation
gsap.from(".animation-btn", {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: "back.out(1.7)"
});

//Search bar animation
gsap.from(".animation-bar", {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: "back.out(1.7)"
});


//Category animation (text and icons)
gsap.from(".animation-category", {
    opacity: 0,
    y: 25,
    scale: 0.9,
    duration: 0.6,
    stagger: 0.08,
    ease: "power2.out"
});

//Category animation icon rotation glowing animation
const categories = document.querySelectorAll(".animation-category");

categories.forEach((category)=> {
  category.addEventListener("mouseenter", () => {
    gsap.to(category, {    //gsap.to = start from default css values and then go to/convert to my CSS values/properties
        y: -6,
        rotationX: 8,
        rotationY: -8,
        scale: 1.08,
        duration: 0.3,
        ease: "power2.out"
    });
    gsap.to(category.querySelector("i"), {
        scale: 1.25,
        rotation: 8,
        duration: 0.3,
        ease: "back.out(1.7)"
    });
});


  category.addEventListener("mouseleave", () => {
    gsap.to(category, {
        y: 0,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
    });
    gsap.to(category.querySelector("i"), {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
    });
});

});


//Login animation
gsap.from(".animation-login", {
    opacity: 0,
    y: 40,
    scale: 0.95,
    duration: 0.6,
    ease: "power2.out"
});

//Signup animation
gsap.from(".animation-signup", {
    opacity: 0,
    y: 40,
    scale: 0.95,
    duration: 0.6,
    ease: "power2.out"
});