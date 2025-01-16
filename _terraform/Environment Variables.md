Environment variables in Terraform are variables prefixed with "`TF_`" that allow you to set values outside of your Terraform configuration files. They can be used to configure Terraform's behavior and set variable values without modifying the code.

To update these, you need to define them in your systems environment, *before* you run the code. Some examples:
`TF_LOG`, `TF_DEBUG`,`TF_TRACE`,`TF_INFO`