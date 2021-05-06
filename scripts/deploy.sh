cd tf

echo "terraform apply -auto-approve\"
    -var \"app_version=$VERSION\" 
    -var \"client_id=$ARM_CLIENT_ID\" 
    -var \"client_secret=$ARM_CLIENT_SECRET\""


terraform init 
terraform apply -auto-approve \
    -var "app_version=$VERSION" \
    -var "client_id=$ARM_CLIENT_ID" \
    -var "client_secret=$ARM_CLIENT_SECRET" \
    -var "tenant_id=$ARM_TENANT_ID" \
    -var "subscription_id=$ARM_SUBSCRIPTION_ID"
    
