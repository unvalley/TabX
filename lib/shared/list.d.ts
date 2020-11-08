import { TabListElem } from './typings';
export declare const createNewTabList: ({ id, title, description, tabs, createdAt, updatedAt, }: TabListElem) => {
    id: number;
    title: string;
    description: string;
    tabs: import("webextension-polyfill-ts").Tabs.Tab[];
    createdAt: number;
    updatedAt: number;
};
//# sourceMappingURL=list.d.ts.map