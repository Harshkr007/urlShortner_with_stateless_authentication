import { URL } from "../models/url.model.js";
import { nanoid } from "nanoid";

// Handle the creation of shortened URLs
const handleCreateUrl = async (req, res) => {
  const {redirectURL} = req.body;


  if (!redirectURL) {
    return res.status(400).json({ error: "URL is not present" });
  }

  try {
    // Check if the URL already exists
    const existUrl = await URL.findOne({ redirectURL: redirectURL });

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
      visitHistory: [],
    });

    res.status(201).render("Home", {
      Id: newUrl.shortId,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create URL" });
  }
};

// Handle redirection from short URL to original URL
const handleUrlPath = async (req, res) => {
  const Id = req.params.Id;
  console.log(Id);

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
  try {
      const urls = await URL.find();
      res.json(urls);
  } catch (error) {
      res.status(500).json({ error: "Failed to fetch URLs" });
  }
};

export { handleCreateUrl, handleUrlPath , handleGetAllUrl};
