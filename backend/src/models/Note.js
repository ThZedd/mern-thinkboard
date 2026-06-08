import mongoose from "mongoose";

//1- Create Schema

//2- Create a Model based of the schema

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }

},
    { timestamps: true } // createdAt, updatedAt from MongoDB automatic
);

const Note = mongoose.model("Note", noteSchema)

export default Note;