import { Request, Response } from 'express';
import { ClientRequest } from 'http';
import logger from './util/logger';


import { PORT, SESSION_SECRET, TIMEOUT, FFDC_URL } from './util/config';
const httpPorxy = require('http-proxy');
const queryString = require('querystring');

// Controllers (route handlers)

const compression = require('compression');
const cors = require('cors')
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const lusca = require('lusca');
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const MongoClient = require('mongodb').MongoClient;
var db;
var CustomerCollection;
var LoanCollection;
var LenderCollection;
var BorrowerCollection;
var RatesPersonalCollection;
var CategoryCollection;
var OrganisationCollection;
var LenderCollection;
var InterestDetailsCollection;

MongoClient.connect("mongodb+srv://dbuser:hello123@communitycluster.faur0.mongodb.net/Communiti?retryWrites=true&w=majority", function (err, database) {
  if (err) throw err;

  db = database;
  CustomerCollection = db.db("Communiti").collection("customers");
  //LoanCollection = db.db("Communiti").collection("loans");
  LenderCollection = db.db("Communiti").collection("lenders");
  OrganisationCollection = db.db("Communiti").collection("Organisation");
  InterestDetailsCollection = db.db("Communiti").collection("InterestDetails");
  BorrowerCollection = db.db("Communiti").collection("borrowers");
  LoanCollection = db.db("Communiti").collection("loans");
  RatesPersonalCollection = db.db("Communiti").collection("ratespersonal");
  CategoryCollection = db.db("Communiti").collection("category");
  // Start the application after the database connection is ready
  console.log("connected to db");
});


// Create Express server
const app = express();
//const cors = require('cors');
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));
//app.use(cors());
const proxy = httpPorxy.createProxyServer({
  changeOrigin: true,
  proxyTimeout: TIMEOUT,
  secure: false,
  timeout: TIMEOUT
});

function generateUUID() { // Public Domain/MIT
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

proxy.on('proxyReq', (proxyReq: ClientRequest, req: Request, res: Response, options: any) => {
  if (req.body.firstName || req.body.enterpriseName || req.body.customerId || req.body.relatedIdentifier) {
    console.log("I'm inside");
    proxyReq.setHeader('X-Request-ID', generateUUID());
    proxyReq.setHeader('Idempotency-Key', 'honeypunch');
  }

  if (!req.body || !Object.keys(req.body).length) {
    return;
  }
  const contentType = proxyReq.getHeader('Content-Type');
  let bodyData;

  if (contentType === 'application/json') {
    bodyData = JSON.stringify(req.body);
  }
  if (contentType === 'application/x-www-form-urlencoded') {
    bodyData = queryString.stringify(req.body);
  }
  if (bodyData) {
    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
    proxyReq.write(bodyData);
  }
});

// Express configuration
app.set('port', PORT);
app.set('timeout', TIMEOUT);
app.set('views', path.join(__dirname, '../../server/views'));
app.set('view engine', 'pug');
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 60 * 1000,
    name: 'FFDC_SSID',
    secure: false,
    secret: SESSION_SECRET,
    httpOnly: true
  })
);

app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

// app.get('/login', passport.authenticate('oidc'));
// app.get('/login/callback', (req, res, next) => {
//   if (req.query.error) {
//     return res.redirect('/error');
//   }
//   passport.authenticate('oidc', (err, user, info) => {
//     if (err || !user) {
//       logger.error(err || info);
//       return res.redirect('/login');
//     }
//     req.logIn(user, (error: any) => {
//       if (error) {
//         return res.redirect('/login');
//       }
//       console.log("done");
//       return res.redirect('/');
//     });
//   })(req, res, next);
// });

// app.post('/refresh_token', auth.refreshToken);

// app.get('/logout', (req, res) => {
//   req.logout();
//   if (req.session && typeof req.session.destroy === 'function') {
//     req.session.destroy(() => {
//       logger.info('Session is destroyed');
//     });
//   }
//   delete req.session;

//   res.redirect('/login');
// });


