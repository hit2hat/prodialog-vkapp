workflow "New workflow" {
  on = "push"
  resolves = ["VK Notify"]
}

action "Install" {
  uses = "borales/actions-yarn@master"
  args = "install"
}

action "Build" {
  uses = "borales/actions-yarn@master"
  needs = ["Install"]
  args = "build"
}

action "Deploy" {
  uses = "JamesIves/github-pages-deploy-action@master"
  needs = ["Build"]
  env = {
    BRANCH = "gh-pages"
    FOLDER = "styleguide"
  }
  secrets = ["ACCESS_TOKEN"]
}

action "VK Notify" {
  uses = "alphamusic/VK-Notifications@master"
  needs = ["Deploy"]
  env = {
    VK_USERS = "182625786"
  }
  secrets = ["VK_TOKEN"]
}
