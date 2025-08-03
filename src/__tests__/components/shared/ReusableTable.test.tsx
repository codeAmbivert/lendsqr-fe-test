import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Mock the SCSS module before importing the component
vi.mock("@/app/styles/reusable-table.module.scss", () => ({
  default: {
    loading: "loading",
    table_container: "table_container",
    table: "table",
    table_header: "table_header",
    table_body: "table_body",
    table_row: "table_row",
    table_cell: "table_cell",
    table_footer: "table_footer",
    rows_per_page: "rows_per_page",
    pagination: "pagination",
    nav_button: "nav_button",
    active: "active",
    empty_state: "empty_state",
    empty_state_content: "empty_state_content",
    empty_state_icon: "empty_state_icon",
    empty_state_title: "empty_state_title",
    empty_state_message: "empty_state_message",
    mobile_cards: "mobile_cards",
    mobile_card: "mobile_card",
  },
}));

// Global mock for Next.js router
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

import ReusableTable from "@/components/shared/ReusableTable";
import { User, Filters } from "@/helpers/types";

// ...existing code...

// Mock LayoutContext
vi.mock("@/components/layout/LayoutContext", () => ({
  useLayout: () => ({
    searchText: "",
    setSearchText: vi.fn(),
  }),
}));

// Mock utils
vi.mock("@/helpers/utils", () => ({
  formatPhoneNumber: vi.fn((phone) => (phone ? phone.replace(/\D/g, "") : "")),
}));

