export default class DataItem  {
    constructor(data: any) {
        Object.assign(this, data);
    }
    id: number;
    name: string;
    title: string;
    disabled: boolean;
    group: string;
    description: string;
}