const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./reviews');
const { number } = require('joi');
const opts = { toJSON: { virtuals: true } };
const ShopSchema = new Schema({
    title: String,
    images: {
        type: String
    },
    shortDescription:{
        type: String
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    phone: String,
    description: String,
    location: String,
    author:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);
ShopSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <strong><a href="/shop/${this._id}">${this.title}</a><strong>
    <p>${this.shortDescription.substring(0, 20)}...</p>`
});

module.exports = mongoose.model('Shop', ShopSchema);