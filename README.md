Snerr
=====
### An error-message and error-code manager for developers and teams 

Snerr helps manage error-code creation, simplifies code, and decode error codes into meaningful messages formatted matching your requirement    

## Usage

Initialize 

```javascript
const sn = require('snerr')
```
In your code, say you need:
```javascript
if(err){
    const error = {
        code : "SN201NF",
        raw : err,
        message : "Database error in User : Not Found"
    }
}
```
Using snerr accomplish this in one line, 
```javascript
if(err)
    const error = sn.err('S201NF', err, 1)
```
Error codes are generated as a JSON object, where, 
```javascript
{
    "code": {
        "SN" : {
            "is" : "prefix",
            "1" : {...},
            "2" : {
                "is" : "Database",
                "01" : {
                    "is" : "User",
                    "NF" : {
                        "is" : "Not Found"
                    },
                    "UP" : {
                        "is" : "Update"
                    }
                },
                "02" : {
                    "is" : "Room",
                    "NF" : {...}
                }
            },
            "3": {...}
        }       
    }
}
```
With **snerr**, the developer feeds in the configurations as an array representing the nested levels of the code

```javascript
{
    "config" : [{
        "pre" : "",
        "post" : "",
        "length" : 1,
        "skip" : true
    },{
      "pre": "",
      "post": " error ",
      "length": 1,
      "skip": false
    },{
      "pre": " in ",
      "post": "",
      "length": 2,
      "skip": false
    },{
      "pre": " : ",
      "post": "",
      "length": 2,
      "skip": false
    }]
}
```
Every time an `sn.err()` function is called, the `code` object is checked and/or a new node created if the code is missing. The dev fills in the values according to his need after one run of the server

```javascript
{
    "code" : {
        "SN" :{
            "is": ""
        }
    }
}
```
The message need not be passed either; as long as the collaborator/other developer has a copy of `snerrfile.json`, they can decode the snerr code. Infact, the decoding can be done with a different configuration, formatted according to new requirements.

ex. the front end guy can decode `SN401NF` as `User Not Found` by simply tweaking the config.

## Docs

**snerr** exposes two methods: 

* `err(snerr,raw, addMessage)` where,

    | Variable    | Data Type | About                                            |
    | ------------|:---------:|--------------------------------------------------|
    | `err`       | `object`  | error object containing code, err, (and message) |
    | `snerr`     | `string`  | error code in snerr configuration                |
    | `raw`       | `object`  | raw system error data                            |
    | `addMessage`| `boolean` | add decoded message? (`false` by default)        |

* `show(snerr)` where,

    | Variable  | Data Type | About                  |
    |:---------:|:---------:|:----------------------:|
    | `show`    | `string`  | decoded message string |
    | `snerr`   | `string`  | snerr code             |

## License 

ISC


