# NOTE: the Name used for Redis needs to be globally unique
resource "azurerm_redis_cache" "gtt_cache" {
  name                = "gtt-cache"
  location            = azurerm_resource_group.greatthoughtstreasury.location
  resource_group_name = azurerm_resource_group.greatthoughtstreasury.name
  capacity            = 0
  family              = "C"
  sku_name            = "Basic"
  enable_non_ssl_port = false
  minimum_tls_version = "1.2"

  redis_configuration {
    maxmemory_policy = "allkeys-lru"
  }

}