cd tf

echo "terraform apply -auto-approve\"
    -var \"app_version=$VERSION\" 
    -var \"client_id=$ARM_CLIENT_ID\" 
    -var \"client_secret=$ARM_CLIENT_SECRET\""

eval "sed -i 's/MY_VERSION/$VERSION/' ../docker-compose.yaml"
eval "sed -i 's/GTT_FS_SHARE/$GTT_FS_SHARE/' ../docker-compose.yaml"
eval "sed -i 's/GTT_FS_ACCOUNT/$GTT_FS_ACCOUNT/' ../docker-compose.yaml"
eval "sed -i 's,GTT_FS_KEY,$GTT_FS_KEY,' ../docker-compose.yaml"  # escapse the / in keys

cat ../docker-compose.yaml
echo  

terraform init 
terraform apply -auto-approve \
    -var "app_version=$VERSION" \
    -var "client_id=$ARM_CLIENT_ID" \
    -var "client_secret=$ARM_CLIENT_SECRET" \
    -var "tenant_id=$ARM_TENANT_ID" \
    -var "subscription_id=$ARM_SUBSCRIPTION_ID"

#eval "sed -i 's/$VERSION/MY_VERSION/' ../docker-compose.yaml"
#eval "sed -i 's/$GTT_FS_SHARE/GTT_FS_SHARE/' ../docker-compose.yaml"
#eval "sed -i 's/$GTT_FS_ACCOUNT/GTT_FS_ACCOUNT/' ../docker-compose.yaml"
#eval "sed -i 's,$GTT_FS_KEY,GTT_FS_KEY,' ../docker-compose.yaml"