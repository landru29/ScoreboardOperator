/*global angular */
angular.module('Scoreboard').provider('Trigger', [function () {

    var Trigger = function (data) {
        this.name = null;
        this.uuid = new Date().getTime().toString(16).toUpperCase();
        this.triggers = [];
        if (Object.prototype.toString.call(data) === '[object Object]') {
            for (var i in data) {
                this[i] = data[i];
            }
        }
    };

    /**
     * Trigger event by name
     * @param String name Name of the event
     */
    Trigger.prototype.$triggerEvent = function (name) {
        for (var i in this.triggers) {
            if (this.triggers[i].event === name) {
                var targetObject = this.$getTriggerFromCollection(this.triggers[i].callback);
                if (targetObject) {
                    targetObject.actions[this.triggers[i].callback.action](this);
                }
            }
        }
    };

    Trigger.prototype.$getTriggerFromCollection = function (name) {
        var explosion = name.match(/(\w*)\.(\w*)/);
        for (var i in this.$triggerCollection[explosion[1]]) {
            if (this.$triggerCollection[objType][i].uuid === explosion[2]) {
                return this.$triggerCollection[objType][i];
            }
        }
    };

    /**
     * List of available events
     */
    Trigger.prototype.events = [
    ];

    /**
     * List of reachable actions
     */
    Trigger.prototype.actions = {};

    /**
     * Set the collection of reachable objet in trigger actions
     * @param Object collection {type1: [obj1, obj2], type2: [obj1, obj2]}
     * @param String name [not mendatory] if specified previous parameter will be an array
     */
    Trigger.prototype.setAvailableTriggers = function (collection, name) {
        if (!Trigger.prototype.$triggerCollection) {
            Trigger.prototype.$triggerCollection = {};
        }
        if (name) {
            Trigger.prototype.$triggerCollection[name] = collection;
        } else {
            Trigger.prototype.$triggerCollection = collection;
        }
    };

    Trigger.prototype.getAvailableTriggers = function () {
        var result = [];
        for (var triggerType in this.$triggerCollection) {
            for (var i in this.$triggerCollection[triggerType]) {
                for (var actionName in this.$triggerCollection[triggerType][i].actions()) {
                    result.push({
                        caption: this.$triggerCollection[triggerType][i].name + '->' + actionName,
                        value: this.$triggerCollection[triggerType][i].uuid + '.' + actionName
                    });
                }
            }
        }
        return result;
    };

    Trigger.prototype.getNameById = function (uuid) {
        for (var triggerType in this.$triggerCollection) {
            for (var i in this.$triggerCollection[triggerType]) {
                if (this.$triggerCollection[triggerType][i].uuid === uuid) {
                    return this.$triggerCollection[triggerType][i].name;
                }
            }
        }
    };


    this.Trigger = Trigger;

    this.$get = [function () {
        return Trigger;
    }];
}]);