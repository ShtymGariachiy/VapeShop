const Shop = require('../models/shops');
const { isLoggedIn } = require('../midlwear');
const path = require('path');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding")
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });


module.exports.index = (async(req,res)=>{
    const shops = await Shop.find({});
    res.render('index.ejs',{shops})
})
module.exports.new = (req,res)=>{
    res.render('new.ejs')
}

module.exports.newP = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.shop.location,
        limit: 1
    }).send()
    const shop = new Shop(req.body.shop);
    shop.geometry = geoData.body.features[0].geometry;
    shop.author = req.user._id;
    await shop.save();
    req.flash('success', 'Successfully made a new shop!');
    res.redirect(`/shop/all`);
}
module.exports.show = async (req, res,) => {
    const shop = await Shop.findById(req.params.id).populate({
        path:'reviews',
        populate:{
            path:'author'
        }
    }).populate('author');
    if(!shop){
        req.flash("error","Cannot find that shop!")
        return res.redirect('/')
};
    res.render('show.ejs', { shop});
}


 module.exports.del = async (req, res) => {
    const { id } = req.params;
    await Shop.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted shop');
    res.redirect('/shop/all');
}

module.exports.edit = async(req,res)=>{
    const shop =  await Shop.findById(req.params.id)
    res.render('edit.ejs', { shop });
}

module.exports.editP = async(req,res)=>{
    const { id } = req.params;
    const shop = await Shop.findByIdAndUpdate(id, { ...req.body.shop });
    req.flash('success', 'Successfully edited shop');
    res.redirect(`/shop/${shop._id}`)
}