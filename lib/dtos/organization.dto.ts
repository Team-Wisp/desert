import { OrganizationType } from "../models/OrganizationType";

export interface OrganizationDTO {
    name: string;
    domain: string;
    type: OrganizationType;
    logoUrl?: string;
    description?: string;
  }
  