export class DirectoryModel {
    constructor(
        public directory_id: number,
        public name: string,
        children?: DirectoryModel[]
    ) {  }
}
