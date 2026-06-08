import Note from "../models/Note.js";

export const fetchAllNotes = async (req, res/*request, response */) => {
    try {
        //Get All Notes
        const notes = await Note.find().sort({createdAt: -1}); // Newest first

        //Display the message for debugging
        res.status(200).json(notes);
    }
    catch (error) {
        console.error("Error trying to fetch notes ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const fetchANote = async (req, res/*request, response */) => {
    try {
        //Get the Note by id
        const note = await Note.findById(req.params.id);

        // Returns the error 404 if the Note does not exist 
        if (!note) {
            return res.status(404).json({ message: "Note not found" });

        }
        //Display the message for debugging
        res.status(200).json(note);
    }
    catch (error) {
        console.error("Error trying to fetch notes ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createNote = async (req, res/*request, response */) => {
    try {
        // Get the note information from the request
        const { title, content } = req.body;
        //Create the new Note of type Note
        const newNote = new Note(
            {
                title: title,
                content: content
            });

        //Await for the new Note to be saved into the database
        const savedNote = await newNote.save();
        //Display the message for debugging
        res.status(201).json(savedNote);

    } catch (error) {
        console.error("Error trying to Create the note ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateNote = async (req, res/*request, response */) => {
    try {
        // Get the note information from the request
        const { title, content } = req.body;
        // Await to find the Note by id and then update the title and content
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,
            { title, content },
            {
                new: true,
            });

        // Returns the error 404 if the Note does not exist  
        if (!updateNote) {
            return res.status(404).json({ message: "Note not found" });

        }

        //Display the message for debugging
        res.status(200).json(updateNote);
    } catch (error) {
        console.error("Error trying to Update the note ", error);
        res.status(500).json({ message: "Internal server error" });
    }

};

export const deleteNote = async (req, res/*request, response */) => {
    try {
        // Await to find the Note by id and then delete it
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        // Returns the error 404 if the Note does not exist  
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        //Display the message for debugging
        res.status(200).json({ message: "Note deleted successfully!" });
    } catch (error) {
        console.error("Error trying to Delete the note ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};