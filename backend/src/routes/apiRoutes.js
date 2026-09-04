const express = require('express');
const router = express.Router();
const {
  checkHealth,
  createResponse,
  getResponses,
} = require('../controllers/responseController');

// Healthcheck endpoint
router.get('/health', checkHealth);

// Date response endpoints
router.post('/responses', createResponse);
router.get('/responses', getResponses);

module.exports = router;
