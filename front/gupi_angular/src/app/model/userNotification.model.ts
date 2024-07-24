export class NotificationModel{
    constructor(
    public id: number,
    public senderName: string,
    public senderFirstName: string,
    public fileName: string,
    public timestamp: string,
    public user: {
        id: number;
    },

    ) {
    }
}
