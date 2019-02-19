## React Controlled Dialog

_Declarative React interface for the [HTML5 Dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog "HTML5 Dialog")_

#### Demo

https://react-controlled-dialog.netlify.com/

#### Installation

Install through your preferred package manager

```bash
# NPM
npm install react-controlled-dialog

# Yarn
yarn add react-controlled-dialog
```

Then, include the component in your codebase

```javascript
import Dialog from "react-controlled-dialog";
```

### Usage

This component is designed to not be in control of its own status. It requires its parent to tell it when to open, and it requires a callback for updating the state to be controlled. The idea is to have a declarative relationship from the parent element to the dialog, similar to a controlled input.

The dialog can be opened as either a dialog (which is default), or as a modal, by specifying a `type` of "modal" or "dialog".

### Examples

A simple dialog:

```javascript
import React, { useState } from "react";
import Dialog from "react-controlled-dialog";

const Simple = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div id="simple">
      <h2>Simple Dialog</h2>
      <p>Click below to open!</p>
      <button onClick={() => setOpen(true)}>Simple Dialog</button>
      <Dialog isOpen={isOpen} setOpen={setOpen}>
        foobar
      </Dialog>
      <p>
        The native dialog component can be activated by passing an{" "}
        <code>open</code> attribute, or by invoking the <code>show()</code>{" "}
        method from the native API.
      </p>
    </div>
  );
};
```


### Settings

| Option               | Type                   | Default  | Description                                                                                                                      |
| -------------------- | ---------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| children             | node or array of nodes | null     | Child elements for the dialog can be passed naturally                                                                            |
| isOpen               | boolean                | false    | Whether the dialog should be open (required)                                                                                     |
| setOpen              | function               | null     | Function that updates isOpen to switch to true or false (required)                                                               |
| type                 | string                 | "dialog" | Determine whether the dialog should open as a modal or use default behavior                                                      |
| closeOnBackDropClick | boolean or function    | false    | Accepts a boolean or a function that evaluates to a boolean to determine whether clicking on the backdrop should close the modal |
| DialogComponent      | node                   | null     | A custom element that replaces the default, unstyled dialog (should accept a ref, role, and onClick attributes)                  |
| closeButton          | node                   | null     | Your custom close button                                                                                                         |
| onClick              | function               | null     | custom event handler for onClick events for the dialog                                                                           |
