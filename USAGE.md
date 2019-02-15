# Rancher Kubernetes Engine 2.2 with Linode

In this guide, we will cover:

1. Using Docker-Machine-Driver-Linode to provision a Linode with Docker-CE
1. Run RKE 2.2 in that Docker-CE Environment
1. Configure the Linode Node and UI Driver for Rancher
1. Create a Node Template with the necessary settings
1. Create an RKE Cluster
1. Install an Application from the catalog taking advantage of:
   1. Linode CSI (BlockStorage support)
   1. Linode CCM (NodeBalancer support)

## Provision a Linode with Docker-CE

While any Linux system with Docker installed could be our starting point, we'll double down on the Linode Docker Machine driver for educational gains.  Rancher relies on Docker Machine drivers and we will be configuring how Rancher does this.  Exposure to this workflow will give us perspective.

Install the docker-machine-driver-linode binary from https://github.com/linode/docker-machine-driver-linode/releases

Be sure to grab the appropriate binary for your operating system. OSX and Linux builds are available.

With the binary in your path, the `docker-machine` command will handle Linode provisioning:

```sh
docker-machine create -d linode --help
```

The only arguments that are required for provisioning are the Linode APIv4 Token and a label.  In practice, you will want to avoid the defaults and choose the Linode Instance type, base image, and region that best suits your needs.

