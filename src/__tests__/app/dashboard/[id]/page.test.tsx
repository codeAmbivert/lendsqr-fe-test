import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { User } from "@/helpers/types";
import { mockStyles } from "../../../setup/mocks";

// Mock the SCSS modules - must be hoisted
vi.mock("@/app/styles/dashboard/dashboard-id-page.module.scss", () => ({
  default: mockStyles,
}));

// Import component after mocks
import UserDetail from "@/app/dashboard/[id]/page";

// Mock next/navigation
const mockPush = vi.fn();
const mockBack = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
  }),
  useParams: () => ({
    id: "test-user-id",
  }),
}));

// Mock fonts
vi.mock("next/font/google", () => ({
  Work_Sans: () => ({
    className: "work-sans-font",
  }),
}));

// Mock child components
vi.mock("@/components/dashboard/idPage/DetailsAndStateButtons", () => ({
  default: ({
    user,
    pageState,
    setPageState,
  }: {
    user: User | null;
    pageState: string;
    setPageState: (state: string) => void;
  }) => (
    <div data-testid="details-and-state-buttons">
      <div data-testid="current-user">
        {user?.firstName} {user?.lastName}
      </div>
      <div data-testid="current-state">{pageState}</div>
      <button
        onClick={() => setPageState("BankDetails")}
        data-testid="bank-details-btn"
      >
        Bank Details
      </button>
      <button onClick={() => setPageState("Loans")} data-testid="loans-btn">
        Loans
      </button>
    </div>
  ),
}));

