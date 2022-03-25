# DRONES REST API 

## Install

    npm install

## Run the app

    node app.js | nodemon app.js

## Database

    * Create a database "drones" in mysql 
    * Define credentials in src/config/db.config.js
    * Import drones.sql file in databse for dummy data

## Registering a drone

### Request

```POST http://localhost:3000/drones/create/
    Add data in JSON Format 
    Example : 
        {
            "serial_no" : "SN1",
            "model" : "lightweight",
            "weight_limit" : "20",
            "battery_capacity" : "100",
            "state" : "IDLE"
        }
```

## Registering a medication

### Request

```POST http://localhost:3000/medication/create/
    Add data in JSON Format 
    Example : 
        {
            "name" : "medicationone",
            "code" : "036gu",
            "weight_limit" : "20"
        }
```

## Create a new Thing

### Request

```POST http://localhost:3000/load/medications/
    Add data in JSON Format 
    Example : 
        {
            "drone_serial_no":"SN1",
            "med_code": {
                "0" : "036gu",
                "1" : "037gu"
            }
        }
```

## Checking loaded medication items for a given drone

### Request

`http://localhost:3000/load/medications/:serial_no`

### Response

    Example = 
    [
        {"name":"medicationone","code":"036gu","weight_limit":20},
        {"name":"medicationtwo","code":"037gu","weight_limit":30}
    ]
    
## Checking available drones for loading

### Request

`http://localhost:3000/drones/available-loading`

### Response

    [
        {
            serial_no: 'SN1',
            model: 'Lightweight',
            weight_limit: 20,
            battery_capacity: 100,
            state: 'IDLE'
        },
        {
            serial_no: 'SN2',
            model: 'Lightweight',
            weight_limit: 20,
            battery_capacity: 100,
            state: 'LOADING'
        }
    ]

## Check drone battery level for a given drone

### Request

`http://localhost:3000/drones/battery-capacity/:serial_no`

### Response

    {
        "battery_capacity": 100
    }

