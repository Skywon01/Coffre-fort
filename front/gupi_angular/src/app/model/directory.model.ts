export class DirectoryModel {

    constructor(
        public id: number,
        public name: string,
        public user_id: number,
        public parent_id: number | null,
        children?: DirectoryModel[],

    ) {  }
}
