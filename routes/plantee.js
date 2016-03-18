/* GLOBAL REQUIRES - SEE `../../server.js` */
'use strict';
require('dotenv').config();
const express = require('express');
const db = require('../db/plantee_pg');
const plantee = express.Router();

/* plantee home route */
plantee.route('/')
	// Gets plantee list from DB - connected to users
	.get(db.findPlantees, (req, res) => {
		res.send(res.rows);
	})
	// Adds new plantee to users (a user is associated with 1 plantee and several gardeners)
	.post(db.addPlantee, (req, res) => {
		res.status(201).json({data: 'success'});
	})

/* gardeners route */
plantee.route('/:id/gardeners')
	// Gets the list of gardeners for the specific plantee id
	.get(db.selectMyGardeners, (req, res) => {
		res.send(res.rows);
	})
	// Adds a new gardener to the plantee table as well as the plantee xref table 
	.post(db.addGardener, (req, res) => {
		res.status(201).json({data: 'success'});
	})

plantee.route('/:id/messages')
	.get(db.selectPlanteeMessages, (req, res) => {
		res.send(res.rows);
	})
	.post(db.addMessage, (req, res) => {
		res.status(201).json({data: 'success'});
	})

module.exports = plantee; 