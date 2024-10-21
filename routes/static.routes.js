import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) => {
  return res.render("Home", {});
});

export default routes;
