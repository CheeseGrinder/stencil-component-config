# Contributing

Thanks for your interest in contributing to the stencil-component-config plugin! 🎉

- [Contributing Etiquette](#contributing-etiquette)
- [Creating an Issue](#creating-an-issue)
  * [Creating a Good Code Reproduction](#creating-a-good-code-reproduction)
- [Using VS Code on Windows](#using-vs-code-on-windows)
- [Creating a Pull Request](#creating-a-pull-request)
  * [Requirements](#requirements)
  * [Setup](#setup)
    + [Preview Changes](#preview-changes)
  * [Submit Pull Request](#submit-pull-request)
- [Commit Message Guidelines](#commit-message-guidelines)
  * [Commit Message Format](#commit-message-format)
  * [Revert](#revert)
  * [Type](#type)
  * [Scope](#scope)
  * [Subject](#subject)
  * [Body](#body)
- [License](#license)


## Contributing Etiquette

Please see our [Contributor Code of Conduct](https://github.com/CheeseGrinder/stencil-component-config/blob/main/CODE_OF_CONDUCT.md) for information on our rules of conduct.


## Creating an Issue

* It is required that you clearly describe the steps necessary to reproduce the issue you are running into. Although we would love to help our users as much as possible, diagnosing issues without clear reproduction steps is extremely time-consuming and simply not sustainable.

* The issue list of this repository is exclusively for bug reports and feature requests. Non-conforming issues will be closed immediately.

* Issues with no clear steps to reproduce will not be triaged. If an issue is labeled with "needs: reply" and receives no further replies from the author of the issue for more than 14 days, it will be closed.

* If you think you have found a bug, or have a new feature idea, please start by making sure it hasn't already been [reported](https://github.com/CheeseGrinder/stencil-component-config/issues?utf8=%E2%9C%93&q=is%3Aissue). You can search through existing issues to see if there is a similar one reported. Include closed issues as it may have been closed with a solution.

* Next, [create a new issue](https://github.com/CheeseGrinder/stencil-component-config/issues/new/choose) that thoroughly explains the problem. Please fill out the populated issue form before submitting the issue.


## Creating a Good Code Reproduction

### What is a Code Reproduction?

A code reproduction is a small application that is built to demonstrate a particular issue. The code reproduction should contain the minimum amount of code needed to recreate the issue and should focus on a single issue.

### Why Should You Create a Reproduction?

A code reproduction of the issue you are experiencing helps us better isolate the cause of the problem. This is an important first step to getting any bug fixed!

Without a reliable code reproduction, it is unlikely we will be able to resolve the issue, leading to it being closed. In other words, creating a code reproduction of the issue helps us help you.

### How to Create a Reproduction

* Create a new Poppy UI application.
* Add the minimum amount of code needed to recreate the issue you are experiencing. Do not include anything that is not required to reproduce the issue. This includes any 3rd party plugins you have installed.
* Publish the application on GitHub and include a link to it when [creating an issue](#creating-an-issue).
* Be sure to include steps to reproduce the issue. These steps should be clear and easy to follow.

### Benefits of Creating a Reproduction

* **Uses the latest version of stencil-component-config and stencil:** By creating a new application, you are ensuring that you are testing against the latest version. Sometimes the issues you are experiencing have already been resolved in a newer version!
* **Minimal surface area:** By removing code that is not needed in order to reproduce the issue, it makes it easier to identify the cause of the issue.
* **No secret code needed:** Creating a minimal reproduction of the issue prevents you from having to publish any proprietary code used in your project.
* **Get help fixing the issue:** If we can reliably reproduce an issue, there is a good chance we will be able to address it.

## Using VS Code on Windows

To contribute on Windows, do the following:

- Configure VS Code to read/save files using line breaks (LF) instead of carriage returns (CRLF). Set it globally by navigating to: Settings -> Text Editor -> Files -> Eol. Set to `\n`.

  - You can optionally use the following settings in your `.vscode/settings.json`:
    ```json
    { "files.eol": "\n" }
    ```

- Check that the Git setting `core.autocrlf` is set to `false`: run `git config -l | grep autocrlf`. Switch it to false using: `git config --global core.autocrlf false`.
- If you've already cloned the `stencil-component-config` repo, the files may already be cached as LF. To undo this, you need to clean the cache files of the repository. Run the following (make sure you stage or commit your changes first): `git rm --cached -r .` then `git reset --hard`.

## Creating a Pull Request

Before creating a pull request, please read our requirements that explains the minimal details to have your PR considered and merged into the codebase.

### Requirements
1. PRs must reference an existing issue that describes the issue or feature being submitted.
2. PRs must have a reproduction app or the issue must include a reproduction app to verify changes against.
3. PRs must include tests covering the changed behavior or a description of why tests cannot be written.
4. PRs must have only **one** commit to be merged.

> Note: We appreciate you taking the time to contribute! Before submitting a pull request, please take the time to comment on the issue you are wanting to resolve. This helps us prevent duplicate effort or advise if the team is already addressing the issue.

* Looking for an issue to fix? Look through our issues with the [help wanted](https://github.com/CheeseGrinder/stencil-component-config/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) label!

### Setup

1. [Download the installer](https://nodejs.org/) for the LTS version of Node.js. This is the best way to also [install npm](https://blog.npmjs.org/post/85484771375/how-to-install-npm#_=_).
2. Fork this repository.
3. Clone your fork.
4. Create a new branch from main for your change.
6. Run `npm install` to install dependencies for this package.
7. Follow the steps for the specific package below.



#### Prettier Changes

1. Run `npm run format:fix` to lint the TypeScript.



#### Lint Changes

> [!IMPORTANT]
> If you are using a Windows machine, you will need to configure your local development environment to use the correct line endings.
> - Check that the Git setting `core.autocrlf` is set to `false`: run `git config -l | grep autocrlf`. Switch it to false using: `git config --global core.autocrlf false`.
> - If you've already cloned the `poppy-docs` repo, the files may already be cached as LF. To undo this, you need to clean the cache files of the repository. Run the following (make sure you stage or commit your changes first): `git rm --cached -r .` then `git reset --hard`.


1. Run `npm run lint` to lint the TypeScript and Sass.
2. If there are lint errors, run `npm run lint:fix` to automatically fix any errors. Repeat step 1 to ensure the errors have been fixed, and manually fix them if not.


#### Building Changes

1. Run `npm run build` to build the package.
2. Review the changes and, if everything looks correct, [commit](#commit-message-format) the changes.
3. Make sure the build has finished before committing. If you made changes to the documentation, properties, or anything else that requires an update to a generate file, this needs to be committed.
4. After the changes have been pushed, publish the branch and [create a pull request](#creating-a-pull-request).

#### Preview Changes

1. Run `npm pack`
2. Run `npm i -D path/to/stencil-component-config.x.x.x.tgz`


### Submit Pull Request

1. [Create a new pull request](https://github.com/CheeseGrinder/stencil-component-config/compare) with the `main` branch as the `base`. You may need to click on `compare across forks` to find your changes.
2. See the [Creating a pull request from a fork](https://help.github.com/articles/creating-a-pull-request-from-a-fork/) GitHub help article for more information.
3. Please fill out the provided Pull Request template to the best of your ability and include any issues that are related.

### Review Process for Feature PRs

The team has an internal design process for new Poppy features, which must be completed before the PR can be reviewed or merged. As a result of the design process, community feature PRs are subject to large changes. In some cases, the team may instead create a separate PR using pieces of the community PR. Either way, you will always receive co-author commit credit when the feature is merged.

To expedite the process, please ensure that all feature PRs have an associated issue created, with a clear use case for why the feature should be added to Poppy.


## Commit Message Guidelines

We have very precise rules over how our git commit messages should be formatted. This leads to readable messages that are easy to follow when looking through the project history. We also use the git commit messages to generate our [changelog](https://github.com/CheeseGrinder/stencil-component-config/blob/main/CHANGELOG.md). Our format closely resembles Angular's [commit message guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit).

### Commit Message Format
```
<type> (<scope>): [issue] <subject>
<BLANK LINE>
<body>
```

The **type**, the **scope** and the **subject** are mandatory.

### Revert

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type

Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

### Scope

The scope can be anything specifying place of the commit change. Usually it will refer to the functionality you have modified. If you make multiple commits, please keep the naming consistent. For example, if you make a change to navigation and the first commit is `fix (path)`, you should continue to use `nav` for any more commits related to navigation.

### Subject

The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* do not capitalize first letter
* do not place a period `.` at the end
* entire length of the commit message must not go over 50 characters
* describe what the commit does, not what issue it relates to or fixes
* **be brief, yet descriptive** - we should have a good understanding of what the commit does by reading the subject

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.


## License

By contributing your code to the cheese-grinder/stencil-component-config GitHub Repository, you agree to license your contribution under the MIT license.