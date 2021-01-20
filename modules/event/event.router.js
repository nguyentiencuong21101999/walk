const express = require('express');
const router = express.Router();

const controller = require('./event.controller');
router.get('',controller.getAllEvent)
