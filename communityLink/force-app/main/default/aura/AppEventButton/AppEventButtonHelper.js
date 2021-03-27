({ 
    setOverrides : function(component) {
        let overrideButtonTitle = component.get("v.overrideButtonTitle");
        let overrideLink = component.get("v.overrideLink");
        let overrideOpenDate = component.get("v.overrideOpenDate");
        let overrideCloseDate = component.get("v.overrideCloseDate");

        if (overrideButtonTitle != null){
            component.set("v.buttonTitle",overrideButtonTitle);
        }
        if (overrideLink != null){
            component.set("v.link",overrideLink);
            console.log('link set: ' + component.get("v.link"));
        }
        if (overrideOpenDate != null){

            let openMonth = overrideOpenDate.split("/")[0] - 1;
            let openDay = overrideOpenDate.split("/")[1];
            let openYear = overrideOpenDate.split("/")[2];
            
            var d1 = new Date();
            d1.setFullYear(openYear,openMonth,openDay);
            
            component.set("v.openDate",d1);
        }
        if (overrideCloseDate != null){
            let closeMonth = overrideCloseDate.split("/")[0] - 1;
            let closeDay = overrideCloseDate.split("/")[1];
            let closeYear = overrideCloseDate.split("/")[2];
            
            var d2 = new Date();
            d2.setFullYear(closeYear,closeMonth,closeDay);
            
            component.set("v.closeDate",d2);

        }
        
    },
    setButtonStatus :function(component){
        let openDate = component.get("v.openDate");
        let closeDate = component.get("v.closeDate");
        var todaysDate = new Date();
        console.log('open Date: '+ openDate);
        console.log('close Date: '+ closeDate);
        if ( isNaN(openDate) || isNaN(closeDate)){
            component.set("v.buttonStatus","Open");
        } else if (todaysDate < openDate ){
            component.set("v.buttonStatus","Not Open");       
        } else if (todaysDate <= closeDate){
            component.set("v.buttonStatus","Open");
        } else {
            component.set("v.buttonStatus","Closed");
        }

    },
    setDateText : function(component) {
        let myStatus = component.get("v.buttonStatus");
        let closeDate = component.get("v.closeDate");
        var myText;

        if(isNaN(closeDate)){
            myText="";
            component.set("v.renderDateText",false);
        }else if (myStatus == 'Open') {
            myText = "--Now Open--";
            
        }else if (myStatus == 'Not Open'){
            let formatText = component.get("v.dateFormat");
            myText = "Opening " + formatText;
            
        }else if (myStatus == 'Closed'){
            myText = "Application Period Closed";
        }
        component.set("v.dateText", myText);
    },
    setButtonClass : function(component) {
        let myStatus = component.get("v.buttonStatus");
        var buttonClass;
        var buttonDisabled;

        if (myStatus == 'Open') {
            buttonClass = "openButton";
            buttonDisabled = false;
        }else if (myStatus == 'Not Open'){
            buttonClass = "closedButton";
            buttonDisabled = true;
        }else if (myStatus == 'Closed'){
            buttonClass = "closedButton";
            buttonDisabled = true;
        }
        component.set("v.buttonClass", "myButton " + buttonClass);
        component.set("v.buttonDisabled", buttonDisabled)
    },

    formatDate :function(component){
        let myDate = component.get("v.openDate")
        var resultText;

        switch(myDate.getMonth()+1){
            case 1: 
                resultText = "Jan";
                break;
            case 2: 
                resultText = "Feb";
                break;
            case 3: 
                resultText = "Mar";
                break;
            case 4:  
                resultText = "Apr";
                break;
            case 5: 
                resultText = "May";
                break;
            case 6: 
                resultText = "Jun";
                break;
            case 7: 
                resultText = "Jul";
                break;
            case 8: 
                resultText = "Aug";
                break;
            case 9: 
                resultText = "Sep";
                break;
            case 10: 
                resultText = "Ovt";
                break;
            case 11: 
                resultText = "Nov";
                break;
            case 12: 
                resultText = "Dec";
            
        }

        resultText = resultText + " " + myDate.getDate() + ", " + myDate.getFullYear();
        component.set("v.dateFormat", resultText);
    }
})

