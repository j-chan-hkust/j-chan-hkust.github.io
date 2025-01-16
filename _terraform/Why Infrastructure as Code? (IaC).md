IaC allows you to create a blueprint of your data center as code that can be **_versioned_**, **_shared_**, and **_reused_**. This means it should be stored be stored and managed in a **code repository**, such as GitHub, GitLab, or Bitbucket. This also means that changes can be proposed or submitted via Pull Requests (PRs), which can help ensure a proper workflow, enable an approval process, and follow a typical development lifecycle (i.e. DevSecOps).

This creates a lot of other soft benefits:
- Repeatability of environment creation
- Trust in the consistency of the current state of the environment
- Version management, approval workflows
- (relative) Ease of comprehension - it's much easier than reading a python script that would do something similar!

While most of cloud platforms have their own IaC offerings, like **AWS CloudFormation** for Amazon Web Services, **Azure Resource Manager (ARM) templates** for Microsoft Azure, and **Google Cloud Deployment Manager** for Google Cloud Platform, Terraform is cloud agnostic (*though I personally am a bit doubtful it makes things that much easier*).

