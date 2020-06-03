# Node Server - Quality Assurance with Chai in FCC

![GitHub package.json version][gh-pack-json-v] ![GitHub package.json dependency version express][gh-pack-json-dep-v-express] ![Last commit][last-commit-bdg] [![Website][website-bdg]][website] [![MIT License][license-bdg]][license] [![Twitter Follow][twitter-bdg]][twitter]
[![Workflow badge][workflow-bdg]][glitch-workflow] [![PRs Welcome][prs-bdg]][prs-site]
Created from the [FCC](https://freecodecamp.com) repository, to compile the lessons about node and express.

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F31OD9K)

Start with an empty repository and making the git init as follows:

```git
git init
git clone https://github.com/Estebmaister/mochachai.git
```

Adding the files from the original repo in FCC and start to coding.

## Scripts

To install all the dependencies :

```bash
npm install
```

To run the server

```bash
node server.js
```

## Challenges

### Table of Contents

1. [Learn How JavaScript Assertions Work](#1-learn-how-javascript-assertions-work)
1. [Test if a Variable or Function is Defined](#2-test-if-a-variable-or-function-is-defined)
1. [Use Assert.isOK and Assert.isNotOK](#3-use-assertisok-and-assertisnotok)
1. [Serve Static Assets](#4-serve-static-assets)
1. [Serve JSON on a Specific Route](#5-serve-json-on-a-specific-route)
1. [Use the .env File](#6-use-the-env-file)
1. [Implement a Root-Level Request Logger Middleware](#7-implement-a-root-level-request-logger-middleware)
1. [Chain Middleware to Create a Time Server](#8-chain-middleware-to-Create-a-time-server)
1. [Get Route Parameter Input from the Client](#9-get-route-parameter-input-from-the-client)
1. [Get Query Parameter Input from the Client](#10-get-query-parameter-input-from-the-client)
1. [Use body-parser to Parse POST Requests](#11-use-body-parser-to-parse-post-requests)
1. [Get Data from POST Requests](#12-get-data-from-post-requests)

### 1. Learn How JavaScript Assertions Work

To begin, locate the file “tests/1_unit_tests.js”.

This file contains multiple suites of tests for the project, and this first challenge requires you to make the tests in `/** 1 */` to pass.

Use `assert.isNull()` or `assert.isNotNull()` to make the tests pass.

**[⬆ back to top](#table-of-contents)**

### 2. Test if a Variable or Function is Defined

Use `assert.isDefined()` or `assert.isUndefined()` to make the tests pass.

**[⬆ back to top](#table-of-contents)**

### 3. Use Assert.isOK and Assert.isNotOK

`isOk()` will test for a truthy value and `isNotOk()` will test for a falsy value. [Truthy reference](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) [Falsy reference](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)

Use `assert.isOk()` or `assert.isNotOk()` to make the tests pass.

**[⬆ back to top](#table-of-contents)**

### 4. Serve

**[⬆ back to top](#table-of-contents)**

### 5. Serve

**[⬆ back to top](#table-of-contents)**

### 6. Use

**[⬆ back to top](#table-of-contents)**

### 7. Implement

**[⬆ back to top](#table-of-contents)**

### 8. Chain

**[⬆ back to top](#table-of-contents)**

### 9. Get

**[⬆ back to top](#table-of-contents)**

### 10. Get

**[⬆ back to top](#table-of-contents)**

### 11. Use

**[⬆ back to top](#table-of-contents)**

### 12. Get

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

[license-bdg]: https://img.shields.io/github/license/estebmaister/mochachai?style=plastic
[last-commit-bdg]: https://img.shields.io/github/last-commit/estebmaister/mochachai?style=plastic&logo=git&logoColor=white
[language-count-bdg]: https://img.shields.io/github/languages/count/estebmaister/mochachai?style=plastic&logo=visual-studio-code
[top-language-bdg]: https://img.shields.io/github/languages/top/estebmaister/mochachai?style=plastic&logo=freecodecamp
[repo-size-bdg]: https://img.shields.io/github/repo-size/estebmaister/mochachai?style=plastic
[code-size-bdg]: https://img.shields.io/github/languages/code-size/estebmaister/mochachai?style=plastic
[gh-pack-json-v]: https://img.shields.io/github/package-json/v/estebmaister/mochachai?color=blue&style=plastic&logo=github
[gh-pack-json-dep-v-express]: https://img.shields.io/github/package-json/dependency-version/estebmaister/mochachai/express?style=plastic&logo=express

<!-- Glitch web and workflow -->

[website]: https://mochachai-esteb.glitch.me
[website-bdg]: https://img.shields.io/website?down_color=violet&down_message=sleeping&label=servidor&logo=glitch&logoColor=white&style=plastic&up_color=green&up_message=online&url=https%3A%2F%2Fmochachai-esteb.glitch.me
[workflow-bdg]: https://github.com/estebmaister/mochachai/workflows/Glitch%20Sync/badge.svg
[glitch-workflow]: https://github.com/Estebmaister/mochachai/blob/master/.github/workflows/main.yml
