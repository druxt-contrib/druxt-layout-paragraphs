<!--
Title this merge request the way you would title a commit:

    <type>(<scope>): <description>

This repository squash-merges, so the title becomes the commit subject. A prose
title passes review and then breaks the next push to the target branch.
-->

## What changed

## Why

## How it was checked

- [ ] `npm run lint` passes
- [ ] `npm test` passes, and coverage did not drop
- [ ] Visual baselines regenerated via the manual `visual:update` job, if the
      rendering changed
- [ ] Nothing that resolves only on a private network reached a tracked file
