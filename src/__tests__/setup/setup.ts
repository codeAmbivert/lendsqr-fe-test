import { vi } from "vitest";
import "@testing-library/jest-dom";
import React from "react";
import { mockStyles, mockLocalStorage, MockSVGComponent } from "./mocks";

// Global SVG file mocking to prevent InvalidCharacterError
vi.mock("*.svg", () => ({
  default: MockSVGComponent,
}));

// Mock all public/icons/* files
vi.mock("/public/icons/BackIcon.svg", () => ({
  default: MockSVGComponent,
}));

// Mock dashboard-specific SVG files
vi.mock("/public/icons/dashboard-users.svg", () => ({
  default: MockSVGComponent,
}));

vi.mock("/public/icons/dashboard-active-users.svg", () => ({
  default: MockSVGComponent,
}));

vi.mock("/public/icons/dashboard-user-loans.svg", () => ({
  default: MockSVGComponent,
}));

vi.mock("/public/icons/dashboard-user-savings.svg", () => ({
  default: MockSVGComponent,
}));

vi.mock("/public/icons/search-icon.svg", () => ({
  default: MockSVGComponent,
}));

// Mock the icons index file
vi.mock("../../../../public/icons", () => ({
  BackIcon: MockSVGComponent,
  Logo: MockSVGComponent,
  SearchIcon: MockSVGComponent,
  UserIcon: MockSVGComponent,
  FilterIcon: MockSVGComponent,
  RightAngleIcon: MockSVGComponent,
  MoneyHand: MockSVGComponent,
  Users: MockSVGComponent,
  UserCheck: MockSVGComponent,
  UserFriends: MockSVGComponent,
  UserTimes: MockSVGComponent,
  Coins: MockSVGComponent,
  PiggyBank: MockSVGComponent,
  HandShake: MockSVGComponent,
  BankIcon: MockSVGComponent,
  BadgePercent: MockSVGComponent,
  Home: MockSVGComponent,
  ChartBar: MockSVGComponent,
  ClipboardList: MockSVGComponent,
  Galaxy: MockSVGComponent,
  BriefCase: MockSVGComponent,
  Bell: MockSVGComponent,
  Calendar: MockSVGComponent,
  Scroll: MockSVGComponent,
  Sliders: MockSVGComponent,
  TireIcon: MockSVGComponent,
  Transactions: MockSVGComponent,
  UserSettings: MockSVGComponent,
  SignOut: MockSVGComponent,
  OpenMenu: MockSVGComponent,
  CloseIcon: MockSVGComponent,
  FilledStar: MockSVGComponent,
  OutlineStar: MockSVGComponent,
  // Add dashboard-specific icons
  DashboardUserIcon: MockSVGComponent,
  DashboardActiveIcon: MockSVGComponent,
  DashboardLoansIcon: MockSVGComponent,
  DashboardSavingsIcon: MockSVGComponent,
}));

// Mock the relative path used by dashboard page
vi.mock("../../../public/icons", () => ({
  BackIcon: MockSVGComponent,
  Logo: MockSVGComponent,
  SearchIcon: MockSVGComponent,
  UserIcon: MockSVGComponent,
  FilterIcon: MockSVGComponent,
  RightAngleIcon: MockSVGComponent,
  MoneyHand: MockSVGComponent,
  Users: MockSVGComponent,
  UserCheck: MockSVGComponent,
  UserFriends: MockSVGComponent,
  UserTimes: MockSVGComponent,
  Coins: MockSVGComponent,
  PiggyBank: MockSVGComponent,
  HandShake: MockSVGComponent,
  BankIcon: MockSVGComponent,
  BadgePercent: MockSVGComponent,
  Home: MockSVGComponent,
  ChartBar: MockSVGComponent,
  ClipboardList: MockSVGComponent,
  Galaxy: MockSVGComponent,
  BriefCase: MockSVGComponent,
  Bell: MockSVGComponent,
  Calendar: MockSVGComponent,
  Scroll: MockSVGComponent,
  Sliders: MockSVGComponent,
  TireIcon: MockSVGComponent,
  Transactions: MockSVGComponent,
  UserSettings: MockSVGComponent,
  SignOut: MockSVGComponent,
  OpenMenu: MockSVGComponent,
  CloseIcon: MockSVGComponent,
  FilledStar: MockSVGComponent,
  OutlineStar: MockSVGComponent,
  // Add dashboard-specific icons
  DashboardUserIcon: MockSVGComponent,
  DashboardActiveIcon: MockSVGComponent,
  DashboardLoansIcon: MockSVGComponent,
  DashboardSavingsIcon: MockSVGComponent,
}));

// Mock global objects
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

global.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

// Mock Next.js image
vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: Record<string, unknown>) => {
    return React.createElement("img", { src, alt, ...props });
  },
}));

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/dashboard",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock LayoutContext
vi.mock("@/components/layout/LayoutContext", () => ({
  useLayout: vi.fn(() => ({
    searchText: "",
    setSearchText: vi.fn(),
  })),
}));

// Mock CSS modules with consistent object
vi.mock("@/app/styles/*.module.scss", () => ({ default: mockStyles }));
vi.mock("@/app/styles/dashboard/*.module.scss", () => ({
  default: mockStyles,
}));
vi.mock("@/app/styles/layout/*.module.scss", () => ({ default: mockStyles }));

// Mock specific SCSS files
vi.mock("@/app/styles/status.module.scss", () => ({ default: mockStyles }));
vi.mock("@/app/styles/dashboard/dashboard.module.scss", () => ({
  default: mockStyles,
}));
vi.mock("@/app/styles/dashboard/dashboard-table.module.scss", () => ({
  default: mockStyles,
}));
vi.mock("@/app/styles/dashboard/dashboard-id-page.module.scss", () => ({
  default: mockStyles,
}));
vi.mock("@/app/styles/reusable-table.module.scss", () => ({
  default: mockStyles,
}));
vi.mock("@/app/styles/filter-comp.module.scss", () => ({
  default: mockStyles,
}));

// Mock localStorage
Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
  writable: true,
});

// Mock fetch
global.fetch = vi.fn();

// Mock SVG imports
vi.mock("../../../../public/icons", () => ({
  BackIcon: () => React.createElement("svg", { "data-testid": "back-icon" }),
  FilterIcon: () =>
    React.createElement("svg", { "data-testid": "filter-icon" }),
  SearchIcon: () =>
    React.createElement("svg", { "data-testid": "search-icon" }),
}));

// Mock user avatar
vi.mock("../../../../public/user-avatar.png", () => ({
  default: "/mock-user-avatar.png",
}));
