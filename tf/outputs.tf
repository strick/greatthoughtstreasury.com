  
output "app_service_name" {
  value = "${azurerm_app_service.asp.name}"
}

output "app_service_default_hostname" {
  value = "https://${azurerm_app_service.asp.default_site_hostname}"
}

output "login_server" {
  value = "${azurerm_container_registry.container_registry.login_server}"
}