A **.tpl file** is a **template file** used in Terraform that contains the structure of a configuration with placeholders for dynamic values.

In practice, these templates will be referenced in your Terraform code, using the `templatefile()` function, which replaces the variables in the template with actual values when Terraform executes