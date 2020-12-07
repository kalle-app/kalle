# Branching

## Quick Legend

<table>
  <thead>
    <tr>
      <th>Instance</th>
      <th>Branch</th>
      <th>Description, Instructions, Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Stable</td>
      <td>master</td>
      <td>Accepts merges from develop</td>
    </tr>
    <tr>
      <td>Working</td>
      <td>develop</td>
      <td>Accepts merges from Features and Hotfixes</td>
    </tr>
    <tr>
      <td>Features</td>
      <td>feature/bugfix</td>
      <td>Always branch off HEAD of Working</td>
    </tr>
  </tbody>
</table>

## Main Branches

The main repository will always hold two evergreen branches:

- `master`
- `develop`

The main branch should be considered `origin/develop` and will be the main branch where the source code of `HEAD` always reflects a state with the latest delivered development changes for the next release. As a developer, you will be branching and merging from `develop`.

Consider `origin/master` to always represent the latest code deployed to production. During day to day development, the `master` branch will not be interacted with.

When the source code in the `develop` branch is stable and has been deployed, all of the changes will be merged into `master` and tagged with a release number. _How this is done in detail will be discussed later._

## Supporting Branches

Supporting branches are used to aid parallel development between team members, ease tracking of features, and to assist in quickly fixing live production problems. Unlike the main branches, these branches always have a limited life time, since they will be removed eventually.

The different types of branches we may use are:

- Feature branches
- fix branches

Each of these branches have a specific purpose and are bound to strict rules as to which branches may be their originating branch and which branches must be their merge targets. Each branch and its usage is explained below.

### Feature Branches

Feature branches are used when developing a new feature or enhancement which has the potential of a development lifespan longer than a single deployment. When starting development, the deployment in which this feature will be released may not be known. No matter when the feature branch will be finished, it will always be merged back into the develop branch.

During the lifespan of the feature development, the lead should watch the `develop` branch (network tool or branch tool in GitHub) to see if there have been commits since the feature was branched. Any and all changes to `develop` should be merged into the feature before merging back to `develop`; this can be done at various times during the project or at the end, but time to handle merge conflicts should be accounted for.

`<tbd number>` represents the project to which Project Management will be tracked.

- Must branch from: `develop`
- Must merge back into: `develop`
- Branch naming convention: `feature/GH-<tbd number>`

#### Working with a feature branch

If the branch does not exist yet, create the branch locally and then push to GitHub. A feature branch should always be 'publicly' available. That is, development should never exist in just one developer's local branch.

```
$ git checkout -b feature/GH-id develop                 // creates a local branch for the new feature
$ git push origin feature/GH-id                        // makes the new feature remotely available
```

Periodically, changes made to `develop` (if any) should be merged back into your feature branch.

```
$ git merge develop                                  // merges changes from master into feature branch
```

When development on the feature is complete, reviewers should merge changes into `develop` and then make sure the remote branch is deleted.

```
$ git checkout develop                               // change to the develop branch
$ git merge --no-ff feature/GH-id                      // makes sure to create a commit object during merge
$ git push origin develop                            // push merge changes
$ git push origin :feature/GH-id                       // deletes the remote branch
```

> Please merge via the CLI instead of merging via Squeak. Otherwise some git-files for the CI and other services will be lost.

### Fix Branches

Fix branches differ from feature branches only semantically. Fix branches will be created when there is a bug on the develop branch that should be fixed and merged into the next deployment. For that reason, a bug branch typically will not last longer than one deployment cycle. Additionally, bug branches are used to explicitly track the difference between bug development and feature development. No matter when the bug branch will be finished, it will always be merged back into `develop`.

Although likelihood will be less, during the lifespan of the bug development, the lead should watch the `develop` branch (network tool or branch tool in GitHub) to see if there have been commits since the bug was branched. Any and all changes to `develop` should be merged into the bug before merging back to `develop`; this can be done at various times during the project or at the end, but time to handle merge conflicts should be accounted for.

`<tbd number>` represents the Basecamp project to which Project Management will be tracked.

- Must branch from: `develop`
- Must merge back into: `develop`
- Branch naming convention: `bugfix/GH-<GH number>`

#### Working with a fix branch

If the branch does not exist yet, create the branch locally and then push to GitHub. A bug branch should always be 'publicly' available. That is, development should never exist in just one developer's local branch.

```
$ git checkout -b bugfix/GH-id develop                     // creates a local branch for the new bug
$ git push origin bugfix/GH-id                            // makes the new bug remotely available
```

Periodically, changes made to `develop` (if any) should be merged back into your bug branch.

```
$ git merge develop                                  // merges changes from develop into bug branch
```

When development on the bug is complete, [the Lead] should merge changes into `develop` and then make sure the remote branch is deleted.

```
$ git checkout develop                               // change to the develop branch
$ git merge --no-ff bugfix/GH-id                          // makes sure to create a commit object during merge
$ git push origin develop                            // push merge changes
$ git push origin :bugfix/GH-id                           // deletes the remote branch
```
