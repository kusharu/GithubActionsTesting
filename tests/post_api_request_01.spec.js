//Import the playwright module
//test object is to create "" number of test cases in the spec file
//expect object is used to carry out assertions/validations
const { test, expect } = require("@playwright/test");


test("Create POST api request using static request body in playwright", async({request,}) =>{

    //Create a Post API request using static request body using Playwright
    const postAPIResponse = await request.post("/booking", {
        //Request body (data), headers (headers), Query parameters (params),etc
        data: {
            "firstname" : "Sam",
            "lastname" : "Mendes",
            "totalprice" : 1000,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2019-01-01"
            },
            "additionalneeds" : "Lunch",

        },
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        
    });

    //Validate the Status Codes
    //postAPIResponse.ok()  - Actual result
    //toBeTruthy() - exoected result is true
    expect ( postAPIResponse.ok()).toBeTruthy();
    expect (postAPIResponse.status()).toBe(200);
    console.log(postAPIResponse.status());
    console.log(postAPIResponse.ok());

    //Convert the responce from String to JSON
    const postAPIResponsebody = await postAPIResponse.json();
    console.log("Response in JSON is :")
    console.log(await postAPIResponse.json());

    //Validate the JSON response body to check for specific JSON objects
    expect(postAPIResponsebody.booking).toHaveProperty("firstname" , "Sam");
    expect(postAPIResponsebody.booking).toHaveProperty("lastname" , "Mendes");

    //Validate API response for specific nested JSON objects
    expect(postAPIResponsebody.booking.bookingdates).toHaveProperty("checkin" , "2018-01-01");
    expect(postAPIResponsebody.booking.bookingdates).toHaveProperty("checkout" , "2019-01-01");

});

