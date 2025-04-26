export class OasisService {
    static async sendOtp(email: string) {
      const response = await fetch(`${process.env.OASIS_URL}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || 'Failed to send OTP.');
      }
  
      return true;
    }

    // Here the email being passed would be hashed email
    static async verifyOtp(email: string, otp: string) {
        const response = await fetch(`${process.env.OASIS_URL}/verify-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp }),
        });
    
        const data = await response.json();
    
        if (!response.ok || !data?.verified) {
          throw new Error('Invalid or expired OTP.');
        }
    
        return true;
      }

      static async verifyDomain(domain: string) {
        const response = await fetch(`${process.env.OASIS_URL}/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ domain }), 
        });
    
        const data = await response.json();
    
        if (!response.ok) {
          throw new Error(data?.error || 'Verification failed.');
        }
    
        if (!data.isValid) {
          throw new Error('Invalid or unverified domain.');
        }
    
        return {
          domain: data.domain,
          isValid: data.isValid,
        };
      }
  }
  