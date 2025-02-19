Feature: Succesfull Posting of booking in a hotel

  Scenario: Successful Posting
    Given I send a POST request to the user endpoint with the payload:
    When the response status code should be 200
    Then the response body should contain "Sam"