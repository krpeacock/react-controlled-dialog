import React from "react";
import Dialog from "../src/components/Dialog";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import styled from "styled-components";

configure({ adapter: new Adapter() });

const getDefault = () => <Dialog isOpen={false} setOpen={() => {}} />;

describe("Dialog tests", () => {
  it("should run without crashing", () => {
    // TODO - replace with shallow once Enzyme supports hooks
    const wrapper = mount(getDefault());
    expect(wrapper.length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });
  it("should accept a custom Dialog component", () => {
    const CustomDialog = React.forwardRef((props, ref) => (
      <dialog id="custom" />
    ));

    console.log(CustomDialog);
    const wrapper = mount(
      <Dialog
        isOpen={false}
        setOpen={() => {}}
        DialogComponent={CustomDialog}
      />
    );
    expect(wrapper.find("#custom").length).toEqual(1);
  });
});
