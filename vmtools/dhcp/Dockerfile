FROM alpine:3.17

ENV PATH=/opt/.cmd:$PATH

RUN apk add bash curl git tar tree xz uuidgen iproute2 iptables procps util-linux coreutils minicom pstree findutils grep sed iputils net-tools

RUN curl -sSL https://a.zzci.cc/aa | sh -s install cmd

RUN apk add dhcp dhcpcd

RUN touch /var/lib/dhcp/dhcpd.leases

WORKDIR /etc/dhcp/

CMD ["/usr/sbin/dhcpd", "-4", "-f", "-d", "--no-pid", "-cf", "/etc/dhcp/dhcpd.conf"]
