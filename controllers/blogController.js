const { Blog } = require("../models");
const imagekit = require("../lib/imagekit");

const createBlog = async (req, res, next) => {
  const { title, body, author } = req.body;
  const file = req.file;

  try {
    console.log(file);
    //dapatkan extension filenya
    const split = file.originalname.split(".");
    const extension = split[split.length - 1];
    //upload file ke imagekit
    const img = await imagekit.upload({
      file: file.buffer,
      fileName: `IMG-${Date.now()}.${extension}`,
    });

    const newBlog = await Blog.create({
      title,
      body,
      author,
      imageUrl: img.url,
    });

    res.status(201).json({
      status: "succes",
      message: "Blog created Successfully",
      data: {
        newBlog,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getAllBlog = async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({});
    res.status(200).json({
      status: "success",
      message: "All Blog fetched successfully",
      data: {
        blogs,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getBlogById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id, {});
    res.status(200).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const { title, body, author } = req.body;
    const file = req.file;
    const split = file.originalname.split(".");
    const extension = split[split.length - 1];
    const img = await imagekit.upload({
      file: file.buffer,
      fileName: `IMG-${Date.now()}.${extension}`,
    });

    const { id } = req.params;
    const blog = await Blog.findByPk(id);
    const updateBlog = await blog.update({
      title,
      body,
      author,
      imageUrl: img.url,
    });
    res.status(200).json({
      status: "success",
      message: "Blog updated successfully",
      data: {
        updateBlog,
      },
    });
  } catch (err) {
    next(err);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);

    await blog.destroy();
    res.status(200).json({
      status: "success",
      message: "blog deleted",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createBlog,
  getAllBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
};
