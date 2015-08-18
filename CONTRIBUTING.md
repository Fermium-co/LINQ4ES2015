
## Contributing bug fixes

We are currently accepting contributions in the form of bug fixes.

## Contributing features

Features (things that add new or improved functionality to LINQ4ES2015) may be accepted, but will need to first be approved.

## Legal

You will need to complete a Contributor License Agreement (CLA). Briefly, this agreement testifies that you are granting us permission to use the submitted change according to the terms of the project's license, and that the work being submitted is under appropriate copyright.

## Housekeeping

Your pull request should: 

* Include a description of what your change intends to do
* Be a child commit of a reasonably recent commit in the **master** branch 
    * Requests need not be a single commit, but should be a linear sequence of commits (i.e. no merge commits in your PR)
* It is desirable, but not necessary, for the tests to pass at each commit
* Have clear commit messages 
    * e.g. "refactored feature", "fixed issue", "added tests for issue"
* Include adequate tests 
    * At least one test should fail in the absence of your non-test code changes. If your PR does not match this criteria, please specify why
    * Tests should include reasonable permutations of the target fix/change
    * Include baseline changes with your change
    * All changed code must have 100% code coverage
* Follow the code conventions descriped in [Coding guidelines] (will be available soon)
* To avoid line ending issues, set `autocrlf = input` and `whitespace = cr-at-eol` in your git configuration

