//! Modules Needed
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import fetch from 'sync-fetch';
import {GetCountry, GetTotalCases, GetAllCountriesAtOnce} from './parser.js'
dotenv.config()

//! Global Variables
const app = express();
const port = 3001;






app.use(express.json());
app.use(cors());

//! Data needed for the frontend.
const latest_totals = GetTotalCases;
const get_all_countries = GetAllCountriesAtOnce;

//! connection IP.
// const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
// console.log(ip); // ip address of the user
//? Main page connection.
app.get('/', (req,res) => {
    res.send(latest_totals());
});


//? Specific country information connection
app.get('/countries', (req,res) => {
    res.send(get_all_countries());
})



//? Listening to the Port.
app.listen(port, () => {
    console.log(`Port ${port} dinleniyor...`);

})