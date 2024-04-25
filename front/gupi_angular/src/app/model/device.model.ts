export class DeviceModel {
    constructor(
        public device_id: string,
        public name: string,
        public price: number,
        public qr_code: string,
    ) {
    }
}
