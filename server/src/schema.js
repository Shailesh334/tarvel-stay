import mongoose from "mongoose";
const Schema = mongoose.Schema ;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        filename : String ,
        url : {
            type: String,
            required: true,
            default:
            "https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?q=80&w=1320&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    },
    price : Number ,
    country : String ,
    location : String,
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    tag : String
});

export const User = mongoose.model("User", userSchema);
export const Listing = mongoose.model("Listing", listingSchema);
