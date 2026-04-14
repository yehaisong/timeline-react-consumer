import {
  VerticalTimeline,
  type TimelineEvent,
} from 'historical-timeline-react';
import timelineEventsData from './data/myevents_cht_timeline.json';
import './App.css';

const events = timelineEventsData as TimelineEvent[];
const timelineStart = new Date(Date.UTC(-5000, 0, 1));
const timelineEnd = new Date(Date.UTC(100, 11, 31));
const timelineCenter = new Date(0);
timelineCenter.setUTCFullYear(0, 0, 1);
timelineCenter.setUTCHours(0, 0, 0, 0);

export default function App() {
  return (
    <main className="consumer-shell">
      <header className="consumer-header">
        <div>
          <p className="consumer-eyebrow">Package Integration Test</p>
          <h1 className="consumer-title">`historical-timeline-react` in a second app</h1>
        </div>
      </header>

      <section className="consumer-stage">
        <VerticalTimeline
          events={events}
          startBound={timelineStart}
          endBound={timelineEnd}
          initialCenter={timelineCenter}
          maxZoomUnit="century"
          minZoomUnit="year"
          initialZoomUnit="decade"
          height="100%"
          unitHeight={88}
          detailMode="slide"
          display={{
            showMiniMap: true,
            showMajorTicks: true,
            showMajorLabels: true,
            showMinorTicks: true,
            showMinorLabels: false,
            miniMapWidth: 150,
            clusterLaneLimit: 2,
          }}
          theme={{
            axisColor: '#0f172a',
            majorTickColor: '#334155',
            minorTickColor: '#94a3b8',
            labelPillBg: '#0f172a',
            labelPillText: '#f8fafc',
            cardWidth: 220,
            cardMaxWidth: 240,
            stackOffset: 40,
            axisWidth: 132,
            axisOffset: -58,
            labelShift: 60,
          }}
        />
      </section>
    </main>
  );
}
