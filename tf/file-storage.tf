resource "azurerm_storage_account" "gtt_file_storage" {
  name                     = "gttfilestorage"
  resource_group_name      = azurerm_resource_group.greatthoughtstreasury.name
  location                 = azurerm_resource_group.greatthoughtstreasury.location
  account_tier             = "Standard"
  account_replication_type = "GRS"  # $0.02 more than LRS

}

resource "azurerm_storage_container" "gttfilestorage" {
  name                  = "content"
  storage_account_name  = azurerm_storage_account.greatthoughtstreasury.name
  container_access_type = "private"
}

resource "azurerm_storage_blob" "gttauthorimages" {
  name                   = "my-awesome-content.zip"
  storage_account_name   = azurerm_storage_account.example.name
  storage_container_name = azurerm_storage_container.example.name
  type                   = "Block"
}