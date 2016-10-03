# express-users-scaffold

## API Endpoints

Each endpoint will have an associated http verb (GET, POST, PUT, DELETE), a list of accepted query params, and a description of functionality.  This API will comply with REST standards when possible.

### For ALL endpoints

The desired format of the response can always be requested with the <code>format</code> query param, in the following way

```
SERVER_IP = 104.131.15.101:3000                   # At the time of writing this. Hopefully this is changed to easier to rememeber soon

http://SERVER_IP/schools?format=html     # <format> will be default JSON {HTML,JSON} are the only options right now.
http://SERVER_IP/schools                 # Since JSON is the default <format>, this will return <code>JSON</code>
```

### GET-ing a list of Schools (Colleges, Universities)

```bash
GET http://SERVER_IP/schools          # Returns a JSON array, of all schools in our database
GET http://SERVER_IP/schools/by_name  # Returns a JSON array, of all schools in our database
```

```json
[
   {  "_id":"57e944bded04b53701cccd86",
      "name":"Philadelphia University",
      "logo":"//upload.wikimedia.org/wikipedia/commons/thumb/7/74/Philadelphia_University_Logo.svg/180px-Philadelphia_University_Logo.svg.png",
      "coordinates":"40.023,-75.192", // Lat/long
      "zip":"19144"},
      
   { "_id":"57e944beed04b53701ccce5c",
      "name":"University of the Sciences in Philadelphia",
      "logo":"//upload.wikimedia.org/wikipedia/en/thumb/d/db/University_of_the_Sciences_logo.png/220px-University_of_the_Sciences_logo.png",
      "coordinates":"39.9461,-75.2075",
      "zip":"19104"},
      
      {
          /* and so forth*/
      }
  ]

```

In a similar vein, this url also produces a JSON array of schools, filtered by name.  If you are specific enough, this should be an array with size = 0. 

```bash
GET http:/SERVER_IP/schools/by_name?name=<name>  # Returns a JSON array, of all schools in our database
```


