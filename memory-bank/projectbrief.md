# Project Brief — Brasaland

## Company

Brasaland is a grilled food restaurant chain founded in Medellín, Colombia, in 2008.

The company operates 14 company-owned restaurants:

- 10 locations in Colombia
- 4 locations in Florida, United States

Brasaland employs approximately 115 people and operates through a corporate team in Medellín and a commercial office in Miami.

The company brand is based on three core principles:

1. Consistent food quality across every location.
2. Warm and reliable customer experience.
3. Fast service without sacrificing quality.

## Digital Transformation

The project is developed by Brasaland Digital, the internal team responsible for the company's digital transformation.

The existing corporate website dates from 2019 and has several limitations:

- It mainly displays the menu.
- It does not properly represent the company's presence in two countries.
- It does not communicate the Brasaland brand experience effectively.
- It does not collect meaningful customer data.
- It does not provide digital support for the loyalty program.

## Current Project Goal

The current goal is to establish the foundation of Brasaland's digital platform inside the company monorepo.

The first application layer consists of two frontend applications:

### Public Website

Located in:

`uis/website`

Its purpose is to present Brasaland publicly and communicate:

- The Brasaland brand.
- The company's history.
- Locations in Colombia and Florida.
- The main differentiators of the restaurant chain.
- The Brasa Points digital loyalty program.
- Contact information.

The public experience must be responsive, accessible and aligned with the Brasaland business context.

### Internal Backoffice

Located in:

`uis/backoffice`

This application provides the initial structure for future internal operational tools.

The first version must expose business-relevant information in the interface rather than only rendering an empty placeholder.

Initial useful information may include:

- Number of Brasaland locations.
- Countries of operation.
- Brasa Points program status.
- Digital transformation priorities.
- Restaurant operating information.

## Brasa Points

Brasa Points is Brasaland's digital loyalty program.

The program replaces the current physical stamp-card system.

Customers can earn:

- 1 point for every 10,000 COP spent in Colombia.
- 1 point for every 5 USD spent in the United States.

Points can later be redeemed for discounts or free dishes.

The program is intended for customers who are 18 years old or older.

## Business Constraints

The current public website does not provide online ordering.

The website must communicate clearly that customers who want to place an order should contact or visit their preferred restaurant.

Online ordering may be implemented in a future milestone.

## Source of Truth

The root `CONTEXT.md` file is the authoritative business source for this project.

When business requirements conflict with assumptions made elsewhere in the repository, `CONTEXT.md` takes precedence.

## Internal Applications

Brasaland also develops internal tools to support its corporate teams and day-to-day operations.

These internal applications are independent from the public customer-facing website and should remain separated by responsibility inside the monorepo.

Current internal interfaces include:

- `uis/backoffice` — internal operational interface for Brasaland staff.

The current internal People & Talent interface is:

- `uis/talent-pipeline-tracker` — internal People & Talent application for managing recruitment candidates and the hiring pipeline.

## People & Talent

Brasaland's People & Talent team manages recruitment processes for open positions across the organization.

The Talent Pipeline Tracker is intended to replace fragmented manual workflows such as:

- shared spreadsheets for candidate tracking
- interview notes stored in separate documents
- status updates managed through email threads

The application must give the People & Talent team a single place to:

- review all candidate applications
- search and filter candidates
- understand each candidate's current status and hiring stage
- update status and stage
- manage internal notes
- create new applications
- correct or edit existing candidate information

The Talent Pipeline Tracker is an internal business application and is not part of Brasaland's public customer experience.
