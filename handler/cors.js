// middlewares/cors.js
import nc from 'next-connect';

const cors = nc()
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // Check if preflight request
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    next();
  });

export default cors;
