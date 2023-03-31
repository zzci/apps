# Production-ready Traefik Configuration Guide with Examples

## Getting Started

1. Clone the repository and run

```
git clone https://github.com/zzci/traefik.git
cd traefik
```

2. Copy the .env.example file to .env

```
cp .env.example .env
```

3. Edit the .env file as per your requirements

4. Start Traefik with the following command

```
./aa run
```

Please note that you'll need to configure the .env file according to your needs before starting Traefik.

## Example configuration for using acme-dns with domain `test.io`

1. Add Traefik config for test.io

```
cp -a base.yml services/base.yml
sed -i 's/demo.io/test.io/' services/base.yml
```

2. Register with acme-dns by sending a POST request to https://auth.acme-dns.io/register

```
curl -X POST \
  'https://auth.acme-dns.io/register'
```

3. Retrieve the acme-dns config

```json
{
  "username": "42eb90bd-1b63-4106-8523-1421ea1b1784",
  "password": "JGqdU0iJzBlyIc_CbiCoknJ8QW1dSSe9ik3k53KQ",
  "fulldomain": "5281873a-74d5-4f01-a6c3-92c58dd741e9.auth.acme-dns.io",
  "subdomain": "5281873a-74d5-4f01-a6c3-92c58dd741e9",
  "allowfrom": []
}
```

4. Save the acme-dns config in ssl/acme-dns.json for test.io

```json
{
  "test.io": {
    "username": "42eb90bd-1b63-4106-8523-1421ea1b1784",
    "password": "JGqdU0iJzBlyIc_CbiCoknJ8QW1dSSe9ik3k53KQ",
    "fulldomain": "5281873a-74d5-4f01-a6c3-92c58dd741e9.auth.acme-dns.io",
    "subdomain": "5281873a-74d5-4f01-a6c3-92c58dd741e9",
    "server_url": "https://auth.acme-dns.io"
  }
}
```

5. Set the DNS record for `_acme-challenge.test.io` to point to `5281873a-74d5-4f01-a6c3-92c58dd741e9.auth.acme-dns.io` (CNAME)

```
_acme-challenge.test.io CNAME 5281873a-74d5-4f01-a6c3-92c58dd741e9.auth.acme-dns.io
```
