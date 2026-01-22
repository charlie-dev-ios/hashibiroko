import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import MobileNav from "@/components/navigation/mobile-nav";

describe("MobileNav", () => {
  it("should render hamburger menu button", () => {
    render(<MobileNav />);

    const button = screen.getByRole("button", { name: /メニュー/i });
    expect(button).toBeInTheDocument();
  });

  it("should show menu when hamburger button is clicked", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);

    const button = screen.getByRole("button", { name: /メニュー/i });
    await user.click(button);

    expect(screen.getByText("ポケモン図鑑")).toBeInTheDocument();
    expect(screen.getByText("ゲームメカニクス")).toBeInTheDocument();
    expect(screen.getByText("睡眠戦略")).toBeInTheDocument();
  });

  it("should render all navigation links", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);

    const button = screen.getByRole("button", { name: /メニュー/i });
    await user.click(button);

    const pokemonLink = screen.getByRole("link", { name: /ポケモン図鑑/i });
    expect(pokemonLink).toHaveAttribute("href", "/pokemon");

    const mechanicsLink = screen.getByRole("link", {
      name: /ゲームメカニクス/i,
    });
    expect(mechanicsLink).toHaveAttribute("href", "/mechanics");
  });
});
