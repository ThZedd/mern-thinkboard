import express from "express"
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


//middleware
app.use(cors({
    origin: "http://localhost:5173",
}));

app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

// First connect to the database then start listening to the PORT
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT: ", PORT);
    });
});


