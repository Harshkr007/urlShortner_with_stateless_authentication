import connectDB from "./database/index.js";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config(); // No path needed unless .env is not in root

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error in DB connection:", error);
    process.exit(1); // Gracefully exit on DB connection failure
  });
