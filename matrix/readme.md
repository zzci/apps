## init.

mkdir -p data/matrix
cp config/private.key data/matrix

## generate new private.key

docker exec -ti matrix -private-key private.key

## generate passwd

uuidgen -r | md5sum