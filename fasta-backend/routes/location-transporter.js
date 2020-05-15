/* eslint-disable default-case */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require("express");
const { Client, Status } = require("@googlemaps/google-maps-services-js");
const TripMetrix = require("../api/schedule-api");
const TripInfo = require("../api/transporters-api");


const router = express.Router();

// api to get nearby transporters base on users location
router.post("/location-transporter", (req, res) => {
  const trip = new TripInfo(req.body.latitude, req.body.longitude);
  const locationTrnasporter = trip.getPlaces();

  res.send(`Returned transporters: ${locationTrnasporter}`);
});

// api that gives the computed value for distance between in meters
router.post("/trip-distance", (req, res) => {
  const originCoords = new TripInfo(req.body.latitude, req.body.longitude);
  const destCoords = new TripInfo(req.body.latitude, req.body.longitude);
  const trip = new TripMetrix(originCoords, destCoords);
  const tripdistance = trip.getTripDistance();

  res.json(tripdistance);
});

module.exports = router;