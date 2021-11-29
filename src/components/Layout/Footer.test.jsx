import React from "react";
import Footer from "./Footer";

import { shallow } from "Enzyme";

describe("layout/Footer", () => {
  const wrapper = shallow(<Footer />);
  it("should return a footer", () => {
    expect(wrapper).toBeTruthy();
    // console.log(wrapper.debug());
  });

  it("should have a classname", () => {
    const component = wrapper.find("[className='footer']");
    expect(component.length).toBe(1);
  });
});
