locals {
    service_name = "gtt-web"
    login_server = azurerm_container_registry.container_registry.login_server
    username = azurerm_container_registry.container_registry.admin_username
    password = azurerm_container_registry.container_registry.admin_password
    image_tag = "${local.login_server}/${local.service_name}:${var.app_version}"
}

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

resource "null_resource" "docker_build" {

    triggers = {
        always_run = timestamp()
    }

    provisioner "local-exec" {
        command = "docker build ${local.image_tag} --file ../${local.service_name}/Dockerfile-prod ../${local.service_name}"
    }
}

resource "null_resource" "docker_login" {

    depends_on = [ null_resource.docker_build ]

    triggers = {
        always_run = timestamp()
    }

    provisioner "local-exec" {
        command = "docker login ${local.login_server} --username ${local.username} --password ${local.password}"
    }
}

resource "null_resource" "docker_push" {

    depends_on = [ null_resource.docker_login ]

    triggers = {
        always_run = timestamp()
    }

    provisioner "local-exec" {
        command = "docker push ${local.image_tag}"
    }
}

resource "azurerm_app_service" "asp" {

  depends_on = [ null_resource.docker_push ]

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