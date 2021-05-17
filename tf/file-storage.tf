resource "azurerm_storage_account" "gtt_file_storage" {
  name                     = "gttfilestorage"
  resource_group_name      = azurerm_resource_group.greatthoughtstreasury.name
  location                 = azurerm_resource_group.greatthoughtstreasury.location
  account_tier             = "Standard"
  account_replication_type = "GRS"  # $0.02 more than LRS

}

resource "azurerm_storage_container" "gtt_file_storage_conatiner" {
  name                  = "content"
  storage_account_name  = azurerm_storage_account.gtt_file_storage.name
  container_access_type = "private"
}

resource "azurerm_storage_blob" "gtt_image_blob" {
  name                   = "gttauthorimages"
  storage_account_name   = azurerm_storage_account.gtt_file_storage.name
  storage_container_name = azurerm_storage_container.gtt_file_storage_conatiner.name
  type                   = "Block"
}