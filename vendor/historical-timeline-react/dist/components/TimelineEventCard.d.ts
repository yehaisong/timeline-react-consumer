import type { NormalizedTimelineEvent } from '../lib/types';
type TimelineEventCardProps = {
    event: NormalizedTimelineEvent;
    isActive?: boolean;
    onClick?: (event: NormalizedTimelineEvent) => void;
};
export declare function TimelineEventCard({ event, isActive, onClick }: TimelineEventCardProps): import("react/jsx-runtime").JSX.Element;
export {};
