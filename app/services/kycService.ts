// Mock KYC service for Aadhaar verification
class KYCService {
  private static instance: KYCService;
  private verifiedAadhaars: Set<string> = new Set();
  private aadhaarPhoneMap: Map<string, string> = new Map();

  private constructor() {}

  static getInstance(): KYCService {
    if (!KYCService.instance) {
      KYCService.instance = new KYCService();
    }
    return KYCService.instance;
  }

  // Generate a random 10-digit phone number starting with 9
  private generatePhoneNumber(): string {
    // Generate 9 random digits (excluding the first '9')
    const remainingDigits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('');
    return `9${remainingDigits}`;
  }

  // Mock function to verify Aadhaar and get linked phone number
  async verifyAadhaarAndGetPhone(aadhaarNumber: string): Promise<string> {
    // In a real implementation, this would call the UIDAI API to get the linked phone
    // For mock purposes, we'll just simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, accept any 12-digit number and return a mock phone
    if (aadhaarNumber.length === 12) {
      // Generate a random 10-digit phone number if not already mapped
      if (!this.aadhaarPhoneMap.has(aadhaarNumber)) {
        const mockPhone = this.generatePhoneNumber();
        this.aadhaarPhoneMap.set(aadhaarNumber, mockPhone);
      }
      return this.aadhaarPhoneMap.get(aadhaarNumber) || '';
    }
    throw new Error('Invalid Aadhaar number');
  }

  // Mock function to send OTP to the linked phone number
  async sendOTP(aadhaarNumber: string, phoneNumber: string): Promise<boolean> {
    // In a real implementation, this would call the UIDAI API
    // For mock purposes, we'll just simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Verify that the phone number matches the one linked to the Aadhaar
    const linkedPhone = this.aadhaarPhoneMap.get(aadhaarNumber);
    if (linkedPhone && linkedPhone === phoneNumber) {
      return true;
    }
    throw new Error('Phone number does not match the one linked to Aadhaar');
  }

  // Mock function to verify OTP
  async verifyOTP(aadhaarNumber: string, phoneNumber: string, otp: string): Promise<boolean> {
    // In a real implementation, this would verify with UIDAI
    // For mock purposes, we'll just simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, accept any 6-digit OTP for valid Aadhaar and phone
    const linkedPhone = this.aadhaarPhoneMap.get(aadhaarNumber);
    if (aadhaarNumber.length === 12 && linkedPhone === phoneNumber && otp.length === 6) {
      this.verifiedAadhaars.add(aadhaarNumber);
      return true;
    }
    throw new Error('Invalid OTP');
  }

  // Check if an Aadhaar number has been verified
  isVerified(aadhaarNumber: string): boolean {
    return this.verifiedAadhaars.has(aadhaarNumber);
  }
}

export const kycService = KYCService.getInstance(); 