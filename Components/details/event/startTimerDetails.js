Vue.component("start-timer-details", {
    props: {
        timer: {
            type: Timer,
            default: function() {
                return new Timer();
            }
        }
    },
    mixins: [cronHelper],
    computed: {
        period: function() {
            return this.getPeriod(this.timer.cronExpression);
        }
    },
    methods: {
        getDayOfWeekStyle: function(isSelected = false) {
            var elementStyle = {
                "display": "table-cell",
                "text-align": "center",
                "vertical-align": "middle",
                "border-radius": "50%",
                "width": "28px",
                "height": "28px",
                "border": "1px solid #8ECB60"
            };

            if (isSelected) {
                Object.assign(elementStyle, {
                    "background-color": "#8ECB60",
                    "color": "#FFFFFF"
                });
            }
            else {
                Object.assign(elementStyle, {
                    "background-color": "#FFFFFF",
                    "color": "#8ECB60"
                });
            }

            return elementStyle;
        },

        isSingleRun: function() {
            return this.timer.type.value === TimerExpressionTypes.SingleRun.value;
        },
        
        isMinuteHour: function() {
            return this.timer.type.value === TimerExpressionTypes.MinuteHour.value;
        },
        
        isDay: function() {
            return this.timer.type.value === TimerExpressionTypes.Day.value;
        },

        isWeek: function() {
            return this.timer.type.value === TimerExpressionTypes.Week.value;
        },

        isMonth: function() {
            return this.timer.type.value === TimerExpressionTypes.Month.value;
        },

        isYear: function() {
            return this.timer.type.value === TimerExpressionTypes.Year.value;
        },

        isDayOfMonthPeriod: function() {
            return this.period.timeUnit.value === TimeUnit.Month.value &&
                !this.isWorkingDayPeriod();
        },

        isDayOfWeekPeriod: function() {
            return this.period.timeUnit.value === TimeUnit.DayOfWeek.value;
        },

        isWorkingDayPeriod: function() {
            return this.period.timeUnit.value === TimeUnit.Month.value &&
                (
                    this.period.dayOfMonth.includes(DayOfMonthType.LastDay.value) ||
                    this.period.dayOfMonth.includes(DayOfMonthType.WorkingDay.value)
                );
        },

        getFormattedDate: function(dateTime) {
            return dateTime.toLocaleDateString();
        },

        getFormattedTime: function(dateTime) {
            return dateTime.toLocaleTimeString().match(/\d*:\d*/)[0]
        },

        getSelectedDaysOfWeekPeriod: function() {
            var selectedDayOfWeeks = this.period.dayOfWeek
                .split(",")
                .map(dayOfWeekValue => {
                    return this._getConstantByValue(DayOfWeek, Number(dayOfWeekValue));
                });
            var allDayOfWeeks = Object.entries(DayOfWeek)
                .map(dayOfWeek => {
                    return dayOfWeek[1];
                });
            
            return allDayOfWeeks
                .map(dayOfWeek => {
                    var isSelected = selectedDayOfWeeks.includes(dayOfWeek);

                    return Object.assign(dayOfWeek, {
                        isSelected: isSelected
                    });
                });
        },

        getDayOfWeekPeriod: function() {
            var dayOfWeek = this.period.dayOfWeek.split("#");
            if (dayOfWeek.length !== 2) {
                return;
            }

            return this._getConstantByValue(DayOfWeek, Number(dayOfWeek[0]));
        },

        getAccountDayOfWeekPeriod: function() {
            var dayOfWeek = this.period.dayOfWeek.split("#");
            if (dayOfWeek.length !== 2) {
                return;
            }

            switch(Number(dayOfWeek[1])) {
                case 1:
                    return "Первый";

                case 2:
                    return "Второй";

                case 3:
                    return "Третий";

                case 4:
                    return "Четвертый";

                default:
                    return "Последний";
            }
        },

        getAccountDayOfMonthPeriod: function() {
            if (this.period.dayOfMonth.includes(DayOfMonthType.LastDay.value)) {
                return DayOfMonthType.LastDay.displayValue;
            }

            return "Первый";
        },

        getDayOfMonthTypePeriod: function() {
            if (this.period.dayOfMonth.includes(DayOfMonthType.WorkingDay.value)) {
                return DayOfMonthType.WorkingDay.displayValue;
            }

            return "День";
        },

        getMonthCaptionPeriod: function() {
            return this._getConstantByValue(Month, Number(this.period.month)).displayValue;
        },


    },
    template: `
        <div class="start-timer-details">
        
            <label>Периодичность запуска процесса</label></br>
            <label>{{ this.timer.type.displayValue }}</label></br></br>

            <div v-if="isSingleRun()">
            
                <label>Дата и время запуска</label></br>
                <label>{{ getFormattedDate(timer.startDateTime) }}</label> <label>{{ getFormattedTime(timer.startDateTime) }}</label></br></br>

            </div>
            <div v-else-if="isMinuteHour()">

                <label>Запускать каждые</label></br>
                <label>{{ period.period }}</label> <label>{{ period.timeUnit.displayValue }}</label></br>
                <label>с {{ getHourInfo(timer.cronExpression).startRange }}:00</label>   <label>до {{ getHourInfo(timer.cronExpression).endRange }}:00</label></br></br>

                <label>Период действия таймера</label></br>
                <input type="checkbox" v-model="timer.hasStartDate()"><label>Дата и время начала</label></br>
                <div v-if="timer.hasStartDate()">
                    <label>{{ getFormattedDate(timer.startDateTime) }}</label> <label>{{ getFormattedTime(timer.startDateTime) }}</label></br>
                </div>
                <input type="checkbox" v-model="timer.hasEndDate()"><label>Дата и время завершения</label></br>
                <div v-if="timer.hasEndDate()">
                    <label>{{ getFormattedDate(timer.endDateTime) }}</label> <label>{{ getFormattedTime(timer.endDateTime) }}</label></br>
                </div>
                </br>

            </div>
            <div v-else-if="isDay()">

                <label>Запускать каждые</label></br>
                <label>{{ period.period }} день в</label> <label>{{ period.hour }}:{{ period.minute }}</label></br></br>
                
                <label>Период действия таймера</label></br>
                <input type="checkbox" v-model="timer.hasStartDate()"><label>Дата и время начала</label></br>
                <div v-if="timer.hasStartDate()">
                    <label>{{ getFormattedDate(timer.startDateTime) }}</label> <label>{{ getFormattedTime(timer.startDateTime) }}</label></br>
                </div>
                <input type="checkbox" v-model="timer.hasEndDate()"><label>Дата и время завершения</label></br>
                <div v-if="timer.hasEndDate()">
                    <label>{{ getFormattedDate(timer.endDateTime) }}</label> <label>{{ getFormattedTime(timer.endDateTime) }}</label></br>
                </div>
                </br>

            </div>
            <div v-else-if="isWeek()">

                <label>Время запуска процесса</label></br>
                <label>{{ period.hour }}:{{ period.minute }}</label></br></br>

                <label>В какие дни недели запускать?</label></br>
                <ul class="day-of-weeks-list">
                    <li v-for="dayOfWeek in getSelectedDaysOfWeekPeriod()">
                        <div :style="getDayOfWeekStyle(dayOfWeek.isSelected)">{{ dayOfWeek.abbreviation }}</div>
                    </li>
                </ul>
                </br>

                <label>Период действия таймера</label></br>
                <input type="checkbox" v-model="timer.hasStartDate()"><label>Дата и время начала</label></br>
                <div v-if="timer.hasStartDate()">
                    <label>{{ getFormattedDate(timer.startDateTime) }}</label> <label>{{ getFormattedTime(timer.startDateTime) }}</label></br>
                </div>
                <input type="checkbox" v-model="timer.hasEndDate()"><label>Дата и время завершения</label></br>
                <div v-if="timer.hasEndDate()">
                    <label>{{ getFormattedDate(timer.endDateTime) }}</label> <label>{{ getFormattedTime(timer.endDateTime) }}</label></br>
                </div>
                </br>

            </div>
            <div v-else-if="isMonth()">

                <label>Запускать каждый</label></br>
                <label>{{ period.period }} месяц</label></br></br>
                
                <label>День запуска</label></br>
                <input type="radio" name="dayPeriod" :checked="isDayOfMonthPeriod()"><label>День месяца</label></br>
                <label v-if="isDayOfMonthPeriod()">{{ period.dayOfMonth }} </br></label>
                <input type="radio" name="dayPeriod" :checked="isDayOfWeekPeriod()"><label>День недели</label></br>
                <label v-if="isDayOfWeekPeriod()">{{ getAccountDayOfWeekPeriod() }} {{ getDayOfWeekPeriod().displayValue }} </br></label>
                <input type="radio" name="dayPeriod" :checked="isWorkingDayPeriod()"><label>Первый/последний рабочий день</label></br>
                <label v-if="isWorkingDayPeriod()">{{ getAccountDayOfMonthPeriod() }} {{ getDayOfMonthTypePeriod() }} </br></label>
                </br>

                <label>Время запуска процесса</label></br>
                <label>{{ period.hour }}:{{ period.minute }}</label></br></br>

                <label>Период действия таймера</label></br>
                <input type="checkbox" v-model="timer.hasStartDate()"><label>Дата и время начала</label></br>
                <div v-if="timer.hasStartDate()">
                    <label>{{ getFormattedDate(timer.startDateTime) }}</label> <label>{{ getFormattedTime(timer.startDateTime) }}</label></br>
                </div>
                <input type="checkbox" v-model="timer.hasEndDate()"><label>Дата и время завершения</label></br>
                <div v-if="timer.hasEndDate()">
                    <label>{{ getFormattedDate(timer.endDateTime) }}</label> <label>{{ getFormattedTime(timer.endDateTime) }}</label></br>
                </div>
                </br>

            </div>
            <div v-else-if="isYear()">

                <label>День запуска</label></br>
                <div v-if="isDayOfWeekPeriod()">
                    <label>{{ getAccountDayOfWeekPeriod() }} {{ getDayOfWeekPeriod().abbreviation }}  {{ getMonthCaptionPeriod() }}</label></br>
                </div>
                <div v-else>
                    <label>{{ period.dayOfMonth }}    день    {{ getMonthCaptionPeriod() }}</label></br>
                </div>
                </br>

                <label>Время запуска процесса</label></br>
                <label>{{ period.hour }}:{{ period.minute }}</label></br></br>

                <label>Период действия таймера</label></br>
                <input type="checkbox" v-model="timer.hasStartDate()"><label>Дата и время начала</label></br>
                <div v-if="timer.hasStartDate()">
                    <label>{{ getFormattedDate(timer.startDateTime) }}</label> <label>{{ getFormattedTime(timer.startDateTime) }}</label></br>
                </div>
                <input type="checkbox" v-model="timer.hasEndDate()"><label>Дата и время завершения</label></br>
                <div v-if="timer.hasEndDate()">
                    <label>{{ getFormattedDate(timer.endDateTime) }}</label> <label>{{ getFormattedTime(timer.endDateTime) }}</label></br>
                </div>
                </br>

            </div>
            <div v-else>

                <label>Cron-выражение</label></br>
                <label>{{ timer.cronExpression }}</label></br></br>

                <label>Период действия таймера</label></br>
                <input type="checkbox" v-model="timer.hasStartDate()"><label>Дата и время начала</label></br>
                <div v-if="timer.hasStartDate()">
                    <label>{{ getFormattedDate(timer.startDateTime) }}</label> <label>{{ getFormattedTime(timer.startDateTime) }}</label></br>
                </div>
                <input type="checkbox" v-model="timer.hasEndDate()"><label>Дата и время завершения</label></br>
                <div v-if="timer.hasEndDate()">
                    <label>{{ getFormattedDate(timer.endDateTime) }}</label> <label>{{ getFormattedTime(timer.endDateTime) }}</label></br>
                </div>
                </br>

            </div>

            <label>Дополнительные настройки</label></br>
            <input type="checkbox" v-model="!timer.isIgnoreMisfires" required><label>Повторять при пропуске</label></br></br>
            
            <label>Часовой пояс</label></br>
            <label>{{ timer.timeZoneOffset }}</label>

        </div>`
});