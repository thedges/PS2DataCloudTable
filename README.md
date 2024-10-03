# PS2DataCloudTable
THIS SOFTWARE IS COVERED BY [THIS DISCLAIMER](https://raw.githubusercontent.com/thedges/Disclaimer/master/disclaimer.txt).

[WORK IN PROCESS] A configurable LWC to query data cloud info for community/experience site users

# Sample Image
![alt text](https://github.com/thedges/PS2DataCloudTable/blob/main/PS2DataCloudTable.jpg "Sample Photo")

# Configuration Parameters

| Parameter  | Type | Definition |
| ------------- | ------------- |------------- |
| Card Title | Text | A name to be displayed at top of component |
| Icon Name | Text | The SLDS icon name to be displayed at top of component. Refer to [SLDS Icons](https://www.lightningdesignsystem.com/icons/) |
| Hide for zero records | Boolean | Hide the component if no records returned |
| Columns JSON Definition | Text | The lightning component columns definition string. Refer to [lightning-datatable documentation](https://developer.salesforce.com/docs/component-library/bundle/lightning-datatable/documentation) |
| Data Cloud Query | Text | Data cloud query string |
| Named Credential | Text | The name of the Named Crednential for data cloud connection |
| Query Path | Text | The URL path for the query (default: /services/data/v61.0/ssot/queryv2) |

## Data Cloud Query
First, use the ??? to design your SQL query to return the data you need from Data Cloud. Then create a JSON object like the following to wrap your SQL query. Copy and paste this in the 'Data Cloud Query' configuration parameter. The following is example:
```
{"sql": "SELECT customer_id__c, DataSource__c, DataSourceObject__c, date_created__c, date_modified__c, InternalOrganization__c, status__c, subject__c, workorder_id__c 
           FROM PublicWorks_Work_Orders__dlm
          WHERE customer_id__c in (SELECT SourceRecordId__c from UnifiedLinkssotIndividualCcid__dlm WHERE ssot__DataSourceObjectId__c = 'HerokuPostgres_JH_Heroku_Postgres_dfd_customer_publicworks'
            and UnifiedRecordId__c IN (SELECT UnifiedRecordId__c FROM UnifiedLinkssotIndividualCcid__dlm WHERE SourceRecordId__c = '[[CONTACT_ID]]'))"
}
```

## Columns JSON Definition
For the LWC table component to work, create a [lightning-datatable](https://developer.salesforce.com/docs/component-library/bundle/lightning-datatable/documentation) column definition JSON string per the documentation. A Platform Blackbelt will probably be needed to help out here. This JSON structure defines the fields you want to pull out of the SQL query and what format they should have in the lightning datatable. For the LWC component to work, all fields in the JSON structure MUST have double-quotes around them. 
```
[
   {
      "label":"Subject",
      "fieldName":"subject__c",
      "sortable":"true",
      "cellAttributes":{
         "class":"col-header"
      }
   },
   {
      "label":"Status",
      "fieldName":"status__c",
      "sortable":"true"
   },
   {
      "label":"Work Order ID",
      "fieldName":"workorder_id__c",
      "sortable":"true"
   },
   {
      "label":"Date Modified",
      "fieldName":"date_modified__c",
      "type":"date",
      "sortable":"true",
      "Attributes":{
         "year":"numeric",
         "month":"long",
         "day":"2-digit",
         "hour":"2-digit",
         "minute":"2-digit",
         "second":"2-digit"
      }
   }
]
```

# Installation Instructions

<b>Here are steps to use this component:</b>
  1. Install the component per the **Deploy to Salesforce** button below
  2. Setup a Named Credential connection to Data Cloud following [this guide](https://salesforce.quip.com/tIRvA1yJ8l84) (only accessible by Salesforce)
  3. Drop the **PS2DataCloudTable** Lightning Component on to a community/experience site page.
  4. Configure the Lightning Component by setting the component parameters per above details. Key items to provide:
     * Card Title
     * Card Icon
     * Data Cloud Query
     * JSON Column Definition
     * Named Credential name
  7. Create a Permission Set and provide access to the following:
     * To the Named Credential created above (under 'Named Credentials')
     * To the External Credential created above (under 'External Credential Principal Access')
     * Apex class 'PS2DataCloudTable' (under 'Apex Class Access')
  8. Assign your permission set to any users that will access the component
     
<a href="https://githubsfdeploy.herokuapp.com?owner=thedges&repo=PS2DataCloudTable&ref=main">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>


