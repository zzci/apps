FROM alpine:3.17

ENV PATH=/opt/.cmd:/opt/qemu/bin:$PATH

RUN apk add bash curl git tar tree xz uuidgen iproute2 iptables cloud-init cdrkit \
  qemu-block-rbd qemu-img qemu-system-x86_64 qemu-chardev-spice busybox-extras \
  qemu-virtiofsd qemu-block-nfs procps util-linux coreutils minicom pstree findutils grep sed iputils net-tools; \
  curl -sSL a.zzci.cc/aa | sh -s install cmd

ADD rootfs /

WORKDIR /app
