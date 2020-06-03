# Node Server - Basic Express for challenges in FCC

![GitHub package.json version][gh-pack-json-v] ![GitHub package.json dependency version express][gh-pack-json-dep-v-express] ![Last commit][last-commit-bdg] [![Website][website-bdg]][website] [![MIT License][license-bdg]][license] [![Twitter Follow][twitter-bdg]][twitter]
[![Workflow badge][workflow-bdg]][glitch-workflow] [![PRs Welcome][prs-bdg]][prs-site]
Created from the [FCC](https://freecodecamp.com) repository, to compile the lessons about node and express.

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F31OD9K)

Start with an empty repository and making the git init as follows:

```git
git init
git clone https://github.com/Estebmaister/node-express.git
```

Adding the files from the original repo in FCC and start to coding.

## Scripts

To install all the dependencies :

```npm
npm install
```

To run the server

```node
node server.js
```

## Challenges

### Table of Contents

1. [Meet the Node console](#1-meet-the-node-console)
1. [Start a Working Express Server](#2-start-a-working-express-server)
1. [Serve an HTML File](#3-serve-an-html-file)
1. [Serve Static Assets](#4-serve-static-assets)
1. [Serve JSON on a Specific Route](#5-serve-json-on-a-specific-route)
1. [Use the .env File](#6-use-the-env-file)
1. [Implement a Root-Level Request Logger Middleware](#7-implement-a-root-level-request-logger-middleware)
1. [Chain Middleware to Create a Time Server](#8-chain-middleware-to-Create-a-time-server)
1. [Get Route Parameter Input from the Client](#9-get-route-parameter-input-from-the-client)
1. [Get Query Parameter Input from the Client](#10-get-query-parameter-input-from-the-client)
1. [Use body-parser to Parse POST Requests](#11-use-body-parser-to-parse-post-requests)
1. [Get Data from POST Requests](#12-get-data-from-post-requests)

### 1. Meet the Node console

During the development process, it is important to be able to check what’s going on in your code. Node is just a JavaScript environment. Like client side JavaScript, you can use the console to display useful debug information. On your local machine, you would see the console output in a terminal. On Glitch you can open the logs in the lower part of the screen. You can toggle the log panel with the button ‘Logs’ (lower-left, inside the tools menu).

We recommend to keep the log panel open while working at these challenges. By reading the logs, you can be aware of the nature of errors that may occur.

- Added `console.log("Hello World")` to myApp.js.

**[⬆ back to top](#table-of-contents)**

### 2. Start a Working Express Server

In the first two lines of the file`myApp.js`, you can see how easy it is to create an Express app object. This object has several methods, and you will learn many of them in these challenges. One fundamental method is `app.listen(port)`. It tells your server to listen on a given port, putting it in running state. You can see it at the bottom of the file. It is inside comments because, for testing reasons, we need the app to be running in the background. All the code that you may want to add goes between these two fundamental parts. Glitch stores the port number in the environment variable `process.env.PORT`. Its value is `3000`.

Let’s serve our first string! In Express, routes takes the following structure: `app.METHOD(PATH, HANDLER)`. METHOD is an http method in lowercase. PATH is a relative path on the server (it can be a string, or even a regular expression). HANDLER is a function that Express calls when the route is matched.

Handlers take the form `function(req, res) {...}`, where req is the request object, and res is the response object. For example, the handler

```node
function(req, res) {
  res.send('Response String');
}
```

will serve the string 'Response String'.

- Added `app.get("/", function(req, res) {res.send('Hello Express');})` to myApp.js.

**[⬆ back to top](#table-of-contents)**

### 3. Serve an HTML File

You can respond to requests with a file using the `res.sendFile(path)` method. You can put it inside the `app.get('/', ...)` route handler. Behind the scenes, this method will set the appropriate headers to instruct your browser on how to handle the file you want to send, according to its type. Then it will read and send the file. This method needs an absolute file path. We recommend you to use the Node global variable `\_\_dirname` to calculate the path like this:

```node
absolutePath = __dirname + relativePath / file.ext;
```

- Changed handler `app.get("/", function(req, res) {res.sendFile(__dirname + "/views/index.html");})` in myApp.js.

**[⬆ back to top](#table-of-contents)**

### 4. Serve Static Assets

An HTML server usually has one or more directories that are accessible by the user. You can place there the static assets needed by your application (stylesheets, scripts, images). In Express, you can put in place this functionality using the middleware `express.static(path)`, where the `path` parameter is the absolute path of the folder containing the assets. If you don’t know what middleware is... don’t worry, we will discuss in detail later. Basically, middleware are functions that intercept route handlers, adding some kind of information. A middleware needs to be mounted using the method `app.use(path, middlewareFunction)`. The first `path` argument is optional. If you don’t pass it, the middleware will be executed for all requests.

- Added `app.use("/",express.static(__dirname + "/public" ))` to myApp.js.

**[⬆ back to top](#table-of-contents)**

### 5. Serve JSON on a Specific Route

While an HTML server serves (you guessed it!) HTML, an API serves data. A REST (REpresentational State Transfer) API allows data exchange in a simple way, without the need for clients to know any detail about the server. The client only needs to know where the resource is (the URL), and the action it wants to perform on it (the verb). The GET verb is used when you are fetching some information, without modifying anything. These days, the preferred data format for moving information around the web is JSON. Simply put, JSON is a convenient way to represent a JavaScript object as a string, so it can be easily transmitted.

Let's create a simple API by creating a route that responds with JSON at the path `/json`. You can do it as usual, with the `app.get()` method. Inside the route handler, use the method `res.json()`, passing in an object as an argument. This method closes the request-response loop, returning the data. Behind the scenes, it converts a valid JavaScript object into a string, then sets the appropriate headers to tell your browser that you are serving JSON, and sends the data back. A valid object has the usual structure `{key: data}`. `data` can be a number, a string, a nested object or an array. `data` can also be a variable or the result of a function call, in which case it will be evaluated before being converted into a string.

- Added `app.get("/json", function(req, res) {res.json({ "message": "Hello json" }); });` to myApp.js.

**[⬆ back to top](#table-of-contents)**

### 6. Use the .env File

The `.env` file is a hidden file that is used to pass environment variables to your application. This file is secret, no one but you can access it, and it can be used to store data that you want to keep private or hidden. For example, you can store API keys from external services or your database URI. You can also use it to store configuration options. By setting configuration options, you can change the behavior of your application, without the need to rewrite some code.

The environment variables are accessible from the app as `process.env.VAR_NAME`. The `process.env` object is a global Node object, and variables are passed as strings. By convention, the variable names are all uppercase, with words separated by an underscore. The `.env` is a shell file, so you don’t need to wrap names or values in quotes. It is also important to note that there cannot be space around the equals sign when you are assigning values to your variables, e.g. `VAR_NAME=value`. Usually, you will put each variable definition on a separate line.

- Added the following code to myApp.js.

```node
message = "Hello json";

if (process.env.MESSAGE_STYLE === "uppercase") {
  message = message.toUpperCase();
}

app.get("/json", function (req, res) {
  res.json({ message: message });
});
```

For this to work you have to pass the variable in your terminal or install other dependencies for .env files.

i.e. `npx cross-env MESSAGE_STYLE=uppercase node server`

For Linux Mac or Windows after install **cross-env**, or `npx node-env-run server` with **node-env-run** and the `.dev` file.

Another possible choice is **dotenv** with an extra line the code: `require('dotenv').config();` at the top of your `js` for load all the variables in `.env`.

**[⬆ back to top](#table-of-contents)**

### 7. Implement a Root-Level Request Logger Middleware

Earlier, you were introduced to the `express.static()` middleware function. Now it’s time to see what middleware is, in more detail. Middleware functions are functions that take 3 arguments: the request object, the response object, and the next function in the application’s request-response cycle. These functions execute some code that can have side effects on the app, and usually add information to the request or response objects. They can also end the cycle by sending a response when some condition is met. If they don’t send the response when they are done, they start the execution of the next function in the stack. This triggers calling the 3rd argument, `next()`.

Look at the following example:

```node
function(req, res, next) {
  console.log("I'm a middleware...");
  next();
}
```

Let’s suppose you mounted this function on a route. When a request matches the route, it displays the string “I’m a middleware…”, then it executes the next function in the stack. In this exercise, you are going to build root-level middleware. As you have seen in challenge 4, to mount a middleware function at root level, you can use the `app.use(<mware-function>)` method. In this case, the function will be executed for all the requests, but you can also set more specific conditions. For example, if you want a function to be executed only for POST requests, you could use `app.post(<mware-function>)`. Analogous methods exist for all the HTTP verbs (GET, DELETE, PUT, …).

- Added this code to the beginning of the myApp.js file:

```node
app.use("/", function (req, res, next) {
  const { method, path, ip } = req;
  console.log(`${method} ${path} - ${ip}`);
  next();
});
```

**[⬆ back to top](#table-of-contents)**

### 8. Chain Middleware to Create a Time Server

Middleware can be mounted at a specific route using app.METHOD(path, middlewareFunction). Middleware can also be chained inside route definition.

Look at the following example:

```node
app.get(
  "/user",
  function (req, res, next) {
    req.user = getTheUserSync(); // Hypothetical synchronous operation
    next();
  },
  function (req, res) {
    res.send(req.user);
  }
);
```

This approach is useful to split the server operations into smaller units. That leads to a better app structure, and the possibility to reuse code in different places. This approach can also be used to perform some validation on the data. At each point of the middleware stack you can block the execution of the current chain and pass control to functions specifically designed to handle errors. Or you can pass control to the next matching route, to handle special cases. We will see how in the advanced Express section.

- Added the following code to myApp.js:

```node
app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);
```

**[⬆ back to top](#table-of-contents)**

### 9. Get Route Parameter Input from the Client

When building an API, we have to allow users to communicate to us what they want to get from our service. For example, if the client is requesting information about a user stored in the database, they need a way to let us know which user they're interested in. One possible way to achieve this result is by using route parameters. Route parameters are named segments of the URL, delimited by slashes (/). Each segment captures the value of the part of the URL which matches its position. The captured values can be found in the `req.params` object.

```node
route_path: '/user/:userId/book/:bookId'
actual_request_URL: '/user/546/book/6754'
req.params: {userId: '546', bookId: '6754'}
```

- Added the following line of code to myApp.js:

```node
app.get("/:word/echo", (req, res) => res.json({ echo: req.params.word }));
```

**[⬆ back to top](#table-of-contents)**

### 10. Get Query Parameter Input from the Client

Another common way to get input from the client is by encoding the data after the route path, using a query string. The query string is delimited by a question mark (?), and includes field=value couples. Each couple is separated by an ampersand (&). Express can parse the data from the query string, and populate the object req.query. Some characters, like the percent (%), cannot be in URLs and have to be encoded in a different format before you can send them. If you use the API from JavaScript, you can use specific methods to encode/decode these characters.

```node
route_path: '/library'
actual_request_URL: '/library?userId=546&bookId=6754'
req.query: {userId: '546', bookId: '6754'}
```

- Added to myApp.js:

```node
app
  .route("/name")
  .get((req, res) => res.json({ name: `${req.query.first} ${req.query.last}` }))
  .post();
```

**[⬆ back to top](#table-of-contents)**

### 11. Use body-parser to Parse POST Requests

Besides GET, there is another common HTTP verb, it is POST. POST is the default method used to send client data with HTML forms. In REST convention, POST is used to send data to create new items in the database (a new user, or a new blog post). You don’t have a database in this project, but you are going to learn how to handle POST requests anyway.

In these kind of requests, the data doesn’t appear in the URL, it is hidden in the request body. This is a part of the HTML request, also called payload. Since HTML is text-based, even if you don’t see the data, it doesn’t mean that it is secret. The raw content of an HTTP POST request is shown below:

```http
POST /path/subpath HTTP/1.0
From: john@example.com
User-Agent: someBrowser/1.0
Content-Type: application/x-www-form-urlencoded
Content-Length: 20
name=John+Doe&age=25
```

As you can see, the body is encoded like the query string. This is the default format used by HTML forms. With Ajax, you can also use JSON to handle data having a more complex structure. There is also another type of encoding: multipart/form-data. This one is used to upload binary files. In this exercise, you will use a urlencoded body. To parse the data coming from POST requests, you have to install the `body-parser` package. This package allows you to use a series of middleware, which can decode data in different formats.

- Installed `body-parser` module in `package.json`.
- Added `const bodyParser = require("body-parser")` to the top of myApp.js file.
- Added the following code to myApp.js: `app.use(bodyParser.urlencoded({ extended: false }));`

**[⬆ back to top](#table-of-contents)**

### 12. Get Data from POST Requests

Mount a POST handler at the path `/name`. It’s the same path as before. We have prepared a form in the html frontpage. It will submit the same data of exercise 10 (Query string). If the body-parser is configured correctly, you should find the parameters in the object `req.body`. Have a look at the usual library example:

```node
route: POST '/library'
urlencoded_body: userId=546&bookId=6754
req.body: {userId: '546', bookId: '6754'}
```

Respond with the same JSON object as before: `{name: 'firstname lastname'}`. Test if your endpoint works using the html form we provided in the app frontpage.

Tip: There are several other http methods other than GET and POST. And by convention there is a correspondence between the http verb, and the operation you are going to execute on the server. The conventional mapping is:

POST (sometimes PUT) - Create a new resource using the information sent with the request,

GET - Read an existing resource without modifying it,

PUT or PATCH (sometimes POST) - Update a resource using the data sent,

DELETE => Delete a resource.

There are also a couple of other methods which are used to negotiate a connection with the server. Except from GET, all the other methods listed above can have a payload (i.e. the data into the request body). The body-parser middleware works with these methods as well.

**[⬆ back to top](#table-of-contents)**

<!-- General links -->

[changelog]: ./CHANGELOG.md
[version-bdg]: https://img.shields.io/badge/version-1.0.0-blue.svg?style=plastic
[license]: ./LICENSE
[prs-bdg]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat
[prs-site]: (https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)
[twitter]: https://twitter.com/estebmaister
[twitter-bdg]: https://img.shields.io/twitter/follow/estebmaister?label=Follow&style=social

<!-- Repo badges links -->

[license-bdg]: https://img.shields.io/github/license/estebmaister/node-express?style=plastic
[last-commit-bdg]: https://img.shields.io/github/last-commit/estebmaister/node-express?style=plastic&logo=git&logoColor=white
[language-count-bdg]: https://img.shields.io/github/languages/count/estebmaister/node-express?style=plastic&logo=visual-studio-code
[top-language-bdg]: https://img.shields.io/github/languages/top/estebmaister/node-express?style=plastic&logo=freecodecamp
[repo-size-bdg]: https://img.shields.io/github/repo-size/estebmaister/node-express?style=plastic
[code-size-bdg]: https://img.shields.io/github/languages/code-size/estebmaister/node-express?style=plastic
[gh-pack-json-v]: https://img.shields.io/github/package-json/v/estebmaister/node-express?color=blue&style=plastic&logo=github
[gh-pack-json-dep-v-express]: https://img.shields.io/github/package-json/dependency-version/estebmaister/node-express/express?style=plastic&logo=express

<!-- Glitch web and workflow -->

[website]: https://node-esteb.glitch.me
[website-bdg]: https://img.shields.io/website?down_color=violet&down_message=sleeping&label=servidor&logo=glitch&logoColor=white&style=plastic&up_color=green&up_message=online&url=https%3A%2F%2Fnode-esteb.glitch.me
[workflow-bdg]: https://github.com/estebmaister/node-express/workflows/Glitch%20Sync/badge.svg
[glitch-workflow]: https://github.com/Estebmaister/node-express/blob/master/.github/workflows/main.yml
