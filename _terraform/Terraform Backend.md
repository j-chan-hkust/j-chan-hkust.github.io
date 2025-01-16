A Terraform backend is a configuration that determines where and how Terraform's [[Terraform Statefiles|state file]] are stored and accessed. It lets you choose to store statefiles remotely. 

This can be configured to the following destinations:
- local
- remote
	- HCP Terraform
	- HashiCorp Consul
	- Amazon S3
	- Azure Blob Storage
	- Google Cloud Storage
	- Alibaba Cloud OSS

To configure this, add a backend definition block to your [[Terraform Block]]:
```
terraform {
  backend "s3" {
    bucket = "my-terraform-state"
    key    = "path/to/my/state"
    region = "us-east-1"
  }
}
```