import { describe, it, expect } from "vitest";
import { cn, formatPhoneNumber } from "@/helpers/utils";

describe("Utils Functions", () => {
  describe("cn function", () => {
    it("should combine multiple class names", () => {
      const result = cn("class1", "class2", "class3");
      expect(result).toBe("class1 class2 class3");
    });

    it("should filter out falsy values", () => {
      const result = cn("class1", null, undefined, false, "", "class2");
      expect(result).toBe("class1 class2");
    });

    it("should return empty string when all inputs are falsy", () => {
      const result = cn(null, undefined, false, "");
      expect(result).toBe("");
    });

    it("should handle single class name", () => {
      const result = cn("single-class");
      expect(result).toBe("single-class");
    });

    it("should handle empty input", () => {
      const result = cn();
      expect(result).toBe("");
    });
  });

  describe("formatPhoneNumber function", () => {
    it("should format phone number with +234 country code", () => {
      const result = formatPhoneNumber("+2348123456789");
      expect(result).toBe("08123456789");
    });

    it("should remove spaces, dashes, and parentheses", () => {
      const result = formatPhoneNumber("(081) 234-5678 9");
      expect(result).toBe("08123456789");
    });

    it("should handle phone number with +234 and formatting characters", () => {
      const result = formatPhoneNumber("+234 (081) 234-5678");
      expect(result).toBe("00812345678"); // Expected: removes +234, keeps (0)81 -> 00812345678
    });

    it("should handle phone number without country code", () => {
      const result = formatPhoneNumber("08123456789");
      expect(result).toBe("08123456789");
    });

    it("should return empty string for undefined input", () => {
      const result = formatPhoneNumber(undefined);
      expect(result).toBe("");
    });

    it("should return empty string for empty string input", () => {
      const result = formatPhoneNumber("");
      expect(result).toBe("");
    });

    it("should handle phone number with only spaces and dashes", () => {
      const result = formatPhoneNumber("0812 3456 789");
      expect(result).toBe("08123456789");
    });

    it("should handle complex formatting", () => {
      const result = formatPhoneNumber("+234 (0)81-234 5678");
      expect(result).toBe("00812345678"); // Expected: removes +234, keeps (0)81 -> 00812345678
    });
  });
});
