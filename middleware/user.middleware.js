const createError = require('http-errors');

module.exports.isOwner = (req, res, next) => {
  const user_id = req.params.id;
  if (!req.isAuthenticated()) {
    throw createError(403);
  } else if (user_id !== req.user.id) {
    throw createError(401);
  } else {
    next();    
  }
}
