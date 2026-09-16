# `scripts` — Helper Scripts

This directory contains repository-level helper scripts and internal utilities that do not belong to a specific application, service, or package.

## Purpose

Use this directory for scripts such as:

- development automation
- maintenance utilities
- data-processing helpers
- setup tasks
- migration helpers
- one-off operational tools

Scripts should remain focused and reproducible across environments.

## Documentation

Each script should document, either in its code or in this README:

- purpose
- required parameters
- dependencies
- expected input and output
- usage example when useful

## Current Scripts

- `analyze.py` — analyzes Brasaland incident CSV files using shared logic from `packages/incident_analysis`.

Do not duplicate business logic inside scripts when a reusable package already provides it.

> _Spanish version: [README.es.md](./README.es.md)._
