function createEmployeeRecord(args){
    return {
        firstName : args[0],
        familyName : args[1],
        title : args[2],
        payPerHour : args[3],
        timeInEvents : [],
        timeOutEvents : [],
    }
}
function createEmployeeRecords(employeeData){
    // console.log(employeeData) ---> array of arrays
    return employeeData.map((employee)=>{
        // console.log(employee) ---> array contains employee data
        return createEmployeeRecord(employee)
    })
}
function createTimeInEvent(employee, dateAndTime){
    //console.log(dateAndTime)
    let timeInEventData = dateAndTime.split(' ')
    //console.log(timeInEventData) --> [date, hour (1300 ====== 13:00)]
    employee.timeInEvents.push({
        type : 'TimeIn',
        date : timeInEventData[0],
        hour : parseInt(timeInEventData[1], 10)
    })
    return employee
}
function createTimeOutEvent(employee, dateAndTime){
    //console.log(dateAndTime)
    let timeInEventData = dateAndTime.split(' ')
    //console.log(timeInEventData) --> [date, hour (1300 ====== 13:00)]
    employee.timeOutEvents.push({
        type : 'TimeOut',
        date : timeInEventData[0],
        hour : parseInt(timeInEventData[1], 10)
    })
    return employee
}
function hoursWorkedOnDate(employee, date){

    let timeIn = employee.timeInEvents.find((event)=>{
        return (event.date === date)
    })
    let timeOut = employee.timeOutEvents.find((event)=>{
        return (event.date === date)
    })
    return ((timeOut.hour - timeIn.hour)/100)
}
function wagesEarnedOnDate(employee, date){
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}
function allWagesFor(employee){
    let allWages = 0
    employee.timeInEvents.map((event)=>{
        allWages += wagesEarnedOnDate(employee, event.date)
    })
    return allWages
}
function calculatePayroll(employees){
    return employees.reduce((sum, employee)=> {
        return sum + allWagesFor(employee)
    }, 0)
}