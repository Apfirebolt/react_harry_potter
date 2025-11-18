import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FooterComponent from "../components/Footer";

describe("FooterComponent", () => {
  it("renders the footer component", () => {
    render(<FooterComponent />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it('displays "About the App" section with correct text', () => {
    render(<FooterComponent />);
    expect(screen.getByText("About the App")).toBeInTheDocument();
    expect(
      screen.getByText(/Welcome to the Harry Potter app/i)
    ).toBeInTheDocument();
  });

  it('displays "Contact Us" section with correct text', () => {
    render(<FooterComponent />);
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByText(/Have questions or feedback/i)).toBeInTheDocument();
  });

  it("renders email link with correct href", () => {
    render(<FooterComponent />);
    const emailLink = screen.getByRole("link", {
      name: /support@harrypotterapp.com/i,
    });
    expect(emailLink).toHaveAttribute(
      "href",
      "mailto:support@harrypotterapp.com"
    );
  });

  it("displays copyright text with year 2023", () => {
    render(<FooterComponent />);
    expect(screen.getByText(/© 2023 Copyright:/i)).toBeInTheDocument();
  });

  it("renders Harry Potter App link with correct href", () => {
    render(<FooterComponent />);
    const appLink = screen.getByRole("link", { name: /Harry Potter App/i });
    expect(appLink).toHaveAttribute("href", "https://harrypotterapp.com/");
  });
});
