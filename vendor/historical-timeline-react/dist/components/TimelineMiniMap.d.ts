import type { NormalizedTimelineEvent, TimelineViewport } from '../lib/types';
type TimelineMiniMapProps = {
    events: NormalizedTimelineEvent[];
    viewport: TimelineViewport;
    height: number;
    domainStartMs: number;
    domainEndMs: number;
    variant?: 'default' | 'nano';
    onViewportChange?: (nextViewport: TimelineViewport) => void;
};
export declare function TimelineMiniMap({ events, viewport, height, domainStartMs, domainEndMs, variant, onViewportChange, }: TimelineMiniMapProps): import("react/jsx-runtime").JSX.Element;
export {};
