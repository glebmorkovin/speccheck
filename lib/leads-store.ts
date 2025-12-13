export type LeadRecord = {
  name: string;
  company?: string;
  phone?: string;
  email?: string;
  comment?: string;
  timestamp: string;
  source: string;
};

export const leadsMemory: LeadRecord[] = [];

export const rememberLead = (lead: LeadRecord) => {
  leadsMemory.unshift(lead);
  if (leadsMemory.length > 100) {
    leadsMemory.pop();
  }
};
