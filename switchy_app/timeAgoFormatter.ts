import TimeAgo from "javascript-time-ago";


export default function timeAgoFormatter(date: Date) {
    const timeago = new TimeAgo("pt-BR");
    const time = timeago.format(date);

    return time;
}
