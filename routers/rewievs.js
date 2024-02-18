const express = require('express')
const router = express.Router({mergeParams:true})
const catchAsync = require('../utils/CatchAsync');
const { isLoggedIn } = require('../midlwear');
const Shop = require('../models/shops');
const Review = require('../models/reviews');
const mongoose = require('mongoose');
const reviews = require('../controllers/reviews')

router.post('/',isLoggedIn,catchAsync(reviews.posrRew)) // CREATE REVIEW//
router.delete('/:reviewId',isLoggedIn, catchAsync(reviews.delRew)) // DELETE REVIEW //


module.exports = router;