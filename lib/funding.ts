export type FundingLead = {
  businessName: string;
  contactName: string;
  email: string;
  phoneWechat: string;
  stateCity: string;
  industry: string;
  employeeCount: string;
  annualRevenue: string;
  primaryNeeds: string[];
};

export function buildFundingLeadMessage(lead: FundingLead) {
  return [
    "48-hour Government Funding Eligibility Assessment",
    `Business name: ${lead.businessName}`,
    `Contact name: ${lead.contactName}`,
    `Location: ${lead.stateCity}`,
    `Industry: ${lead.industry}`,
    `W-2 employees: ${lead.employeeCount}`,
    `Annual revenue: ${lead.annualRevenue}`,
    `Primary needs: ${lead.primaryNeeds.join(", ")}`,
  ].join("\n");
}
