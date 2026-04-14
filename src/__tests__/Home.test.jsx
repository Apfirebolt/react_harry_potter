import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../screens/Home";

const { mockNavigate, mockStore } = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
  mockStore: {
    characters: [],
    fetchCharacters: vi.fn(),
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

const characterOne = {
  id: "1",
  name: "Harry Potter",
  house: "Gryffindor",
  actor: "Daniel Radcliffe",
  species: "human",
  dateOfBirth: "31-07-1980",
  patronus: "stag",
  image: "harry.png",
};

const characterTwo = {
  id: "2",
  name: "Luna Lovegood",
  house: "Ravenclaw",
  actor: "Evanna Lynch",
  species: "human",
  dateOfBirth: "13-02-1981",
  patronus: "hare",
  image: "luna.png",
};

describe("Home", () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    mockStore.fetchCharacters.mockReset();
    mockStore.fetchCharacters.mockResolvedValue(undefined);
    mockStore.characters = [];
  });

  it("renders characters from store and does initial fetch", async () => {
    mockStore.characters = [characterOne, characterTwo];

    render(<Home />);

    await waitFor(() => {
      expect(mockStore.fetchCharacters).toHaveBeenCalledTimes(1);
      expect(screen.getByText("Luna Lovegood")).toBeInTheDocument();
    });
  });

  it("shows loader while fetch is pending", async () => {
    let resolveRequest;

    mockStore.fetchCharacters.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveRequest = () => {
            mockStore.characters = [characterOne];
            resolve();
          };
        })
    );

    const { container } = render(<Home />);

    await waitFor(() => {
      expect(container.querySelector(".animate-spin")).toBeInTheDocument();
    });

    resolveRequest();

    await waitFor(() => {
      expect(screen.getByRole("img", { name: "Harry Potter" })).toBeInTheDocument();
      expect(container.querySelector(".animate-spin")).not.toBeInTheDocument();
    });
  });

  it("filters characters by search text", async () => {
    mockStore.characters = [characterOne, characterTwo];

    render(<Home />);

    await screen.findByPlaceholderText("Search character");

    fireEvent.change(screen.getByPlaceholderText("Search character"), {
      target: { value: "luna" },
    });

    expect(screen.getByRole("heading", { level: 3, name: "Luna Lovegood" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 3, name: "Harry Potter" })).not.toBeInTheDocument();
  });

  it("navigates to character details on card click", async () => {
    mockStore.characters = [characterOne];

    render(<Home />);

    const cardImage = await screen.findByRole("img", { name: "Harry Potter" });
    fireEvent.click(cardImage);

    expect(mockNavigate).toHaveBeenCalledWith("/character/1");
  });
});
