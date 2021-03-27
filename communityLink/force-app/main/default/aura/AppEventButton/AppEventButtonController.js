({
    goToLink : function(component, event, helper) {

        let myLink = component.get("v.link");


        var urlEvent = $A.get("e.force:navigateToURL");
        console.log('url: ' + myLink);
        urlEvent.setParams({"url": myLink});
        urlEvent.fire();
    },
    clickButton: function(component, event, helper){
        let myLink = component.get("v.overrideLink");
        console.log('myLink: ' + myLink);
        if (myLink != ""){
            console.log('myLink != null');
            var urlEvent = $A.get("e.force:navigateToURL");
            urlEvent.setParams({"url": myLink});
            urlEvent.fire();

        } else {
            var flow = component.find("flowData");
            var inputVariables = [
                {
                    name : "Program",
                    type : "String",
                    value : component.get("v.intendedProgram")
            }
            ];
            console.log('input variables: '+inputVariables);
            flow.startFlow("G_CreateApplicationEasy", inputVariables);
            console.log('Done with Flow');
        }

    },
    doInit : function(component, event, helper){
        helper.setOverrides(component);
        helper.setButtonStatus(component);
        helper.formatDate(component);
        helper.setDateText(component);
        helper.setButtonClass(component);
        helper.setButtonDisabled(component);

    },

    handleStatusChange : function (component, event, helper) {
        console.log('handleStatusChange - Status: ' + event.getParam("status"));
        if(event.getParam("status") === "FINISHED_SCREEN") {
           // Get the output variables and iterate over them
            var outputVariables = event.getParam("outputVariables");
            var applicationID;
            var newLink;

            applicationID = outputVariables[0].value;

            newLink = 'https://partialsb-uwfoster.cs16.force.com/UndergradMain/s/applicationlink?appId=' + applicationID;

            //component.set("v.link", newLink);
            //this.goToLink(this.component, this.event, this.helper);
            var urlEvent = $A.get("e.force:navigateToURL");

            urlEvent.setParams({"url": newLink});
            urlEvent.fire();
    

        }
     },
})
