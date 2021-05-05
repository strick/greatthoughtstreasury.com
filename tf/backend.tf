# Sets the "backend" used to store Terraform state.
# This is required to make continous delivery work.

terraform {
    backend "azurerm" {
        resource_group_name  = "gtt-terraform"
        storage_account_name = "gttterraform"
        container_name       = "terraform-state"
        key                  = "terraform.tfstate"
    }
}