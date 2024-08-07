var express = require('express');
var router = express.Router();
var userModel = require("../models/userModel");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var blogModel = require("../models/blogModel");

let secret = "secret";

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/singUp", async (req, res) => {
  let { username, name, email, password } = req.body;

  console.log(username)

  let emailCon = await userModel.findOne({ email: email });

  if (emailCon) {
    res.json({ success: false, message: "Email already exists" });
  }
  else {

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        let user = userModel.create({
          username: username,
          name: name,
          email: email,
          password: hash,
        });
      });
    });

    res.json({ success: true, message: "User created successfully" });
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  console.log(email)

  let user = await userModel.findOne({ email: email });

  if (user) {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: "1h" });
        res.json({ success: true, message: "Login successfully", token: token, userId: user._id });
      }
      else {
        res.json({ success: false, message: "Password is incorrect" });
      }
    });
  }
  else {
    res.json({ success: false, message: "Email not found... !" });
  }
});

router.post("/getUserDetails", async (req, res) => {
  let { userId } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    res.json(user);
  }
  else {
    res.json({ success: false, message: "User not found" });
  };
});

router.post("/createBlog", async (req, res) => {
  let { userId, title, desc, image, content } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    let blog = blogModel.create({
      uploadedBy: userId,
      title: title,
      description: desc,
      image: image,
      content: content,
    });

    return res.json({ success: true, message: "Blog created successfully" });
  }
  else {
    return res.json({ success: false, message: "User not found" });
  };
});

router.get("/getBlogs", async (req, res) => {
  let blogs = await blogModel.find();
  if (blogs.length > 0) {

    let fullBlogsData = [];

    for (let i = 0; i < blogs.length; i++) {
      const element = blogs[i];
      let user = await userModel.findOne({ _id: element.uploadedBy });

      fullBlogsData.push({
        _id: element._id,
        uploadedBy: element.uploadedBy,
        title: element.title,
        description: element.description,
        image: element.image,
        content: element.content,
        uploadedByName: user.name,
        uploadedByEmail: user.email,
        date: element.date
      });
    };

    return res.json({ success: true, message: "Blogs found", blogs: fullBlogsData });

  }
  else {
    return res.json({ success: false, message: "No blogs found" });
  }
});

router.post("/getSingleBlogData", async (req, res) => {
  let { blogId } = req.body;
  let blog = await blogModel.findOne({ _id: blogId });
  console.log(blog)
  if (blog) {
    let fullData = [];
    let user = await userModel.findOne({ _id: blog.uploadedBy });
    console.log(user)
    fullData.push({
      _id: blog._id,
      uploadedBy: blog.uploadedBy,
      title: blog.title,
      description: blog.description,
      image: blog.image,
      content: blog.content,
      uploadedByName: user.name,
      uploadedByEmail: user.email,
      date: blog.date
    });
    return res.json({ success: true, message: "Blog found", blog: fullData });
  }
  else {
    return res.json({ success: false, message: "Blog not found" });
  }
})

module.exports = router;
