import React from "react";
import { create } from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react";
import Select from "shared/Select";

const options = [
  { value: "value1", name: "name1" },
  { value: "value2", name: "name2" }
];

const initValue = "value1";

it("matches snapshot", () => {
  const component = create(
    <Select options={options} initValue={initValue} handleChange={() => {}} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it("call handleChange function when clicking on different option", () => {
  const handleChangeMock = jest.fn();

  const { container } = render(
    <Select
      options={options}
      initValue={initValue}
      handleChange={handleChangeMock}
    />
  );

  fireEvent.change(container.getElementsByTagName("select")[0], {
    target: { value: "value2" }
  });
  expect(handleChangeMock).toHaveBeenCalledWith("value2");
});
