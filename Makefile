
.DEFAULT=all

build:
	docker build --no-cache -t hmcts/dm-store-frontend .

run:
	docker run --rm -p 8080:8080 hmcts/dm-store-frontend:latest
