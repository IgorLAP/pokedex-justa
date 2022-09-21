import { fireEvent, render, screen } from "@testing-library/react";
import { toast } from "react-toastify";

import { useToast } from "~/hooks/useToast";

describe("useToast hook", () => {
  afterEach(jest.clearAllMocks);

  it("display the message", () => {
    function TestComponent() {
      const myToast = useToast();
      return (
        <button type="button" onClick={() => myToast("success", "it works")}>
          Click Me
        </button>
      );
    }
    const toastSpy = jest.spyOn(toast, "success");
    render(<TestComponent />);
    fireEvent.click(screen.getByRole("button"));
    expect(toastSpy).toHaveBeenCalledTimes(1);
  });
});
