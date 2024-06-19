cd backend
docker build -t backend-image .

cd ..

cd front-end
docker build -t frontend-image .

docker run -d --name backend-container -p 8081:9428 backend-image

docker run -d --name frontend-container -p 8080:80 frontend-image
