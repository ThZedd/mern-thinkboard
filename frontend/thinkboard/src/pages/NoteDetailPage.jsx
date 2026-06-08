import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await api.get(`/notes/${id}`);
        setNote(response.data);

      }
      catch (error) {
        toast.error("Failed to fetch the note");
        console.error(error);
      }
      finally {
        setLoading(false);
      }
    }

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    try {

      await api.delete(`/notes/${id}`);
      navigate("/");
    }
    catch (error) {

      toast.error("Failed to delete Note");
      console.error(error);

    }
  };

  const handleSave = async () => {
    if(!note.title.trim() || !note.content.trim()){
      toast.error("Please add a title or content");
      return;
    }
    
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note); // pass the note we want to update
      navigate("/");
    } 
    catch (error) {
      toast.error("Failed to update Note");
      console.error(error);
    }
    finally {
      setSaving(false);
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost mb-6">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="size-5" />
              Delete Note
            </button>


          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label mb-2">
                  <span className="label-text">Title</span>
                </label>
                <input type="text" placeholder="Note Title" className="input input-bordered w-full"
                  value={note.title}
                  onChange={(event) => setNote({ ...note, title: event.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label mb-2">
                  <span className="label-text">Content</span>
                </label>
                <textarea placeholder="Write your note here..." className="textarea textarea-bordered h-32 w-full"
                  value={note.content}
                  onChange={(event) => setNote({ ...note, content: event.target.value })}
                />
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default NoteDetailPage