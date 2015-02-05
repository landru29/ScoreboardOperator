/*global angular */
angular.module('Scoreboard').provider('Chronometer', ['TriggerProvider', function (TriggerProvider) {

    var Chronometer = function (data) {
        this.direction = false;
        this.lower = new Date(Date.UTC(1901, 1, 1, 0, 0, 0, 0));
        this.upper = null;
        this.interval = 100;
        TriggerProvider.Trigger.call(this, data);
    };

    Chronometer.prototype = Object.create(TriggerProvider.Trigger.prototype);
    Chronometer.prototype.constructor = Chronometer;

    /**
     * Set the direction of the chronometer
     * @param Integer dir 1 or -1
     */
    Chronometer.prototype.setDirection = function (dir) {
        this.direction = (dir < 0);
    };

    /**
     * Get the direction of the chronometer
     * @returns Integer 1 or -1
     */
    Chronometer.prototype.getDirection = function () {
        return (this.direction ? -1 : 1);
    };

    /**
     * One step progression
     */
    Chronometer.prototype.$step = function () {
        this.current = new Date(this.current.getTime() + this.interval * this.getDirection());
        if ((this.upper) && (this.current.toTimeString() === this.upper.toTimeString())) {
            this.$triggerEvent('upper-reached');
        }
        if (this.current.toTimeString() === this.lower.toTimeString()) {
            this.$triggerEvent('lower-reached');
        }
    };

    Chronometer.prototype.$reset = function () {
        if ((this.direction < 0) && (this.upper)) {
            this.current = this.upper;
        } else {
            this.current = this.lower;
        }
    };

    /**
     * Reset the chronometer
     */
    Chronometer.prototype.reset = function () {
        this.$reset();
        this.$triggerEvent('reset');
    };

    /**
     * Start the chronometer
     */
    Chronometer.start = function () {
        this.$start();
        this.$triggerEvent('start');
    };

    /**
     * Stop the chronometer
     */
    Chronometer.stop = function () {
        this.$stop();
        this.$triggerEvent('stop');
    };

    /**
     * List of available events
     */
    Chronometer.prototype.events = function () {
        return [
            'upper-reached',
            'lower-reached',
            'reset',
            'stop',
            'start'
        ];
    };

    /**
     * List of reachable actions
     */
    Chronometer.prototype.actions = function () {
        var _self = this;
        return {
            start: function () {
                _self.$start();
            },
            stop: function () {
                _self.$stop();
            },
            reset: function () {
                _self.$reset();
            },
            resetAndStart: function () {
                _self.$reset();
                _self.$start();
            },
            stopAndReset: function () {
                _self.stop();
                _self.$reset();
            }
        };
    };

    this.$get = ['$interval', function ($interval) {
        Chronometer.prototype.$start = function () {
            if ('undefined' === typeof this.current) {
                this.$reset();
            }
            if (!this.timer) {
                var _self = this;
                this.timer = $interval(function () {
                    _self.$step();
                }, this.interval);
            }
        };

        Chronometer.prototype.$stop = function () {
            if ('undefined' !== this.timer) {
                $interval.cancel(this.timer);
                this.timer = undefined;
            }
        };

        return Chronometer;
    }];
}]);