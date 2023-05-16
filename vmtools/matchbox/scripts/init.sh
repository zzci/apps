mkdir cert
cd cert
../bin/certstrap init --cn root-ca
../bin/certstrap request-cert --cn test.com
../bin/certstrap sign test.com --CA root-ca