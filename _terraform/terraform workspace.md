The `terraform workspace` command helps you manage different groups of resources within the same Terraform configuration. Here are the main subcommands:

- `terraform workspace list` - shows all available workspaces (current workspace marked with *)
- `terraform workspace select <name>` - switch to a specific workspace
- `terraform workspace new <name>` - create a new workspace

The main use-case is managing different environments (dev, preprod, prod) under terraform.

Each individual workspace can only mapped to a single VCS/Repo.