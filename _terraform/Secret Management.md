By default, Terraform does not provide the ability to mask secrets in the Terraform plan and state files. 

To manage sensitive information like passwords and access keys, you can:
- use **environment variables** to store sensitive information 
- **Utilize dedicated secrets management services** like AWS Secrets Manager for storing and rotating sensitive credentials
- use **Terraform's data sources** or **secure remote backend** to retrieve the information from the environment rather than hardcoding the information into the Terraform configuration.