import { URL } from "../models/url.model.js";
import { nanoid } from "nanoid";

// Handle the creation of shortened URLs
const handleCreateUrl = async (req, res) => {
  const {redirectURL} = req.body;
  const user = req.user; 

  if (!redirectURL) {
    return res.status(400).json({ error: "URL is not present" });
  }

  try {
    const existUrl = await URL.findOne({ 
      createdBy : user._id,
      redirectURL: redirectURL });

    if (existUrl) {
      return res.status(201).render("Home", {
        Id: existUrl.shortId,
      });
    }

    // Create a new shortened URL entry
    const newId = nanoid(8);
    const newUrl = await URL.create({
      shortId: newId,
      redirectURL: redirectURL,
      createdBy: user._id, 
      visitHistory: [],
    });
    console.log(newUrl);

    res.status(201).render("Home", {
      Id: newUrl.shortId,
    });
  } catch (error) {
    res.status(500).json({ 
      error: error,
      message: "Failed to create the url"
    });
  }
};

const handleUrlPath = async (req, res) => {
  const Id = req.params.Id;

  try {
    const urlObject = await URL.findOneAndUpdate(
      { shortId: Id },
      { $push: { visitHistory: { timeStamp: new Date() } } },
      { new: true }
    );

    if (!urlObject) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.redirect(urlObject.redirectURL);
  } catch (error) {
    res.status(500).json({ error: "Failed to redirect" });
  }
};

const handleGetAllUrl = async (req, res) => {
      const user = req.user;
  try {
      const urls = await URL.find({
        createdBy :user._id,
      });
      res.json(urls);
  } catch (error) {
      res.status(500).json({ error: "Failed to fetch URLs" });
  }
};

export { handleCreateUrl, handleUrlPath , handleGetAllUrl};
