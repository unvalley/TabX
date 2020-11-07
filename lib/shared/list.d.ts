/// <reference types="react" />
import { Tabs } from 'webextension-polyfill-ts';
declare type NewTab = {
    id?: number;
    title?: string;
    description?: string;
    tabs: Tabs.Tab[];
    createdAt?: Date;
    updatedAt?: Date;
};
export declare const createNewTabList: ({ id, title, description, tabs, createdAt, updatedAt, }: NewTab) => {
    id: import("react").Key;
    title: string;
    description: string;
    tabs: Tabs.Tab[];
    createdAt: number | Date;
    updatedAt: number | Date;
};
export {};
//# sourceMappingURL=list.d.ts.map