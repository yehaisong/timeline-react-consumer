import type { ReactNode } from 'react';
import type { NormalizedTimelineEvent, TimelineViewport } from '../lib/types';
type TimelineEventLayerProps = {
    events: NormalizedTimelineEvent[];
    viewport: TimelineViewport;
    height: number;
    laneLimit: number;
    collapseGroups?: boolean;
    renderEvent?: (event: NormalizedTimelineEvent) => ReactNode;
    onEventClick?: (event: NormalizedTimelineEvent) => void;
};
export declare function TimelineEventLayer({ events, viewport, height, laneLimit, collapseGroups, renderEvent, onEventClick, }: TimelineEventLayerProps): import("react/jsx-runtime").JSX.Element;
export {};
