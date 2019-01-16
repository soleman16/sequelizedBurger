var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var db = require('../models');

router.get("/", function (req, res) {
  db.Burger.findAll(
    {
      raw: true,
      include: [
        {
          model: db.Customer,
        }
      ],
      order: [
        ['burger_name', 'ASC']
      ]
    }).then(dbBurger => {
      var result = {
        burgers: dbBurger
      }
      res.render("index", result);
    });
});

router.post("/api/burgers", function (req, res) {
  db.Burger.create({
    burger_name: req.body.burger_name,
    devoured: req.body.devoured
  })
    .then(function (dbBurger) {
      res.json({ id: dbBurger.insertId });
    });
});

router.put("/api/burgers/:id", function (req, res) {

  let burger = {
    devoured: req.body.devoured,
    customer_name: req.body.customer_name
  };

  db.Customer.create({
    raw: true,
    customer_name: burger.customer_name
  }).then(dbCustomer => {
    db.Burger.update({
      raw: true,
      CustomerId: dbCustomer.id,
      devoured: req.body.devoured
    },
      {
        where: {
          id: req.params.id
        }
      })
      .then(function (dbBurger) {
        res.json(dbBurger);
      });
  })
});

// Export routes for server.js to use.
module.exports = router;
