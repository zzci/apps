#!/bin/sh

./bin/openid-client --debug \
  --client-id "27780ac3-0984-421a-ae7c-5dbef7b3e68a" \
  --client-secret "4b2f2d02-f2f4-436e-903f-3c354d0d5e2e" \
  --issuer https://openid.demo.io \
  --listen http://0.0.0.0:3008 \
  --redirect-uri https://localhost/callback
