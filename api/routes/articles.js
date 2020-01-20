// ====================
// imports
// ====================
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

// ====================
// controller
// ====================
const articlesController = require('../controllers/articlesController');

// ====================
// requests
// ====================

//////////
// GET
//////////

// get list of all articles
router.get('/getarticles', articlesController.getArticles);

// get article by id
router.get('/:articleid', articlesController.getArticleById);

//////////
// POST
//////////

// create new article
router.get('/createarticle', articlesController.createArticle);

// ====================
// exports
// ====================
module.exports = router;