import express from "express";
import path from "path";
import urlRoutes from "./routes/url.routes.js";
import staticRoutes from "./routes/static.routes.js";

const app = express();

// Combine middleware with reduced setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files with EJS view engine
app.use(express.static('public')); // Simplified, serves CSS/JS automatically
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

// Routes
app.use("/", staticRoutes);
app.use("/url", urlRoutes);

export default app;
