//Import the playwright module
//test object is to create "" number of test cases in the spec file
//expect object is used to carry out assertions/validations
const { test, expect } = require("@playwright/test");

//Import the dynamic json file
var dynamicPostRequest = require("../test-data/dynamic_request_body.json");


//Import the faker package
//Will be used to generate random first name , random last name, randome price required for request body
import { faker } from "@faker-js/faker";

//Import the Luxon Package
//Will be used to generate random check in data and check out date, required for request body
const { DateTime } = require("luxon");

//Import the common.js file where the function to read data from faker and /or other value that we give and places in the index number of the JSOn file and converts to a string
import { stringFormat } from "../utils/common";

test("Create GET api request in playwright", async({request,}) =>{

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

    expect(postAPIResponsebody).toMatchObject({
        
            
            "booking": {
                "firstname": firstName,
                "lastname": lastName,
                "totalprice": 1000,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": checkInDate,
                    "checkout": checkOutDate
                },
                "additionalneeds": "apple"
            }
                                                                                                                                     
    });

    console.log("===================GET METHOD - GET BOOKING DETAILS========================")
    //Create a Get API request using dynamic request body using Playwright
    //METHOD CHAINING DONE HERE WHERE THE BOOKING ID FROM POST WILL BE UTILIZED IN GET METHOD
    // ` --> tick sign used 
    const getAPIResponse = await request.get(`/booking/${bID}`, {

        headers: {
            "Accept": "application/json", 
        },

    });

    //Convert the responce from String to JSON - this response has the booking id which is done in POST METHOD
    const getAPIResponsebody = await getAPIResponse.json();
    console.log("Response in JSON is :")
    console.log(getAPIResponsebody);

     //Validate the Status Codes
    //postAPIResponse.ok()  - Actual result
    //toBeTruthy() - exoected result is true
    expect ( getAPIResponse.ok()).toBeTruthy();
    expect (getAPIResponse.status()).toBe(200);
    //expect (getAPIResponse.headers).toContain("Content-Type","application/json");
    //expect (getAPIResponse.headers).toContain("Server": "Cowboy");
    console.log(getAPIResponse.status());
    console.log(getAPIResponse.ok());



});

