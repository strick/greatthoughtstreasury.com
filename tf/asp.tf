resource "azurerm_app_service_plan" "asp" {
 name                   = "alansmolowe-apps"
 location               = var.location
 resource_group_name    = azurerm_resource_group.greatthoughtstreasury.name
 kind                   = "Linux"
 reserved               = true

 sku {
   tier     = "Basic"
   size     = "B1"
 }
}

resource "azurerm_app_service" "asp" {
  name                = "alansmolowe-apps-appservice"
  location            = "${azurerm_resource_group.greatthoughtstreasury.location}"
  resource_group_name = "${azurerm_resource_group.greatthoughtstreasury.name}"
  app_service_plan_id = "${azurerm_app_service_plan.asp.id}"

  site_config {
    app_command_line = ""
    linux_fx_version = "COMPOSE|${filebase64("../docker-compose.yaml")}"
  }

  app_settings = {
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false",
    "DOCKER_REGISTRY_SERVER_USERNAME" = azurerm_container_registry.container_registry.admin_username,
    "DOCKER_REGISTRY_SERVER_URL" = azurerm_container_registry.container_registry.login_server,
    "DOCKER_REGISTRY_SERVER_PASSWORD" = azurerm_container_registry.container_registry.admin_password
  }
}