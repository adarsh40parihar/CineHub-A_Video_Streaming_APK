import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ShareButton from "../ShareButton";
import ShowToast, { ToastStatus } from "@/components/atoms/ShowToast";

// Mock the dependencies
jest.mock("@/components/atoms/ShowToast", () => {
  const mockShowToast = jest.fn();
  return {
    __esModule: true,
    default: mockShowToast,
    ToastStatus: {
      Failure: "Failure",
      Success: "Success",
    },
  };
});

describe("share button testcases", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock window.location
    delete window.location;
    window.location = { href: "http://test-url.com" };
  });

  it("initial render", () => {
    render(<ShareButton />);
    const button = screen.getByTestId("shareButton");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Share");
  });

  it("share success", async () => {
    // Mock successful clipboard write
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined),
      },
    });

    render(<ShareButton />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    // Verify success toast
    await waitFor(() => {
      expect(ShowToast).toHaveBeenCalledWith(
        ToastStatus.Success,
        "URL copied to the clipboard"
      );
    });
  });

  it("share failure", async () => {
    // Mock failed clipboard write
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockRejectedValue(new Error("Failed to copy URL")),
      },
    });

    render(<ShareButton />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    // Verify error toast
    await waitFor(() => {
      expect(ShowToast).toHaveBeenCalledWith(
        ToastStatus.Failure,
        "Failed to copy URL"
      );
    });
  });
});
