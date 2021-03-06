export class Message {
    title: string;
    description: string;
    month: any;
    day: any;
    time: string;
    venue: string;
    address: string;
    admission: string;
    type: string;
    url?: string;
    messageId?: string;
    userId?: string;


    constructor(title: string, description: string, month: any, day: any, time: string, venue: string, address: string, admission: string, type: string, url?: string, messageId?: string, userId?: string) {
        this.title = title;
        this.description = description;
        this.month = month;
        this.day = day;
        this.time = time;
        this.venue = venue;
        this.address = address;
        this.admission = admission;
        this.type = type;
        this.url = url;
        this.messageId = messageId;
        this.userId = userId;
    }
}
