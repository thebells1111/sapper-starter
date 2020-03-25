const express = require('express');
const compression = require('compression');
const sirv = require('sirv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
import * as sapper from '@sapper/server';
const dotenv = require('dotenv');
dotenv.config();

const { NODE_ENV, PORT, DATABASE, SECRET } = process.env;

const dev = NODE_ENV === 'development';

function authenticate(req, res, next) {
  const ssid = req.cookies && req.cookies.ssid ? req.cookies.ssid : undefined;
  jwt.verify(ssid, SECRET, {}, function (err, decoded) {
    if (err) {
      return (req.user = { verified: false });
    }
    req.user = {
      verified: true,
      username: decoded.username,
      id: decoded.id,
    };
  });

  next();
}

mongoose
  .connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => {
      //console.log('Database Connected');
    },
    (err) => {
      console.log('DATABASE ERR: ' + err);
    }
  );

const app = express();

app
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),
    cookieParser(),
    authenticate,
    sapper.middleware({
      session: (req, res) => {
        let session = {};
        session.user = req.user;
        session.cookies = req.cookies
        return session;
      },
    })
  )
  .listen(PORT, (err) => {
    if (err) console.log('error', err);
  });
