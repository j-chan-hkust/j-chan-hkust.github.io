Because these files will often contain sensitive specifics about your resources and secrets, these shouldn't be included in your commits to your repos. Terraform suggests ignoring the following files:
- `.tfvars` files (except example/template files) as they often contain sensitive data like passwords and keys
- `.terraform` directory, which contains provider plugins and can exceed GitHub's file size limits
- Local state files (`*.tfstate` and `*.tfstate.*`) as they may contain sensitive information and should be stored remotely
- `.tfplan` files: the planned action by TF may include sensitive information about your resources.
To ignore these files in Git, you can add them to your `.gitignore` file.