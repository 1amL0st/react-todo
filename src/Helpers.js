const Helpers = {
    DateToDateStr(date, local_format) {
        if (!local_format) {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const months  = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let year = date.getFullYear();
            let month = (months[date.getMonth() - 1]).slice(0, 3);
            let day = (days[date.getDay()]).slice(0, 3);
            return `${year} ${month} ${day}`;
        } else {
            return date.toLocaleDateString(local_format);
        }
    },

    DateToTimeStr(date, local_format = 'en-GB') {
        return date.toLocaleTimeString('en-GB');
    },

    MinsAndHoursUntilNow(date) {
        const time_left = (date - new Date()) / (1000);
        let hours = time_left / 3600;
        hours = (hours < 0) ? Math.round(hours) : Math.floor(hours);
        return {
            hours: hours,
            minutes:  Math.round((time_left / 60 - hours * 60 * Math.sign(hours))) % 60
        }
    },

    GetRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export default Helpers;