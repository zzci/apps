# k0s Installation With Pre-config

This script to automate the installation of k0s with certain pre-configurations.

## About the Script

The provided script automates the installation and configuration of the following software components:

* k0s
* Container Networking Interface (CNI) plugins
* Helm
* Kubectl
* change default CNI to cilium
* pre-defined CA cert.
* Use MetalLB as load-balancer

## Before the install

* Change `config/config.yaml` api address to your host ip address

```
  address: 10.2.0.6
...
  k8sServiceHost: 10.2.0.6
```

* Add useful tools

```
export PATH=/opt/.cmd:$PATH
curl -L a.zzci.cc/aa | sh -s install cmd
```

* Gen custom CA
```
bin/genca
```

## Install k0s cluster

```
bin/install
```

## Add workers to the cluster

```
bin/add-worker
```

## Add master to the cluster

```
bin/add-master
```

## After the Install

Remove node taint.

```
kubectl taint nodes $(hostname) node-role.kubernetes.io/master:NoSchedule-
```