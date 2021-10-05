# rancher-ui-driver-linode

Rancher UI driver for the [Linode docker-machine driver](https://github.com/linode/docker-machine-driver-linode)

## Usage

Manual installation is not required in [Rancher](https://rancher.com/products/rancher/) [v2.2.0+](https://forums.rancher.com/t/rancher-release-v2-2-0/) as the Linode Node Driver is included.

See the following guide for notes on installing Rancher and configuring the Linode Node Driver.

* <https://www.linode.com/docs/applications/containers/how-to-deploy-kubernetes-on-linode-with-rancher-2-2/>

Advanced usage is also discussed, including integration with Linode Kubernetes Addons:

* [Linode Container Storage Interface](https://github.com/linode/linode-blockstorage-csi-driver/) (for provisioning [Block Storage](https://www.linode.com/blockstorage))
* [Linode Cloud Controller Manager](https://github.com/linode/linode-cloud-controller-manager) (for provisioning [NodeBalancers](https://www.linode.com/nodebalancers))

### Docker Machine Driver Linode

The [Linode Docker Machine Driver](https://docs.docker.com/machine/drivers/linode/) that this Node Driver uses is described here:

* <https://www.linode.com/community/questions/17797/using-the-linode-docker-machine-driver>

## Setup

These steps are still useful in Rancher v2.0.x where the Linode Node Driver is not already included.

* Add a Machine Driver in Rancher 2.0.x (Global -> Node Drivers)
  * Name: `Linode`
  * Download URL:

    `https://github.com/linode/docker-machine-driver-linode/releases/download/v0.1.7/docker-machine-driver-linode_linux-amd64.zip`

  * Custom UI URL (Note: v0.3.0-alpha.1 and greater require Rancher 2.2.3+ ):

    `https://linode.github.io/rancher-ui-driver-linode/releases/v0.2.0/component.js`

  * Checksum

    `faaf1d7d53b55a369baeeb0855b069921a36131868fe3641eb595ac1ff4cf16f`

  * Whitelist Domains:

    `linode.github.io`

* Wait for the driver to become "Active"
* Go to Clusters -> Add Cluster, the driver and custom UI should show up.

## Development

This package contains a small web-server that will serve up the custom driver UI at `http://localhost:3000/component.js`.  You can run this while developing and point the Rancher settings there.

* `npm start`
* The driver name can be optionally overridden: `npm start -- --name=linode`
* The compiled files are viewable at <http://localhost:3000>.
* **Note:** The development server does not currently automatically restart when files are changed.
* Do not use the `model.linodeConfig` signature to access your driver config in the template file, use the `config` alias that is already setup in the component

## Building

For other users to see your driver, you need to build it and host the output on a server accessible from their browsers.

* `npm run build`
* Copy the contents of the `dist` directory onto a webserver.
  * If your Rancher is configured to use HA or SSL, the server must also be available via HTTPS.

### Contribution Guidelines

Would you like to improve the `rancher-ui-driver-linode` module? Please start [here](/.github/CONTRIBUTING.md).

## Resources

### Announcements and Documentation

* [Now Available: Linode Rancher Integration](https://blog.linode.com/2019/04/10/now-available-linode-rancher-integration/)
* [How to Deploy Kubernetes on Linode with Rancher 2.2](https://www.linode.com/docs/applications/containers/how-to-deploy-kubernetes-on-linode-with-rancher-2-2/)
  * [Linode Container Storage Interface](https://github.com/linode/linode-blockstorage-csi-driver)
  * [Linode Cloud Controller Manager](https://github.com/linode/linode-cloud-controller-manager)

### Join us on Slack

For general help or discussion, join the [Kubernetes Slack](http://slack.k8s.io/) channel [#linode](https://kubernetes.slack.com/messages/CD4B15LUR).
