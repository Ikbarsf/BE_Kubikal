const router = require("express").Router();
const blogController = require("../controllers/blogController");
const upload = require("../middlewares/uploader");

router
  .route("/")
  .get(blogController.getAllBlog)
  .post(upload.single("image"), blogController.createBlog);

router
  .route("/:id")
  .get(blogController.getBlogById)
  .patch(upload.single("image"), blogController.updateBlog)
  .delete(blogController.deleteBlog);

module.exports = router;
