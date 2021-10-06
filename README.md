# FetchGraphQL function for google sheets
Anypoint DataGraph Function for google sheets

# Purpose
Allow Anypoint DataGraph (graphql endpoint) consumption via google sheet formula. DataGraph unifies multiple system APIs into a single endpoint, from where users are struggling to daily export the data into the right context. With the DataGraph endpoint the consumption / export of data could be simplified without the need to export data from several systems and invest manual effort to format it.

As an example we have 4 APIs connected to different backend systems. These systems contains customer and their address information distributed across the backend. In this use case DataGraph was used to unify all system layered APIs and provide self-service based data products via single endpoint from users (with access permissions) to be consumed. 

![Image of API-led example](https://github.com/API-Activist/FetchGraphQL/blob/main/customer_address.png)

# Implement custom GraphQL custom function in googlesheets.
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

**url** represents the graphql endpoint e.g. "https://datagraph-<id>.us-e2.cloudhub.io/graphql"
  
**client_id** represents the DataGraph client_id
**client_secret** represents the DataGraph client_secret

**payload** represents the graphql query. Note this must be a string.
  
**xpath** represents the path to the item which need to be retrieved for the current cell.
  
