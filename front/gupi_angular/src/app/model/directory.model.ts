export class DirectoryModel {
    constructor(
        public id: number,
        public name: string,
        public user_id: number,
        children?: DirectoryModel[],

    ) {  }
}
