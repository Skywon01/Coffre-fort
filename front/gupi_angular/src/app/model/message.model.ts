export interface MessageDTO {
    id: number | null;
    content: string;
    senderId: number;
    recipientId: number;
    timestamp: Date;


}
