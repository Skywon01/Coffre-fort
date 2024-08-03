export class DeviceModel {
    constructor(
        public id: string,
        public name: string,
        public price: number,
        public qr_code: string,
        public user_id: string,
    ) {
    }
}
