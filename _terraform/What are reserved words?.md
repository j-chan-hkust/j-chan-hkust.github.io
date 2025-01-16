Reserved words are those that are reserved for functions and keywords.
1. Top-level keywords:
- `terraform`: Specifies Terraform settings, like required providers or backend configurations.
- `variable`: Declares a variable.
- `locals`: Defines local values within a module.
- `output`: Defines outputs for a module.
- `module`: Calls a module.
- `resource`: Defines a resource.
- `data`: Accesses data from a provider.
- `provider`: Configures a provider.

2. Block types (often used within resource, data, and provider blocks):
- `lifecycle`: Defines lifecycle rules for a resource (e.g., `prevent_destroy` or `ignore_changes`).
- `provisioner`: Configures a provisioner for a resource.
- `connection`: Specifies connection details for provisioners.

3. Meta-arguments for resources:
- `count`: Creates multiple instances of a resource based on the provided count.
- `for_each`: Creates instances for each item in a map or set.
- [[Explicit Dependencies|depends_on]]`: Specifies explicit dependency relationships between resources.
- `provider`: Designates an alternate provider for a resource.

4. Expressions and functions:
- Many function names, such as `length`, `lookup`, `element`, `locals`, etc., should be used judiciously within configurations to avoid ambiguity.

5. Boolean values:
- `true` and `false`.

6. Null value:
- `null`.

7. Control structures:
- `for`: For constructing complex types from the elements of lists or maps.
- `if`: Conditional evaluation.

8. Operators:
- Common operators like `==`, `!=`, `>`, `<`, `>=`, `<=`, `&&`, `||`, `!`, `+`, `-`, `*`, `/`, `%`, and others.