// Mock CustomSelect component
vi.mock("@/components/shared/CustomSelect", () => ({
  default: ({
    value,
    onChange,
    options,
  }: {
    value: number;
    onChange: (val: number) => void;
    options: Array<{ value: number; label: string }>;
  }) => (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      data-testid="rows-per-page-select"
    >
      {options.map((option: { value: number; label: string }) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  ),
}));

// Mock icons
vi.mock("../../../public/icons", () => ({
  RightAngleIcon: () => <span data-testid="right-angle-icon">→</span>,
}));

describe("ReusableTable Component", () => {
  const mockHeaders = [
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    { id: "status", label: "Status" },
    { id: "action", label: "" },
  ];

  const mockUsers: User[] = [
    {
      _id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phoneNumber: "+2348123456789",
      dateJoined: "2023-01-01T00:00:00.000Z",
      status: "Active",
      organization: "Lendsqr",
      bvn: 12345678901,
      gender: "Male",
      maritalStatus: "Single",
      children: "None",
      residenceType: "Parent's Apartment",
      educationLevel: "B.Sc",
      employmentStats: "Employed",
      sector: "FinTech",
      employmentDuration: "2 years",
      officeEmail: "john.doe@company.com",
      monthlyIncome: "₦200,000.00",
      loanRepayment: "₦40,000.00",
      guarantor: [],
    },
    {
      _id: "2",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      phoneNumber: "+2348123456788",
      dateJoined: "2023-01-02T00:00:00.000Z",
      status: "Inactive",
      organization: "Irorun",
      bvn: 12345678902,
      gender: "Female",
      maritalStatus: "Married",
      children: "2",
      residenceType: "Own Apartment",
      educationLevel: "M.Sc",
      employmentStats: "Employed",
      sector: "Education",
      employmentDuration: "3 years",
      officeEmail: "jane.smith@company.com",
      monthlyIncome: "₦300,000.00",
      loanRepayment: "₦60,000.00",
      guarantor: [],
    },
  ];

  const mockDataTransformer = (data: User[]) => {
    return data.map((user) => ({
      id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      status: user.status,
      action: "Actions",
    }));
  };

  const mockFilters: Filters = {
    organization: "",
    username: "",
    email: "",
    dateJoined: null,
    phoneNumber: "",
    status: "",
  };

  // Mock fetch globally
  const mockFetch = vi.fn();
  global.fetch = mockFetch;

  // Helper function to mock localStorage
  const mockLocalStorage = (getItemReturn: string | null) => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: vi.fn(() => getItemReturn),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
      configurable: true,
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockClear();

    // Mock successful fetch response
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockUsers,
    });

    // Mock localStorage with default data
    mockLocalStorage(JSON.stringify(mockUsers));

    // Mock window.innerWidth for mobile detection
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });

    // Mock window.addEventListener and removeEventListener
    window.addEventListener = vi.fn();
    window.removeEventListener = vi.fn();
  });

  describe("Positive Scenarios", () => {
    it("should render loading state initially", () => {
      // Mock localStorage to return null to trigger loading state
      mockLocalStorage(null);

      render(
        <ReusableTable
          headers={mockHeaders}
          url="https://test-api.com"
          dataTransformer={mockDataTransformer}
          filters={mockFilters}
        />
      );

      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("should fetch and display data from API", async () => {
      // Mock localStorage to return null to force API call
      mockLocalStorage(null);

      render(
        <ReusableTable
          headers={mockHeaders}
          url="https://test-api.com"
          dataTransformer={mockDataTransformer}
          filters={mockFilters}
        />
      );

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith("https://test-api.com");
      });

      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("jane@example.com")).toBeInTheDocument();
      });
    });

    it("should render table headers correctly", async () => {
      render(
        <ReusableTable
          headers={mockHeaders}
          url="https://test-api.com"
          dataTransformer={mockDataTransformer}
          filters={mockFilters}
        />
      );

      await waitFor(() => {
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("Email")).toBeInTheDocument();
        expect(screen.getByText("Status")).toBeInTheDocument();
      });
    });

    it("should render pagination controls", async () => {
      render(
        <ReusableTable
          headers={mockHeaders}
          url="https://test-api.com"
          dataTransformer={mockDataTransformer}
          filters={mockFilters}
        />
      );

      await waitFor(() => {
        expect(screen.getByTestId("rows-per-page-select")).toBeInTheDocument();
        expect(screen.getByText("1")).toBeInTheDocument(); // Page number
      });
    });

    it("should handle rows per page change", async () => {
      render(
        <ReusableTable
          headers={mockHeaders}
          url="https://test-api.com"
          dataTransformer={mockDataTransformer}
          filters={mockFilters}
        />
      );

      await waitFor(() => {
        const select = screen.getByTestId(
          "rows-per-page-select"
        ) as HTMLSelectElement;
        fireEvent.change(select, { target: { value: "25" } });
        expect(select.value).toBe("25");
      });
    });

    it("should handle pagination navigation", async () => {
      const manyUsers = Array.from({ length: 15 }, (_, i) => ({
        ...mockUsers[0],
        _id: `${i + 1}`,
        firstName: `User${i + 1}`,
        email: `user${i + 1}@example.com`,
      }));

      // Clear all previous mocks
      vi.clearAllMocks();
      mockFetch.mockClear();

      // Mock localStorage to return null to force API call
      mockLocalStorage(null);

      // Set up the mock for this specific test
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => manyUsers,
      });

      render(
        <ReusableTable
          headers={mockHeaders}
          url="https://test-api.com"
          dataTransformer={mockDataTransformer}
          filters={mockFilters}
        />
      );

      // Wait for API call and data to load
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith("https://test-api.com");
      });

      await waitFor(() => {
        expect(screen.getByText("User1 Doe")).toBeInTheDocument();
      });

      // Click next page
      const nextButton = screen.getByText("2");
      fireEvent.click(nextButton);

      await waitFor(() => {
        expect(screen.getByText("User11 Doe")).toBeInTheDocument();
      });
    });

    it("should load data from localStorage when API fails", async () => {
      mockFetch.mockRejectedValue(new Error("API Error"));

      render(
        <ReusableTable
          headers={mockHeaders}
          url="https://test-api.com"
          dataTransformer={mockDataTransformer}
          filters={mockFilters}
        />
      );

      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
      });
    });

    it("should handle row click navigation", async () => {
      render(
        <ReusableTable
          headers={mockHeaders}
          url="https://test-api.com"
          dataTransformer={mockDataTransformer}
          filters={mockFilters}
        />
      );

      await waitFor(() => {
        const row = screen.getByText("John Doe").closest("tr");
        if (row) {
          fireEvent.click(row);
          expect(mockPush).toHaveBeenCalledWith("/dashboard/1");
        }
      });
    });
  });

  describe("Negative Scenarios", () => {
    it("should handle API fetch failure gracefully", async () => {
      mockFetch.mockRejectedValue(new Error("Network error"));

      render(
        <ReusableTable
          headers={mockHeaders}
          url="https://test-api.com"
          dataTransformer={mockDataTransformer}
          filters={mockFilters}
        />
      );

      await waitFor(() => {
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      });
    });

    it("should handle empty data gracefully", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => [],
      });

      mockLocalStorage(null);

      render(
        <ReusableTable
          headers={mockHeaders}
          url="https://test-api.com"
          dataTransformer={mockDataTransformer}
          filters={mockFilters}
        />
      );

      await waitFor(() => {
        expect(screen.getByText("No users found")).toBeInTheDocument();
        expect(
          screen.getByText("There are no users to display at the moment.")
        ).toBeInTheDocument();
      });
    });

    it("should handle invalid API response", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
      });

      render(
        <ReusableTable
          headers={mockHeaders}
          url="https://test-api.com"
          dataTransformer={mockDataTransformer}
          filters={mockFilters}
        />
      );

      await waitFor(() => {
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      });
    });

    it("should handle missing localStorage data", async () => {
      mockFetch.mockRejectedValue(new Error("API Error"));

      mockLocalStorage(null);

      render(
        <ReusableTable
          headers={mockHeaders}
          url="https://test-api.com"
          dataTransformer={mockDataTransformer}
          filters={mockFilters}
        />
      );

      await waitFor(() => {
        expect(screen.getByText("No users found")).toBeInTheDocument();
      });
    });

    it("should handle malformed localStorage data", async () => {
      mockFetch.mockRejectedValue(new Error("API Error"));

      mockLocalStorage("invalid json");

      render(
        <ReusableTable
          headers={mockHeaders}
          url="https://test-api.com"
          dataTransformer={mockDataTransformer}
          filters={mockFilters}
        />
      );

      await waitFor(() => {
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      });
    });

    it("should handle pagination edge cases", async () => {
      render(
        <ReusableTable
          headers={mockHeaders}
          url="https://test-api.com"
          dataTransformer={mockDataTransformer}
          filters={mockFilters}
        />
      );

      await waitFor(() => {
        // Previous button should be disabled on first page
        const prevButton = screen
          .getAllByTestId("svg-icon")[0]
          .closest("button");
        expect(prevButton).toBeDisabled();
      });
    });
  });

  describe("Filter Functionality", () => {
    it("should filter data based on organization filter", async () => {
      const filtersWithOrg: Filters = {
        ...mockFilters,
        organization: "Lendsqr",
      };

      render(
        <ReusableTable
          headers={mockHeaders}
          url="https://test-api.com"
          dataTransformer={mockDataTransformer}
          filters={filtersWithOrg}
        />
      );

      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
      });
    });

    it("should filter data based on status filter", async () => {
      const filtersWithStatus: Filters = {
        ...mockFilters,
        status: "Active",
      };

      render(
        <ReusableTable
          headers={mockHeaders}
          url="https://test-api.com"
          dataTransformer={mockDataTransformer}
          filters={filtersWithStatus}
        />
      );

      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
      });
    });

    it("should filter data based on email filter", async () => {
      const filtersWithEmail: Filters = {
        ...mockFilters,
        email: "john",
      };

      render(
        <ReusableTable
          headers={mockHeaders}
          url="https://test-api.com"
          dataTransformer={mockDataTransformer}
          filters={filtersWithEmail}
        />
      );

      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
      });
    });

    it("should show empty state when filters match no data", async () => {
      const filtersWithNoMatch: Filters = {
        ...mockFilters,
        status: "NonExistentStatus",
      };

      render(
        <ReusableTable
          headers={mockHeaders}
          url="https://test-api.com"
          dataTransformer={mockDataTransformer}
          filters={filtersWithNoMatch}
        />
      );

      await waitFor(() => {
        expect(screen.getByText("No users found")).toBeInTheDocument();
        expect(
          screen.getByText(
            "Try adjusting your search or filters to find what you're looking for."
          )
        ).toBeInTheDocument();
      });
    });
  });

  describe("Mobile Responsiveness", () => {
    it("should render mobile cards on small screens", async () => {
      // Mock mobile screen size
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 500,
      });

      render(
        <ReusableTable
          headers={mockHeaders}
          url="https://test-api.com"
          dataTransformer={mockDataTransformer}
          filters={mockFilters}
        />
      );

      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
      });
    });
  });

  describe("Refresh Functionality", () => {
    it("should refresh data when refreshTable prop is true", async () => {
      // Mock localStorage to return null to force API call
      mockLocalStorage(null);

      const { rerender } = render(
        <ReusableTable
          headers={mockHeaders}
          url="https://test-api.com"
          dataTransformer={mockDataTransformer}
          filters={mockFilters}
          refreshTable={false}
          setRefreshTable={vi.fn()}
        />
      );

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledTimes(1);
      });

      rerender(
        <ReusableTable
          headers={mockHeaders}
          url="https://test-api.com"
          dataTransformer={mockDataTransformer}
          filters={mockFilters}
          refreshTable={true}
          setRefreshTable={vi.fn()}
        />
      );

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledTimes(2);
      });
    });
  });
});
