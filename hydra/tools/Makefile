APPNAME = openid-client

all: build

build: go.sum
	CGO_ENABLED=0 go build -mod=readonly -v -ldflags='-extldflags=-static -w -s' -o bin/$(APPNAME) ./src

go.sum:
	go mod tidy

.PHONY: build go.sum
