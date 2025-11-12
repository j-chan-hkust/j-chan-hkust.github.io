---
title: Working with AWS - Connecting your ECS tasks to private ECR via VPC endpoints
description: How to fix a common pain point in ECS configuration
pubDate: Nov 12 2025
tags:
  - AWS
  - Terraform
---

### It can't be that hard can it?
Let's say you're configuring your infrastructure in terraform, and you have the basic infrastructure worked out:

![[basic-application-dev-infrastructure.drawio.png]]
You've already done with the terraform code that creates all the components, now all that's left is setting up the security groups that connects them all together!

Now, you just need to connect all your components together. You remember what you learned in your AWS architecture certification, and connect each of the components together with a series of security groups. You even try and be clever by routing things through a VPC endpoint[^3], just as your certification told you to do. Everything is ready:
- Your private subnet is setup in your VPC
- Your ECR repo is setup
- Your ECS task is defined
- You've assigned an appropriate security policy to the ECS task to access the repo
- Your VPC endpoints for ECR are defined properly, with:
	- Your ECR interface endpoints are linked to a security group
	- Your s3 gateway endpoints have been configured with the private subnet route tables
- You've configured the security groups to connect your ECS task to your VPC endpoints

But your tasks get stuck on pending, and at the end of it you get the error:
![[Pasted image 20251112194835.png]]

Hm.
### What it probably is[^2]
You need to pull the prefix list from s3:
``` hcl
data "aws_prefix_list" "s3" {
  filter {
    name   = "prefix-list-name"
    values = ["com.amazonaws.${var.region}.s3"]
  }
}
```

And allow traffic from your ECS to go to it:
```hcl
# ECS Task Security Group
resource "aws_security_group" "ecs_tasks" {
  name        = "${var.namespace}-ecs-tasks-${var.environment}"
  description = "Security group for ECS tasks"
  vpc_id      = module.vpc.vpc_id

  # Allow outbound HTTPS traffic to VPC endpoints (for ECR, CloudWatch, etc.)
  egress {
    from_port       = 443
    to_port         = 443
    protocol        = "tcp"
    security_groups = [module.vpc.vpc_endpoints_security_group_id]
    description     = "Allow HTTPS to VPC endpoints (ECR, CloudWatch, etc)"
  }

  egress {
    from_port       = 443
    to_port         = 443
    protocol        = "tcp"
    prefix_list_ids = [data.aws_prefix_list.s3.id]
    description     = "Allow HTTPS to S3 via gateway endpoint"
  }
}
```

After this is done, your ECS task will be able to access ECR via interface endpoint, and then access the layers of your container in s3 via the gateway endpoint.
### Why it is kinda hard[^4]
Unfortunately for me and my Thursday afternoon plans, this very specific detail is not well documented by AWS, or explained by the various error messages and debugging tools provided by AWS.

Most information online concerning the error will be focused on the stuff you've already gotten right – i.e. permission sets, security groups, etc. – or will be talking about setting this up with a NAT Gateway – which is pretty straightforward to do.

[AWS' re:Posts](https://repost.aws/knowledge-center/ecs-pull-container-error) will direct you to a [runbook](https://docs.aws.amazon.com/systems-manager-automation-runbooks/latest/userguide/automation-aws-troubleshootecstaskfailedtostart.html) that will give you a bespoke error message that isn't very helpful:
```
Task Failure Reason Analysis:
#############################

REGISTRY CHECKS
===============
The resource based policy for the ECR repository [notifyservice] may be missing permissions to pull the image. Make sure that the resource based policy attached to the ECR repository has all the recommended permissions.
- https://docs.aws.amazon.com/AmazonECR/latest/userguide/repository-policies.html 

The route table rtb-063e36b65f4a93ebe associated with Task Subnet subnet-0ffaf57206ab92280 does not have network access either via Internet Gateway or Nat Gateway.
If you are leveraging custom networking path via peered network or via Transit Gateway please ensure the subnet where the task is placed have network connectivity to pull all required resources
```

Even AWS' own documentation on [ECR interface via VPC endpoints](https://docs.aws.amazon.com/AmazonECR/latest/userguide/vpc-endpoints.html), while clearly explaining everything else, including the requirement for s3 access, omits this detail about allowing the s3 prefix list. 

Needless to say, with the lack of literature on this specific issue, and the lack of precision of the error messages, most LLM tools will assume it is one of the other well documented components that have gone wrong, and will give you suggestions that are completely unproductive.
### Why I'm even writing about this
It's only after wading into the second page of google results that I stumbled onto the s3 prefix solution on some [random developers blog](https://www.eddgrant.com/blog/2023/05/12/aws-connecting-to-a-private-ecr-repository-using-vpc-endpoints)[^1]. Even then, his implementation is from 2023, and doesn't work with the latest versions of terraform.

It wouldn't surprise me if others also got caught by the same issue, led up to the cusp[^5] by formal documentation, and then getting stuck in the same way I did. Hopefully this post helps save you an afternoon.

--------
#### Appendix
**Error message for SEO:**
```
Task stopped at: 2025-11-12T11:46:29.481Z

CannotPullContainerError: The task cannot pull XXXXXXXXXX.dkr.ecr.ap-southeast-1.amazonaws.com/notifyservice:latest from the registry XXXXXXXXXX.dkr.ecr.ap-southeast-1.amazonaws.com/notifyservice:latest. There is a connection issue between the task and the registry. Check your task network configuration. : failed to copy: httpReadSeeker: failed open: failed to do request: Get XXXXXXXXXX.dkr.ecr.ap-southeast-1.amazonaws.com/notifyservice:latest: dial tcp 52.219.41.3:443: i/o timeout
```

**Wait, so what is actually happening?**
Your ECS task needs to pull your container from ECR, so obviously it needs to be able to talk to ECR. To do this, you set up a VPC endpoint, which gives you a route to ECR. However, the backend for ECR is actually s3, meaning each layer is actually an s3 object. This also means anything that your task also needs to access s3, which means it needs a way to be able to call the s3 service. 

Because s3 endpoints are enabled using gateways, which is essentially your VPC updating its own route tables to allow traffic through to the AWS network, they're not really something you can associate a security group with. Hence the right way to allow your instance to connect to s3 is by allowing the prefix list, which is really just shorthand for the list of IP addresses AWS uses for the s3 service.

[^1]: After the fact I also managed to find a second [blog post](https://tinfoilcipher.co.uk/2025/01/29/configuring-ecs-fargate-and-ecr-with-private-subnets/) on this.
[^2]: Or, the only section of the blog you actually need to read
[^3]: Which allows you to avoid NAT gateway charges, and be slightly more secure (not going over the public internet) 
[^4]: Or, just let me complain a bit
[^5]: Maybe by a helpful assistant?