import { render, screen } from "@testing-library/react";

import { Footer } from ".";

describe("Footer component", () => {
  it("displays in pages", () => {
    render(<Footer />);
    const githubLink = screen.getByRole("link", { name: /github/i });
    const linkedinLink = screen.getByRole("link", { name: /linkedin/i });
    expect(githubLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
    expect(screen.getByText(/igor pedrosa/i)).toBeInTheDocument();
  });
});
