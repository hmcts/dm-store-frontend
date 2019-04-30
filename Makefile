
.DEFAULT=all

build:
	docker build --no-cache -t hmcts/em-showcase .

run:
	docker run --rm -p 1337:1337 hmcts/em-showcase:latest
