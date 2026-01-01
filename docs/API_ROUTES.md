# API Routes

This document describes the mock API endpoints used in the VetClinic Manager application, powered by json-server.

## Base URL

The API runs on `http://localhost:3000` (default json-server port).

## Endpoints

### Owners

- `GET /owners` - Get all owners
- `GET /owners/:id` - Get owner by ID
- `POST /owners` - Create a new owner
- `PUT /owners/:id` - Update owner
- `DELETE /owners/:id` - Delete owner

### Animals

- `GET /animals` - Get all animals
- `GET /animals/:id` - Get animal by ID
- `POST /animals` - Create a new animal
- `PUT /animals/:id` - Update animal
- `DELETE /animals/:id` - Delete animal

### Consultations

- `GET /consultations` - Get all consultations
- `GET /consultations/:id` - Get consultation by ID
- `POST /consultations` - Create a new consultation
- `PUT /consultations/:id` - Update consultation
- `DELETE /consultations/:id` - Delete consultation

### Documents

- `GET /documents` - Get all documents
- `GET /documents/:id` - Get document by ID
- `POST /documents` - Create a new document
- `PUT /documents/:id` - Update document
- `DELETE /documents/:id` - Delete document

## Data Structure

See `src/data/db.json` for the mock data structure.

## Running the Server

To start the mock API:

```bash
npx json-server --watch src/data/db.json --port 3000
```