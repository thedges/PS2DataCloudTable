public with sharing class PS2DataCloudTableController {
    public PS2DataCloudTableController() {

    }

    // PS2TransitViolationsDCController.getViolations();
    @AuraEnabled
    public static String getData(String namedCredential, String path, String query)
    {
        String contactId = null;

        User u = [SELECT ContactId FROM User WHERE Id = :UserInfo.getUserId()];
        if (u != null && u.ContactId != null)
        {
            contactId = u.ContactId;
        }

        if (contactId != null) query = query.replace('[[CONTACT_ID]]', contactId);

        System.debug('namedCredential = ' + namedCredential);
        System.debug('path = ' + path);
        System.debug('query = ' + query);

        HttpRequest req = new HttpRequest();
           req.setEndpoint('callout:' + namedCredential + path);
           req.setMethod('POST');
           req.setHeader('Content-Type', 'application/json');
           req.setBody(query);
   
           // Send the request
           Http http = new Http();
           HttpResponse res = http.send(req);
   
           // Process the response
           if (res.getStatusCode() == 201)
           {
               System.debug('UserId = ' + UserInfo.getUserId());
               System.debug('Response: ' + JSON.serializePretty(JSON.deserializeUntyped(res.getBody())));
               return res.getBody();
           } else
           {
               System.debug('Error: ' + res.getStatusCode() + ' ' + res.getStatus());
               return 'Error: ' + res.getStatusCode() + ' ' + res.getStatus();
           }
    }
}