export class UserModel {
    constructor(
        public user_id: number,
        public name: string,
        public firstName: string,
        public email: string,
        public address: string,
        public age: number,
        public password: string,
        // public role_id: string
    ) {  }
}
