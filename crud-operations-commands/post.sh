# POST request to create a new profile. Theory command : curl -X POST <URL> -H "Content-Type: application/json" -d '<DATA>'
# -X : Specifies the request method to use (POST in this case)
# -H : Adds a header to the request (Content-Type: application/json indicates that the request body contains JSON data)
# -d : Specifies the data to send in the request body (the new profile information in JSON format)
curl -X POST http://localhost:3000/profiles \
-H "Content-Type: application/json" \
-d '{
  "username": "Sponge Bob",
  "age": 30,
  "bio": "Software engineer and open source enthusiast.",
  "vaccinated": true,
}'