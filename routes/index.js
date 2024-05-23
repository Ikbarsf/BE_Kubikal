const router = require("express").Router();
const Blog = require("./blogRouter");

router.use("/api/v1/blogs", Blog);

router.get("*", (req, res) => {
  res.status(404).render("error", {
    title: "Error Page - Not Found",
    url: req.url,
  });
});

module.exports = router;
