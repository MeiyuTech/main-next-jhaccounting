export type FundingLead = {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  state: string;
  industry: string;
  primaryNeeds: string[];
};

export function buildFundingLeadMessage(lead: FundingLead) {
  return [
    "Government Funding Eligibility Assessment",
    `Business name: ${lead.businessName}`,
    `Contact name: ${lead.contactName}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `State: ${lead.state}`,
    `Industry: ${lead.industry}`,
    `Primary needs: ${lead.primaryNeeds.join(", ")}`,
  ].join("\n");
}
