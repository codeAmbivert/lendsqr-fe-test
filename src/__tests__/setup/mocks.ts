import { vi } from "vitest";
import React from "react";

// Mock SVG components to prevent InvalidCharacterError
export const MockSVGComponent = (props: Record<string, unknown>) =>
  React.createElement(
    "div",
    { "data-testid": "svg-icon", ...props },
    "SVG Icon"
  );

// Global SCSS module mocks
export const mockStyles = {
  container: "container",
  page_name: "page_name",
  cards_container: "cards_container",
  search_container: "search_container",
  search_input: "search_input",
  userStatus: "userStatus",
  active: "active",
  inactive: "inactive",
  pending: "pending",
  blacklisted: "blacklisted",
  table: "table",
  header: "header",
  content: "content",
  dashboard: "dashboard",
  filterContainer: "filterContainer",
  filter_container: "filter_container",
  table_header: "table_header",
  status_filter: "status_filter",
  button: "button",
  primary: "primary",
  secondary: "secondary",
  reset: "reset",
  filter: "filter",
  loading: "loading",
  disabled: "disabled",
  wrapper: "wrapper",
  sidebar: "sidebar",
  main: "main",
  userDetails: "userDetails",
  userInfo: "userInfo",
  userTabs: "userTabs",
  tab: "tab",
  activeTab: "activeTab",
  userCard: "userCard",
  userAvatar: "userAvatar",
  userName: "userName",
  userBank: "userBank",
  guarantor: "guarantor",
  personalInfo: "personalInfo",
  educationInfo: "educationInfo",
  socials: "socials",
  bankInfo: "bankInfo",
  row: "row",
  cell: "cell",
  pagination: "pagination",
  pageNumber: "pageNumber",
  dropdownContainer: "dropdownContainer",
  dropdownMenu: "dropdownMenu",
  dropdownItem: "dropdownItem",
  searchInput: "searchInput",
  filterForm: "filterForm",
  formGroup: "formGroup",
  label: "label",
  input: "input",
  select: "select",
  dateInput: "dateInput",
  statusSelect: "statusSelect",
  buttonGroup: "buttonGroup",
  submitButton: "submitButton",
  resetButton: "resetButton",
  mobileView: "mobileView",
  mobileHeader: "mobileHeader",
  mobileContent: "mobileContent",
  responsiveTable: "responsiveTable",
  scroll: "scroll",
  overflow: "overflow",
  hidden: "hidden",
};

// Mock Next.js modules
export const mockNextRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  prefetch: vi.fn(),
};

export const mockUseRouter = () => mockNextRouter;

export const mockUsePathname = () => "/dashboard";

export const mockUseSearchParams = () => new URLSearchParams();

// Mock localStorage
export const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

// Mock API responses
export const mockUserData = [
  {
    id: "1",
    organization: "Lendsqr",
    username: "john_doe",
    email: "john@example.com",
    phoneNumber: "+2341234567890",
    dateJoined: "2023-01-15",
    status: "Active",
  },
  {
    id: "2",
    organization: "Irorun",
    username: "jane_smith",
    email: "jane@example.com",
    phoneNumber: "+2349876543210",
    dateJoined: "2023-02-20",
    status: "Inactive",
  },
];

export const mockUserDetails = {
  id: "1",
  personalInformation: {
    fullName: "John Doe",
    phoneNumber: "+2341234567890",
    emailAddress: "john@example.com",
    bvn: "12345678901",
    gender: "Male",
    maritalStatus: "Single",
    children: "None",
    typeOfResidence: "Parent's Apartment",
  },
  educationAndEmployment: {
    levelOfEducation: "B.Sc",
    employmentStatus: "Employed",
    sectorOfEmployment: "FinTech",
    durationOfEmployment: "2 years",
    officeEmail: "john.doe@company.com",
    monthlyIncome: ["₦200,000.00", "₦400,000.00"],
    loanRepayment: "₦40,000",
  },
  socials: {
    twitter: "@johndoe",
    facebook: "John Doe",
    instagram: "@johndoe",
  },
  guarantor: {
    fullName: "Jane Doe",
    phoneNumber: "+2349876543210",
    emailAddress: "jane.doe@example.com",
    relationship: "Sister",
  },
  bankDetails: {
    tier: "1",
    amount: "₦200,000.00",
    bankName: "Access Bank",
  },
};
