# Wrenching 101 Brief

## Domain
- Production host: `wrenching101.mettlecycling.com`
- Local route: `/`
- Lab26 listing: should be featured on the Lab26 index once the public preview is ready

## Purpose
Wrenching 101 is a Mettle Cycling event tool for very new bike-maintenance learners. The page should work like a simple invite at the top, then become a practical learning surface for parts, terminology, and common bike-fix concepts.

## Audience
- Newer cyclists
- Riders who want maintenance language and confidence
- Welcoming tone, not explicitly women-only
- Technical terms are allowed because learning the terms is part of the goal

## Current Event Placeholder
- Date: May 5, 2026
- Time: 6:30 PM MDT
- Location: 252 Peakview Road, Boulder, CO 80302

## Page Structure
1. Above-fold invite with event name, short summary, and date/time/location metadata
2. Three aligned topic cards: overview, agenda, diagram system
3. Full-width horizontal RSVP band with form and public response list
4. Interactive bike-part diagram area below the first content rows
5. Future "What's wrong with my bike?" decision tree

## RSVP Requirements
- Inputs: name, attending, not attending
- Show both attending and not-attending responses publicly
- Email notification to `randall@mettlecycling.com` when someone responds
- No capacity, waitlist, or confirmation flow needed for version one

## Agenda Topics
- Basic bike terminology
- Parts
- Geometry and how it relates to types of bikes
- Brands
- Tire setup
- Drivetrain types
- Materials: steel, carbon, aluminum
- Tubeless vs. tubed setups
- On-bike accessories and backup tools/kits

## Diagram Goals
- Accuracy matters more than abstraction
- Focus on learning parts
- Compare differences that may confuse a beginner
- Hydraulic disc brakes are the baseline
- Schematic inspiration: dark technical linework, contained panels, selective neon highlights, callouts, and subtle motion

## Tool Direction
- Rive is the primary tool for interactive 2D schematics, labels, states, and highlight animation
- Spline is optional for one 3D hero or showcase object, not the main diagram system
- React/Next owns content, routing, RSVP, attendee list, email integration, and responsive layout

## Asset Intake
- Licensed fonts go in `public/fonts/`
- Source diagrams go in `public/diagrams/`
- Rive files go in `public/rive/`
- Spline exports or scene notes go in `public/spline/`

## Expected Font Filenames
- `New Athletic M54.ttf`
- `Gotham-Light.otf`
- `Gotham-Medium.otf`
- `Gotham-Bold.otf`
- `Gotham-BookItalic.otf`
- `Patheos-Regular.otf`
