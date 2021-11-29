import React from "react";
import Footer from "./Footer";

import { shallow } from "Enzyme";

describe("layout/Footer", () => {
  it("should return a footer", () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toBeTruthy();
    // console.log(wrapper.debug());
  });
});
