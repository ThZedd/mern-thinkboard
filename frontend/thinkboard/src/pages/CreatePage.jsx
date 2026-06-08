import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react"
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSummit = async (event) => {
    event.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      await api.post("/notes", { title, content });

      toast.success("Node created successfully!");

      navigate("/");
    }
    catch (error) {
      console.error(error);
      if (error.response.status === 429) {
        toast.error("You tried to Create a Note too many times. Please try again later.");
      }
      else {
        toast.error("Failed to Create Note");
      }
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4"> Create New Note</h2>
              <form onSubmit={handleSummit}>
                <div className="form-control mb-4">
                  <label className="label mb-2">
                    <span className="label-text">Title</span>
                  </label>
                  <input type="text" placeholder="Note Title" className="input input-bordered w-full"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label mb-2">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea placeholder="Write your note here..." className="textarea textarea-bordered h-32 w-full"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                  />

                </div>

                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating..." : "Create Note"}
                  </button>

                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage