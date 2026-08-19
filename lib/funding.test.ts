import { describe, expect, it } from "vitest";

import { buildFundingLeadMessage } from "./funding";

describe("buildFundingLeadMessage", () => {
  it("serializes the V4 eligibility fields into the contact message", () => {
    const message = buildFundingLeadMessage({
      businessName: "Acme Logistics",
      contactName: "Jamie Chen",
      email: "jamie@example.com",
      phone: "949-555-0100",
      state: "CA",
      industry: "Logistics and transportation",
      primaryNeeds: ["Government grants", "Tax credits"],
    });

    expect(message).toContain("Business name: Acme Logistics");
    expect(message).toContain("Contact name: Jamie Chen");
    expect(message).toContain("Email: jamie@example.com");
    expect(message).toContain("Phone: 949-555-0100");
    expect(message).toContain("State: CA");
    expect(message).toContain("Industry: Logistics and transportation");
    expect(message).toContain("Primary needs: Government grants, Tax credits");
    expect(message).not.toContain("W-2 employees");
    expect(message).not.toContain("Annual revenue");
  });
});
