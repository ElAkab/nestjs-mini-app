# GET request with authorization header. Theory command : curl -H "Authorization: Bearer <TOKEN>" <URL>
# -H : Adds a header to the request (Authorization: Bearer <TOKEN> is used for token-based authentication)
curl -H "Authorization: Bearer MON_TOKEN" https://api.exemple.com/users
