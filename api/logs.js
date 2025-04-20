const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  const logsPath = path.resolve('./logs.json');
  if (!fs.existsSync(logsPath)) {
    return res.status(200).json([]);
  }

  const logs = JSON.parse(fs.readFileSync(logsPath));
  res.status(200).json(logs);
}
