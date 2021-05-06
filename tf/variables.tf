variable "app_name" {
    default = "greatthoughtstreasury"
}

variable "location" {
    default = "East US"
}

variable admin_username {
  default = "linux_admin"
}

variable app_version { # Can't be called version! That's a reserved word.
}

variable client_id {
    sensitive = true
}

variable client_secret {
    sensitive = true
}

variable subscription_id {
    sensitive = true
}

variable tenant_id {
    sensitive = true
}


#variable "docker_registry_password" {
  
#}

#variable "docker_registry_username" {
  
#}

#variable "docker_registry_url" {
  
#