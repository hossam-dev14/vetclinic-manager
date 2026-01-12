# Workspace Guide

This guide explains how to effectively use workspace features in VS Code, including @workspace references and slash commands.

## @workspace

The @workspace symbol allows you to reference files, symbols, or entire workspaces in your prompts.

### Usage

- `@workspace` - Reference the entire workspace
- `@workspace/src/App.tsx` - Reference a specific file
- `@workspace#functionName` - Reference a specific function or symbol

Use this to provide context to Copilot or other tools about specific parts of the codebase.

## Slash Commands

Slash commands are shortcuts for common actions in VS Code.

### Common Commands

- `/fix` - Fix issues in the code
- `/explain` - Explain selected code
- `/test` - Generate tests
- `/doc` - Generate documentation for selected code
- `/docs` - Generate or update project documentation
- `/refactor` - Refactor code

### Example

Select code and type `/explain` to get an explanation of what the code does. For documentation, use `/docs` to create or adapt docs files like DESIGN_SYSTEM.md or FORM_VALIDATION.md.

#### Detailed Example: Using /docs

1. Select a file or section (e.g., a schema in `db.json`).
2. Type `/docs` in the prompt.
3. The tool generates documentation, such as a README for the database schema, including entity descriptions and examples.
4. Output might include sections like "Owners" with fields and sample data.

#### Another Example: Using /refactor

1. Select a code block (e.g., a function in `App.tsx`).
2. Type `/refactor` to improve structure, such as extracting variables or simplifying logic.
3. The tool suggests refactored code, which you can apply directly.

## Best Practices

- Use @workspace to narrow down context when asking questions
- Combine with slash commands for efficient coding
- Reference specific files when possible to get accurate responses
- Use `/docs` for maintaining project documentation consistency