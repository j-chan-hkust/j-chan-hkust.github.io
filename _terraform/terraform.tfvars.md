The `.tfvars` file in Terraform is used to systematically manage and assign values to variables in your Terraform configurations. It allows you to store variable values separately from your main configuration files and can be reused across different projects.

While the syntax is similar to normal HCL, it can't contain resource definitions. 

The default file for this is `terraform.tfvars`, and Terraform automatically loads this file from the current directory.