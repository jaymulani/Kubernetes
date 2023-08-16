docker login -u mulani -p Jay@#2000
echo "--Container 1--"
docker build -t container1:latest container1/
echo "--Container 2--"
docker build -t container2:latest container2/
echo "***Pushing Images***"
echo "c1"
docker tag container1:latest mulani/cloud:c1 && docker push mulani/cloud:c1
echo "c2"
docker tag container2:latest √/cloud:c2 && docker push mulani/cloud:c2
kubectl apply -f kubernetes.yaml
