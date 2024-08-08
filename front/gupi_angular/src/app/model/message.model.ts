export interface MessageDTO {
    id: number | null;
    content: string;
    senderId: { id: number }; // Changer le type pour refléter la structure de l'objet
    recipientId: { id: number }; // Changer le type pour refléter la structure de l'objet
    timestamp: Date;
    senderName?: string;
    recipientName?: string;


}
