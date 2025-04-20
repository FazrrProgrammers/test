const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  const logsPath = path.resolve('./logs.json');
  const log = {
    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    method: req.method,
    headers: req.headers,
    time: new Date().toISOString()
  };

  let logs = [];
  if (fs.existsSync(logsPath)) {
    logs = JSON.parse(fs.readFileSync(logsPath));
  }
  logs.unshift(log); // add to top
  if (logs.length > 100) logs.pop(); // keep only last 100

  fs.writeFileSync(logsPath, JSON.stringify(logs, null, 2));

  res.status(200).send('OK');
}
