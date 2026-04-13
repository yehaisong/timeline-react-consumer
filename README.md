# Timeline React Consumer

This app is a local consumer test for `historical-timeline-react`.

Related repo:
- component library: `https://github.com/yehaisong/timeline-react`

It verifies:
- local package installation
- CSS import from the package
- type resolution
- rendering with only the public package API

## Expected Folder Layout

The current `package.json` uses this dependency:

```json
{
  "dependencies": {
    "historical-timeline-react": "file:../timeline_react"
  }
}
```

That means this consumer app expects the package repo to be in a sibling folder:

```text
/Users/hye/Downloads/working_dir/
  timeline_react/
  timeline_react_consumer/
```

If your package folder is somewhere else, update the dependency path in `package.json` to match the actual location.

Examples:

```json
"historical-timeline-react": "file:/absolute/path/to/timeline_react"
```

or

```json
"historical-timeline-react": "file:../../some/other/path/timeline_react"
```

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Notes

- This app imports the package stylesheet with:

```ts
import 'historical-timeline-react/styles.css';
```

- The event detail panel in this app is consumer-side UI. It is not part of the base timeline component.
