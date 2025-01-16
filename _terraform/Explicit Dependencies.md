By using the depends_on block in your [[Resource Block]], you can explicitly tell terraform to wait until a certain resource has been created, before it creates the dependent resource.

Example:
```
1. resource "aws_instance" "example" {
2.   ami           = "ami-2757f631"
3.   instance_type = "t2.micro"
4.   depends_on    = [aws_s3_bucket.company_data]
5. }
```
