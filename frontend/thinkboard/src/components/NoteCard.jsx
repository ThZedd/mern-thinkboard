import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils.js";
import api from "../lib/axios.js";
import toast from "react-hot-toast";

const NoteCard = ({ note , setNotes }) => {
    
    
    const deleteNote = async (event, noteId) => {
        event.preventDefault(); // we cancel the navigate behaviour from the <Link />

        try {
            await api.delete(`/notes/${noteId}`);
            setNotes((previous) => previous.filter((note) => note._id !== noteId)); // get rid of the deleted one
            toast.success("You deleted the Note successfully!");
            
        } catch (error) {
            if (error.response.status === 429) {
                toast.error("You tried to delete too many Notes");
            }
            else {
                toast.error("Failed to delete the Note", error);
            }
        } 
    }

    return (
        <Link to={`/notes/${note._id}`}
            className="card bg-base-100 hover:shadow-lg transition-all duration-200
    border-t-4 border-solid border-[#00FF9D]">
            <div className="card-body">
                <h3 className="card-title text-base-content">{note.title}</h3>
                <p className="text-base-content/70 line-clamp-3">{note.content}</p>
                <div className="card-actions justify-between items-center mt-4">
                    <span className="text-sm text-base-content/60">
                        {formatDate(new Date(note.createdAt))}
                    </span>
                    <div className="flex items-center gap-1">
                        <PenSquareIcon className="size-4" />
                        <button className="btn btn-ghost btn-xs text-error" onClick={(event) => deleteNote(event, note._id)}>
                            <Trash2Icon className="size-4" />
                        </button>

                    </div>

                </div>
            </div>
        </Link>
    )
}

export default NoteCard