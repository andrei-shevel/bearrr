HOST = shevvy@192.168.0.245
REMOTE_DIR = ~/projects/bearrr
CONTAINER = bearrr

.PHONY: deploy restart logs

# Deploy files and rebuild container
deploy:
	rsync -av --exclude=node_modules --exclude=.git --exclude=.next ./ $(HOST):$(REMOTE_DIR)
	ssh $(HOST) "cd $(REMOTE_DIR) && \
		sudo docker stop $(CONTAINER) || true && \
		sudo docker rm $(CONTAINER) || true && \
		sudo docker build -t bearrr-image . && \
		sudo docker run -d --name $(CONTAINER) --restart unless-stopped -p 80:3000 bearrr-image"

# Just restart the container
restart:
	ssh $(HOST) "sudo docker restart $(CONTAINER)"

# View container logs
logs:
	ssh $(HOST) "sudo docker logs -f $(CONTAINER)"
