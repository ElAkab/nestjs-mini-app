# PUT request to update an existing profile. Theory command : curl -X PUT <URL> -H "Content-Type: application/json" -d '<DATA>'
# -X : Specifies the request method to use (PUT in this case)
# -H : Adds a header to the request (Content-Type: application/json indicates that the request body contains JSON data)
# -d : Specifies the data to send in the request body (
curl -X PUT http://localhost:3000/profiles/dd295ded-9cf5-42fe-9046-8d7290a05594 \
  -H "Content-Type: application/json" \
  -d '{"username":"Jonny"}'
