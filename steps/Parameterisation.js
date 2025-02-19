const { Given, When, Then } = require("@cucumber/cucumber");
const fetch = require('node-fetch') ;

Given('I send a POST request to the user endpoint with the payload conaining partly {string} and {string}', async function (string, string2) {
    this.res = await fetch("https://restful-booker.herokuapp.com/booking", {
            method: "post",
            headers: { "Content-Type": "application/json",
                "Accept": "application/json",
             },
            body: JSON.stringify({
                "firstname" : string,
                "lastname" : string2,
                "totalprice" : 1000,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2018-01-23",
                    "checkout" : "2019-01-30"
                },
                "additionalneeds" : "Lunch",
    
            }),
        });
    
});