//Import the playwright module
//test object is to create "" number of test cases in the spec file
//expect object is used to carry out assertions/validations
const { test, expect } = require("@playwright/test");

//Import the faker package
//Will used to generate random first name , random last name, randome price required for request body
import { faker } from "@faker-js/faker";

//Import the Luxon Package
//Will used to generate random check in data and check out date, required for request body
const { DateTime } = require("luxon");




test("Create POST api request using dynamic Request body in playwright", async({request,}) =>{

    //Create random test data for first name
    const firstName = faker.person.firstName();

    //Create random test data for last name
    const lastName = faker.person.lastName();

    //Create random test data for total price - generating number betweeb 1 to 1000
    const totalPrice = faker.number.int(1000);

    //Create checkin date as today's date
    const checkInDate = DateTime.now().toFormat("yyyy-MM-dd");

    //Create checkout data which is five date from today
    const checkOutDate = DateTime.now().plus({day:5}).toFormat("yyyy-MM-dd");


    //Create a Post API request using static request body using Playwright
    const postAPIResponse = await request.post("/booking", {
        //Request body (data), headers (headers), Query parameters (params),etc
        data: {
            "firstname" : firstName,
            "lastname" : lastName,
            "totalprice" : totalPrice,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : checkInDate,
                "checkout" : checkOutDate
            },
            "additionalneeds" : "Lunch",

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
    expect(postAPIResponsebody.booking).toHaveProperty("firstname" , firstName);
    expect(postAPIResponsebody.booking).toHaveProperty("lastname" , lastName);

    //Validate API response for specific nested JSON objects
    expect(postAPIResponsebody.booking.bookingdates).toHaveProperty("checkin" , checkInDate);
    expect(postAPIResponsebody.booking.bookingdates).toHaveProperty("checkout" , checkOutDate);

    expect(postAPIResponsebody).toMatchObject({
        
            
            "booking": {
                "firstname": firstName,
                "lastname": lastName,
                "totalprice": totalPrice,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": checkInDate,
                    "checkout": checkOutDate
                },
                "additionalneeds": "Lunch"
            }
                                                                                                                                     
    });
});

