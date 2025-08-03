import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { mockStyles } from "../../setup/mocks";

// Mock the SCSS module - must be hoisted
vi.mock("@/app/styles/dashboard/dashboard.module.scss", () => ({
  default: mockStyles,
}));

// Mock child components
vi.mock("@/components/dashboard/DashboardCards", () => ({
  default: ({
    icon,
    title,
    count,
  }: {
    icon: React.ReactNode;
    title: string;
    count: string;
  }) => (
    <div data-testid="dashboard-card">
      <div data-testid="card-icon">{icon}</div>
      <div data-testid="card-title">{title}</div>
      <div data-testid="card-count">{count}</div>
    </div>
  ),
}));

vi.mock("@/components/shared/LoadingPage", () => ({
  default: () => <div data-testid="loading-page">Loading...</div>,
}));

vi.mock("@/components/dashboard/DashboardTable", () => ({
  default: () => <div data-testid="dashboard-table">Dashboard Table</div>,
}));

// Mock LayoutContext
const mockSetSearchText = vi.fn();

vi.mock("@/components/layout/LayoutContext", () => ({
  useLayout: () => ({
    searchText: "",
    setSearchText: mockSetSearchText,
  }),
}));

// Mock icons
vi.mock("../../../public/icons", () => ({
  DashboardActiveIcon: (props: React.HTMLAttributes<HTMLSpanElement>) => (
    <span data-testid="active-icon" {...props}>
      Active Icon
    </span>
  ),
  DashboardLoansIcon: (props: React.HTMLAttributes<HTMLSpanElement>) => (
    <span data-testid="loans-icon" {...props}>
      Loans Icon
    </span>
  ),
  DashboardUserIcon: (props: React.HTMLAttributes<HTMLSpanElement>) => (
    <span data-testid="user-icon" {...props}>
      User Icon
    </span>
  ),
  SearchIcon: (props: React.HTMLAttributes<HTMLSpanElement>) => (
    <span data-testid="search-icon" {...props}>
      Search Icon
    </span>
  ),
}));

// Import the component after mocks
import DashboardPage from "@/app/dashboard/page";

