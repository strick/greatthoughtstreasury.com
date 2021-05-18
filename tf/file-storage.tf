resource "azurerm_storage_account" "gtt_file_storage" {
  name                     = "gttfilestorage"
  resource_group_name      = azurerm_resource_group.greatthoughtstreasury.name
  location                 = azurerm_resource_group.greatthoughtstreasury.location
  account_tier             = "Standard"
  account_replication_type = "GRS"  # $0.02 more than LRS

}