'use strict';

const express = require('express');
const knex = require('../knex')
const bodyParser = require('body-parser');
const router = express.Router();

// YOUR CODE HERE
router.get('/', (req, res, next) => {
  knex('classifieds')
    .select(['id', 'title', 'description', 'price', 'item_image'])
    .then((data) => {
      res.send(data)
    })
})

router.get('/:id', (req, res, next) => {
  const id = req.params.id
  knex('classifieds')
    .where('id', id)
    .select(['id', 'title', 'description', 'price', 'item_image'])
    .then((data) => {
      res.json(data[0])
    })
})

router.post('/', (req, res, next) => {
  const newPost = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    item_image: req.body.item_image
  }
  knex('classifieds')
    .returning(['id', 'title', 'description', 'price', 'item_image'])
    .insert({title: newPost.title, description: newPost.description, price: newPost.price, item_image: newPost.item_image})
    .then((data) => {
      res.json(data[0])
    })
})

router.patch('/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body
  knex('classifieds')
    .returning(['id', 'title', 'description', 'price', 'item_image'])
    .where('id', id)
    .update({title: body.title, description: body.description, price: body.price, item_image: body.item_image})
    .then((data) => {
      res.json(data[0])
    })
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body
  knex('classifieds')
    .returning(['id','title', 'description', 'price', 'item_image'])
    .where('id', id)
    .del()
    .then((data) => {
      res.send(data[0])
    })
})

module.exports = router;
