import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getData from '@salesforce/apex/PS2DataCloudTableController.getData';

export default class Ps2DataCloudTable extends LightningElement {
    prefix = 'PS2DataCloudTable::';

    @api title = null;
    @api iconName = null;
    @api hideForNoRecs = false;
    @api rowCount = 0;

    @api columns = null;
    @api query = null;
    @api namedCredential = null;
    @api path = null;

    content;
    data = [];
    tempData;


    isLoading = true;
    sortBy;
    sortDirection;

    @api
    get titleString() {
        return this.title + ' (' + this.rowCount + ')';
    }

    @api
    get columnsDef() {
        console.log(this.prefix + 'columnsDef=' + this.columns);
        console.log(this.prefix + 'columnsDef2=' + JSON.parse(this.columns));
        return JSON.parse(this.columns);
    }

    @api
    get hide() {
        if (this.hideForNoRecs == true && this.rowCount == 0) {
            return true;
        } else {
            return false;
        }
    }

    connectedCallback() {
        this.loadData();
    }

    loadData() {
        var fieldMap = {};

        this.data = [];
        this.isLoading = true;
        this.rowCount = 0;

        if (this.query == null || this.namedCredential == null || this.path == null || this.columns == null)
        {
            this.handleError(this.prefix + 'This is a mess');
        }

        console.log(this.prefix + 'columns=' + this.columns);
        console.log(this.prefix + 'query=' + this.query);

        getData({namedCredential: this.namedCredential, path: this.path, query: this.query})
            .then(result => {
                console.log(this.prefix + 'content=' + result);

                this.isLoading = false;

                if (result != null)
                {
                this.content = JSON.parse(result);

                this.rowCount = this.content.rowCount;

                
                ////////////////////////////////////
                // create a map of all the fields //
                ////////////////////////////////////
                Object.keys(this.content.metadata).forEach(key => {
                    const value = this.content.metadata[key];
                    console.log(`Key: ${key}, Value: ${value}`);

                    var temp = {};
                    temp['fieldName'] = key;
                    temp['type'] = value['type'];
                    temp['typeCode'] = value['typeCode'];

                    fieldMap[value.placeInOrder] = temp;
                });

                console.log(this.prefix + 'fieldMap = ' + JSON.stringify(fieldMap));

                //////////////////////
                // create data list //
                //////////////////////
                var tempData = [];
                for (let i = 0; i < this.content.data.length; i++) {
                    console.log(JSON.stringify(this.content.data[i]));


                    var tempEntry = {};
                    for (let j = 0; j < this.content.data[i].length; j++) {
                        if (fieldMap[j].type == 'TIMESTAMP WITH TIME ZONE') {
                            console.log(this.prefix + 'value=' + this.content.data[i][j]);
                            var dttm = new Date(this.content.data[i][j]);
                            console.log(this.prefix + 'dttm=' + dttm.toLocaleString());
                            tempEntry[fieldMap[j].fieldName] = this.content.data[i][j];
                        }
                        else {
                            tempEntry[fieldMap[j].fieldName] = this.content.data[i][j];
                        }
                    }
                    tempData.push(tempEntry);

                }

                console.log(this.prefix + 'tempList = ' + JSON.stringify(tempData));
                this.data = tempData;

                if (this.sortBy != null && this.sortDirection != null) {
                    this.sortData(this.sortBy, this.sortDirection);
                }
            }

            })
            .catch(error => {
                this.handleError(error);
            });
    }

    doSorting(event) {
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        this.sortData(this.sortBy, this.sortDirection);
    }

    sortData(fieldname, direction) {
        let parseData = JSON.parse(JSON.stringify(this.data));
        // Return the value stored in the field
        let keyValue = (a) => {
            return a[fieldname];
        };
        // cheking reverse direction
        let isReverse = direction === 'asc' ? 1 : -1;
        // sorting data
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; // handling null values
            y = keyValue(y) ? keyValue(y) : '';
            // sorting values based on direction
            return isReverse * ((x > y) - (y > x));
        });
        this.data = parseData;
    }

    handleRefresh(evt) {
        console.log('handleRefresh');
        this.loadData();
    }

    handleError(err) {
        console.log(this.prefix + 'error=' + err);
        console.log(this.prefix + 'type=' + typeof err);

        this.isLoading = false;

        const event = new ShowToastEvent({
            title: err.statusText,
            message: err.body.message,
            variant: 'error',
            mode: 'sticky',
        });
        this.dispatchEvent(event);
    }
}