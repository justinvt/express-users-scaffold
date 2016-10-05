# API Endpoints

## Installation Instructions

This application was designed to be a shallow install.  Once you are in the express-users-scaffold

'''bash
npm install && npm start

'''

Each endpoint will have an associated http verb (GET, POST, PUT, DELETE), a list of accepted query params, and a description of functionality.  This API will comply with REST standards when possible.

#### NOTE: For ALL endpoints

The desired format of the response can always be requested with the <code>format</code> query param, in the following way

```
SERVER_IP = 104.131.15.101:3000                   # At the time of writing this. Hopefully this is changed to easier to rememeber soon

http://SERVER_IP/schools?format=html     # <format> will be default JSON {HTML,JSON} are the only options right now.
http://SERVER_IP/schools                 # Since JSON is the default <format>, this will return <code>JSON</code>
```

## Getting a list of Schools (Colleges, Universities)

```bash
GET http://SERVER_IP/schools                            # Returns a JSON array, of all schools in our database
GET http://SERVER_IP/schools/by_name?name=<name_query>  # Returns a JSON array, of all schools in our database with names matching <name_query>
```

<name_query> is just a string, such as "drexel+university".  For convenience, we will replace "_", "-", and "+" with " ", and <name> is not case sensitive.  These should all return the same results...

````
http://SERVER_IP/schools/by_name?name=DREXEL_UNIVERSITY
http://SERVER_IP/schools/by_name?name=drexel_university
http://SERVER_IP/schools/by_name?name=drexel-university
http://SERVER_IP/schools/by_name?name=drexel+university
```


Typical results from GET /schools

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

NOTE: There are several schools with incomplete data (no zip, no logo, no coordinates).  There are ommitted from the results for now, until we normalize our list of schools.  Drexel and Rutgets are working examples, as are the vast majorty of US insitutions. 

## Getting a single school

```bash
http://SERVER_IP/schools/:school_id

#Example 
http://104.131.15.101:3000/schools/57e944bded04b53701cccd48
```

Result a single json object, respresenting a school.

```json
     
     { 
     "_id":"57e944beed04b53701ccce5c",
      "name":"University of the Sciences in Philadelphia",
      "logo":"//upload.wikimedia.org/wikipedia/en/thumb/d/db/University_of_the_Sciences_logo.png/220px-University_of_the_Sciences_logo.png",
      "coordinates":"39.9461,-75.2075",
      "zip":"19104"
      }
```
