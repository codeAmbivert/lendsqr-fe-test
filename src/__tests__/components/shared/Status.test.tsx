import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock the SCSS module before importing the component
vi.mock("@/app/styles/status.module.scss", () => ({
  default: {
    status: "status",
    active: "active",
    inactive: "inactive",
    pending: "pending",
    blacklisted: "blacklisted",
    default: "default",
  },
}));

import Status from "@/components/shared/Status";

describe("Status Component", () => {
  describe("Positive Scenarios", () => {
    it("should render with Active status", () => {
      render(<Status status="Active" />);
      const statusElement = screen.getByText("Active");
      expect(statusElement).toBeInTheDocument();
      expect(statusElement).toHaveClass("status", "active");
    });

    it("should render with Inactive status", () => {
      render(<Status status="Inactive" />);
      const statusElement = screen.getByText("Inactive");
      expect(statusElement).toBeInTheDocument();
      expect(statusElement).toHaveClass("status", "inactive");
    });

    it("should render with Pending status", () => {
      render(<Status status="Pending" />);
      const statusElement = screen.getByText("Pending");
      expect(statusElement).toBeInTheDocument();
      expect(statusElement).toHaveClass("status", "pending");
    });

    it("should render with Blacklisted status", () => {
      render(<Status status="Blacklisted" />);
      const statusElement = screen.getByText("Blacklisted");
      expect(statusElement).toBeInTheDocument();
      expect(statusElement).toHaveClass("status", "blacklisted");
    });

    it("should handle mixed case status correctly", () => {
      render(<Status status="ACTIVE" />);
      const statusElement = screen.getByText("ACTIVE");
      expect(statusElement).toBeInTheDocument();
      expect(statusElement).toHaveClass("status", "active");
    });

    it("should handle camelCase status correctly", () => {
      render(<Status status="InActive" />);
      const statusElement = screen.getByText("InActive");
      expect(statusElement).toBeInTheDocument();
      expect(statusElement).toHaveClass("status", "inactive");
    });
  });

  describe("Negative Scenarios", () => {
    it("should handle empty string status", () => {
      const { container } = render(<Status status="" />);
      const statusElement = container.firstChild as HTMLElement;
      expect(statusElement).toBeInTheDocument();
      expect(statusElement).toHaveClass("status");
    });

    it("should handle undefined status gracefully", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { container } = render(<Status status={undefined as any} />);
      const statusElement = container.firstChild as HTMLElement;
      expect(statusElement).toBeInTheDocument();
      expect(statusElement).toHaveClass("status");
    });

    it("should handle null status gracefully", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { container } = render(<Status status={null as any} />);
      const statusElement = container.firstChild as HTMLElement;
      expect(statusElement).toBeInTheDocument();
      expect(statusElement).toHaveClass("status");
    });

    it("should handle unknown status with default class", () => {
      const { container } = render(<Status status="UnknownStatus" />);
      const statusElement = container.firstChild as HTMLElement;
      expect(statusElement).toBeInTheDocument();
      expect(statusElement).toHaveClass("status");
      expect(statusElement.textContent).toBe("UnknownStatus");
    });

    it("should handle status with special characters", () => {
      const { container } = render(<Status status="Test-Status!" />);
      const statusElement = container.firstChild as HTMLElement;
      expect(statusElement).toBeInTheDocument();
      expect(statusElement).toHaveClass("status");
      expect(statusElement.textContent).toBe("Test-Status!");
    });

    it("should handle very long status string", () => {
      const longStatus = "This is a very long status that might cause issues";
      render(<Status status={longStatus} />);
      const statusElement = screen.getByText(longStatus);
      expect(statusElement).toBeInTheDocument();
      expect(statusElement).toHaveClass("status");
    });

    it("should handle status with numbers", () => {
      const { container } = render(<Status status="Status123" />);
      const statusElement = container.firstChild as HTMLElement;
      expect(statusElement).toBeInTheDocument();
      expect(statusElement).toHaveClass("status");
      expect(statusElement.textContent).toBe("Status123");
    });

    it("should handle status with only spaces", () => {
      const { container } = render(<Status status="   " />);
      const statusElement = container.firstChild as HTMLElement;
      expect(statusElement).toBeInTheDocument();
      expect(statusElement).toHaveClass("status");
      expect(statusElement.textContent).toBe("   ");
    });
  });

  describe("Class Application", () => {
    it("should always apply base status class", () => {
      render(<Status status="Active" />);
      const statusElement = screen.getByText("Active");
      expect(statusElement).toHaveClass("status");
    });

    it("should apply status-specific class alongside base class", () => {
      render(<Status status="Pending" />);
      const statusElement = screen.getByText("Pending");
      expect(statusElement.className).toContain("status");
      expect(statusElement.className).toContain("pending");
    });

    it("should handle case-insensitive class application", () => {
      render(<Status status="BLACKLISTED" />);
      const statusElement = screen.getByText("BLACKLISTED");
      expect(statusElement).toHaveClass("status", "blacklisted");
    });
  });
});
