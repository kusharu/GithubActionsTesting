//Import the playwright module
//test object is to create "" number of test cases in the spec file
//expect object is used to carry out assertions/validations
const { test, expect } = require("@playwright/test");

test("@Web First test Case", async({request,}) =>{

    console.log("First test case in Parallel1 spec file")

    
});

test("@Web Second test Case", async({request,}) =>{

    console.log("Second test case in Parallel1 spec file")

    
});

test("@Web Third test Case", async({request,}) =>{

    console.log("Third test case in Parallel1 spec file")

    
});