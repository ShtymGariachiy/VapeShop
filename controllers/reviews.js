const Shop = require('../models/shops');
const Review = require('../models/reviews');

module.exports.posrRew = async (req, res) => {
    const { id, reviewId } = req.params;
    const shop = await Shop.findById(id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    shop.reviews.push(review);
    await review.save();
    await shop.save();
    req.flash('success', 'Successfully created review');
    res.redirect(`/shop/${id}`);
}

module.exports.delRew = async (req, res) => {
    const { id, reviewId } = req.params;
    await Shop.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review');
    res.redirect(`/shop/${id}`);
}