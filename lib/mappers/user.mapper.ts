import { IUser } from '@/lib/models/User';
import { PublicUserDTO } from '@/lib/dtos/user.dto';

export function toUserDTO(user: IUser): PublicUserDTO {
  return {
    domain: user.domain,
    organization: user.organization,
    orgType: user.orgType,
    isVerified: user.isVerified,
  };
}
