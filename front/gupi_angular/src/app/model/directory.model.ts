export class DirectoryModel {
    constructor(
        public directory_id: number,
        public name: string,
        public user_id: number,
        children?: DirectoryModel[],

    ) {  }
}
