import moment from 'moment';

export function dateTime(dateTime) {
    return moment(dateTime).format("MMMM Do YYYY, h:mm:ss a");
}

export function date(dateTime) {
    return moment(dateTime).format("MMMM Do YYYY");
}

export function time(dateTime) {
    return moment(dateTime).format("h:mm:ss a");
}