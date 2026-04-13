import type { TimelineViewport, TimelineZoomUnit } from './types';
export type TimelineTick = {
    key: string;
    ts: number;
    label: string;
    kind: 'major' | 'minor';
};
export declare function getZoomUnits(): TimelineZoomUnit[];
export declare function compareZoomUnits(a: TimelineZoomUnit, b: TimelineZoomUnit): number;
export declare function clampZoomUnit(unit: TimelineZoomUnit, maxZoomUnit: TimelineZoomUnit, minZoomUnit: TimelineZoomUnit): TimelineZoomUnit;
export declare function getZoomedInUnit(unit: TimelineZoomUnit, minZoomUnit: TimelineZoomUnit): TimelineZoomUnit;
export declare function getZoomedOutUnit(unit: TimelineZoomUnit, maxZoomUnit: TimelineZoomUnit): TimelineZoomUnit;
export declare function normalizeDateInput(value: string | Date | undefined): number | null;
export declare function startOfUnit(ts: number, unit: TimelineZoomUnit): number;
export declare function addUnits(ts: number, unit: TimelineZoomUnit, amount: number): number;
export declare function getVisibleUnitCount(viewportHeight: number, unitHeight: number): number;
export declare function createViewportAround(centerMs: number, zoomUnit: TimelineZoomUnit, viewportHeight: number, unitHeight: number): TimelineViewport;
export declare function clampViewportToBounds(viewport: TimelineViewport, startBoundMs?: number | null, endBoundMs?: number | null): TimelineViewport;
export declare function shiftViewport(viewport: TimelineViewport, ratio: number, startBoundMs?: number | null, endBoundMs?: number | null): TimelineViewport;
export declare function zoomViewport(viewport: TimelineViewport, nextZoomUnit: TimelineZoomUnit, focalMs: number, viewportHeight: number, unitHeight: number, startBoundMs?: number | null, endBoundMs?: number | null): TimelineViewport;
export declare function mapTimeToY(viewport: TimelineViewport, ts: number, height: number): number;
export declare function formatTickLabel(ts: number, unit: TimelineZoomUnit): string;
export declare function generateTicks(viewport: TimelineViewport): {
    majorTicks: TimelineTick[];
    minorTicks: TimelineTick[];
};
