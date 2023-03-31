# traefik

## Run.

```
git clone https://github.com/zzci/traefik.git

cd traefik

./aa run
```

## Example config acmedns with domain `test.io`

* Add traefik config.
```
cp -a base.yml services/base.yml

sed -i 's/demo.io/test.io/' services/base.yml
```

* Register https://github.com/joohoi/acme-dns

```
curl -X POST \
  'https://auth.acme-dns.io/register'
```

* Get acme-dns config.

```json
{
  "username": "42eb90bd-1b63-4106-8523-1421ea1b1784",
  "password": "JGqdU0iJzBlyIc_CbiCoknJ8QW1dSSe9ik3k53KQ",
  "fulldomain": "5281873a-74d5-4f01-a6c3-92c58dd741e9.auth.acme-dns.io",
  "subdomain": "5281873a-74d5-4f01-a6c3-92c58dd741e9",
  "allowfrom": []
}
```

* Set acme-dns config.

```
cat ssl/acme-dns.json
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

* Set record

```
_acme-challenge.test.io CNAME 5281873a-74d5-4f01-a6c3-92c58dd741e9.auth.acme-dns.io
```
