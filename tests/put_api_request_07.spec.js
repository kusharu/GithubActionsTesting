//Import the playwright module
//test object is to create "" number of test cases in the spec file
//expect object is used to carry out assertions/validations
const { test, expect } = require("@playwright/test");

//Import the post json file
const postAPIRequest = require("../test-data/post_request_body.json");

//Import the post json files which has information changed for last name and additional needs
const putAPIRequest = require("../test-data/put_request_body.json");

//Import the token json file to create basic authentication key
const tokenRequest = require("../test-data/token_request_body.json");




test("PUT API request in playwright", async({request,}) =>{

    
    console.log("===================POST METHOD - CREATE BOOKING========================")

    //Create a Post API request using static request body using Playwright
    const postAPIResponse = await request.post("/booking", {

        //Request body (data), headers (headers), Query parameters (params),etc
        //Convert String to JSON - updatedRequestBody variable is in string format ; converting to JSON using JSON object's stringify() method
        data: postAPIRequest,
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
    expect(postAPIResponsebody.booking).toHaveProperty("firstname" , "Kaushik");
    expect(postAPIResponsebody.booking).toHaveProperty("lastname" , "Mukherjee");

    //Validate API response for specific nested JSON objects
    expect(postAPIResponsebody.booking.bookingdates).toHaveProperty("checkin" , "2018-01-01");
    expect(postAPIResponsebody.booking.bookingdates).toHaveProperty("checkout" , "2019-01-01");

   

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
    const putAPIResponse = await request.put(`/booking/${bID}`, {

        data: putAPIRequest,

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

