provider "azurerm" {
  version = "1.22.1"
}

locals {
  ase_name = "core-compute-${var.env}"

  local_env = "${(var.env == "preview" || var.env == "spreview") ? (var.env == "preview" ) ? "aat" : "saat" : var.env}"
  local_ase = "${(var.env == "preview" || var.env == "spreview") ? (var.env == "preview" ) ? "core-compute-aat" : "core-compute-saat" : local.ase_name}"
}

module "frontend" {
  source               = "git@github.com:hmcts/cnp-module-webapp?ref=master"
  product              = "${var.product}-${var.component}"
  location             = "${var.location}"
  env                  = "${var.env}"
  ilbIp                = "${var.ilbIp}"
  is_frontend          = "${!(var.env == "preview" || var.env == "spreview") ? 1 : 0}"
  subscription         = "${var.subscription}"
  additional_host_name = "${var.product}.platform.hmcts.net"
  common_tags          = "${var.common_tags}"
  appinsights_location = "${var.location}"

  asp_name = "${var.product}"

  app_settings = {
    WEBSITE_NODE_DEFAULT_VERSION       = "10.14.1"
    WEBSITE_PROACTIVE_AUTOHEAL_ENABLED = "${var.autoheal}"

    S2S_KEY = "${data.azurerm_key_vault_secret.s2s_key.value}"
    IDAM_SECRET = "${data.azurerm_key_vault_secret.oauth2_secret.value}"

    DM_STORE_API_URL = "http://dm-store-${local.local_env}.service.${local.local_ase}.internal"

    IDAM_URL = "https://idam-api.aat.platform.hmcts.net"
    S2S_URL = "https://rpe-service-auth-provider-${local.local_env}.service.${local.local_ase}.internal"
  }
}

data "azurerm_key_vault_secret" "s2s_key" {
  name      = "microservicekey-em-gw"
  vault_uri = "https://s2s-${local.local_env}.vault.azure.net/"
}

data "azurerm_key_vault_secret" "oauth2_secret" {
  name      = "show-oauth2-token"
  vault_uri = "https://rpa-${local.local_env}.vault.azure.net/"
}
