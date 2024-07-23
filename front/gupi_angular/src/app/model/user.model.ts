export class UserModel {
    constructor(
        public id: number,
        public name: string,
        public firstName: string,
        public email: string,
        public address: string,
        public age: number,
        public password: string,
        public profile: string,
        public directory: number,
        public file: number,
        public role: string
    ) {  }
}
