provider "google" {
  credentials = file("cloud-auth.json")
  project = "cloud-390101"
  region  = "northamerica-northeast1"
}

resource "google_container_cluster" "cluster" {
  name     = "dev-cloud"
  location = "northamerica-northeast1-a"

  initial_node_count = 1

  node_config {
    machine_type = "e2-small"
    disk_size_gb = 10
    disk_type    = "pd-standard"
  }
}
