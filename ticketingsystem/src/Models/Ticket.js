class Ticket {
    constructor(title, type, details, priority, attachment = null) {
        this.title = title;
        this.type = type;
        this.details = details;
        this.priority = priority;
        this.attachment = attachment;
    }
}

export default Ticket;