// app.get('/api/user', auth.isAuthenticated, userController.getUser);
app.use('/proxy', (req, res) => {
  console.log('inside middle proxy');
  console.log(req.body);
  proxy.web(req, res, {
    target: `${FFDC_URL}/retail-banking`
  }, (err: any) => {
    logger.error(err);
    logger.error(err.message);
    res.writeHead(500, {
      'Content-Type': 'text/plain'
    });
    res.end('An error occurred while proxying the request');
  });
});
app.use('/tokenproxy', (req, res) => {
  proxy.web(req, res, {
    target: `${FFDC_URL}/login/v1/sandbox/oidc/token`
  }, (err: any) => {
    logger.error(err.message);
    res.writeHead(500, {
      'Content-Type': 'text/plain'
    });
    res.end('An error occurred while proxying the request');
  });
});

// DB Routes
app.post('/insertBorrower', (req, res) => {
  console.log('POST request to insert customer');
  BorrowerCollection.insertOne(req.body);
  res.send({ "success": "done" });
})

app.post('/insertLender', (req, res) => {
  console.log('POST request to insert customer');
  LenderCollection.insertOne(req.body);
  res.send({ "success": "done" });
})
app.post('/insertLoan', (req, res) => {
  console.log('POST request to insert loan');
  LoanCollection.insertOne(req.body);
  res.send({"success":"done"});
})
app.post('/insertOrganisation', (req, res) => {
  console.log('POST request to insert organisation');
  OrganisationCollection.insertOne(req.body);
  res.send({"success":"done"});
})

app.post('/insertInterestDetails', (req, res) => {
  console.log('POST request to insert Interest Details');
  InterestDetailsCollection.insertOne(req.body);
  res.send({"success":"done"});
})

// app.post('/insertLoan', (req, res) => {
//   console.log('POST request to insert loan');
//   LoanCollection.insertOne(req.body);
//   res.send({"success":"done"});
// })

// app.post('/insertLender', (req, res) => {
//   console.log('POST request to insert lender');
//   LenderCollection.insertOne(req.body);
//   res.send({"success":"done"});
// })

// app.post('/insertBid', (req, res) => {
//   console.log('POST request to insert bid');
//   BidCollection.insertOne(req.body);
//   res.send({"success":"done"});
// })

app.get('/:id/loans', function(req , res){
  console.log('GET request to get loans by customer ID');
  LoanCollection.find({"customerId" : req.params.id}).toArray(function(err, result) {
    if (err) throw err;
    console.log("found loans");
    console.log(result);
    res.send(result);
  }); 
});

app.get('/borrower/:customerId', function (req, res) {
  console.log('GET request to get borrower details by customer id');
  BorrowerCollection.find({ "customerId": req.params.customerId }).toArray(function (err, result) {
    if (err) throw err;
    console.log("found customer");
    console.log(result);
    res.send(result);
  });
});

app.get('/personalLoan/:category/:experience', function (req, res) {
  console.log('GET request to get personal loan amount');
  RatesPersonalCollection.find({ "category": req.params.category, "experience": parseInt(req.params.experience) }).toArray(function (err, result) {
    if (err) throw err;
    console.log("found rates");
    console.log(result);
    res.send(result);
  });
});

// app.get('/allbids', function(req , res){
//   console.log('GET request to get all bids');
//   BidCollection.find({}).toArray(function(err, result) {
//     if (err) throw err;
//     console.log("found bids!!");
//     console.log(result);
//     res.send(result);
//   }); 
// });

// app.get('/bids/customer/:customerid', function(req , res){
//   console.log('GET request to get bids by customer id');
//   BidCollection.find({"customerId" : req.params.customerid}).toArray(function(err, result) {
//     if (err) throw err;
//     console.log("found bids!!");
//     console.log(result);
//     res.send(result);
//   }); 
// });
// app.post('/modifybid/:loanid/:lenderid', function(req , res){
//   console.log('update request to update bid');
//   console.log(req.body);
//   BidCollection.remove({"loanId" : req.params.loanid, "lenderId": req.params.lenderid});
//   console.log("removal done");
//   BidCollection.insertOne(req.body);
//   console.log("insertion done");
//   res.send({"success":"done"});
// });



// app.get('/getAllLoans', function(req , res){
//   console.log('GET request to get all loans');
//   LoanCollection.find({}).toArray(function(err, result) {
//     if (err) throw err;
//     console.log("found loans");
//     console.log(result);
//     res.send(result);
//   }); 
// });

const appFolder = path.join(__dirname, '../../dist/hacka-ui');

app.use(express.static(appFolder), (rep, res) => {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.header('Access-Control-Allow-Origin', '*');
  res.sendFile('index.html', { root: appFolder });
});

export default app;
