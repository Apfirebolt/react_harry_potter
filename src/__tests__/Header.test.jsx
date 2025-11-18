import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HeaderComponent from "../components/Header";

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("HeaderComponent", () => {
  it("renders the header with title", () => {
    renderWithRouter(<HeaderComponent />);
    expect(screen.getByText("Harry Potter World")).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    renderWithRouter(<HeaderComponent />);
    expect(screen.getAllByText("Home")).toHaveLength(2); // Desktop and mobile
    expect(screen.getAllByText("Spells")).toHaveLength(2);
    expect(screen.getAllByText("Students")).toHaveLength(2);
    expect(screen.getAllByText("Staff")).toHaveLength(2);
    expect(screen.getAllByText("House")).toHaveLength(2);
  });

  it("toggles mobile menu when button is clicked", () => {
    renderWithRouter(<HeaderComponent />);
    const toggleButton = screen.getByRole("button", {
      name: /open main menu/i,
    });

    expect(toggleButton).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
  });

  it("closes mobile menu when close button is clicked", () => {
    renderWithRouter(<HeaderComponent />);
    const toggleButton = screen.getByRole("button", {
      name: /open main menu/i,
    });

    fireEvent.click(toggleButton);

    const closeButton = screen.getByRole("button", { name: "" });
    fireEvent.click(closeButton);

    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
  });

  it("renders correct link URLs", () => {
    renderWithRouter(<HeaderComponent />);
    const homeLinks = screen.getAllByRole("link", { name: "Home" });
    expect(homeLinks[0]).toHaveAttribute("href", "/");

    const spellsLinks = screen.getAllByRole("link", { name: "Spells" });
    expect(spellsLinks[0]).toHaveAttribute("href", "/spells");
  });

  it("desktop menu is visible on larger screens", () => {
    renderWithRouter(<HeaderComponent />);
    const desktopNav = screen
      .getByRole("navigation")
      .querySelector("#navbar-default");
    expect(desktopNav).toBeInTheDocument();
    expect(desktopNav).toHaveClass("hidden", "md:block");
  });
});
