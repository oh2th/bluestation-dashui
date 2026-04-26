const express = require('express');
const cors = require('cors');

const ADAPTER_NAME = process.env.ADAPTER || 'mock';
const PORT = parseInt(process.env.PORT || '3001', 10);

let adapter;
try {
  adapter = require(`./adapters/${ADAPTER_NAME}`);
} catch {
  console.error(`Unknown adapter "${ADAPTER_NAME}". Available: mock, bluestation`);
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

app.use('/status',      require('./routes/status')(adapter));
app.use('/subscribers', require('./routes/subscribers')(adapter));
app.use('/timeslots',   require('./routes/timeslots')(adapter));
app.use('/talkgroups',  require('./routes/talkgroups')(adapter));
app.use('/control',     require('./routes/control')(adapter));

app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, () => {
  console.log(`BlueStation DashUI backend listening on http://localhost:${PORT} [adapter: ${ADAPTER_NAME}]`);
});
