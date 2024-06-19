#!/bin/bash

# Build backend image
docker build -t backend-image -f /backend/Dockerfile .

# Build frontend image
docker build -t frontend-image -f /front-end/Dockerfile .

# Run backend container
docker run -d --name backend-container -p 8081:9428 backend-image

# Run frontend container
docker run -d --name frontend-container -p 8080:80 frontend-image
