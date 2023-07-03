const express = require("express");
const router = express.Router();
const parserMiddleware = require("../middleware/bodyparser");
const usersRoutes = require("../components/users/user.routes.js");
const channelRoutes = require("../components/channel/channel.routes.js");
const videosRoutes = require("../components/videos/videos.routes.js");
const uploadRoutes = require("../components/upload/upload.routes.js");
const coursesRoutes = require("../components/courses/courses.routes.js");

parserMiddleware(router);

// User Routes
router.use(usersRoutes);

// Channel Routes
router.use(channelRoutes);

// Video Routes
router.use(videosRoutes);

// Upload Routes
router.use(uploadRoutes);

// Course Routes
router.use(coursesRoutes);

module.exports = router;
