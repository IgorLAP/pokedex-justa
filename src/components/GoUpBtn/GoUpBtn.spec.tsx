import { fireEvent, render, screen } from "@testing-library/react";

import { GoUpBtn } from ".";

window.scrollTo = jest.fn();

describe("GoUpBtn component", () => {
  it("properly first renders hidden", () => {
    render(<GoUpBtn show={false} />);
    expect(screen.getByRole("button")).toHaveStyle({ bottom: "-20%" });
  });

  it("appears when scroll", () => {
    render(<GoUpBtn show />);
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    expect(screen.getByRole("button")).toHaveStyle({ bottom: "5%" });
  });

  it("goes up when is clicked", () => {
    const mockScrollTo = window.scrollTo;
    render(<GoUpBtn show />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockScrollTo).toHaveBeenCalled();
  });
});
