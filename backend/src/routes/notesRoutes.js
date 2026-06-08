import express from "express"
import { fetchAllNotes, createNote, updateNote, deleteNote, fetchANote } from "../controllers/notesController.js";
const router = express.Router();

//Get All the Notes
router.get("/", fetchAllNotes);
//Get a specific Note
router.get("/:id", fetchANote);
//Create Note
router.post("/", createNote);
//Update Note
router.put("/:id", updateNote);
//Delete Note
router.delete("/:id", deleteNote);

export default router;