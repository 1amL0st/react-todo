class MyTime {
    /*
        MyTime (time) is a string in format: hh:mm:ss
        MyTime (date) is a string in format: dd-mm-yyyy
        MyTime (named date) is a string in format: <day name> <month name> <year>
    */

    static ShiftZero(value) {
        return (value < 10) ? "0" + value : value;
    }

    static MakeMyDate(day = 1, month = 0, year = 1){
        return this.ShiftZero(day) + "-" + this.ShiftZero(month) + "-" + this.ShiftZero(year);
    }

    static MakeMyTime(hours = 0, minutes = 0, seconds = 0) {
        return this.ShiftZero(hours) + ":" + this.ShiftZero(minutes) + ":" + this.ShiftZero(seconds);
    }

    static DateToMyTime(date) {
        return this.MakeMyTime(date.getHours(), date.getMinutes(), date.getSeconds());
    }

    static DateToMyDate(date) {
        return this.MakeMyDate(date.getDate(), date.getMonth() + 1, date.getFullYear());
    }
    
    static DateToMyDateNamed(date) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const months  = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let month = (months[date.getMonth() - 1]).slice(0, 3);
            let day = (days[date.getDay()]).slice(0, 3);
            return `${day} ${month} ${date.getFullYear()}`;
    }

    static MyDateAndMyTimeToDate(my_date, my_time) {
        my_date = my_date.split('-').reverse().join('-');
        return new Date(my_date + "T" + my_time);
    }

    static MyDateAndMyTimeUntilNow(my_date, my_time) {
        const date = this.MyDateAndMyTimeToDate(my_date, my_time);
        let ms = date - new Date();

        const sign = Math.sign(ms);

        ms = Math.abs(ms);
        const hours = Math.floor(ms / (3600 * 1000));
        ms -= hours * 3600 * 1000;

        const minutes = Math.floor(ms / (60 * 1000));
        ms -= minutes * 60 * 1000;

        const seconds = Math.floor(ms / 1000);

        return {
            ms: ms,
            seconds: seconds * sign,
            minutes: minutes * sign,
            hours: hours * sign
        }
    }
}

export default MyTime;