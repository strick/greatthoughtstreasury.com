
resource "azurerm_resource_group" "greatthoughtstreasury" {

    name = var.app_name

    location = var.location
}