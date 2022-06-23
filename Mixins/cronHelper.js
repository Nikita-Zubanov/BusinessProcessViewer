var cronHelper = {
    methods: {
        getPeriod: function(cronExpression) {
            var periodInfo = {
                period: Number(),
                timeUnit: null,
                second: "",
                minute: "",
                hour: "",
                dayOfMonth: "",
                month: "",
                dayOfWeek: "",
                year: "",
            };

            var findedEx = cronExpression
                .split(" ")
                .find((cronSubExpression, index) => {
                    if (cronSubExpression.indexOf("/") !== -1 ||
                            cronSubExpression.indexOf("#") !== -1) {
                        var timeUnit = this._getConstantByValue(TimeUnit, index);

                        if (timeUnit.value == null) {
                            return;
                        }

                        var cronInfo = this._getCronInfo(cronExpression, timeUnit);
                        periodInfo.period = cronInfo.period;
                        periodInfo.timeUnit = cronInfo.timeUnit;

                        return cronSubExpression;
                    }
                });
            if (findedEx == null) {
                cronExpression
                    .split(" ")
                    .find((cronSubExpression, index) => {
                        if (cronSubExpression === "*") {
                            var timeUnit = this._getConstantByValue(TimeUnit, index);

                            if (timeUnit.value == null) {
                                return;
                            }

                            var cronInfo = this._getCronInfo(cronExpression, timeUnit);
                            periodInfo.period = cronInfo.period;
                            periodInfo.timeUnit = cronInfo.timeUnit;

                            return cronSubExpression;
                        }
                    });
            }

            periodInfo.second = this._makeNumberWithZero(this.getSecondInfo(cronExpression).value);
            periodInfo.minute = this._makeNumberWithZero(this.getMinuteInfo(cronExpression).value);
            periodInfo.hour = this._makeNumberWithZero(this.getHourInfo(cronExpression).value);
            periodInfo.dayOfMonth = this.getDayOfMonthInfo(cronExpression).value;
            periodInfo.month = this.getMonthInfo(cronExpression).value;
            periodInfo.dayOfWeek = this.getDayOfWeekInfo(cronExpression).value;
            periodInfo.year = this.getYearInfo(cronExpression).value;


            
            return periodInfo;
        },

        getSecondInfo: function(cronExpression) {
            return this._getCronInfo(cronExpression, TimeUnit.Second);
        },

        getMinuteInfo: function(cronExpression) {
            return this._getCronInfo(cronExpression, TimeUnit.Minute);
        },
        
        getHourInfo: function(cronExpression) {
            return this._getCronInfo(cronExpression, TimeUnit.Hour);
        },
        
        getDayOfMonthInfo: function(cronExpression) {
            return this._getCronInfo(cronExpression, TimeUnit.DayOfMonth);
        },
        
        getMonthInfo: function(cronExpression) {
            return this._getCronInfo(cronExpression, TimeUnit.Month);
        },
        
        getDayOfWeekInfo: function(cronExpression) {
            return this._getCronInfo(cronExpression, TimeUnit.DayOfWeek);
        },
        
        getYearInfo: function(cronExpression) {
            return this._getCronInfo(cronExpression, TimeUnit.Year);
        },

        _getCronInfo: function(cronExpression, timeUnit) {
            // Примеры cron-выражений:
            // 0 0 1-23/23 * * ? *
            // 0 */23 1-23 * * ? *
            var result = {
                startRange: Number(),
                endRange: Number(),
                value: "",
                period: Number(),
                timeUnit: timeUnit
            };

            var cronSubExpression = cronExpression.split(" ")[timeUnit.value];

            var hasRange = cronSubExpression.indexOf("-") !== -1;
            if (hasRange) {
                var rangeWithDash = cronSubExpression.match(/\d*-\d*/);

                if (rangeWithDash != null) {
                    var range = rangeWithDash[0].split("-")

                    result.startRange = Number(range[0]);
                    result.endRange = Number(range[1]);
                }
            }
            else {
                result.value = cronSubExpression;
            }

            var isPeriodically = cronSubExpression.indexOf("/") !== -1 ||
                cronSubExpression.indexOf("#") !== -1 ||
                cronSubExpression === "*";
            if (isPeriodically) {
                var periodWithSlash = cronSubExpression.match(/[/]\d*/);
                var periodWithNumberSign = cronSubExpression.match(/[#]\d*/);

                if (periodWithSlash != null) {
                    result.period = Number(periodWithSlash[0].substring(1));
                }
                else if (periodWithNumberSign != null) {
                    result.period = Number(periodWithNumberSign[0].substring(1));
                }
                else if (cronSubExpression === "*") {
                    result.period = 1;
                }
            }

            return result;
        },

        _getConstantByValue(constantType, value) {
            var findedConstant = Object.entries(constantType)
                .find(v => {
                    var constant = v[1];
                    if (constant == null || constant.value == null) {
                        return null;
                    }

                    return constant.value === value;
                });
            
            if (findedConstant == null) {
                return {value: null, displayValue: "[значение не найдено]"};
            }

            return findedConstant[1];
        },

        _makeNumberWithZero: function(value) {
            var number = Number.parseInt(value);

            if (isNaN(number)) {
                return value;
            }

            var numberString = number.toString();
            switch(numberString.length) {
                case 0:
                    return "00";

                case 1:
                    return `0${numberString}`;

                default:
                    return numberString;
            }
        }
    }
};