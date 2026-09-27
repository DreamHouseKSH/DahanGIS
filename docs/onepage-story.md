# DahanGIS one-page story

Approved scope: a static, responsive homepage with six chapters (start, about, services, why, process, contact), reusable existing service details, the existing validated inquiry form, a left chapter rail with a connector, and an opt-in guided scroll control.

Guided scroll is Off on every visit. Rates are 24/48/96 CSS px per second. Direct interaction, entering the inquiry area, tab hiding, window blur, and changing reduced-motion preferences stop playback; it never resumes without an explicit choice. No scroll hijacking or runtime server is introduced.

Use existing company logo and generated image assets, without treating generated coordinates, interface labels, addresses, or contact details as factual. Generated visuals are illustrative; the actual map remains Kakao. Preserve legacy routes, static exports, metadata, validated inquiry behavior, and production build secrets.

Acceptance: static build, lint, typecheck, existing regression tests, new navigation/auto-scroll/responsive/JS-disabled tests, and desktop/mobile screenshot inspection before merging.
