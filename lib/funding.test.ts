import { describe, expect, it } from "vitest";

import { buildFundingLeadMessage } from "./funding";

describe("buildFundingLeadMessage", () => {
  it("serializes every eligibility field into the contact message", () => {
    const message = buildFundingLeadMessage({
      businessName: "Acme Logistics",
      contactName: "Jamie Chen",
      email: "jamie@example.com",
      phoneWechat: "949-555-0100",
      stateCity: "Irvine, CA",
      industry: "Logistics and transportation",
      employeeCount: "6-20",
      annualRevenue: "$500K-$2M",
      primaryNeeds: ["Government grants", "Tax credits"],
    });

    expect(message).toContain("Business name: Acme Logistics");
    expect(message).toContain("Location: Irvine, CA");
    expect(message).toContain("Industry: Logistics and transportation");
    expect(message).toContain("W-2 employees: 6-20");
    expect(message).toContain("Annual revenue: $500K-$2M");
    expect(message).toContain("Primary needs: Government grants, Tax credits");
  });
});
