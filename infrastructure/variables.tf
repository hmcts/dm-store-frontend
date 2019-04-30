variable "product" {
  description = "Showcase of Document Store backend APIs"
}

variable "component" {}

variable "location" {
  default = "UK South"
}

variable "env" {
  description = "(Required) The environment in which to deploy the application infrastructure."
}

variable "ilbIp" {}

variable "subscription" {}
variable "common_tags" {
  type = "map"
}

variable "autoheal" {
  description = "Enabling Proactive Auto Heal for Webbapps"
  default     = "True"
}
