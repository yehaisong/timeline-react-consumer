import type { NormalizedTimelineEvent, TimelineViewport, TimelineZoomUnit } from '../lib/types';
type UseTimelineViewportArgs = {
    events: NormalizedTimelineEvent[];
    startBound?: string | Date;
    endBound?: string | Date;
    maxZoomUnit: TimelineZoomUnit;
    minZoomUnit: TimelineZoomUnit;
    initialZoomUnit: TimelineZoomUnit;
    viewportHeight: number;
    unitHeight: number;
    initialStart?: string | Date;
    initialEnd?: string | Date;
    initialCenter?: string | Date;
    viewport?: TimelineViewport;
    onViewportChange?: (viewport: TimelineViewport) => void;
};
export declare function useTimelineViewport(args: UseTimelineViewportArgs): {
    viewport: TimelineViewport;
    setViewport: (nextViewport: TimelineViewport) => void;
    startBoundMs: number | null;
    endBoundMs: number | null;
};
export {};