You will need to provide a [Personal Access Token for Linode APIv4](https://cloud.linode.com/profile/tokens) (referred to below as `$LINODE_TOKEN`).

```sh
$ docker-machine create -d linode --linode-token $LINODE_TOKEN  dockode
Running pre-create checks...
Creating machine...
(dockode) Creating Linode machine instance...
(dockode) Creating linode instance
(dockode) Waiting for Machine Running...
Waiting for machine to be running, this may take a few minutes...
Detecting operating system of created instance...
Waiting for SSH to be available...
Detecting the provisioner...
Provisioning with ubuntu(systemd)...
Installing Docker...
Copying certs to the local machine directory...
Copying certs to the remote machine...
Setting Docker configuration on the remote daemon...
Checking connection to Docker...
Docker is up and running!
To see how to connect your Docker Client to the Docker Engine running on this virtual machine, run: docker-machine env dockode
```

The metadata being managed can be viewed with: `docker-machine inspect dockode`

Take a look at `docker-machine -h` for more examples of what can be done through this management interface.  These commands are behind the Rancher Node Driver's ability to scale Linodes in a Rancher Node Pool.

Now that we have a Linode running Docker-CE managed by `docker-machine`, we can target all of our `docker` commands to run in that environment.

```sh
eval $(docker-machine env dockode)
```

## Run Rancher on the Linode (using the local Docker client)

We could simply start Rancher by running the following:

```sh
docker run -d -p 80:80 -p 443:443 rancher/rancher
```

But let's add a few more options and commands to make this sturdier.

### Rancher that survives a reboot

Docker is managing the SSH keys for the Linode and the SSL certificates needed to interact with the docker daemon.

Notice that we'll be using `docker-machine` to ssh into the `dockode` Linode.  This is because the state is persisted remotely, on the Linode.  Instead of using `ssh` directly, we rely on `docker-machine ssh` to access the Linode.

Start by creating a directory to persist settings and certificates.  If we had settings or certificates to provide Rancher, we could `docker-machine scp` them to `dockode:/opt/rancher` and the relevant sub-folders.

```sh
docker-machine ssh dockode mkdir -p /opt/rancher
```

Now start Rancher with a few additional arguments:

* `--restart=unless-stopped` [will restart the container,](https://docs.docker.com/config/containers/start-containers-automatically/) even if the node reboots
* `-v /opt/rancher:/var/lib/rancher` will persist our Rancher keys and settings on the Linode `docker-machine` provisioned
* `rancher/rancher:master` will use the latest untagged, unreleased, image based on the [Rancher repo](https://github.com/rancher/rancher) (this permits Kubernetes 1.13.x features)

```sh
docker run -d -p 80:80 -p 443:443 \
  --restart=unless-stopped \
  -v /opt/rancher:/var/lib/rancher \
  rancher/rancher:master
```

Once Rancher has started, you can access port 443 on the Linode after accepting the untrusted certificate.  Create your admin account and login.

```sh
URL="https://$(docker-machine ip dockode):443/"
open "$URL" 2>/dev/null || echo "Open this in your browser: $URL"
```

Note that the IP address of the Linode running Rancher is available with `docker-machine ip dockode`.

## Install the Docker-Machine-Driver-Linode binary in Rancher

Now that you have Rancher running, load the `Global -> Custom Drivers` tab.

### Download URL

Click `Add New Driver` and provide the URLs to the [latest Linode Docker Machine for Linux binary from the Github Releases](https://github.com/linode/docker-machine-driver-linode/releases/latest) for the `Download URL`.

```sh
https://github.com/linode/docker-machine-driver-linode/releases/download/v0.1.6/docker-machine-driver-linode_linux-amd64.zip
```

### Custom UI URL

Use the [latest release of the Linode UI for Rancher](https://github.com/linode/rancher-ui-driver-linode/releases/latest) in the `Custom UI URL` field.  The UI Driver simplifies how Docker Machine options are provided.  Instead of looking up the current Linode Instance sizes, and entering `g6-standard-4`, a drop down provides detailed descriptions which include all of the viable options.  The UI Driver also removes any options that are unnecessary.

```text
https://linode.github.io/rancher-ui-driver-linode/releases/v0.2.0/component.js
```

Omitting this step will reveal all Docker Machine Driver options. Here be dragons.  You'll want to provide the Region, Image, and Instance Type using their [Linode APIv4 IDs](https://gist.github.com/displague/3c1728fdf4ff2bacf6960a9b8c6ea73f).  

### Checksum

The optional checksum for the chosen version of the Docker Machine Driver binary can be found in the file ending in `_checksums.txt` [on the releases page](https://github.com/linode/docker-machine-driver-linode/releases).

<!---
![image](https://user-images.githubusercontent.com/317653/50861895-1288ea00-1368-11e9-86fe-ea1181c3d012.png)--->

## Create a Node Template

![image](https://user-images.githubusercontent.com/317653/51724064-9cec7180-2029-11e9-8bc1-ca3608fe7cf0.png)

From the profile menu, choose `Node Templates` and then `Add Template`.

Select `Linode` and provide a [Personal Access Token](https://cloud.linode.com/profile/tokens) and click `Configure Server`.

Choose a `Region`, `Instance Type` with sufficient RAM for the intended Kubernetes cluster role (Linode 2GB or higher), and choose a distribution `Image` that works well in Rancher (Ubuntu 16.04 LTS, for example).

## Create a Cluster

From the `Global` menu click `Add Cluster`.

Choose Linode from the list of infrastructure providers, then provide a `Cluster Name` and `Name Prefix` when selecting the `Node Template` that was just created.

![image](https://user-images.githubusercontent.com/317653/51723933-f902c600-2028-11e9-9fd4-d20342640b2d.png)

### Linode Addons

Select Kubernetes version `v1.13.1-rancher1-1` or later to take advantage of the Linode CSI addon for Block Storage.

Choose `Customer Cloud Provider` and then `Edit Yaml`.

In the Yaml editor, add the following stanza, **replacing** the `region` and `token` values (`"..."`) with the ones specified earlier in the configuration of this cluster:

```yaml
addons_include:
  - https://gist.githubusercontent.com/displague/39f11fb899d75cc65ddd358077cbb3b7/raw/2f4ed11426b0b946a6ead2a31f74a32ae4acff23/linode-addons.yml
addons: |-
  ---
  apiVersion: v1
  kind: Secret
  metadata:
    name: linode
    namespace: kube-system
  stringData:
    token: "..."
    region: "..."
  ---
```

Then find the `services:` section near the bottom and modify it to match the following:

```yaml
services:
  etcd:
    backup_config: 
      interval_hours: 12
      retention: 6
    creation: "12h"
    extra_args: 
      heartbeat-interval: 500
      election-timeout: 5000
    retention: "72h"
    snapshot: true
  kube-api:
    always_pull_images: false
    pod_security_policy: false
    service_node_port_range: "30000-32767"
    extra_args:
      feature-gates: "PersistentLocalVolumes=true,VolumeScheduling=true,CSINodeInfo=true,CSIDriverRegistry=true,BlockVolume=true,CSIBlockVolume=true"
  kubelet:
    fail_swap_on: false
    extra_args:
      cloud-provider: "external"
      feature-gates: "PersistentLocalVolumes=true,VolumeScheduling=true,CSINodeInfo=true,CSIDriverRegistry=true,BlockVolume=true,CSIBlockVolume=true"
  kube-controller:
    extra_args:
      cloud-provider: "external"
```

After a minute or two the cluster will be ready to go.

#### Cloud Controller Manager (CCM)

#### Container Storage Interface (CSI)

![image](https://user-images.githubusercontent.com/317653/52651813-dc84db80-2eba-11e9-9ac4-5a6b47216ec2.png)


<!--
![image](https://user-images.githubusercontent.com/317653/47944998-57f6ea00-ded5-11e8-9fc0-bfa30704acf7.png)
![image](https://user-images.githubusercontent.com/317653/47945004-61805200-ded5-11e8-997c-816600d152a0.png)

## Create a Rancher Kubernetes Cluster

### First Try Ubuntu (failure)

![image](https://user-images.githubusercontent.com/317653/47945007-6cd37d80-ded5-11e8-862c-06dc35109eb3.png)
![image](https://user-images.githubusercontent.com/317653/47945015-76f57c00-ded5-11e8-89b1-713be4e833bd.png)
![image](https://user-images.githubusercontent.com/317653/47945020-7fe64d80-ded5-11e8-8da8-1169fb18493a.png)
![image](https://user-images.githubusercontent.com/317653/47945024-85439800-ded5-11e8-9329-2edf79fb3000.png)

### Then Try CoreOS

![image](https://user-images.githubusercontent.com/317653/47945026-8bd20f80-ded5-11e8-9cdd-1d9132cad5a7.png)
![image](https://user-images.githubusercontent.com/317653/47945033-92f91d80-ded5-11e8-90b2-c81718751e17.png)

![image](https://user-images.githubusercontent.com/317653/47945037-98566800-ded5-11e8-875a-47f4c1076a5a.png)


![image](https://user-images.githubusercontent.com/317653/47945039-a1473980-ded5-11e8-9b19-e425df1d802a.png)



```
This cluster is currently Provisioning; areas that interact directly with it will not be available until the API is ready.
[pre-deploy] Pulling image [rancher/hyperkube:v1.11.3-rancher1] on host [192.155.90.133]
```

```
This cluster is currently Provisioning; areas that interact directly with it will not be available until the API is ready.
[addons] Saving addon ConfigMap to Kubernetes
```

```
Failed to get Kubernetes server version: Get https://173.255.238.177:6443/version: can not build dialer to c-qm8ln:m-2pbwc
```

Reduce the cluster count to 1 node.  It works!

![image](https://user-images.githubusercontent.com/317653/47945064-ca67ca00-ded5-11e8-99cb-5d000093051b.png)
![image](https://user-images.githubusercontent.com/317653/47945068-cf2c7e00-ded5-11e8-9503-9025d5da7316.png)

But after a few minutes, ContainerLinux will reboot.  And the Kubernetes services will not restart.


```
This cluster is currently Unavailable; areas that interact directly with it will not be available until the API is ready.
Failed to communicate with API server: Get https://45.33.66.78:6443/api/v1/componentstatuses?timeout=30s: waiting for cluster agent to connect
```


## Next Steps

Fix https://github.com/linode/rancher-ui-driver-linode so that the Rancher UI can present drop downs with human values instead of raw Linode API values (Region, Kernel, Instance Type, Image dropdowns) 

-->
