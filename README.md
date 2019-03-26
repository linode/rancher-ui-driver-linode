# rancher-ui-driver-linode

Linode Rancher UI driver for the Linode docker-machine driver

## Usage

[Rancher](https://rancher.com/products/rancher/) [v2.2.0+ includes this Linode Node Driver](https://forums.rancher.com/t/rancher-release-v2-2-0/).  Manual installation is not required.

See the following guide for basic and advanced usage, including integration with the [Linode CSI](https://github.com/linode/linode-blockstorage-csi-driver/) ([Block Storage](https://www.linode.com/blockstorage)) and [Linode CCM](https://github.com/linode/linode-cloud-controller-manager) ([NodeBalancer](https://www.linode.com/nodebalancers)) Kubernetes Addons:

* https://www.linode.com/docs/applications/containers/how-to-deploy-kubernetes-on-linode-with-rancher-2-2/

The [Linode Docker Machine Driver](https://docs.docker.com/machine/drivers/linode/) that this Node Driver uses is described here:

* https://www.linode.com/community/questions/17797/using-the-linode-docker-machine-driver

## Setup

These steps are still useful in Rancher v2.0.x where the Linode Node Driver is not already included.

* Add a Machine Driver in Rancher 2.0.x (Global -> Node Drivers)
  * Name: `Linode`
  * Download URL:

    `https://github.com/linode/docker-machine-driver-linode/releases/download/v0.1.6/docker-machine-driver-linode_linux-amd64.zip`
  * Custom UI URL:

    `https://linode.github.io/rancher-ui-driver-linode/releases/v0.2.0/component.js`
  * Whitelist Domains:

    `linode.github.io`
* Wait for the driver to become "Active"
* Go to Clusters -> Add Cluster, your driver and custom UI should show up.

## Development

This package contains a small web-server that will serve up the custom driver UI at `http://localhost:3000/component.js`.  You can run this while developing and point the Rancher settings there.
* `npm start`
* The driver name can be optionally overridden: `npm start -- --name=linode`
* The compiled files are viewable at http://localhost:3000.
* **Note:** The development server does not currently automatically restart when files are changed.
* Do not use the `model.linodeConfg` signature to access your driver config in the template file, use the `config` alias that is already setup in the component

## Building

For other users to see your driver, you need to build it and host the output on a server accessible from their browsers.

* `npm run build`
* Copy the contents of the `dist` directory onto a webserver.
  * If your Rancher is configured to use HA or SSL, the server must also be available via HTTPS.
