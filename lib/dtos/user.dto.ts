// DTO for creating user (internal use)
export interface CreateUserDTO {
  email: string;
  domain: string;
  organization: string;
  orgType: 'corporate' | 'college';
  isVerified: boolean;
  lastLoginAt?: Date;
}

// DTO for public API response (safe)
export interface PublicUserDTO {
  domain: string;
  organization: string;
  orgType: 'corporate' | 'college';
  isVerified: boolean;
}

export interface UpdateUserPasswordDTO {
    email: string;
    password: string;
  }