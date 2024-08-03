export class DeviceModel {
    id: number;
    name: string;
    price: number;
    category: string;
    qr_code: string;
    user_id: number | null;

    constructor(id: number, name: string, price: number, category: string, qr_code: string, user_id: number | null) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.qr_code = qr_code;
        this.user_id = user_id;
    }
}
