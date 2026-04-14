import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MobStudents from "../screens/MobStudents";

const { mockNavigate, mockStore } = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
  mockStore: {
    students: [],
    fetchStudents: vi.fn(),
  },
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("@/mob-store.tsx", () => ({
  default: mockStore,
}));

vi.mock("mobx-react-lite", () => ({
  observer: (component) => component,
}));

vi.mock("react-spring", () => ({
  animated: {
    div: "div",
  },
  useTransition: (items) =>
    (renderItem) =>
      items.map((item) => renderItem({}, item)),
}));

const studentOne = {
  id: "1",
  name: "Harry Potter",
  species: "human",
  gender: "male",
  house: "Gryffindor",
  dateOfBirth: "31-07-1980",
  ancestry: "half-blood",
  eyeColour: "green",
  hairColour: "black",
  wand: { wood: "holly", core: "phoenix feather", length: 11 },
  patronus: "stag",
  actor: "Daniel Radcliffe",
  image: "harry.png",
};

const studentTwo = {
  id: "2",
  name: "Hermione Granger",
  species: "human",
  gender: "female",
  house: "Gryffindor",
  dateOfBirth: "19-09-1979",
  ancestry: "muggle-born",
  eyeColour: "brown",
  hairColour: "brown",
  wand: { wood: "vine", core: "dragon heartstring", length: 10.75 },
  patronus: "otter",
  actor: "Emma Watson",
  image: "hermione.png",
};

describe("MobStudents", () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    mockStore.fetchStudents.mockReset();
    mockStore.students = [];
  });

  it("renders students from store when already available", () => {
    mockStore.students = [studentOne, studentTwo];

    render(<MobStudents />);

    expect(screen.getByText("Hogwarts Students")).toBeInTheDocument();
    expect(screen.getByText("Harry Potter")).toBeInTheDocument();
    expect(screen.getByText("Hermione Granger")).toBeInTheDocument();
    expect(mockStore.fetchStudents).not.toHaveBeenCalled();
  });

  it("fetches students and shows loader while request is pending", async () => {
    let resolveRequest;

    mockStore.fetchStudents.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveRequest = () => {
            mockStore.students = [studentOne];
            resolve();
          };
        })
    );

    const { container } = render(<MobStudents />);

    await waitFor(() => {
      expect(mockStore.fetchStudents).toHaveBeenCalledTimes(1);
      expect(container.querySelector(".animate-spin")).toBeInTheDocument();
    });

    resolveRequest();

    await waitFor(() => {
      expect(screen.getByText("Harry Potter")).toBeInTheDocument();
      expect(container.querySelector(".animate-spin")).not.toBeInTheDocument();
    });
  });

  it("filters students by search text", () => {
    mockStore.students = [studentOne, studentTwo];

    render(<MobStudents />);

    fireEvent.change(screen.getByPlaceholderText("Search student"), {
      target: { value: "hermione" },
    });

    expect(screen.getByText("Hermione Granger")).toBeInTheDocument();
    expect(screen.queryByText("Harry Potter")).not.toBeInTheDocument();
  });

  it("navigates to character details when clicking view details", () => {
    mockStore.students = [studentOne];

    render(<MobStudents />);

    fireEvent.click(screen.getByRole("button", { name: "View Details" }));

    expect(mockNavigate).toHaveBeenCalledWith("/character/1");
  });
});
