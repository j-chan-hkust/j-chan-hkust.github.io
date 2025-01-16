Sentinel is an **enterprise-only policy-as-code framework** that integrates with Terraform to enforce policies and governance on infrastructure deployments.

Essentially, it lets you define what can/can't be done, and reviews your terraform plan against this. An example of this:
```
Policy: restrict-aws-instance-type
Result: FAIL
Description: Instance type t3.2xlarge is not allowed. Only t2.micro, t2.small, and t2.medium are permitted.

Details:
  Rule "instance_type": FAIL
    - Instance type "t3.2xlarge" in aws_instance.example is not in the allowed list
```

Note that Sentinel is only available on **paid subscription to either HCP Terraform or Terraform Enterprise**, as it's an enterprise-only feature. It's not a thing in the open source version of the tool.