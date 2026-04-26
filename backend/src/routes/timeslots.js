const express = require('express');
const router = express.Router();

module.exports = function (adapter) {
  router.get('/', async (_req, res) => {
    try {
      const data = await adapter.getTimeslots();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
