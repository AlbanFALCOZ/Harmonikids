docker compose -f docker-compose-e2e.yml stop

docker compose -f docker-compose-e2e.yml build
docker compose -f docker-compose-e2e.yml up -d