import React from "react";
import Dialog from "../src/components/Dialog";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "react-testing-library";

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

configure({ adapter: new Adapter() });

describe("Dialog tests", () => {
  it("should run without crashing", () => {
    // TODO - replace with shallow once Enzyme supports hooks
    const { container } = render(<Dialog isOpen={false} setOpen={() => {}} />);
    expect(container.querySelector("dialog")).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
  it("should accept a custom Dialog component", () => {
    const CustomDialog = React.forwardRef((props, ref) => (
      <dialog id="custom" />
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
    const { container } = render(<Dialog isOpen={true} setOpen={jest.fn()} />);
    expect(HTMLDialogElement.prototype.showModal).toBeCalledTimes(0);
    expect(HTMLDialogElement.prototype.show).toBeCalled();
  });
  it("should open the dialog as a modal if type is modal", () => {
    const { container } = render(
      <Dialog isOpen={true} setOpen={jest.fn()} type="modal" />
    );
    expect(HTMLDialogElement.prototype.showModal).toBeCalled();
    expect(HTMLDialogElement.prototype.show).toBeCalledTimes(0);
  });
});
