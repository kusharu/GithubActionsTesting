//Import the playwright module
//test object is to create "" number of test cases in the spec file
//expect object is used to carry out assertions/validations
const { test, expect } = require("@playwright/test");

//Import the respective JSON files for all environment
import { qaRequestPart } from '../test-data/qa/qaEnvTestData.json';
import { stageRequestPart } from '../test-data/stage/stageEnvTestData.json';

let testData = null;

test.beforeAll('Running before all tests', () => {
    if (process.env.ENV == 'qa') {
        testData = qaRequestPart;
    } else {
        testData = stageRequestPart;
    }
})

test("Read Test data based on different env in playwright for POST api request in playwright", async({request,}) =>{

    //Create a Post API request using static request body using Playwright
    const postAPIResponse = await request.post(process.env.PATHPARAMETER, {
        //Request body (data), headers (headers), Query parameters (params),etc
        data: {
            "firstname" : testData.firstname,
            "lastname" : testData.lastname,
            "totalprice" : testData.totalprice,
            "depositpaid" : testData.depositpaid,
            "bookingdates" : {
                "checkin" : testData.bookingdates.checkin,
                "checkout" : testData.bookingdates.checkout
            },
            "additionalneeds" : testData.additionalneeds,

        },
        headers: {
            "Content-Type": testData.headers.ContentType,
            "Accept": testData.headers.Accept,
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
    expect(postAPIResponsebody.booking).toHaveProperty("firstname" , testData.firstname);
    expect(postAPIResponsebody.booking).toHaveProperty("lastname" , testData.lastname);

    //Validate API response for specific nested JSON objects
    expect(postAPIResponsebody.booking.bookingdates).toHaveProperty("checkin" , testData.bookingdates.checkin);
    expect(postAPIResponsebody.booking.bookingdates).toHaveProperty("checkout" , testData.bookingdates.checkout);

});

