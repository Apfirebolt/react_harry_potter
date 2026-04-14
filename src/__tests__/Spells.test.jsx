import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Spells from "../screens/Spells";

const { mockStore } = vi.hoisted(() => ({
  mockStore: {
    spells: [],
    fetchSpells: vi.fn(),
  },
}));

vi.mock("@/store.tsx", () => ({
  default: () => mockStore,
}));

const spellOne = {
  id: "s1",
  name: "Expelliarmus",
  description: "Disarming charm",
};

const spellTwo = {
  id: "s2",
  name: "Lumos",
  description: "Creates light from wand tip",
};

describe("Spells", () => {
  beforeEach(() => {
    mockStore.fetchSpells.mockReset();
    mockStore.fetchSpells.mockResolvedValue(undefined);
    mockStore.spells = [];
  });

  it("renders spells list and fetches on mount", async () => {
    mockStore.spells = [spellOne, spellTwo];

    render(<Spells />);

    await waitFor(() => {
      expect(mockStore.fetchSpells).toHaveBeenCalledTimes(1);
      expect(screen.getByText("Expelliarmus")).toBeInTheDocument();
      expect(screen.getByText("Lumos")).toBeInTheDocument();
    });
  });

  it("shows loader while fetching spells", async () => {
    let resolveRequest;

    mockStore.fetchSpells.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveRequest = () => {
            mockStore.spells = [spellOne];
            resolve();
          };
        })
    );

    const { container } = render(<Spells />);

    await waitFor(() => {
      expect(container.querySelector(".animate-spin")).toBeInTheDocument();
    });

    resolveRequest();

    await waitFor(() => {
      expect(screen.getByText("Expelliarmus")).toBeInTheDocument();
      expect(container.querySelector(".animate-spin")).not.toBeInTheDocument();
    });
  });
});
