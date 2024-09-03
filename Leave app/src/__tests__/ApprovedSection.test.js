// src/components/__tests__/ApproveSection.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import ApproveSection from "../components/ApproveSection";
import Aos from "aos";

jest.mock("aos");

describe("ApproveSection Component", () => {
  beforeEach(() => {
    Aos.init.mockClear();
  });

  it("renders correctly", () => {
    render(<ApproveSection></ApproveSection>);

    // Check if the text content is rendered
    expect(
      screen.getByText(/Leave approvals with notifications/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/The approval process is fast/i)
    ).toBeInTheDocument();

    // Check if FontAwesome icons are rendered
    expect(screen.getAllByRole("img", { hidden: true })).toHaveLength(4); // Checks for 3 icons

    // Check if the image is rendered
    expect(screen.getByAltText("Approval")).toBeInTheDocument();
  });

  it("initializes Aos on mount", () => {
    render(<ApproveSection />);
    expect(Aos.init).toHaveBeenCalledWith({ duration: 2000 });
  });
  it("renders correctly", () => {
    render(<ApproveSection />);
    expect(
      screen.getByText(/Leave approvals with notifications/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/The approval process is fast/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Administrators get an email notification/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/No more endless email chains/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Fast approvals/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Transparent history of approvals/i)
    ).toBeInTheDocument();
  });
  it("renders image with correct alt text", () => {
    render(<ApproveSection />);
    expect(screen.getByAltText("Approval")).toBeInTheDocument();
  });
  it("renders FontAwesome icons", () => {
    render(<ApproveSection></ApproveSection>);
    const icons = screen.getAllByRole("img", { hidden: true });
    expect(icons).toHaveLength(4); // Assuming there are 3 FontAwesome icons
  });
  it("renders the correct number of paragraphs", () => {
    render(<ApproveSection />);
    const paragraphs = screen.getAllByText(/./); // Matches any non-empty text
    expect(paragraphs).toHaveLength(6); // Number of paragraphs in the component
  });
  it("renders correct text content in the first paragraph", () => {
    render(<ApproveSection />);
    expect(
      screen.getByText(/Leave approvals with notifications/i)
    ).toHaveTextContent("Leave approvals with notifications");
  });
  it("renders correct text content in the second paragraph", () => {
    render(<ApproveSection />);
    expect(screen.getByText(/The approval process is fast/i)).toHaveTextContent(
      "The approval process is fast"
    );
  });
  it("renders correct text content in the third paragraph", () => {
    render(<ApproveSection />);
    expect(
      screen.getByText(/Administrators get an email notification/i)
    ).toHaveTextContent("Administrators get an email notification");
  });
  it("renders correct text content in the fourth paragraph", () => {
    render(<ApproveSection />);
    expect(screen.getByText(/No more endless email chains/i)).toHaveTextContent(
      "No more endless email chains"
    );
  });
});
