import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Staff from "../screens/Staff";

const { mockNavigate, mockStore } = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
  mockStore: {
    staff: [],
    fetchStaff: vi.fn(),
  },
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("@/store.tsx", () => ({
  default: () => mockStore,
}));

const staffMemberOne = {
  id: "a1",
  name: "Minerva McGonagall",
  house: "Gryffindor",
  actor: "Maggie Smith",
  patronus: "cat",
  image: "mcgonagall.png",
};

const staffMemberTwo = {
  id: "a2",
  name: "Severus Snape",
  house: "Slytherin",
  actor: "Alan Rickman",
  patronus: "doe",
  image: "snape.png",
};

describe("Staff", () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    mockStore.fetchStaff.mockReset();
    mockStore.fetchStaff.mockResolvedValue(undefined);
    mockStore.staff = [];
  });

  it("renders staff cards and fetches on mount", async () => {
    mockStore.staff = [staffMemberOne, staffMemberTwo];

    render(<Staff />);

    await waitFor(() => {
      expect(mockStore.fetchStaff).toHaveBeenCalledTimes(1);
      expect(screen.getByText("Minerva McGonagall")).toBeInTheDocument();
      expect(screen.getByText("Severus Snape")).toBeInTheDocument();
    });
  });

  it("shows empty state when no staff match search", async () => {
    mockStore.staff = [staffMemberOne];

    render(<Staff />);

    await screen.findByPlaceholderText("Search staff");

    fireEvent.change(screen.getByPlaceholderText("Search staff"), {
      target: { value: "snape" },
    });

    expect(screen.getByText("No staff members found")).toBeInTheDocument();
  });

  it("navigates to profile when view button is clicked", async () => {
    mockStore.staff = [staffMemberOne];

    render(<Staff />);

    const viewProfileButton = await screen.findByRole("button", {
      name: "View Full Profile",
    });
    fireEvent.click(viewProfileButton);

    expect(mockNavigate).toHaveBeenCalledWith("/character/a1");
  });

  it("shows loader while staff fetch is pending", async () => {
    let resolveRequest;

    mockStore.fetchStaff.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveRequest = () => {
            mockStore.staff = [staffMemberOne];
            resolve();
          };
        })
    );

    const { container } = render(<Staff />);

    await waitFor(() => {
      expect(container.querySelector(".animate-spin")).toBeInTheDocument();
    });

    resolveRequest();

    await waitFor(() => {
      expect(screen.getByText("Minerva McGonagall")).toBeInTheDocument();
      expect(container.querySelector(".animate-spin")).not.toBeInTheDocument();
    });
  });
});
