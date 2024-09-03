import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthContext } from "../service/authentication";
import ModalComponent from "../components/Model";

describe("ModalComponent", () => {
  const mockSetEmail = jest.fn();
  const mockSetPassword = jest.fn();
  const mockHandleSubmit = jest.fn();

  beforeEach(() => {
    render(
      <AuthContext.Provider
        value={{
          setEmail: mockSetEmail,
          setPassword: mockSetPassword,
          handleSubmit: mockHandleSubmit,
        }}
      >
        <ModalComponent />
      </AuthContext.Provider>
    );
  });

  it("renders the login button", () => {
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it("renders the email input", () => {
    fireEvent.click(screen.getByText(/Login/i));
    expect(screen.getByLabelText(/Your email/i)).toBeInTheDocument();
  });

  it("renders the password input", () => {
    fireEvent.click(screen.getByText(/Login/i));
    expect(screen.getByLabelText(/Your password/i)).toBeInTheDocument();
  });

  it("calls setEmail when email input changes", () => {
    fireEvent.click(screen.getByText(/Login/i));
    fireEvent.change(screen.getByLabelText(/Your email/i), {
      target: { value: "test@example.com" },
    });
    expect(mockSetEmail).toHaveBeenCalledWith("test@example.com");
  });

  it("calls setPassword when password input changes", () => {
    fireEvent.click(screen.getByText(/Login/i));
    fireEvent.change(screen.getByLabelText(/Your password/i), {
      target: { value: "password123" },
    });
    expect(mockSetPassword).toHaveBeenCalledWith("password123");
  });

  // New Test Cases
  it("opens the modal when the login button is clicked", () => {
    fireEvent.click(screen.getByText(/Login/i));
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  it("closes the modal when the close button is clicked", () => {
    fireEvent.click(screen.getByText(/Login/i));
    fireEvent.click(screen.getByTestId("close-modal-button"));
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });

  it("does not render the modal initially", () => {
    expect(screen.queryByRole("modal")).not.toBeInTheDocument();
  });
  it("calls setEmail when email input changes", () => {
    // Open the modal
    fireEvent.click(screen.getByText(/Login/i));

    // Change the email input value
    fireEvent.change(screen.getByLabelText(/Your email/i), {
      target: { value: "test@example.com" },
    });

    // Check that setEmail has been called with the correct value
    expect(mockSetEmail).toHaveBeenCalledWith("test@example.com");
  });

  it("calls setPassword when password input changes", () => {
    // Open the modal
    fireEvent.click(screen.getByText(/Login/i));

    // Change the password input value
    fireEvent.change(screen.getByLabelText(/Your password/i), {
      target: { value: "password123" },
    });

    // Check that setPassword has been called with the correct value
    expect(mockSetPassword).toHaveBeenCalledWith("password123");
  });
  it("does not render the modal initially", () => {
    // Check that the modal is not in the document initially
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });
});
