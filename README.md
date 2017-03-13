## Personal Page for Mike Nomitch

### Setup

- To deploy the page you need to add access_key, secret_key, bucket_name and zone_id variables to terraform.tfvars.

- Then you need to run terraform apply to spin up the resources.

- Then you make adjustments to Route53 accordingly (unfortunately terraform currently has a bug with Route53 that stops this from being fully automated)

- See this guide for more info: https://docs.aws.amazon.com/AmazonS3/latest/dev/website-hosting-custom-domain-walkthrough.html