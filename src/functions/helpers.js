// Takes JS Date object and returns formatted date string. 
export function formatDate(date) {
    try {
        let day = ("0" + date.getDate()).slice(-2) // https://stackoverflow.com/questions/6040515/how-do-i-get-month-and-date-of-javascript-in-2-digit-format/18610204
        let month = ("0" + date.getMonth()).slice(-2)   

        let year = date.getFullYear()

        return formattedDate = day + "/" + month + "/" + year // Getting individual values from date object for day, month, and year and concatenating them together. 
    } catch(error) {
       
    }
}

// Takes JS Date object and returns formatted time string. 
export function formatTime(date) {
    try {
        return ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) // Getting individual values from date object for hours and minutes and concatenating them together. 
    } catch(error) {
       
    }
}