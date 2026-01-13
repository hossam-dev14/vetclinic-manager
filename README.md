# VetClinic Manager

## I - La Phase de Conception
### Les liens de Trello: 
[VetClinic Manager](https://trello.com/invite/b/6931e7f84d81e64d6c2b48ee/ATTIbda3899d3b2cc72b61a62a770fc48e0eD4852FCF/vetclinic-manager/)

[VetClinic Manager (user stories)](https://trello.com/invite/b/6931e7f84d81e64d6c2b48ee/ATTIbda3899d3b2cc72b61a62a770fc48e0eD4852FCF/vetclinic-manager)


### Le lien de Figma UI/UX: 
[VetClinic Manager Figma](https://www.figma.com/design/oNRwQ9nkrJDuBzWov12I57/VetClinic-Manager?node-id=0-1&p=f&t=xl24uAh7Nnqb06b1-0)

### Le lien de Lucidchart UML Diagrams: 
[VetClinic Manager UML](https://lucid.app/lucidchart/a26ca861-a213-48e3-ab89-502e624fa13e/edit?viewport_loc=-794%2C-525%2C1086%2C1250%2C0_0&invitationId=inv_7435cad9-35df-401d-bad4-aa19e900cd68)

---

## II - Installation and Launch Guide

### 1. System Requirements

Before you begin, ensure your environment meets the following specifications:

- **Node.js**: Version 18.0.0 or higher (v20+ recommended).
- **Package Manager**: npm (v9.0.0 or higher) or yarn/pnpm equivalent.

### 2. Installation Guide

Follow these steps to set up the project locally:

#### Step 1: Clone the Repository
If you haven't already, clone the project to your local machine:
```bash
git clone https://github.com/hossam-dev14/vetclinic-manager
cd vetclinic-manager
```

#### Step 2: Install Dependencies
Install all required project dependencies using npm:
```bash
npm install
```
This will install core libraries including React 19, Vite, Tailwind CSS, and TanStack Query.

#### Step 3: Environment Configuration
Currently, the application uses default configurations.
- **API Endpoint**: Hardcoded to `http://localhost:5000` in `src/lib/api-client.ts`.
- **Port**: The development server defaults to port `5173`.

### 3. Launch Instructions

You can run the application using the following commands:

#### Development Mode (Recommended)
To run both the frontend application and the mock backend server concurrently:
```bash
npm run dev
```
**Expected Output:**
```text
[0] JSON Server started on PORT :5000
[1] VITE v7.2.4  ready in 350 ms
[1] 
[1]   ➜  Local:   http://localhost:5173/
[1]   ➜  Network: use --host to expose
```
- Open your browser and navigate to `http://localhost:5173`.
- The mock API will be available at `http://localhost:5000`.

#### Running Services Individually
If you prefer to run services in separate terminals:

**1. Start the Mock Server:**
```bash
npm run dev:server
```
**2. Start the Frontend Client:**
```bash
npm run dev:client
```

#### Other Useful Commands

| Command | Description |
| :--- | :--- |
| `npm run build` | Compiles the application for production (TypeScript + Vite). |
| `npm run preview` | Previews the built production application locally. |
| `npm run test` | Runs unit tests using Vitest. |
| `npm run test:ui` | Runs tests with a UI interface. |
| `npm run lint` | Runs ESLint to check for code quality issues. |

### 4. Troubleshooting

**Issue: Port Already in Use**
*   **Error**: `EADDRINUSE: address already in use :::5000` or `:::5173`.
*   **Solution**: Stop any other processes running on these ports or modify the scripts in `package.json` to use different ports (e.g., `--port 5001`).

**Issue: Dependency Errors**
*   **Error**: `Module not found` or similar.
*   **Solution**: Delete `node_modules` and `package-lock.json`, then run `npm install` again.
    ```bash
    rm -rf node_modules package-lock.json
    npm install
    ```

**Issue: API Connection Failed**
*   **Symptom**: Data not loading in the frontend.
*   **Solution**: Ensure the mock server is running (`npm run dev:server`). Check the browser console for network errors. Verify `src/lib/api-client.ts` points to the correct URL.

**Issue: TypeScript Errors on Build**
*   **Error**: `TSC` compilation errors.
*   **Solution**: Run `npm run lint` to identify issues. Ensure strict mode compliance as per project rules.
