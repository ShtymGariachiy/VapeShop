if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const router = express.Router()
const Joi = require('joi');
const catchAsync = require('../utils/CatchAsync');
const { isLoggedIn } = require('../midlwear');
const Shop = require('../models/shops');
const shops = require('../controllers/shops')


ShopValidation = (req,res,next) =>{
    const ShopSchema = Joi.object({
        shop: Joi.object({
            title: Joi.string().required(),
            shortDescription : Joi.string().required(),
            images: Joi.string().required(),
            description : Joi.string().required(),
            location : Joi.string().required(),
            phone:Joi.string().required(),
        })
    })
    const {error} = ShopSchema.validate(req.body);
    if(error){
        const msg = error.details.map(r =>r.message).join(',');
        throw new ExpressEror(msg,400);
    }
    else{
        next();
    }
}
router.get('/all',catchAsync(shops.index)) // INDEX//

router.get('/new',isLoggedIn,shops.new) // GET NEW//

router.post('/new' ,isLoggedIn,ShopValidation,catchAsync(shops.newP))  // POST NEW //

router.get('/:id', catchAsync(shops.show));  // SHOW //

router.delete('/:id',isLoggedIn, catchAsync(shops.del))  // DEL // 

router.get('/:id/edit',catchAsync(shops.edit)) // GET EDIT // 

router.put('/:id',isLoggedIn,catchAsync(shops.editP)) // POST EDIT //



module.exports = router;