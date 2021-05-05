cd ../tf
terraform init 
terraform apply -auto-approve \
    -var "app_version=$VERSION"