const { Given, When, Then } = require("@cucumber/cucumber");
const fetch = require('node-fetch') ;

Given('I send a POST request to the user endpoint with the payload:', async function () {

    //Using this keyword to create a world constructor
    this.res = await fetch("https://restful-booker.herokuapp.com/booking", {
        method: "post",
        headers: { "Content-Type": "application/json",
            "Accept": "application/json",
         },
        body: JSON.stringify({
            "firstname" : "Sam",
            "lastname" : "Mendes",
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

When('the response status code should be {int}', async function (int) {
    this.status = await this.res.status; // fetch returns status as a property
    if (this.status !== 200) {
        throw new Error(`Expected status code 200 but got ${this.status}`);
    }

});

Then('the response body should contain {string}', async function (string) {
    console.log("Status is " +this.status);
    const body = await this.res.json(); // fetch returns JSON via res.json()
    console.log(body);
    if (!JSON.stringify(body).includes("Sam")) {
        throw new Error(`Response body does not contain 'Sam'`);
    }

});