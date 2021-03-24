({
    goToLink : function(component, event, helper) {
        let myLink = component.get("v.link");

        var urlEvent = $A.get("e.force:navigateToURL");
        console.log('url: ' + myLink);
        urlEvent.setParams({"url": myLink});
        urlEvent.fire();
    },
    doInit : function(component, event, helper){
        console.log('Initialization');
        helper.setOverrides(component);
        helper.setButtonStatus(component);
        helper.formatDate(component);
        helper.setDateText(component);
        helper.setButtonClass(component);
        helper.setButtonDisabled(component);

    }
})
