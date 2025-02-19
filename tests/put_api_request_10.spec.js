//Import the playwright module
//test object is to create "" number of test cases in the spec file
//expect object is used to carry out assertions/validations
const { test, expect } = require("@playwright/test");

//Import the dynamic json file
var dynamicPostRequest = require("../test-data/dynamic_request_body.json");

//Import the token json file to create basic authentication key
const tokenRequest = require("../test-data/token_request_body.json");

//Import the faker package
//Will be used to generate random first name , random last name, randome price required for request body
import { faker } from "@faker-js/faker";

//Import the Luxon Package
//Will be used to generate random check in data and check out date, required for request body
const { DateTime } = require("luxon");

//Import the common.js file where the function to read data from faker and /or other value that we give and places in the index number of the JSOn file and converts to a string
import { stringFormat } from "../utils/common";


test("PUT API request in playwright using luxon and faker", async({request,}) =>{

    //Create random test data for first name
    const firstName = faker.person.firstName();

    //Create random test data for last name
    const lastName = faker.person.lastName();

    //Create random test data for total price - generating number betweeb 1 to 1000
    //const totalPrice = faker.number.int(1000);

    //Create checkin date as today's date
    const checkInDate = DateTime.now().toFormat("yyyy-MM-dd");

    //Create checkout data which is five date from today
    const checkOutDate = DateTime.now().plus({day:5}).toFormat("yyyy-MM-dd");

    //Using the String format function from common.js file
    //dynamicPostRequest JSON file is converted to string using JSON object stringify() method as the function takes str as the argument.
    //firstName, lastName, "apple" -> varargs i.e. ...args in the function
    var updatedRequestBody = stringFormat(JSON.stringify(dynamicPostRequest), firstName, lastName, "apple")

    
    console.log("===================POST METHOD - CREATE BOOKING========================")

    //Create a Post API request using static request body using Playwright
    const postAPIResponse = await request.post("/booking", {

        //Request body (data), headers (headers), Query parameters (params),etc
        //Convert String to JSON - updatedRequestBody variable is in string format ; converting to JSON using JSON object's stringify() method
        data: JSON.parse(updatedRequestBody),
        // params:,
        // headers:,

    });
 
    //Validate the Status Codes
    //postAPIResponse.ok()  - Actual result
    //toBeTruthy() - exoected result is true
    expect ( postAPIResponse.ok()).toBeTruthy();
    expect (postAPIResponse.status()).toBe(200);
    console.log(postAPIResponse.status());
    console.log(postAPIResponse.ok());

    //Convert the responce from String to JSON - this response has the booking id which is done in POST METHOD
    const postAPIResponsebody = await postAPIResponse.json();
    console.log("Response in JSON is :")
    console.log(await postAPIResponse.json());

    //Get the booking ID and keep it to a variable
    const bID = postAPIResponsebody.bookingid;
   

    //Validate the JSON response body to check for specific JSON objects
    expect(postAPIResponsebody.booking).toHaveProperty("firstname" , firstName);
    expect(postAPIResponsebody.booking).toHaveProperty("lastname" , lastName);

    //Validate API response for specific nested JSON objects
    expect(postAPIResponsebody.booking.bookingdates).toHaveProperty("checkin" , checkInDate);
    expect(postAPIResponsebody.booking.bookingdates).toHaveProperty("checkout" , checkOutDate);

   

    console.log("===================GET METHOD========================")
    //Create a Get API request using dynamic request body using Playwright
    const getAPIResponse = await request.get(`/booking/${bID}`, {

        headers: {
            "Accept": "application/json", 
        },

    });

    //Convert the response from String to JSON - this response has the booking id which is done in POST METHOD
    const getAPIResponsebody = await getAPIResponse.json();
    console.log("Response in JSON is :")
    console.log(getAPIResponsebody);

    //Validate the Status Codes
    expect ( getAPIResponse.ok()).toBeTruthy();
    expect (getAPIResponse.status()).toBe(200);
    
    console.log("===================AUTHENTICATION KEY WITH POST METHOD ========================")
    const tokenAPIResponse = await request.post("/auth", {
        //Request body
        data: tokenRequest,

        headers: {
            "Content-Type": "application/json",
        },


    });

    //Validate the Status Codes
    expect ( tokenAPIResponse.ok()).toBeTruthy();
    expect (tokenAPIResponse.status()).toBe(200);

    //Convert the response from String to JSON - this response has the token which is done in POST METHOD of authentication
    const tokenAPIResponsebody = await tokenAPIResponse.json();
    console.log("Response in JSON for token is :")
    console.log(tokenAPIResponsebody);

    //Get the token number from the JSON variable "tokenAPIResponsebody"
    const tokenNo = tokenAPIResponsebody.token;


    console.log("===================PUT METHOD - change in last name and additional needs ========================")
   
    //Using the String format function from common.js file
    //"Sam", "Merchant" - hard coding for first name and last name
    //var updatedRequestBody1 = stringFormat(JSON.stringify(dynamicPostRequest), "Sam", "Merchant", "Banana")
    
    //firstName1, lastName1 - random value generated from faker
    //Create random test data for first name
    const firstName1 = faker.person.firstName();

    //Create random test data for last name
    const lastName1 = faker.person.lastName();
    
    var updatedRequestBody1 = stringFormat(JSON.stringify(dynamicPostRequest), firstName1, lastName1, "Banana")
    
    const putAPIResponse = await request.put(`/booking/${bID}`, {

        data: JSON.parse(updatedRequestBody1),

        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cookie": `token=${tokenNo}`,
        },
    });

     //Convert the response from String to JSON - this response has the changes done through PUT method
     const putAPIResponsebody = await putAPIResponse.json();
     console.log("Response in JSON for PUT method is :")
     console.log(putAPIResponsebody);
 
     //Validate the Status Codes
     expect (putAPIResponse.ok()).toBeTruthy();
     expect (putAPIResponse.status()).toBe(200);
});

