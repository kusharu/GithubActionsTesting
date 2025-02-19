import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';


Before(async function () {
    console.log("Before starting the scenario - before hook runs")
});

After(async function ({ pickle, result }) {
    console.log("After Finishing the scenario - after hook runs")
});