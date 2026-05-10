# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.3] — 2026-05-10

### Changed

- `ImageStreamHandler` now emits an `imageAdded` event after each complete image instead of requiring callers to poll `getImages()`
- `handleChunk` now accepts `ArrayBuffer` and `string` inputs in addition to `Uint8Array`
- Streaming state is reset on `STREAM_START` to prevent stale images carrying over between sessions
- Images are now emitted as JPEG data URIs

### Fixed

- Image list in the board viewer is now cleared immediately when a new stream starts

---

## [2.0.2] — 2026-05-10

### Fixed

- Overlay controls (Clear, Reconnect) no longer stay on screen permanently — they now correctly auto-dismiss after 3 seconds
- Live board connection no longer drops mid-stream when streaming state changes (stale closure in peer hook)
- App no longer shows a blank screen when the back camera is unavailable — a clear "No camera found" message is shown instead
- Connection errors and invalid QR code failures are now surfaced to the user instead of being silently swallowed

### Improved

- Reduced unnecessary re-renders in the board viewer
- Improved horizontal scrolling performance with pre-calculated item layout for the board list
- Reduced memory allocations during high-frequency image streaming
- Overlay buttons skip re-renders when their props haven't changed
- `PermissionScreen` now uses the app's theme system consistently instead of manual color lookups

### Changed

- Removed unused style definitions from multiple components
- Simplified component rendering logic

---

## [2.0.0] — 2025-xx-xx

### Changed

- Upgraded to React Native 0.85.3
- Upgraded third-party dependencies

---

## [1.0.0] — Initial Release
