import type { TimelineViewport } from '../lib/types';
import type { TimelineTick } from '../lib/timeScale';
type TimelineAxisProps = {
    viewport: TimelineViewport;
    majorTicks: TimelineTick[];
    minorTicks: TimelineTick[];
    height: number;
    showMajorTicks?: boolean;
    showMajorLabels?: boolean;
    showMinorTicks?: boolean;
    showMinorLabels?: boolean;
};
export declare function TimelineAxis({ viewport, majorTicks, minorTicks, height, showMajorTicks, showMajorLabels, showMinorTicks, showMinorLabels, }: TimelineAxisProps): import("react/jsx-runtime").JSX.Element;
export {};
