// requirement-> 4 scenarios
//  react component -> render , fire ,screen -> to work
// 3rd party dependecy  -> In unit test case you have emulate all these 3rd party
// react-redux
// api
// toast

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useSelector } from "react-redux";
import ShowToast, { ToastStatus } from "@/components/atoms/ShowToast";
import { api } from "@/lib/api_endpoints";
import WishlistButton from "../TestingWishListButton";

// mock the 3rd party dependecy implementation
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

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
jest.mock("@/lib/api_endpoints", () => ({
  api: {
    post: jest.fn(),
  },
  ENDPOINT: {
    addToWishlist: "/addToWishlist",
  },
}));

describe("WishListButton", () => {
  const mockWishlist = { id: "123", title: "Test Movie" };
  // clear all mocks before every run
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("logged out render", () => {
    // scenario create
    useSelector.mockReturnValue({ isLoggedIn: false });

    // it should return empty component, no button nothing
    render(<WishlistButton wishlist={mockWishlist} />);

    // Verify button is not visible
    const button = screen.queryByTestId("watchlist");
    expect(button).not.toBeInTheDocument();
  });

  it("logged in render", () => {
    useSelector.mockReturnValue({ isLoggedIn: true });
    // it should return button
    // button text icon
    render(<WishlistButton wishlist={mockWishlist} />);
    const button = screen.queryByTestId("watchlist");
    expect(button).toBeInTheDocument();
  });

  it("add wishlist", async () => {
    // Mock user logged in
    useSelector.mockReturnValue({ isLoggedIn: true });
    // Mock API call that takes some time
    api.post.mockResolvedValue({
      status: 200,
    });
    // Render the component
    render(<WishlistButton wishlist={mockWishlist} />);
    const button = screen.getByTestId("watchlist");
    // when clicked :
    fireEvent.click(button);
    // Check for loading icon using testid
    expect(screen.getByTestId("loading-icon")).toBeInTheDocument();
    expect(button).toHaveClass("cursor-not-allowed");
    // manully call
    // Wait for the async operation to complete
    await waitFor(() => {
      expect(ShowToast).toHaveBeenCalledWith(
        ToastStatus.Success,
        "Added to Wishlist"
      );
    });
  });

  it("wishlist fail", async () => {
    // when clicked :
    // it should call the  backend function to add  wishlist
    //  during that -> loading
    // after that -> get this toast : wishlist added
    // Mock user logged in
    useSelector.mockReturnValue({ isLoggedIn: true });
    // Mock API call that takes some time
    api.post.mockRejectedValue({
      response: {
        data: {
          message: "wishlist error",
        },
      },
    });
    // when clicked :
    render(<WishlistButton wishlist={mockWishlist} />);
    const button = screen.queryByTestId("watchlist");
    fireEvent.click(button);
    // Check for loading icon using testid
    expect(screen.getByTestId("loading-icon")).toBeInTheDocument();
    expect(button).toHaveClass("cursor-not-allowed");
    // manully call
    // Wait for the async operation to complete
    await waitFor(() => {
      expect(ShowToast).toHaveBeenCalledWith(
        ToastStatus.Failure,
        "wishlist error"
      );
    });
  });
});
