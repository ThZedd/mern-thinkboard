import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {

    try {
        const {success} = await  ratelimit.limit("my-limit-key");

        // Check if the ratelimit has been reached
        if(!success){
            return res.status(429).json(
                {message: "Too many requests, please try again later"

                });
                
        }

        // Need to call the next function that will be one of the Routes.
        next();
    } 
    catch (error) {
        console.log("Rate limit error", error);
        next(error);
    }
};

export default rateLimiter;