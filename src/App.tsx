import {
  VerticalTimeline,
  type TimelineEvent,
} from '@yehaisong/timeline-react';
import './App.css';

const events: TimelineEvent[] = [
  {
    id: 'printing-press',
    title: 'Printing Press in Europe',
    start: '1450-01-01',
    importance: 8,
    groupId: 'World',
    color: '#0f766e',
    description: 'Testing long-range point rendering from the packaged component.',
  },
  {
    id: 'luther-theses',
    title: 'Ninety-five Theses',
    start: '1517-10-31',
    importance: 9,
    groupId: 'World',
    color: '#1d4ed8',
  },
  {
    id: 'first-great-awakening',
    title: 'First Great Awakening',
    start: '1730-01-01',
    end: '1745-12-31',
    importance: 7,
    groupId: 'Church',
    color: '#7c3aed',
  },
  {
    id: 'azusa-street',
    title: 'Azusa Street Revival',
    start: '1906-04-09',
    end: '1909-01-01',
    importance: 8,
    groupId: 'Church',
    color: '#b45309',
  },
  {
    id: 'apollo-11',
    title: 'Apollo 11 Moon Landing',
    start: '1969-07-20',
    importance: 10,
    groupId: 'World',
    color: '#dc2626',
  },
  {
    id: 'web-public',
    title: 'World Wide Web Public Release',
    start: '1991-08-06',
    importance: 8,
    groupId: 'World',
    color: '#2563eb',
  },
  {
    id: 'same-day-1',
    title: 'Project Kickoff',
    start: '2026-04-10',
    importance: 5,
    groupId: 'Project',
    color: '#0891b2',
  },
  {
    id: 'same-day-2',
    title: 'Architecture Review',
    start: '2026-04-10',
    importance: 6,
    groupId: 'Project',
    color: '#0f766e',
  },
  {
    id: 'same-day-3',
    title: 'Stakeholder Briefing',
    start: '2026-04-10',
    importance: 7,
    groupId: 'Project',
    color: '#7c2d12',
  },
];

const timelineStart = new Date('1400-01-01T00:00:00Z');
const timelineEnd = new Date('2030-12-31T00:00:00Z');

export default function App() {
  return (
    <main className="consumer-shell">
      <header className="consumer-header">
        <div>
          <p className="consumer-eyebrow">Package Integration Test</p>
          <h1 className="consumer-title">`@yehaisong/timeline-react` in a second app</h1>
        </div>
        <p className="consumer-summary">
          This app installs the local package, imports the exported stylesheet, and renders the
          timeline with only public props.
        </p>
      </header>

      <section className="consumer-stage">
        <VerticalTimeline
          events={events}
          startBound={timelineStart}
          endBound={timelineEnd}
          maxZoomUnit="century"
          minZoomUnit="day"
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
