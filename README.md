# Timeline React Consumer

This app is a consumer test for `historical-timeline-react`.

Related repo:
- component library: `https://github.com/yehaisong/timeline-react`

It verifies:
- package installation
- CSS import from the package
- type resolution
- rendering with only the public package API

## Dependency Source

The current `package.json` installs the component library from a vendored package folder inside this repo so cloud builds can fetch it without a sibling checkout:

```json
{
  "dependencies": {
    "historical-timeline-react": "file:./vendor/historical-timeline-react"
  }
}
```

The vendored package should contain the library `dist/` output and package metadata.

To refresh it from your local library checkout, run:

```bash
npm run vendor:sync
```

That script rebuilds the sibling `../timeline-react` repo and replaces `vendor/historical-timeline-react` with the latest packaged output.

If you want to test against a sibling checkout instead, temporarily switch the dependency back to a local `file:` path that matches your machine:

```json
"historical-timeline-react": "file:../timeline-react"
```

or

```json
"historical-timeline-react": "file:/absolute/path/to/timeline-react"
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
 - If you later switch back to installing the library from GitHub, the library repo must build the package during install. Add this to the library repo's `package.json`:

```json
"prepare": "npm run build"
```