describe("DashboardPage Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock setTimeout to avoid waiting in tests
    vi.useFakeTimers();

    // Ensure window is defined for dashboard loading logic
    global.window = global.window || {};
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  describe("Positive Scenarios", () => {
    it("should render loading page initially", () => {
      render(<DashboardPage />);

      expect(screen.getByTestId("loading-page")).toBeInTheDocument();
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("should render dashboard content after loading", async () => {
      render(<DashboardPage />);

      // Verify loading state is initially shown
      expect(screen.getByTestId("loading-page")).toBeInTheDocument();

      // Wait for the timer to complete and state to update
      await act(async () => {
        vi.advanceTimersByTime(1000);
      });

      // Verify dashboard content is rendered
      expect(screen.getByText("Users")).toBeInTheDocument();
      expect(screen.queryByTestId("loading-page")).not.toBeInTheDocument();
    });

    it("should render page title correctly", async () => {
      render(<DashboardPage />);

      await act(async () => {
        vi.advanceTimersByTime(1000);
      });

      const pageTitle = screen.getByText("Users");
      expect(pageTitle).toBeInTheDocument();
      expect(pageTitle.tagName).toBe("P"); // Check it's a paragraph element as expected
    });

    it("should render all dashboard cards", async () => {
      render(<DashboardPage />);

      await act(async () => {
        vi.advanceTimersByTime(1000);
      });

      const cards = screen.getAllByTestId("dashboard-card");
      expect(cards).toHaveLength(4);

      expect(screen.getByText("USERS")).toBeInTheDocument();
      expect(screen.getByText("ACTIVE USERS")).toBeInTheDocument();
      expect(screen.getByText("USERS WITH LOANS")).toBeInTheDocument();
      expect(screen.getByText("USERS WITH SAVINGS")).toBeInTheDocument();
    });

    it("should render dashboard cards with correct counts", async () => {
      render(<DashboardPage />);

      await act(async () => {
        vi.advanceTimersByTime(1000);
      });

      // Use getAllByText for duplicate counts and check specific ones exist
      const usersCount = screen.getAllByText("2,453");
      expect(usersCount).toHaveLength(2); // USERS and ACTIVE USERS both have this count

      expect(screen.getByText("12,453")).toBeInTheDocument(); // USERS WITH LOANS count
      expect(screen.getByText("102,453")).toBeInTheDocument(); // USERS WITH SAVINGS count
    });

    it("should render search input", async () => {
      render(<DashboardPage />);

      await act(async () => {
        vi.advanceTimersByTime(1000);
      });

      const searchInput = screen.getByPlaceholderText("Search for anything");
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveAttribute("type", "text");
    });

    it("should render search icon", async () => {
      render(<DashboardPage />);

      await act(async () => {
        vi.advanceTimersByTime(1000);
      });

      // Check if search icon is present (it might be wrapped or have different structure)
      const searchIconContainer = screen.getByPlaceholderText(
        "Search for anything"
      ).parentElement;
      expect(searchIconContainer).toBeInTheDocument();

      // Check if there's a search-icon or any icon element in the container
      // Since our mock renders all icons as "SVG Icon", we need to look for that
      const icons = screen.getAllByText("SVG Icon");
      expect(icons.length).toBeGreaterThan(0);

      // Also check for the search icon specifically by its data-testid
      const searchIcon = searchIconContainer?.querySelector(
        '[data-testid="svg-icon"]'
      );
      expect(searchIcon).toBeInTheDocument();
    });

    it("should render dashboard table", async () => {
      render(<DashboardPage />);

      await act(async () => {
        vi.advanceTimersByTime(1000);
      });

      expect(screen.getByTestId("dashboard-table")).toBeInTheDocument();
    });

    it("should handle search input changes", async () => {
      render(<DashboardPage />);

      await act(async () => {
        vi.advanceTimersByTime(1000);
      });

      const searchInput = screen.getByPlaceholderText("Search for anything");
      fireEvent.change(searchInput, { target: { value: "john doe" } });

      expect(mockSetSearchText).toHaveBeenCalledWith("john doe");
    });
  });

  describe("Negative Scenarios", () => {
    it("should handle loading state properly when component unmounts", () => {
      const { unmount } = render(<DashboardPage />);

      // Unmount before timer completes
      unmount();

      // Advance timer - should not cause any errors
      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(true).toBe(true); // Test passes if no errors thrown
    });

    it("should handle search input value changes", async () => {
      render(<DashboardPage />);

      await act(async () => {
        vi.advanceTimersByTime(1000);
      });

      const searchInput = screen.getByPlaceholderText("Search for anything");

      // Test that the search input is properly connected to the mock function
      await act(async () => {
        fireEvent.change(searchInput, { target: { value: "search query" } });
      });

      expect(mockSetSearchText).toHaveBeenCalledWith("search query");

      // Test that the input element itself works correctly
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveAttribute("type", "text");
      expect(searchInput).toHaveAttribute("placeholder", "Search for anything");
    });
  });

  describe("Loading Behavior", () => {
    it("should show loading for exactly 1 second", async () => {
      render(<DashboardPage />);

      // Should be loading initially
      expect(screen.getByTestId("loading-page")).toBeInTheDocument();

      // Advance by 999ms - should still be loading
      act(() => {
        vi.advanceTimersByTime(999);
      });
      expect(screen.getByTestId("loading-page")).toBeInTheDocument();

      // Advance by 1ms more - should stop loading
      await act(async () => {
        vi.advanceTimersByTime(1);
      });

      expect(screen.queryByTestId("loading-page")).not.toBeInTheDocument();
    });
  });
});
