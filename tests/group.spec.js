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

//Import the post json file
var postRequest = require("../test-data/post_request_body.json");

//Import the token json file to create basic authentication key
const tokenRequest = require("../test-data/token_request_body.json");

//Import the common.js file where the function create range of number is defined
import { rangeNum } from "../utils/common";


// test.describe.configure({mode:'parallel'}, ()=>{

// })

// test.describe.configure({mode:'serial'}, ()=>{

// })
//test.describe.serial("Smoke Testing", ()=>{
//test.describe.parallel("Smoke Testing", ()=>{
test.describe("Smoke Testing", ()=>{

    //Global Variable will be used in the test group
    let bookingID  ;

    //4Th spec file
    test("@API Create POST api request using dynamic JSON file in playwright", async({request,}) =>{

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
    
    
        //Create a Post API request using static request body using Playwright
        const postAPIResponse = await request.post("/booking", {
    
            //Request body (data), headers (headers), Query parameters (params),etc
            //Convert String to JSON - updatedRequestBody variable is in string format ; converting to JSON using JSON object's stringify() method
            data: JSON.parse(updatedRequestBody),
           
    
        });
     
        //Validate the Status Codes
        //postAPIResponse.ok()  - Actual result
        //toBeTruthy() - expected result is true
        expect ( postAPIResponse.ok()).toBeTruthy();
        expect (postAPIResponse.status()).toBe(200);
        console.log(postAPIResponse.status());
        console.log(postAPIResponse.ok());
    
        //Convert the responce from String to JSON
        const postAPIResponsebody = await postAPIResponse.json();
        console.log("Response in JSON is :")
        console.log(postAPIResponsebody);

        //Get the booking ID and keep it to a variable
        bookingID = postAPIResponsebody.bookingid;
        console.log(bookingID);
    
        //Validate the JSON response body to check for specific JSON objects
        expect(postAPIResponsebody.booking).toHaveProperty("firstname" , firstName);
        expect(postAPIResponsebody.booking).toHaveProperty("lastname" , lastName);
    
        //Validate API response for specific nested JSON objects
        expect(postAPIResponsebody.booking.bookingdates).toHaveProperty("checkin" , checkInDate);
        expect(postAPIResponsebody.booking.bookingdates).toHaveProperty("checkout" , checkOutDate);
    
        
    });
    
    //Part of 5Th Spec File - post part removed
    test("@API Create GET api request in playwright", async({request,}) =>{
        console.log(bookingID);
        console.log("===================GET METHOD - GET BOOKING DETAILS========================")
        //Create a Get API request using dynamic request body using Playwright
        //METHOD CHAINING DONE HERE WHERE THE BOOKING ID FROM POST WILL BE UTILIZED IN GET METHOD
        // ` --> tick sign used 
        const getAPIResponse = await request.get(`/booking/${bookingID}`, {
    
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
        //toBeTruthy() - expected result is true
        expect ( getAPIResponse.ok()).toBeTruthy();
        expect (getAPIResponse.status()).toBe(200);
        console.log(getAPIResponse.status());
        console.log(getAPIResponse.ok());
    });
    
});

test.describe("Sanity Testing", ()=>{

    let bookingID  ;
    let tokenNo ;

    //4Th spec file
    test("@API Create POST api request using dynamic JSON file in playwright", async({request,}) =>{

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
    
    
        //Create a Post API request using static request body using Playwright
        const postAPIResponse = await request.post("/booking", {
    
            //Request body (data), headers (headers), Query parameters (params),etc
            //Convert String to JSON - updatedRequestBody variable is in string format ; converting to JSON using JSON object's stringify() method
            data: JSON.parse(updatedRequestBody),
           
    
        });
     
        //Validate the Status Codes
        //postAPIResponse.ok()  - Actual result
        //toBeTruthy() - expected result is true
        expect ( postAPIResponse.ok()).toBeTruthy();
        expect (postAPIResponse.status()).toBe(200);
        console.log(postAPIResponse.status());
        console.log(postAPIResponse.ok());
    
        //Convert the responce from String to JSON
        const postAPIResponsebody = await postAPIResponse.json();
        console.log("Response in JSON is :")
        console.log(postAPIResponsebody);

        //Get the booking ID and keep it to a variable
        bookingID = postAPIResponsebody.bookingid;
        console.log(bookingID);
    
        //Validate the JSON response body to check for specific JSON objects
        expect(postAPIResponsebody.booking).toHaveProperty("firstname" , firstName);
        expect(postAPIResponsebody.booking).toHaveProperty("lastname" , lastName);
    
        //Validate API response for specific nested JSON objects
        expect(postAPIResponsebody.booking.bookingdates).toHaveProperty("checkin" , checkInDate);
        expect(postAPIResponsebody.booking.bookingdates).toHaveProperty("checkout" , checkOutDate);
    
        
    });

    test("@API Authentication with POST method to generate token", async({request,}) =>{
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
        tokenNo = tokenAPIResponsebody.token;

    });

    test("@API PUT method to do changes", async({ request })=>{

        console.log("===================PUT METHOD - change in last name and additional needs ========================")
   
        //Print the JSON file used in posting method
        console.log("Original POST method request body JSON file: ")
        console.log(postRequest);

        //Update the firstname
        postRequest.firstname = "Sam";

        //Update the firstname
        postRequest.lastname = "Mendes";

        //Update the total price with range function defined in common.js file of utils folder
        postRequest.totalprice = rangeNum(1,1000);

        
        //Usually, when developers use the JSON.stringify() method, the second argument is usually skipped, 
        // or with a value null. But this argument has its relevance.
        //The third argument of JSON.stringify(value, replacer, space) is the number of spaces to use 
        // for pretty formatting.
        
        const jsonString  = JSON.stringify(postRequest, null, 2);

        //Converting the JSON file to Javascript Object using parse() method
        postRequest = JSON.parse(jsonString);

        //Print the Javascript Object after updation
        console.log("Updated POST method request body: ")
        console.log(postRequest);

        console.log(bookingID);
        console.log(tokenNo);

        const putAPIResponse = await request.put(`/booking/${bookingID}`, {
            //Uodated JSON file passed in request body
            data: postRequest,

            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cookie": `token=${tokenNo}`,
            },
        });
        //console.log(putAPIResponse);
        //Convert the response from String to JSON - this response has the changes done through PUT method
        // const putAPIResponsebody = await putAPIResponse.json();
        // console.log("Response in JSON for PUT method :")
        // console.log(putAPIResponsebody);
    
        //Validate the Status Codes
        //expect (putAPIResponse.ok()).toBeTruthy();
        expect (putAPIResponse.status()).toBe(201);

    });


});