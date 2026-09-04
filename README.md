> # Archived
>
> This fork is retired and read only. Use upstream
> [`react-multi-email`](https://github.com/axisj/react-multi-email) instead.
>
> **Why it was archived.** Every delta this fork carried is now upstream, so the fork only added
> risk: it was built and published by hand, it had no CI, and nothing here could be patched
> quickly if a problem turned up in the published artifact. Maze's last consumer,
> `@mazeapp/ariane`, moved to upstream `react-multi-email@1.0.25` in
> [mazedesignhq/maze-monorepo#37233](https://github.com/mazedesignhq/maze-monorepo/pull/37233),
> merged 2026-09-04. The three deltas and where they landed upstream:
>
> | This fork | Upstream equivalent |
> |---|---|
> | [#3](https://github.com/mazedesignhq/react-multi-email/pull/3) made the split regexp customisable | the `delimiter` prop |
> | [#4](https://github.com/mazedesignhq/react-multi-email/pull/4) and [#5](https://github.com/mazedesignhq/react-multi-email/pull/5) added `inputValue` | `initialInputValue` and `inputValue` |
> | [#7](https://github.com/mazedesignhq/react-multi-email/pull/7) removed `Backspace` from the keyup handler | upstream's keyup handles only `Enter` |
>
> The fork also carried a bug upstream does not: a local `let inputValue` shadowed the state
> variable, so the guard read `if (inputValue !== inputValue)` and `onChangeInput` was unreachable
> from 2023 onward. Upstream names the local `_inputValue`.
>
> **Read the branches carefully.** The README below, and everything else on `master`, is upstream's
> 0.4.4 tree from 2019, which is why this repo looks abandoned at a glance. It is not what shipped.
> The published `@mazeapp/react-multi-email@1.0.7` was built by hand from
> [`chore-create-fork`](https://github.com/mazedesignhq/react-multi-email/tree/chore-create-fork).
> Do not treat `master` as the source of the published package.
>
> **The npm package stays published. Do not unpublish it.** `zoom-embed` still resolves
> `@mazeapp/react-multi-email` transitively through `@mazeapp/ariane@0.67.1`. Unpublishing would
> break that install. Archiving this repository does not affect the registry.
>
> Tracked in [PLA-4507](https://linear.app/maze/issue/PLA-4507).

---

[![npm version](https://badge.fury.io/js/react-multi-email.svg)](https://badge.fury.io/js/react-multi-email)
[![](https://img.shields.io/npm/dm/react-multi-email.svg)](https://www.npmjs.com/package/react-multi-email)

# react-multi-email

A simple react component to format multiple email as the user types.

- Simple code
- No dependency
- Small size
- Simple customization

[See Demo](https://codesandbox.io/s/jpvjk8m5o9)

<img src="https://cdn.rawgit.com/axui/react-multi-email/c3098f94/react-multi-email.gif" />

## Installation

```shell-script
npm install react-multi-email -S
```

## Usage

```typescript jsx
import * as React from 'react';
import { ReactMultiEmail } from 'react-multi-email';
import 'react-multi-email/style.css';

interface IProps {}
interface IState {
  emails: string[];
}
class Basic extends React.Component<IProps, IState> {
  state = {
    emails: [],
  };

  render() {
    const { emails } = this.state;

    return (
      <>
        <h3>Email</h3>
        <ReactMultiEmail
          placeholder="placeholder"
          emails={emails}
          onChange={(_emails: string[]) => {
            this.setState({ emails: _emails });
          }}
          getLabel={(
            email: string,
            index: number,
            removeEmail: (index: number) => void,
          ) => {
            return (
              <div data-tag key={index}>
                {email}
                <span data-tag-handle onClick={() => removeEmail(index)}>
                  ×
                </span>
              </div>
            );
          }}
        />
        <br />
        <h4>react-multi-email value</h4>
        <p>{emails.join(', ') || 'empty'}</p>
      </>
    );
  }
}

export default Basic;
```

## License

[MIT](https://opensource.org/licenses/MIT)

> If you don't mind, don't forget to press "star" before leaving.
