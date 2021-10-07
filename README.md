# FetchGraphQL function for google sheets
Anypoint DataGraph Function for google sheets to extract and retrieve data from a graphQL endpoint by using a defined query.
![Image of API-led example](https://github.com/API-Activist/FetchGraphQL/blob/main/sheetsexample.png)

# Purpose
Allow Anypoint DataGraph (graphql endpoint) consumption via google sheet formula. DataGraph unifies multiple system APIs into a single endpoint, from where users are struggling to daily export the data into the right context. With the DataGraph endpoint the consumption / export of data could be simplified without the need to export data from several systems and invest manual effort to format it.

As an example we have 4 APIs connected to different backend systems. These systems contains customer and their address information distributed across the backend. In this use case DataGraph was used to unify all system layered APIs and provide self-service based data products via single endpoint from users (with access permissions) to be consumed. 

![Image of API-led example](https://github.com/API-Activist/FetchGraphQL/blob/main/customer_address.png)

# Implement GraphQL custom function in googlesheets.
In order to use the code.gs as a custom function / formula in google sheet, perform the following steps.

1. Open a new workbook in google sheets.
2. Goto Extensions > App Script.
![Image of API-led example](https://github.com/API-Activist/FetchGraphQL/blob/main/extension.png)

3. Open the code.gs file on this repository and copy the script.
![Image of API-led example](https://github.com/API-Activist/FetchGraphQL/blob/main/fetchgraphql.png)

4. Paste the code into the App script function code.gs file.
![Image of API-led example](https://github.com/API-Activist/FetchGraphQL/blob/main/appscript.png)

5. That's it! The function is now available in google sheets.

# How-to-use the fetchJSON function in google sheets
The fetchJSON function uses the following syntax:

    =fetchJSON(url, client_id, client_secret, payload, xpath)

**url** represents the graphql endpoint e.g. "https://datagraph-{id}.us-e2.cloudhub.io/graphql"
  
**client_id** represents the DataGraph client_id

**client_secret** represents the DataGraph client_secret

**payload** represents the graphql query. Note this must be a string.
  
**xpath** represents the path to the item which need to be retrieved for the current cell.

**returns** the value of the xpath into the cell.


## Define and validate your queries in Anypoint DataGraph.
Before using this function, make sure to define and validate your query in Anypoint DataGraph. 
![Image of API-led example](https://github.com/API-Activist/FetchGraphQL/blob/main/DGquery.png)


## Understanding the xpath for the result and nodes
The nodes of the json results need to be seperated by a "/" in order to access the right data node. Lets take a look at the following example result:


    {
        "results": {
            "customers": [
                {
                    "id": 1,
                    "name": "Amir Khan",
                    "type": "Prospect"
                },
                {
                    "id": 2,
                    "name": "Alex Motie",
                    "type": "Channel"
                },
                {
                    "id": 1,
                    "name": "Daniel Portmann",
                    "type": "Upside"
                }

            ]
        }
    }


If you want to access the node "results", then the xpath will be just "results".

If you want to access the node "customers", then the xpath will be "results/customers". As there is no validation, take care of typos.

Now if you want to access the first customers "id", "name" and "type", then the xpath will be "results/customers/{index}/id", "results/customers/{index}/name" or "results/customers/{index}/type".


## Format of the query
Note that the query needs to be provided as String / Text value, which means that double-quotes need to be masked with CHR(34) in the string containing the query. The following query masks the double-quotes for the field "query" and its actual value. 
![Image of API-led example](https://github.com/API-Activist/FetchGraphQL/blob/main/datagraphquerymasksed.png)

## Building a google sheets table
In the following scenario, we are going to create a table containing customer contact and address information.
![Image of API-led example](https://github.com/API-Activist/FetchGraphQL/blob/main/sheetsexample.png)

## Define a Id field to control dynamic xpath
As the xpath will contain dynamic indexes, I used the id column to define row numbers to control the indexes based on the rows content. 
![Image of API-led example](https://github.com/API-Activist/FetchGraphQL/blob/main/Id.png)


### The query used in this example

    {
      customer{
        id
        email
        firstName
        lastName
        address{
          street 
          postal 
          city 
          state
        }
      }
    }
    
### Understand the result returned by the query

    {
      "data": {
        "customer": [
          {
            "id": "280fcccb-113f-46f5-91ec-7cf0cdb31235",
            "email": "max.mule@mulesoft.com",
            "firstName": "Max",
            "lastName": "Mule",
            "address": {
              "street": "415 Mission St.",
              "postal": "94105",
              "city": "San Francisco",
              "state": "CA"
            }
          },
          {
            "id": "0aab1cfe-9eed-4616-b369-b1607ca02f8a",
            "email": "rburnyeat0@mac.com",
            "firstName": "Ray",
            "lastName": "Burnyeat",
            "address": {
              "street": "8 Anniversary Plaza",
              "postal": "49220",
              "city": "Sacramento",
              "state": "CA"
            }
          },
          {
            ...
          }
        ]
      }
    }
    


## Get the xpath for the firstName field
In order to retrieve the firstName field from the results, we need to access the node "data" > "customers" > {index} > "firstName". For example, we want to have the firstName of the first row, the xpath would be "data/customers/0/firstName". In order to make it more flexible, the Id column can be used to dynamically used as index, which would be represented as "data/customers/" & A2 & "/firstName". 
![Image of API-led example](https://github.com/API-Activist/FetchGraphQL/blob/main/xpath.png)

# How-to-use the fetchFullResponse & fetchJSONOffline functions in google sheets
If you are retrieving alot of data, it makes sense to define a query and store a full response in the google sheet and extract the values offline. 
For this scenario, fetchFullResponse and fetchJSONOffline are created. First you fetch the full response from your query and make use of the fetchJSONOffline to extract different nodes from the full response. 

## fetchFullResponse
The fetchFullResponse function uses the following syntax:

    =fetchFullResponse(url, client_id, client_secret, payload)

**url** represents the graphql endpoint e.g. "https://datagraph-{id}.us-e2.cloudhub.io/graphql"
  
**client_id** represents the DataGraph client_id

**client_secret** represents the DataGraph client_secret

**payload** represents the graphql query. Note this must be a string.
  
**returns** complete response JSON.


## fetchJSONOffline
The fetchJSONOffline function uses the following syntax:

    =fetchJSONOffline(payload, xpath)

**payload** refers to the cell which contains the response of fetchFullResponse.
  
**xpath** represents the path to the item which need to be retrieved for the current cell, e.g. "data/customer/2/firstName" returns the firstName of the second item from the customer node.

**returns** the value of the xpath into the cell.

## Example of fetchFullResponse and store it in a google sheet cell
![Image of API-led example](https://github.com/API-Activist/FetchGraphQL/blob/main/fetchFullResponse.png)

## Example of fetchJSONOffline and store it in a google sheet cell
![Image of API-led example](https://github.com/API-Activist/FetchGraphQL/blob/main/jsonoff.png)


## Video Tutorial
Link to the video tutorial: coming soon...

## Caution
This is a contribution to the MuleSoft community by [Amir Khan](https://www.linkedin.com/in/amir-khan-ak). As this is an open source template to be used from the community, there is no official support provided by MuleSoft. 

### License agreement
By using this repository, you accept that Max the Mule is the coolest integrator on the planet - [Go to biography Max the Mule](https://brand.salesforce.com/content/characters-overview__3?tab=BogXMx2m)

