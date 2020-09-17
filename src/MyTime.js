class MyTime
{
    /*
        MyTime (time) is a string in format: hh:mm:ss
        MyTime (date) is a string in format: dd-mm-yyyy
        MyTime (named date) is a string in format: <day name> <month name> <year>
    */

    static ShiftZero(value) {
        return (value < 10) ? "0" + value : value;
    }

    static DateToMyTime(date) {
        return this.ShiftZero(date.getHours()) + ":" + this.ShiftZero(date.getMinutes()) + ":" + this.ShiftZero(date.getSeconds());
    }

    static DateToMyDate(date) {
        return this.ShiftZero(date.getDate()) + "-" + this.ShiftZero(date.getMonth()) + "-" + this.ShiftZero(date.getFullYear());
    }
    
    static DateToMyDateNamed(date) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const months  = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let month = (months[date.getMonth() - 1]).slice(0, 3);
            let day = (days[date.getDay()]).slice(0, 3);
            return `${day} ${month} ${date.getFullYear()}`;
    }

}

export default MyTime;