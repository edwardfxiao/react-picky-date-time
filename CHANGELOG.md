# 3.0.0

- React 19 compatibility: replace `findDOMNode` usage in calendar transitions with `nodeRef` on `CSSTransition` (required because React 19 removed `findDOMNode`)
- Smooth calendar transitions: add `FadeDiv`/`FadeSpan` forwardRef wrappers so transition classes apply to the correct DOM nodes for month, year, and body panels
- Fix calendar body slide animation: remove duplicate `slide` class from inner calendar table so the sliding wrapper keeps correct dimensions; add `left`, `top`, and `width` to `.slide` for proper slide positioning

# 2.0.9

- Update package.json

# 2.0.8

- Update package.json

# 2.0.7

- Add tea.yaml

# 2.0.6

- Update README

# 2.0.5

- Potential Calendar bugfix

# 2.0.4

- Better TypeScript support (export interface ReactPickyDateTimeProps)

# 2.0.3

- Change animationInterval to 200 from 1000

# 2.0.2

- Support IE9+

# 2.0.1

- Fix markedDates not showing correctly bug

# 2.0.0

- Rewite with React Hooks
- Support TS
- Using https://gist.github.com/jakearchibald/cb03f15670817001b1157e62a076fe95 method to do the timer
- Not supporting IE anymore