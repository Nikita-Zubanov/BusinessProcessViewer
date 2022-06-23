const LogicalOperation = {
    And: {value: 0, displayValue: "И"},
    Or: {value: 1, displayValue: "ИЛИ"},
};

const FilterType = {
    None: 0,
    Compare: 1,
    IsNull: 2,
    Between: 3,
    In: 4,
    Exists: 5,
    FilterGroup: 6
};

const FunctionType = {
    None: 0,
    Macros: 1,
    Aggregation: 2,
    DatePart: 3,
    Length: 4,
    Window: 5
};

const ComparisonType = {
    Between: {value: 0, displayValue: "∈"},
    IsNull: {value: 1, displayValue: "не заполнено"},
    IsNotNull: {value: 2, displayValue: "заполнено"},
    Equal: {value: 3, displayValue: "="},
    NotEqual: {value: 4, displayValue: "≠"},
    Less: {value: 5, displayValue: "<"},
    LessOrEqual: {value: 6, displayValue: "≤"},
    Greater: {value: 7, displayValue: ">"},
    GreaterOrEqual: {value: 8, displayValue: "≥"},
    StartWith: {value: 9, displayValue: "начинается на"},
    NotStartWith: {value: 10, displayValue: "не начинается на"},
    Contain: {value: 11, displayValue: "содержит"},
    NotContain: {value: 12, displayValue: "не содержит"},
    EndWith: {value: 13, displayValue: "заканчивается на"},
    NotEnd_with: {value: 14, displayValue: "не заканчивается на"},
    Exists: {value: 15, displayValue: "существует"},
    NotExists: {value: 16, displayValue: "не существует"},
};

const ExpressionType = {
    SchemaColumn: 0,
    Function: 1,
    Parameter: 2,
    Subquery: 3,
    ArithmeticOperation: 4
};

const TimerExpressionTypes = {
    Empty: {value: -1, displayValue: "[таймер отсутствует]"},
    SingleRun: {value: 0, displayValue: "Однократно"},
    MinuteHour: {value: 1, displayValue: "Минута/час"},
    Day: {value: 2, displayValue: "День"},
    Week: {value: 3, displayValue: "Неделя"},
    Month: {value: 4, displayValue: "Месяц"},
    Year: {value: 5, displayValue: "Год"},
    CustomCronExpression: {value: 6, displayValue: "Другая периодичность"}
};

const MacrosType = {
    None: {value: 0, displayValue: "[макрос отсутствует]"},
    CurrentUser: {value: 1, displayValue: "Текущий пользователь"},
    CurrentUserContact: {value: 2, displayValue: "Контакт текущего пользователя"},
    Yesterday: {value: 3, displayValue: "Сегодня"},
    Today: {value: 4, displayValue: "Вчера"},
    Tomorrow: {value: 5, displayValue: "Завтра"},
    PreviousWeek: {value: 6, displayValue: "Предыдущая неделя"},
    CurrentWeek: {value: 7, displayValue: "Текщая неделя"},
    NextWeek: {value: 8, displayValue: "Следующая неделя"},
    PreviousMonth: {value: 9, displayValue: "Предыдущий месяц"},
    CurrentMonth: {value: 10, displayValue: "Текущий месяц"},
    NextMonth: {value: 11, displayValue: "Следующий месяц"},
    PreviousQuarter: {value: 12, displayValue: "Предыдущий квартал"},
    CurrentQuarter: {value: 13, displayValue: "Текущий квартал"},
    NextQuarter: {value: 14, displayValue: "Следующий квартал"},
    PreviousHalfYear: {value: 15, displayValue: "Предыдущее полугодие"},
    CurrentHalfYear: {value: 16, displayValue: "Текущее полугодие"},
    NextHalfYear: {value: 17, displayValue: "Следующее полугодие"},
    PreviousYear: {value: 18, displayValue: "Предыдущий год"},
    CurrentYear: {value: 19, displayValue: "Текущий год"},
    PreviousHour: {value: 20, displayValue: "Предыдущий час"},
    CurrentHour: {value: 21, displayValue: "Текущий час"},
    NextHour: {value: 22, displayValue: "Следующий час"},
    NextYear: {value: 23, displayValue: "Следующий год"},
    NextNDays: {value: 24, displayValue: "Следующих дней"},
    PreviousNDays: {value: 25, displayValue: "Предыдущих дней"},
    NextNHours: {value: 26, displayValue: "Следующих часов"},
    PreviousNHours: {value: 27, displayValue: "Предыдущих часов"},
    PrimaryColumn: {value: 28, displayValue: "Идентификатор"},
    PrimaryDisplayColumn: {value: 29, displayValue: "Значение идентификаторв"},
    PrimaryImageColumn: {value: 30, displayValue: "Изображение идентификатора"},
    DayOfYearToday: {value: 31, displayValue: "Текущий день в году"},
    DayOfYearTodayPlusDaysOffset: {value: 32, displayValue: "Текущий день в году плюс"},
    NextNDaysOfYear: {value: 33, displayValue: "Следующие дни в году"},
    PreviousNDaysOfYear: {value: 34, displayValue: "Предыдщие дни в году"}
};

const SelectFunctionType = {
    Count: {value: 0, displayValue: "Количество записей"},
    Summ: {value: 1, displayValue: "Сумма"},
    Mean: {value: 2, displayValue: "Среднее значение"},
    Min: {value: 3, displayValue: "Минимум"},
    Max: {value: 4, displayValue: "Максимум"}
};

const EntityChangeType =  {
    None: {value: 0, displayValue: ""},
    Inserted: {value: 1, displayValue: "Добавление записи"},
    Updated: {value: 2, displayValue: "Изменение записи"},
    Deleted: {value: 4, displayValue: "Удаление записи"}
};

const SelectResultType = {
    FirstRow: {value: 0, displayValue: "Читать первую запись из выборки"},
    Function: {value: 1, displayValue: "Считать функцию"},
};

const SelectOrderInfo = {
    Disabled: {value: 0, displayValue: "Отключена"},
    Ascending: {value: 1, displayValue: "По возрастанию"},
    Descending: {value: 2, displayValue: "По убыванию"},
};

const RecordAddMode = {
    Row: {value: 0, displayValue: "Добавить одну запись"},
    Select: {value: 1, displayValue: "Добавить результат выборки"},
};