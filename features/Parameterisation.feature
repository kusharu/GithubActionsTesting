Feature: Succesfull Posting of booking in a hotel using parameterization

  Scenario Outline: Successful Posting parameterization
    Given I send a POST request to the user endpoint with the payload conaining partly "<firstname>" and "<lastname>"
    When the response status code should be 200
    Then the response body should contain "Sam"

    Examples:
    | firstname | lastname |
    | Kunal | Mukherjee |
    | Sam | Merchant |

