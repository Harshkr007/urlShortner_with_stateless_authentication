import express from "express";
import {handleCreateUrl, handleUrlPath , handleGetAllUrl} from "../controllers/url.controller.js"

const router = express.Router();


// Route to shorten a new URL (POST /url)
router.post('/', handleCreateUrl);

// Route to get all shortened URLs (GET /url/urls)
router.get('/urls',handleGetAllUrl);

// Route to handle redirection to original URL (GET /:shortID)
router.get('/api/:Id',  handleUrlPath);

export default router;
