const chai = require("chai");
const assert = chai.assert;

const server = require("../server"); /** import the Express app **/

const chaiHttp = require("chai-http"); /** require the chai-http plugin **/
chai.use(chaiHttp); /** use the chai-http plugin **/

suite("Functional Tests", () => {
  // Mocha allows testing asyncronous operations.
  // There is a small (BIG) difference. Can you spot it ?

  // ### EXAMPLE ###
  test("Asynchronous test #example", (done) => {
    /** <= Pass a callback to the test function **/
    setTimeout(() => {
      assert.isOk("Async test !!");
      done(); /** Call 'done()' when the async operation is completed**/
    }, 70); // the function will be executed after 70ms, is the test exceed 2000ms is failed
  });

  // NOTE: The tests having #example in their description string,
  // are instructional examples and are not parsed by our test analyser

  suite("Integration tests with chai-http", () => {
    // We can test our API endpoints using a plugin, called chai-http.
    // Let's see how it works. And remember, API calls are asynchronous...

    // ### EXAMPLE ###
    suite('GET /hello?name=[name] => "hello [name]"', () => {
      // We send a name string in the url query string.
      test("#example - ?name=John", (done) => {
        // Don't forget the callback...
        chai
          .request(server) // 'server' is the Express App
          .get("/hello?name=John") // http_method(url)
          .end((err, res) => {
            if (err) return console.log(console.error(err));
            // Send the request. Pass a callback in
            // node style. `res` is the response object
            // res.status contains the status code
            assert.equal(res.status, 200, "response status should be 200");
            // res.text contains the response as a string
            assert.equal(
              res.text,
              "hello John",
              'response should be "hello John"'
            );
            done();
          });
      });

      /** Ready to have a try ?
       * Replace assert.fail(). Make the test pass. **/

      // If no name is passed, the endpoint responds with 'hello Guest'.
      test("Test GET /hello with no name", (done) => {
        // Don't forget the callback...
        chai
          .request(server) // 'server' is the Express App
          .get("/hello") // http_method(url). NO NAME in the query !
          .end((err, res) => {
            // res is the response object
            if (err) return console.log(console.error(err));
            // Test the status and the text response (see the example above).
            // Please follow the order -status, -text. We rely on that in our tests.
            // It should respond 'Hello Guest'
            assert.equal(res.status, 200);
            assert.equal(res.text, "hello Guest");
            done(); // Always call the 'done()' callback when finished.
          });
      });

      /**  Another one... **/
      test("Test GET /hello with your name", (done) => {
        // Don't forget the callback...
        chai
          .request(server) // 'server' is the Express App
          .get("/hello?name=Esteban") /** <=== Put your name in the query **/
          .end((err, res) => {
            // res is the response object
            if (err) return console.log(console.error(err));
            // Your tests here.
            // Replace assert.fail(). Make the test pass.
            // Test the status and the text response. Follow the test order like above.
            assert.equal(res.status, 200);
            assert.equal(
              res.text,
              "hello Esteban" /** <==  Put your name here **/
            );
            done(); // Always call the 'done()' callback when finished.
          });
      });
    });

    // In the next example we'll see how to send data in a request payload (body).
    // We are going to test a PUT request. The '/travellers' endpoint accepts
    // a JSON object taking the structure :
    // {surname: [last name of a traveller of the past]} ,
    // The endpoint responds with :
    // {name: [first name], surname:[last name], dates: [birth - death years]}
    // see the server code for more details.

    // ### EXAMPLE ###
    suite("PUT /travellers", () => {
      test('#example - responds with appropriate JSON data when sending {surname: "Polo"}', (done) => {
        chai
          .request(server)
          .put("/travellers") // note the PUT method
          .send({ surname: "Polo" }) // attach the payload, encoded as JSON
          .end((err, res) => {
            // Send the request. Pass a Node callback
            if (err) return console.log(console.error(err));

            // Testing the headers
            assert.equal(res.status, 200, "response status should be 200");
            assert.equal(
              res.type,
              "application/json",
              "Response should be json"
            );

            // res.body contains the response parsed as a JS object, when appropriate
            // (i.e the response type is JSON)
            assert.equal(
              res.body.name,
              "Marco",
              'res.body.name should be "Marco"'
            );
            assert.equal(
              res.body.surname,
              "Polo",
              'res.body.surname should be "Polo"'
            );

            // call 'done()' when... done
            done();
          });
      });

      /** Now it's your turn. Make the test pass. **/
      // We expect the response to be
      // {name: 'Cristoforo', surname: 'Colombo', dates: '1451 - 1506'}
      // check the status, the type, name and surname.

      // !!!! Follow the order of the assertions in the preceding example!!!!,
      // we rely on it in our tests.

      test('send {surname: "Colombo"}', (done) => {
        // we setup the request for you...
        chai
          .request(server)
          .put("/travellers")
          /** send {surname: 'Colombo'} here **/
          .send({ surname: "Colombo" })
          .end((err, res) => {
            /** your tests here **/
            if (err) return console.log(console.error(err));

            // Testing the headers
            assert.equal(res.status, 200, "response status should be 200");
            assert.equal(
              res.type,
              "application/json",
              "Response should be json"
            );

            // Testing the res.body that contains the response parsed as a JS Object
            assert.equal(
              res.body.name,
              "Cristoforo",
              'res.body.name should be "Cristoforo"'
            );
            assert.equal(
              res.body.surname,
              "Colombo",
              'res.body.surname should be "Colombo"'
            );
            assert.equal(
              res.body.dates,
              "1451 - 1506",
              'res.body.dates should be "1451 - 1506"'
            );
            done(); // Never forget the 'done()' callback...
          });
      });

      /** Repetition is the mother of learning. **/
      // Try it again. This time without help !!
      test('send {surname: "da Verrazzano"}', (done) => {
        /** place the chai-http request code here... **/
        chai
          .request(server)
          .put("/travellers")
          .send({ surname: "da Verrazzano" })
          .end((err, res) => {
            /** place your tests inside the callback **/
            if (err) return console.log(console.error(err));

            // Testing the headers
            assert.equal(res.status, 200, "response status should be 200");
            assert.equal(
              res.type,
              "application/json",
              "Response should be json"
            );

            // Testing the res.body that contains the response parsed as a JS Object
            assert.equal(
              res.body.name,
              "Giovanni",
              'res.body.name should be "Giovanni"'
            );
            assert.equal(
              res.body.surname,
              "da Verrazzano",
              'res.body.surname should be "da Verrazzano"'
            );
            assert.equal(
              res.body.dates,
              "1485 - 1528",
              'res.body.dates should be "1485 - 1528"'
            );
            done();
          });
      });
    });
  });

  // In the next challenges we are going to simulate the human interaction with
  // a page using a device called 'Headless Browser'. A headless browser is a web
  // browser without a graphical user interface. These kind of tools are
  // particularly useful for testing web pages as they are able to render
  // and understand HTML, CSS, and JavaScript the same way a browser would.

  // For these challenges we are using [Zombie.Js](http://zombie.js.org/)
  // It's a lightweight browser which is totally based on JS, without relying on
  // additional binaries to be installed. This feature makes it usable in
  // an environment such as Gomix. There are many other (more powerful) options.

  const Browser = require("zombie");

  // On Gomix we'll use this setting
  /** ### Copy your project's url here  ### **/
  // Browser.site = "mochachai-esteb.glitch.me";

  // If you are testing on a local environment replace the line above  with
  Browser.localhost("mochachai-esteb.glitch.me", process.env.PORT || 3000);

  suite("e2e Testing with Zombie.js", () => {
    const browser = new Browser();

    // Mocha allows You to prepare the ground running some code
    // before the actual tests. This can be useful for example to create
    // items in the database, which will be used in the successive tests.

    // With a headless browser, before the actual testing, we need to
    // **visit** the page we are going to inspect...
    // the suiteSetup 'hook' is executed only once at the suite startup.
    // Other different hook types can be executed before each test, after
    // each test, or at the end of a suite. See the Mocha docs for more infos.

    suiteSetup((done) => {
      // Remember, web interactions are asynchronous !!
      return browser.visit("/", done); // Browser asynchronous operations take a callback
    });

    suite('"Famous Italian Explorers" form', () => {
      // In the HTML main view we provided a input form.
      // It sends data to the "PUT /travellers" endpoint that we used above
      // with an Ajax request. When the request completes successfully the
      // client code appends a <div> containing the infos returned by the call
      // to the DOM.

      /**
       * As a starter, try the input form manually!
       * send the name 'Polo' ! You'll get infos about the famous
       * explorer 'Marco Polo'
       **/ // (not required to pass the tests)

      // Did it ? Ok. Let's see how to automate the process...

      // ### EXAMPLE ###
      test('#example - submit the input "surname" : "Polo"', (done) => {
        browser
          .fill("surname", "Polo")
          .then(() =>
            browser.pressButton("submit", () => {
              // pressButton is ## Async ##.
              // It waits for the ajax call to complete...

              // assert that status is OK 200
              browser.assert.success();
              // assert that the text inside the element 'span#name' is 'Marco'
              browser.assert.text("span#name", "Marco");
              // assert that the text inside the element 'span#surname' is 'Polo'
              browser.assert.text("span#surname", "Polo");
              // assert that the element(s) 'span#dates' exist and their count is 1
              browser.assert.element("span#dates", 1);
              done(); // It's an async test, so we have to call 'done()''
            })
          )
          .catch((err) => console.log(`error = ${err.code}`));
      });

      /** Now it's your turn. Please don't use the keyword #example in the title. **/

      test('submit "surname" : "Colombo" - write your e2e test...', (done) => {
        browser
          .fill("surname", "Colombo")
          .then(() =>
            browser.pressButton("submit", () => {
              // pressButton is Async.  Waits for the ajax call to complete...

              // assert that status is OK 200
              browser.assert.success();
              // assert that the text inside the element 'span#name' is 'Cristoforo'
              browser.assert.text("span#name", "Cristoforo");
              // assert that the text inside the element 'span#surname' is 'Colombo'
              browser.assert.text("span#surname", "Colombo");
              // assert that the element(s) 'span#dates' exist and their count is 1
              browser.assert.element("span#dates", 1);
              done(); // It's an async test, so we have to call 'done()''
            })
          )
          .catch((err) => console.log(`error = ${err.code}`));
        //
      });

      /** Try it again... No help this time **/
      test('submit "surname" : "Vespucci" - write your e2e test...', (done) => {
        // fill the form...
        // then submit it pressing 'submit' button.
        browser
          .fill("surname", "Vespucci")
          .then(() =>
            browser.pressButton("submit", () => {
              // pressButton is Async.  Waits for the ajax call to complete...
              // assert that status is OK 200
              // assert that the text inside the element 'span#name' is 'Amerigo'
              // assert that the text inside the element 'span#surname' is 'Vespucci'
              // assert that the element(s) 'span#dates' exist and their count is 1
              browser.assert.success();
              browser.assert.text("span#name", "Amerigo");
              browser.assert.text("span#surname", "Vespucci");
              browser.assert.element("span#dates", 1);
              done();
            })
          )
          .catch((err) => console.log(`error = ${err.code}`));
      });
    });
  });
});
