/// <reference types="react" />
import { CrossDeviceItemId, CrossDeviceStateProps } from '../GlobalHeader/types';
import { CrossDeviceBookmarkParts, CrossDeviceBookmarksView } from './types';
export declare type BookmarkComponentsPairProps = CrossDeviceStateProps & {
    bookmarkParts?: CrossDeviceBookmarkParts;
    view: CrossDeviceBookmarksView;
    isAnon: boolean;
};
export declare const useBookmarkComponentsPair: ({ openCrossDeviceItemId, setOpenCrossDeviceItemId, bookmarkParts, view, isAnon, }: BookmarkComponentsPairProps) => null[] | readonly [{
    readonly id: CrossDeviceItemId.BOOKMARKS;
    readonly type: "render-element";
    readonly renderElement: () => JSX.Element;
}, JSX.Element];
