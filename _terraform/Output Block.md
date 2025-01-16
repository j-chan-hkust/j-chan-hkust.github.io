An **output block** in Terraform is a configuration block that allows you to define and expose specific values from your infrastructure that can be displayed after applying your configuration and queried using the `terraform output` command. Output blocks function like return values for a Terraform module and can be used to share data between different parts of your infrastructure or other Terraform projects.

Example:
`output "instance_ip" {   value = aws_instance.server.public_ip }`