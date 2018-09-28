const Post = require('../models/post.model');
const createError = require('http-errors');
const mongoose = require('mongoose');

module.exports.list = (req, res, next) => {
  Post.find({ user: mongoose.Types.ObjectId(req.params.userId) })
    .then(phones => res.json(phones))
    .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  const post = new Post(req.body);
  post.user = req.user.id;

  post.save()
    .then(post => res.status(201).json(post))
    .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
  Post.findById({ user: req.params.userId, _id: req.params.id })
    .then(phone => {
      if (!phone) {
        throw createError(404, 'Post not found');
      } else {
        res.json(phone);
      }
    })
    .catch(error => {
      next(error);
    });
}

module.exports.delete = (req, res, next) => {
  Post.findOneAndDelete({ user: req.params.userId, _id: req.params.id })
    .then(phone => {
      if (!phone) {
        throw createError(404, 'Post not found');
      } else {
        res.status(204).json();
      }
    })
    .catch(error => next(error));
}
