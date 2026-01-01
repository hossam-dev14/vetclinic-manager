# Database Schema Documentation

This document describes the structure of the `db.json` file used for the VetClinic Manager application. The data is organized into the following entities:

## Owners
- `id`: Unique identifier for the owner (string).
- `name`: Full name of the owner (string).
- `phone`: Phone number of the owner (string).

Example:
```json
{ "id": "1", "name": "Ava Criss", "phone": "+22 614 333 0008" }
```

## Animals
- `id`: Unique identifier for the animal (string).
- `name`: Name of the animal (string).
- `species`: Species of the animal (e.g., "Dog", "Cat") (string).
- `ownerId`: Reference to the owner's ID (string).

Example:
```json
{ "id": "1", "name": "Max", "species": "Dog", "ownerId": "1" }
```

## Consultations
- `id`: Unique identifier for the consultation (string).
- `animalId`: Reference to the animal's ID (string).
- `date`: Date of the consultation in YYYY-MM-DD format (string).
- `summary`: Brief description of the consultation (string).

Example:
```json
{
  "id": "1",
  "animalId": "1",
  "date": "2025-12-23",
  "summary": "Vaccination"
}
```

## Documents
- `id`: Unique identifier for the document (string).
- `name`: Name of the document file (string).
- `animalId`: Reference to the animal's ID (string).

Example:
```json
{ "id": "1", "name": "Report.pdf", "animalId": "1" }
```

This schema supports basic CRUD operations for managing veterinary clinic data. Use JSON Server for API simulation.
