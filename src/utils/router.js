require('dotenv').config();

const clientPASS = process.env.REACT_APP_CLIENT_PASS;
const clientOVU = process.env.REACT_APP_CLIENT_OVU;
const clientMM = process.env.REACT_APP_CLIENT_MM;

module.exports = {
    clientPASS: clientPASS,
    clientOVU: clientOVU,
    clientMM: clientMM,
}