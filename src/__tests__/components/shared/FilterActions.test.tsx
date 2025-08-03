import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// Mock the SCSS module before importing the component
vi.mock("@/app/styles/filter-actions.module.scss", () => ({
  default: {
    filterActions: "filterActions",
    resetButton: "resetButton",
    filterButton: "filterButton",
  },
}));

import FilterActions from "@/components/shared/FilterActions";

describe("FilterActions Component", () => {
  describe("Positive Scenarios", () => {
    it("should render reset and filter buttons with default text", () => {
      const mockOnReset = vi.fn();
      const mockOnFilter = vi.fn();

      render(<FilterActions onReset={mockOnReset} onFilter={mockOnFilter} />);

      expect(screen.getByText("Reset")).toBeInTheDocument();
      expect(screen.getByText("Filter")).toBeInTheDocument();
    });

    it("should render custom button text when provided", () => {
      const mockOnReset = vi.fn();
      const mockOnFilter = vi.fn();

      render(
        <FilterActions
          onReset={mockOnReset}
          onFilter={mockOnFilter}
          resetText="Clear All"
          filterText="Apply Filters"
        />
      );

      expect(screen.getByText("Clear All")).toBeInTheDocument();
      expect(screen.getByText("Apply Filters")).toBeInTheDocument();
    });

    it("should call onReset when reset button is clicked", () => {
      const mockOnReset = vi.fn();
      const mockOnFilter = vi.fn();

      render(<FilterActions onReset={mockOnReset} onFilter={mockOnFilter} />);

      const resetButton = screen.getByText("Reset");
      fireEvent.click(resetButton);

      expect(mockOnReset).toHaveBeenCalledTimes(1);
    });

    it("should call onFilter when filter button is clicked", () => {
      const mockOnReset = vi.fn();
      const mockOnFilter = vi.fn();

      render(<FilterActions onReset={mockOnReset} onFilter={mockOnFilter} />);

      const filterButton = screen.getByText("Filter");
      fireEvent.click(filterButton);

      expect(mockOnFilter).toHaveBeenCalledTimes(1);
    });

    it("should apply custom className when provided", () => {
      const mockOnReset = vi.fn();
      const mockOnFilter = vi.fn();

      render(
        <FilterActions
          onReset={mockOnReset}
          onFilter={mockOnFilter}
          className="custom-class"
        />
      );

      const container = screen.getByText("Reset").parentElement;
      expect(container).toHaveClass("filterActions", "custom-class");
    });

    it("should show loading text when isLoading is true", () => {
      const mockOnReset = vi.fn();
      const mockOnFilter = vi.fn();

      render(
        <FilterActions
          onReset={mockOnReset}
          onFilter={mockOnFilter}
          isLoading={true}
        />
      );

      expect(screen.getByText("Filtering...")).toBeInTheDocument();
      expect(screen.queryByText("Filter")).not.toBeInTheDocument();
    });

    it("should disable buttons when disabled prop is true", () => {
      const mockOnReset = vi.fn();
      const mockOnFilter = vi.fn();

      render(
        <FilterActions
          onReset={mockOnReset}
          onFilter={mockOnFilter}
          disabled={true}
        />
      );

      const resetButton = screen.getByText("Reset");
      const filterButton = screen.getByText("Filter");

      expect(resetButton).toBeDisabled();
      expect(filterButton).toBeDisabled();
    });
  });

  describe("Negative Scenarios", () => {
    it("should render without crashing when callbacks are undefined", () => {
      render(<FilterActions />);

      expect(screen.getByText("Reset")).toBeInTheDocument();
      expect(screen.getByText("Filter")).toBeInTheDocument();
    });

    it("should not call undefined onReset when reset button is clicked", () => {
      render(<FilterActions />);

      const resetButton = screen.getByText("Reset");

      // Should not throw an error
      expect(() => fireEvent.click(resetButton)).not.toThrow();
    });

    it("should not call undefined onFilter when filter button is clicked", () => {
      render(<FilterActions />);

      const filterButton = screen.getByText("Filter");

      // Should not throw an error
      expect(() => fireEvent.click(filterButton)).not.toThrow();
    });

    it("should disable filter button when both disabled and isLoading are true", () => {
      const mockOnReset = vi.fn();
      const mockOnFilter = vi.fn();

      render(
        <FilterActions
          onReset={mockOnReset}
          onFilter={mockOnFilter}
          disabled={true}
          isLoading={true}
        />
      );

      const filterButton = screen.getByText("Filtering...");
      expect(filterButton).toBeDisabled();
    });

    it("should disable filter button when only isLoading is true", () => {
      const mockOnReset = vi.fn();
      const mockOnFilter = vi.fn();

      render(
        <FilterActions
          onReset={mockOnReset}
          onFilter={mockOnFilter}
          isLoading={true}
        />
      );

      const filterButton = screen.getByText("Filtering...");
      expect(filterButton).toBeDisabled();
    });

    it("should not call onFilter when filter button is disabled and clicked", () => {
      const mockOnReset = vi.fn();
      const mockOnFilter = vi.fn();

      render(
        <FilterActions
          onReset={mockOnReset}
          onFilter={mockOnFilter}
          disabled={true}
        />
      );

      const filterButton = screen.getByText("Filter");
      fireEvent.click(filterButton);

      expect(mockOnFilter).not.toHaveBeenCalled();
    });

    it("should not call onReset when reset button is disabled and clicked", () => {
      const mockOnReset = vi.fn();
      const mockOnFilter = vi.fn();

      render(
        <FilterActions
          onReset={mockOnReset}
          onFilter={mockOnFilter}
          disabled={true}
        />
      );

      const resetButton = screen.getByText("Reset");
      fireEvent.click(resetButton);

      expect(mockOnReset).not.toHaveBeenCalled();
    });

    it("should handle empty string className gracefully", () => {
      const mockOnReset = vi.fn();
      const mockOnFilter = vi.fn();

      render(
        <FilterActions
          onReset={mockOnReset}
          onFilter={mockOnFilter}
          className=""
        />
      );

      const container = screen.getByText("Reset").parentElement;
      expect(container).toHaveClass("filterActions");
    });

    it("should handle null className gracefully", () => {
      const mockOnReset = vi.fn();
      const mockOnFilter = vi.fn();

      render(
        <FilterActions
          onReset={mockOnReset}
          onFilter={mockOnFilter}
          className={undefined}
        />
      );

      const container = screen.getByText("Reset").parentElement;
      expect(container).toHaveClass("filterActions");
    });
  });

  describe("Button States", () => {
    it("should have correct button types", () => {
      const mockOnReset = vi.fn();
      const mockOnFilter = vi.fn();

      render(<FilterActions onReset={mockOnReset} onFilter={mockOnFilter} />);

      const resetButton = screen.getByText("Reset");
      const filterButton = screen.getByText("Filter");

      expect(resetButton).toHaveAttribute("type", "button");
      expect(filterButton).toHaveAttribute("type", "button");
    });

    it("should apply correct CSS classes", () => {
      const mockOnReset = vi.fn();
      const mockOnFilter = vi.fn();

      render(<FilterActions onReset={mockOnReset} onFilter={mockOnFilter} />);

      const resetButton = screen.getByText("Reset");
      const filterButton = screen.getByText("Filter");

      expect(resetButton).toHaveClass("resetButton");
      expect(filterButton).toHaveClass("filterButton");
    });

    it("should maintain button functionality after multiple clicks", () => {
      const mockOnReset = vi.fn();
      const mockOnFilter = vi.fn();

      render(<FilterActions onReset={mockOnReset} onFilter={mockOnFilter} />);

      const resetButton = screen.getByText("Reset");
      const filterButton = screen.getByText("Filter");

      // Click multiple times
      fireEvent.click(resetButton);
      fireEvent.click(filterButton);
      fireEvent.click(resetButton);
      fireEvent.click(filterButton);

      expect(mockOnReset).toHaveBeenCalledTimes(2);
      expect(mockOnFilter).toHaveBeenCalledTimes(2);
    });
  });
});
