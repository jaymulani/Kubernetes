echo "***Docker Login***"
docker login -u <username> -p <password>
echo "***Building Images***"
echo "--Container 1--"
docker build -t container1:latest container1/
echo "--Container 2--"
docker build -t container2:latest container2/
echo "***Pushing Images***"
echo "c1"
docker tag container1:latest <docker-image-repo> && docker push <docker-image-repo>
echo "c2"
docker tag container2:latest <docker-image-repo> && docker push <docker-image-repo>
echo "***Spinning Up Images***"
kubectl apply -f *.yaml
