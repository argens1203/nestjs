npm run build
eval $(minikube -p minikube docker-env)
docker build -t nest-neo4j .
