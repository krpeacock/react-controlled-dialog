import React from "react";
import Dialog from "../src/components/Dialog";
import { render, cleanup } from "@testing-library/react";

const show = jest.fn();
const showModal = jest.fn();

const defaultShowModal = HTMLDialogElement.prototype.showModal;
const defaultShow = HTMLDialogElement.prototype.show;

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = showModal;
  HTMLDialogElement.prototype.show = show;
});

afterEach(() => {
  HTMLDialogElement.prototype.showModal = defaultShowModal;
  HTMLDialogElement.prototype.show = defaultShow;
  cleanup();
});

describe("Dialog tests", () => {
  it("should run without crashing", () => {
    const { container } = render(<Dialog isOpen={false} setOpen={() => {}} />);
    expect(container.querySelector("dialog")).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
  
  it("should accept a custom Dialog component", () => {
    const CustomDialog = React.forwardRef((props, ref) => (
      <dialog id="custom" ref={ref} {...props} />
    ));

    const { container } = render(
      <Dialog
        isOpen={false}
        setOpen={() => {}}
        DialogComponent={CustomDialog}
      />
    );
    expect(container.querySelector("#custom")).toBeTruthy();
  });
  
  it("should open the dialog as a dialog if type is not provided", () => {
    render(<Dialog isOpen={true} setOpen={jest.fn()} />);
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(0);
    expect(HTMLDialogElement.prototype.show).toHaveBeenCalled();
  });
  
  it("should open the dialog as a modal if type is modal", () => {
    render(
      <Dialog isOpen={true} setOpen={jest.fn()} type="modal" />
    );
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    expect(HTMLDialogElement.prototype.show).toHaveBeenCalledTimes(0);
  });
});
