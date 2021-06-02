cd tf

echo "terraform apply -auto-approve\"
    -var \"app_version=$VERSION\" 
    -var \"client_id=$ARM_CLIENT_ID\" 
    -var \"client_secret=$ARM_CLIENT_SECRET\""

eval "sed -i 's/MY_VERSION/$VERSION/' ../docker-compose.yaml"
eval "sed -i 's/GTT_FS_SHARE/$GTT_FS_SHARE/' ../docker-compose.yaml"
eval "sed -i 's/GTT_FS_ACCOUNT/$GTT_FS_ACCOUNT/' ../docker-compose.yaml"
eval "sed -i 's,GTT_FS_KEY,$GTT_FS_KEY,' ../docker-compose.yaml"  # escapse the / in keys 

eval "sed -i 's/MONGODB_HOST/$MONGODB_HOST/' ../docker-compose.yaml"
eval "sed -i 's/MONGODB_USER/$MONGODB_USER/' ../docker-compose.yaml"
eval "sed -i 's/MONGODB_PASSWORD/$MONGODB_PASSWORD/' ../docker-compose.yaml"
eval "sed -i 's,MONGODB_TYPE,$MONGODB_TYPE,' ../docker-compose.yaml"  # escapse the / in keys

# Redis
eval "sed -i 's/REDIS_CACHE_HOSTNAME/$REDISCACHEHOSTNAME/' ../docker-compose.yaml"
eval "sed -i 's/REDIS_CACHE_PORT/$REDISCACHEPORT/' ../docker-compose.yaml"
eval "sed -i 's/REDIS_CACHE_KEY/$REDISCACHEKEY/' ../docker-compose.yaml"

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