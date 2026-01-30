import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import RecipeFilter from "@/components/recipes/recipe-filter";

describe("RecipeFilter", () => {
  const defaultProps = {
    selectedType: null,
    onTypeChange: vi.fn(),
    selectedIngredients: [] as string[],
    onIngredientsChange: vi.fn(),
    availableIngredients: ["あまいミツ", "マメミート", "とくせんエッグ"],
    potCapacity: null as number | null,
    onPotCapacityChange: vi.fn(),
  };

  describe("Pot Capacity Filter", () => {
    it("should render pot capacity section heading", () => {
      render(<RecipeFilter {...defaultProps} />);

      expect(
        screen.getByRole("heading", { name: "鍋容量", level: 3 }),
      ).toBeInTheDocument();
    });

    it("should render すべて button for clearing filter", () => {
      render(<RecipeFilter {...defaultProps} />);

      expect(
        screen.getByRole("button", { name: "鍋容量フィルターを解除" }),
      ).toBeInTheDocument();
    });

    it("should highlight すべて button when pot capacity is null", () => {
      render(<RecipeFilter {...defaultProps} potCapacity={null} />);

      const allButton = screen.getByRole("button", {
        name: "鍋容量フィルターを解除",
      });
      expect(allButton).toHaveAttribute("aria-pressed", "true");
    });

    it("should call onPotCapacityChange with null when すべて button is clicked", () => {
      const onPotCapacityChange = vi.fn();
      render(
        <RecipeFilter
          {...defaultProps}
          potCapacity={15}
          onPotCapacityChange={onPotCapacityChange}
        />,
      );

      const allButton = screen.getByRole("button", {
        name: "鍋容量フィルターを解除",
      });
      fireEvent.click(allButton);

      expect(onPotCapacityChange).toHaveBeenCalledWith(null);
    });

    it("should display pot capacity badge in filter summary when set", () => {
      render(<RecipeFilter {...defaultProps} potCapacity={50} />);

      expect(screen.getByText("鍋容量 50")).toBeInTheDocument();
    });
  });

  describe("Pot Capacity Presets", () => {
    it("should render 8 preset buttons", () => {
      render(<RecipeFilter {...defaultProps} />);

      expect(screen.getByRole("button", { name: /Lv\.1/ })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Lv\.2/ })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Lv\.3/ })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Lv\.4/ })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Lv\.5/ })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Lv\.6/ })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Lv\.7/ })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Lv\.8/ })).toBeInTheDocument();
    });

    it("should call onPotCapacityChange with preset value when clicked", () => {
      const onPotCapacityChange = vi.fn();
      render(
        <RecipeFilter
          {...defaultProps}
          onPotCapacityChange={onPotCapacityChange}
        />,
      );

      const lv1Button = screen.getByRole("button", { name: /Lv\.1/ });
      fireEvent.click(lv1Button);

      expect(onPotCapacityChange).toHaveBeenCalledWith(15);
    });

    it("should highlight active preset button", () => {
      render(<RecipeFilter {...defaultProps} potCapacity={15} />);

      const lv1Button = screen.getByRole("button", { name: /Lv\.1/ });
      expect(lv1Button).toHaveAttribute("aria-pressed", "true");
    });

    it("should not highlight inactive preset buttons", () => {
      render(<RecipeFilter {...defaultProps} potCapacity={15} />);

      const lv2Button = screen.getByRole("button", { name: /Lv\.2/ });
      expect(lv2Button).toHaveAttribute("aria-pressed", "false");
    });

    it("should not highlight すべて when a preset is selected", () => {
      render(<RecipeFilter {...defaultProps} potCapacity={15} />);

      const allButton = screen.getByRole("button", {
        name: "鍋容量フィルターを解除",
      });
      expect(allButton).toHaveAttribute("aria-pressed", "false");
    });
  });

  describe("Type Filter (existing)", () => {
    it("should render type filter buttons", () => {
      render(<RecipeFilter {...defaultProps} />);

      expect(
        screen.getByRole("button", { name: "すべての料理種別を表示" }),
      ).toBeInTheDocument();
      expect(screen.getByText("カレー・シチュー")).toBeInTheDocument();
      expect(screen.getByText("サラダ")).toBeInTheDocument();
      expect(screen.getByText("デザート")).toBeInTheDocument();
    });
  });
});
