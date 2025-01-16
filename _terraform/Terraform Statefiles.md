The statefile (usually a json called `terraform.tfstate`) both tracks and maps your configurations to the real world infrastructure. This file usually holds the metadata associated to each of the resources, like:
- Resource status (ACTIVE, DELETED, PROVISIONING)
- Resource IDs and attributes 
- Dependencies between resources

An example:
```json
{
  "version": 4,
  "terraform_version": "1.5.0",
  "serial": 1,
  "lineage": "example-lineage",
  "resources": [
    {
      "mode": "managed",
      "type": "aws_instance",
      "name": "example",
      "provider": "provider[\"registry.terraform.io/hashicorp/aws\"]",
      "instances": [
        {
          "schema_version": 1,
          "attributes": {
            "id": "i-1234567890abcdef0",
            "instance_type": "t2.micro",
            "ami": "ami-1234567890",
            "tags": {
              "Name": "example-instance"
            }
          }
        }
      ]
    }
  ]
}

```

Terraform creates the statefile from the existing state of resources, uses this to create a [[terraform plan|plan]] of what changes need to be made (based on the code), and then applies the changes. More details in: [[How does Terraform apply changes?]]

The statefile will be "locked" when key functions like `apply`, `plan` that touch the statefile are run. This is to protect the file being corrupted by different users trying to interact with the file simultaneously. You can circumvent this using [[terraform state-unlock]], though this isn't advised. 

For local implementations, the statefile of the default workspace is stored in the local directory, while each workspace is stored under the directory "terraform.tfstate.d/".