vi.mock("@/components/dashboard/idPage/InfoSection", () => ({
  default: ({
    title,
    items,
  }: {
    title: string;
    items: Array<{
      key: string;
      label: string;
      value: string | number | null | undefined;
    }>;
  }) => (
    <div
      data-testid={`info-section-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <h3>{title}</h3>
      {items.map(
        (
          item: {
            key: string;
            label: string;
            value: string | number | null | undefined;
          },
          index: number
        ) => (
          <div key={index} data-testid={`info-item-${item.key}`}>
            <span>
              {item.label}: {item.value}
            </span>
          </div>
        )
      )}
    </div>
  ),
}));

describe("UserDetail Component", () => {
  const mockUser: User = {
    _id: "test-user-id",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
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
    guarantor: [
      {
        name: "Jane Doe",
        phoneNumber: "+2348123456788",
        email: "jane.doe@example.com",
        relationship: "Sister",
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Ensure window exists before defining localStorage
    if (typeof window !== "undefined") {
      // Mock localStorage with user data
      Object.defineProperty(window, "localStorage", {
        value: {
          getItem: vi.fn(() => JSON.stringify([mockUser])),
          setItem: vi.fn(),
          removeItem: vi.fn(),
          clear: vi.fn(),
        },
        writable: true,
      });
    }
  });

  describe("Positive Scenarios", () => {
    // it("should render back button and handle click", () => {
    //   render(<UserDetail />);

    //   const backButton = screen.getByText("Back to Users");
    //   expect(backButton).toBeInTheDocument();
    //   expect(screen.getByTestId("back-icon")).toBeInTheDocument();

    //   fireEvent.click(backButton);
    //   expect(mockBack).toHaveBeenCalled();
    // });

    // it("should render user details header", () => {
    //   render(<UserDetail />);

    //   expect(screen.getByText("User Details")).toBeInTheDocument();
    // });

    it("should render action buttons", () => {
      render(<UserDetail />);

      expect(screen.getByText("BLACKLIST USER")).toBeInTheDocument();
      expect(screen.getByText("DEACTIVATE USER")).toBeInTheDocument();
    });

    it("should load user data from localStorage", async () => {
      render(<UserDetail />);

      await waitFor(() => {
        expect(screen.getByTestId("current-user")).toHaveTextContent(
          "John Doe"
        );
      });
    });

    it("should render DetailsAndStateButtons component", async () => {
      render(<UserDetail />);

      await waitFor(() => {
        expect(
          screen.getByTestId("details-and-state-buttons")
        ).toBeInTheDocument();
      });
    });

    it("should handle page state changes", async () => {
      render(<UserDetail />);

      await waitFor(() => {
        expect(screen.getByTestId("current-state")).toHaveTextContent(
          "GeneralDetails"
        );
      });

      const bankDetailsBtn = screen.getByTestId("bank-details-btn");
      fireEvent.click(bankDetailsBtn);

      expect(screen.getByTestId("current-state")).toHaveTextContent(
        "BankDetails"
      );
    });

    it("should render personal information section for GeneralDetails state", async () => {
      render(<UserDetail />);

      await waitFor(() => {
        expect(
          screen.getByTestId("info-section-personal-information")
        ).toBeInTheDocument();
        expect(screen.getByTestId("info-item-fullName")).toHaveTextContent(
          "Full Name: John Doe"
        );
        expect(screen.getByTestId("info-item-email")).toHaveTextContent(
          "Email Address: john.doe@example.com"
        );
      });
    });

    it("should render education and employment section for GeneralDetails state", async () => {
      render(<UserDetail />);

      await waitFor(() => {
        expect(
          screen.getByTestId("info-section-education-and-employment")
        ).toBeInTheDocument();
        expect(
          screen.getByTestId("info-item-educationLevel")
        ).toHaveTextContent("Level of Education: B.Sc");
        expect(
          screen.getByTestId("info-item-employmentStats")
        ).toHaveTextContent("Employment Status: Employed");
      });
    });

    it("should render socials section for GeneralDetails state", async () => {
      render(<UserDetail />);

      await waitFor(() => {
        expect(screen.getByTestId("info-section-socials")).toBeInTheDocument();
        expect(screen.getByTestId("info-item-twitter")).toHaveTextContent(
          "Twitter: @john_doe"
        );
        expect(screen.getByTestId("info-item-facebook")).toHaveTextContent(
          "Facebook: John Doe"
        );
      });
    });

    it("should render guarantor section for GeneralDetails state", async () => {
      render(<UserDetail />);

      await waitFor(() => {
        expect(
          screen.getByTestId("info-section-guarantor")
        ).toBeInTheDocument();
        expect(
          screen.getByTestId("info-item-guarantor0_name")
        ).toHaveTextContent("Full Name: Jane Doe");
        expect(
          screen.getByTestId("info-item-guarantor0_relationship")
        ).toHaveTextContent("Relationship: Sister");
      });
    });

    it("should handle blacklist user action", async () => {
      render(<UserDetail />);

      await waitFor(() => {
        const blacklistBtn = screen.getByText("BLACKLIST USER");
        fireEvent.click(blacklistBtn);

        expect(localStorage.setItem).toHaveBeenCalled();
      });
    });

    it("should handle activate/deactivate user action", async () => {
      render(<UserDetail />);

      await waitFor(() => {
        const activateBtn = screen.getByText("DEACTIVATE USER");
        fireEvent.click(activateBtn);

        expect(localStorage.setItem).toHaveBeenCalled();
      });
    });

    it("should toggle button text based on user status", async () => {
      const blacklistedUser = { ...mockUser, status: "Blacklisted" };
      Object.defineProperty(window, "localStorage", {
        value: {
          getItem: vi.fn(() => JSON.stringify([blacklistedUser])),
          setItem: vi.fn(),
        },
        writable: true,
      });

      render(<UserDetail />);

      await waitFor(() => {
        expect(screen.getByText("UNBLACKLIST USER")).toBeInTheDocument();
      });
    });

    it("should handle different page states", async () => {
      render(<UserDetail />);

      await waitFor(() => {
        // Switch to Documents state
        const loansBtn = screen.getByTestId("loans-btn");
        fireEvent.click(loansBtn);

        expect(
          screen.getByText("Loans information will be displayed here")
        ).toBeInTheDocument();
      });
    });
  });

  describe("Negative Scenarios", () => {
    it("should handle missing user in localStorage", () => {
      if (typeof window !== "undefined") {
        Object.defineProperty(window, "localStorage", {
          value: {
            getItem: vi.fn(() => JSON.stringify([])),
            setItem: vi.fn(),
          },
          writable: true,
        });
      }

      render(<UserDetail />);

      // Should render with empty user data when no user found
      expect(screen.getByTestId("current-user")).toBeInTheDocument();
    });

    it("should handle corrupted localStorage data", () => {
      if (typeof window !== "undefined") {
        Object.defineProperty(window, "localStorage", {
          value: {
            getItem: vi.fn(() => "invalid json"),
            setItem: vi.fn(),
          },
          writable: true,
        });
      }

      render(<UserDetail />);

      // Should render with empty user data when localStorage is corrupted
      expect(screen.getByTestId("current-user")).toBeInTheDocument();
    });

    it("should handle null localStorage", () => {
      if (typeof window !== "undefined") {
        Object.defineProperty(window, "localStorage", {
          value: {
            getItem: vi.fn(() => null),
            setItem: vi.fn(),
          },
          writable: true,
        });
      }

      render(<UserDetail />);

      // Should render with empty user data when localStorage returns null
      expect(screen.getByTestId("current-user")).toBeInTheDocument();
    });

    it("should handle user without guarantors", async () => {
      const userWithoutGuarantor = { ...mockUser, guarantor: [] };
      if (typeof window !== "undefined") {
        Object.defineProperty(window, "localStorage", {
          value: {
            getItem: vi.fn(() => JSON.stringify([userWithoutGuarantor])),
            setItem: vi.fn(),
          },
          writable: true,
        });
      }

      render(<UserDetail />);

      // Should not crash when no guarantors exist
      await waitFor(() => {
        expect(screen.getByTestId("current-user")).toHaveTextContent(
          "John Doe"
        );
      });
    });

    it("should handle user with incomplete data", async () => {
      const incompleteUser = {
        _id: "test-user-id",
        firstName: "John",
        lastName: "",
        email: "",
        status: "Active",
      };

      if (typeof window !== "undefined") {
        Object.defineProperty(window, "localStorage", {
          value: {
            getItem: vi.fn(() => JSON.stringify([incompleteUser])),
            setItem: vi.fn(),
          },
          writable: true,
        });
      }

      render(<UserDetail />);

      await waitFor(() => {
        expect(screen.getByTestId("current-user")).toHaveTextContent("John");
      });
    });

    it("should handle localStorage errors during user update", async () => {
      const mockSetItem = vi.fn(() => {
        throw new Error("Storage error");
      });
      if (typeof window !== "undefined") {
        Object.defineProperty(window, "localStorage", {
          value: {
            getItem: vi.fn(() => JSON.stringify([mockUser])),
            setItem: mockSetItem,
          },
          writable: true,
        });
      }

      render(<UserDetail />);

      await waitFor(() => {
        const blacklistBtn = screen.getByText("BLACKLIST USER");

        // Should not crash even if localStorage throws error
        expect(() => fireEvent.click(blacklistBtn)).not.toThrow();
      });
    });
  });

  describe("Data Display", () => {
    it("should display N/A for missing user data", async () => {
      const userWithMissingData = {
        ...mockUser,
        phoneNumber: "",
        bvn: null,
        gender: "",
        maritalStatus: "",
      };

      if (typeof window !== "undefined") {
        Object.defineProperty(window, "localStorage", {
          value: {
            getItem: vi.fn(() => JSON.stringify([userWithMissingData])),
            setItem: vi.fn(),
          },
          writable: true,
        });
      }

      render(<UserDetail />);

      await waitFor(() => {
        expect(screen.getByTestId("info-item-phoneNumber")).toHaveTextContent(
          "Phone Number: N/A"
        );
        expect(screen.getByTestId("info-item-bvn")).toHaveTextContent(
          "BVN: N/A"
        );
        expect(screen.getByTestId("info-item-gender")).toHaveTextContent(
          "Gender: N/A"
        );
      });
    });

    // it("should handle empty guarantor data", async () => {
    //   const userWithEmptyGuarantor = {
    //     ...mockUser,
    //     guarantor: [{ name: "", phoneNumber: "", email: "", relationship: "" }],
    //   };

    //   if (typeof window !== "undefined") {
    //     Object.defineProperty(window, "localStorage", {
    //       value: {
    //         getItem: vi.fn(() => JSON.stringify([userWithEmptyGuarantor])),
    //         setItem: vi.fn(),
    //       },
    //       writable: true,
    //     });
    //   }

    //   render(<UserDetail />);

    //   await waitFor(() => {
    //     expect(
    //       screen.getByTestId("info-item-guarantor0_name")
    //     ).toHaveTextContent("Full Name: N/A");
    //     expect(
    //       screen.getByTestId("info-item-guarantor0_phoneNumber")
    //     ).toHaveTextContent("Phone Number: N/A");
    //   });
    // });
  });

  describe("Component State Management", () => {
    it("should maintain state across re-renders", async () => {
      if (typeof window !== "undefined") {
        Object.defineProperty(window, "localStorage", {
          value: {
            getItem: vi.fn(() => JSON.stringify([mockUser])),
            setItem: vi.fn(),
          },
          writable: true,
        });
      }

      const { rerender } = render(<UserDetail />);

      await waitFor(() => {
        const bankDetailsBtn = screen.getByTestId("bank-details-btn");
        fireEvent.click(bankDetailsBtn);
        expect(screen.getByTestId("current-state")).toHaveTextContent(
          "BankDetails"
        );
      });

      rerender(<UserDetail />);

      expect(screen.getByTestId("current-state")).toHaveTextContent(
        "BankDetails"
      );
    });

    it("should initialize with GeneralDetails state", async () => {
      if (typeof window !== "undefined") {
        Object.defineProperty(window, "localStorage", {
          value: {
            getItem: vi.fn(() => JSON.stringify([mockUser])),
            setItem: vi.fn(),
          },
          writable: true,
        });
      }

      render(<UserDetail />);

      await waitFor(() => {
        expect(screen.getByTestId("current-state")).toHaveTextContent(
          "GeneralDetails"
        );
      });
    });
  });

  describe("Button States", () => {
    it("should show correct button text for inactive user", async () => {
      const inactiveUser = { ...mockUser, status: "Inactive" };
      if (typeof window !== "undefined") {
        Object.defineProperty(window, "localStorage", {
          value: {
            getItem: vi.fn(() => JSON.stringify([inactiveUser])),
            setItem: vi.fn(),
          },
          writable: true,
        });
      }

      render(<UserDetail />);

      await waitFor(() => {
        expect(screen.getByText("ACTIVATE USER")).toBeInTheDocument();
        expect(screen.getByText("BLACKLIST USER")).toBeInTheDocument();
      });
    });
  });
});
