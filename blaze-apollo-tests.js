// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by blaze-apollo.js.
import { name as packageName } from "meteor/blaze-apollo";

// Write your tests here!
// Here is an example.
Tinytest.add('blaze-apollo - example', function (test) {
  test.equal(packageName, "blaze-apollo");
});
