const mongoose = require("mongoose");

const Post = require("./models/post");

const postForTest = new Post({
  category: "알고리즘",
  title: "제목 1",
  content: "내용1",
  tags: ["알고리즘"],
});

postForTest.save();
