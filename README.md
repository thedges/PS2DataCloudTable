# PS2DataCloudTable
THIS SOFTWARE IS COVERED BY [THIS DISCLAIMER](https://raw.githubusercontent.com/thedges/Disclaimer/master/disclaimer.txt).

A configurable LWC to query data cloud info for community/experience site users

# Sample Image
![alt text](https://github.com/thedges/PS2DataCloudTable/blob/main/PS2DataCloudTable.jpg "Sample Photo")

# Configuration Parameters

| Parameter  | Type | Definition |
| ------------- | ------------- |------------- |
| Card Title | Text | A name to be displayed at top of component |
| Icon Name | Text | The SLDS icon name to be displayed at top of component. Refer to following for [SLDS Icons](https://www.lightningdesignsystem.com/icons/) |
| Hide for zero records | Boolean | Hide the component if no records returned |
| Columns JSON Definition | Text | The lightning component columns definition string. Refer to following for [SLDS Icons](https://developer.salesforce.com/docs/component-library/bundle/lightning-datatable/documentation) |
| Data Cloud Query | Text | Data cloud query string |
| Named Credential | Text | The name of the Named Crednential for data cloud connection |
| Query Path | Text | The URL path for the query (default: /services/data/v61.0/ssot/queryv2) |

## Data Cloud Query


## Columns JSON Definition


# Installation Instructions

<b>Here are steps to use this component:</b>
  1. Install the component per the **Deploy to Salesforce** button below
  2. Drop the **PS2DataCloudTable** Lightning Component on to a community/experience site page.
  3. Configure the Lightning Component by setting the component parameters per above details.
  4. Create a Named Credential
  5. Create an External Credential
  6. Create a Permission Set and provide access to the following:
     a. To the Named Credential created above (under 'Named Credentials')
     b. To the External Credential created above (under 'External Credential Principal Access')
     c. Apex class 'PS2DataCloudTable' (under 'Apex Class Access')
  8. Assign your permission set to any users that will access the component
     
<a href="https://githubsfdeploy.herokuapp.com?owner=thedges&repo=PS2DataCloudTable&ref=main">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>


