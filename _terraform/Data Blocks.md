You can use data blocks to query your platforms (like AWS) on objects inside the cloud.

For example, the following code:
``` terraform
data "aws_iam_user" "example" {
  user_name = "specific_user"
}
```

Will tell Terraform to query AWS for "specific_user" on code execution. After this, you will be able to reference this users properties in the code, of the form:
```
# Reference the user's ARN
${data.aws_iam_user.example.arn}

# Reference the user's unique ID
${data.aws_iam_user.example.user_id}
```