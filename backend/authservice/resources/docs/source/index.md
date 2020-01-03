---
title: API Reference

language_tabs:
- bash
- javascript

includes:

search: true

toc_footers:
- <a href='http://github.com/mpociot/documentarian'>Documentation Powered by Documentarian</a>
---
<!-- START_INFO -->
# Info

Welcome to the generated API reference.
[Get Postman Collection](http://localhost/docs/collection.json)

<!-- END_INFO -->

#Login Process


APIs for login process
<!-- START_b982a9c2785c94e078bbe534a1f12d68 -->
## /api/login
> Example request:

```bash
curl -X POST \
    "http://localhost/api/login" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"email":"admin@esi.dz","password":"abcdefgh"}'

```

```javascript
const url = new URL(
    "http://localhost/api/login"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "email": "admin@esi.dz",
    "password": "abcdefgh"
}

fetch(url, {
    method: "POST",
    headers: headers,
    body: body
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (200):

```json
null
```
> Example response (404):

```json
null
```

### HTTP Request
`POST /api/login`

#### Body Parameters
Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    `email` | string |  required  | The email of the user.
        `password` | string |  required  | The password of the user.
    
<!-- END_b982a9c2785c94e078bbe534a1f12d68 -->

#Reset Password Process


APIs for reset password process
<!-- START_aacae96996577db5ab44788e7aebae24 -->
## Create token password reset

> Example request:

```bash
curl -X POST \
    "http://localhost/api/password/create" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"email":"admin@esi.dz"}'

```

```javascript
const url = new URL(
    "http://localhost/api/password/create"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "email": "admin@esi.dz"
}

fetch(url, {
    method: "POST",
    headers: headers,
    body: body
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (200):

```json
null
```
> Example response (404):

```json
null
```

### HTTP Request
`POST /api/password/create`

#### Body Parameters
Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    `email` | string |  required  | The email of the user.
    
<!-- END_aacae96996577db5ab44788e7aebae24 -->

<!-- START_56d15ed2b61d90d41b4cc9431308547a -->
## Find token password reset

> Example request:

```bash
curl -X GET \
    -G "http://localhost/api/password/find/1?token=mdhhqgjslseoukjlsdlkj" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://localhost/api/password/find/1"
);

let params = {
    "token": "mdhhqgjslseoukjlsdlkj",
};
Object.keys(params)
    .forEach(key => url.searchParams.append(key, params[key]));

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (200):

```json
null
```
> Example response (404):

```json
null
```

### HTTP Request
`GET /api/password/find/{token}`

#### Query Parameters

Parameter | Status | Description
--------- | ------- | ------- | -----------
    `token` |  optional  | string required The token of the request.

<!-- END_56d15ed2b61d90d41b4cc9431308547a -->

<!-- START_5e9e4ac523cd01bd511cd54c969e8d9c -->
## Reset password

> Example request:

```bash
curl -X POST \
    "http://localhost/api/password/reset" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"password":"123456","password_confirmation":"123456","token":"mdhhqgjslseoukjlsdlkj"}'

```

```javascript
const url = new URL(
    "http://localhost/api/password/reset"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "password": "123456",
    "password_confirmation": "123456",
    "token": "mdhhqgjslseoukjlsdlkj"
}

fetch(url, {
    method: "POST",
    headers: headers,
    body: body
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (200):

```json
null
```
> Example response (404):

```json
null
```

### HTTP Request
`POST /api/password/reset`

#### Body Parameters
Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    `password` | string |  required  | The password of the user.
        `password_confirmation` | string |  required  | The password of the user.
        `token` | string |  required  | The token of the request.
    
<!-- END_5e9e4ac523cd01bd511cd54c969e8d9c -->

#Students Manager


APIs for managing students
<!-- START_0d9ab760daa5a431c3cd34f0594bd769 -->
## /api/etudiant/ajouter
> Example request:

```bash
curl -X POST \
    "http://localhost/api/etudiant/ajouter" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"name":"nameStudent","lastname":"lastnameStudent","sex":"m","img":"image","date":"04\/03\/2001","lieu":"constantine","bacYear":"2019","currentYear":"1","phone":"0664360682","adresse":"constantine","email":"student@esi.dz","password":"123456","password_confirmation":"123456","bacFiliere":"Math","bacMoyenne":"17.17","bacRegion":"constantine","bacAttestation":"file","bacRelevai":"file","number_oldYears":"0"}'

```

```javascript
const url = new URL(
    "http://localhost/api/etudiant/ajouter"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "name": "nameStudent",
    "lastname": "lastnameStudent",
    "sex": "m",
    "img": "image",
    "date": "04\/03\/2001",
    "lieu": "constantine",
    "bacYear": "2019",
    "currentYear": "1",
    "phone": "0664360682",
    "adresse": "constantine",
    "email": "student@esi.dz",
    "password": "123456",
    "password_confirmation": "123456",
    "bacFiliere": "Math",
    "bacMoyenne": "17.17",
    "bacRegion": "constantine",
    "bacAttestation": "file",
    "bacRelevai": "file",
    "number_oldYears": "0"
}

fetch(url, {
    method: "POST",
    headers: headers,
    body: body
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (200):

```json
null
```
> Example response (404):

```json
null
```

### HTTP Request
`POST /api/etudiant/ajouter`

#### Body Parameters
Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    `name` | string |  required  | The name of the student.
        `lastname` | string |  required  | The lastname of the student.
        `sex` | string |  required  | The gender of the student.
        `img` | string |  required  | The profile pic of the student.
        `date` | string |  required  | The birth date of the student.
        `lieu` | string |  required  | The birth place of the student.
        `bacYear` | string |  required  | The bac year of the student.
        `currentYear` | string |  required  | The current year of the student.
        `phone` | string |  required  | The phone number of the student.
        `adresse` | string |  required  | The adresse of the student.
        `email` | string |  required  | The email of the student.
        `password` | string |  required  | The password of the student.
        `password_confirmation` | string |  required  | The password of the student.
        `bacFiliere` | string |  required  | The bac filere of the student.
        `bacMoyenne` | string |  required  | The bac moyenne of the student.
        `bacRegion` | string |  required  | The bac region of the student.
        `bacAttestation` | string |  required  | The bac attestation of the student.
        `bacRelevai` | string |  required  | The bac relevai file of the student.
        `number_oldYears` | string |  required  | The number of student old years .
    
<!-- END_0d9ab760daa5a431c3cd34f0594bd769 -->

<!-- START_044a4ba13b30c2ce33d6aad159703fcc -->
## /api/etudiant
> Example request:

```bash
curl -X GET \
    -G "http://localhost/api/etudiant" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://localhost/api/etudiant"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (200):

```json
null
```
> Example response (404):

```json
null
```

### HTTP Request
`GET /api/etudiant`


<!-- END_044a4ba13b30c2ce33d6aad159703fcc -->

<!-- START_5363ee84db1cc6c36cc715fc1c4c7f32 -->
## /api/etudiant/{etudiant_id}
> Example request:

```bash
curl -X GET \
    -G "http://localhost/api/etudiant/1?id=1" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://localhost/api/etudiant/1"
);

let params = {
    "id": "1",
};
Object.keys(params)
    .forEach(key => url.searchParams.append(key, params[key]));

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (200):

```json
null
```
> Example response (404):

```json
null
```

### HTTP Request
`GET /api/etudiant/{etudiant_id}`

#### Query Parameters

Parameter | Status | Description
--------- | ------- | ------- | -----------
    `id` |  required  | The id of the user.

<!-- END_5363ee84db1cc6c36cc715fc1c4c7f32 -->


