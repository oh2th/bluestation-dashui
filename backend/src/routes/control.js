const express = require('express');
const router = express.Router();

const VALID_ACTIONS = ['start', 'stop', 'restart'];

module.exports = function (adapter) {
  VALID_ACTIONS.forEach((action) => {
    router.post(`/${action}`, async (_req, res) => {
      try {
        const result = await adapter.control(action);
        res.json(result);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });
  });

  return router;
};
