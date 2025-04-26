import Organization from '@/lib/models/Organization';
import { OrganizationDTO } from '@/lib/dtos/organization.dto';

export class OrganizationService {
  static async getOrganizationByDomain(domain: string) {
    return await Organization.findOne({ domain });
  }

  static async createOrganization(data: OrganizationDTO) {
    return await Organization.create(data);
  }
}
