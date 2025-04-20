import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useState } from 'react';
import { kycService } from './services/kycService';

export default function KYCVerificationScreen() {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [linkedPhone, setLinkedPhone] = useState('');

  const handleAadhaarSubmit = async () => {
    if (aadhaarNumber.length !== 12) {
      Alert.alert('Error', 'Please enter a valid 12-digit Aadhaar number');
      return;
    }

    setIsVerifying(true);
    try {
      // Get the phone number linked to the Aadhaar
      const phone = await kycService.verifyAadhaarAndGetPhone(aadhaarNumber);
      setLinkedPhone(phone);
      // For testing purposes, pre-fill the phone number
      setPhoneNumber(phone);
      setShowPhoneInput(true);
    } catch (error) {
      Alert.alert('Error', 'Invalid Aadhaar number. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handlePhoneSubmit = async () => {
    if (phoneNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }

    setIsVerifying(true);
    try {
      await kycService.sendOTP(aadhaarNumber, phoneNumber);
      setShowOtpInput(true);
    } catch (error) {
      Alert.alert('Error', 'Phone number does not match the one linked to your Aadhaar. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleOtpSubmit = async () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    setIsVerifying(true);
    try {
      await kycService.verifyOTP(aadhaarNumber, phoneNumber, otp);
      console.log('Verified phone number:', phoneNumber); // Debug log
      router.push({
        pathname: '/create-wallet',
        params: { 
          kycVerified: 'true',
          verifiedPhone: phoneNumber 
        }
      });
    } catch (error) {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>KYC Verification</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Verify your identity using Aadhaar</Text>

      {!showPhoneInput ? (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter Aadhaar Number</Text>
          <TextInput
            style={styles.input}
            value={aadhaarNumber}
            onChangeText={(text) => setAadhaarNumber(text.replace(/[^0-9]/g, '').slice(0, 12))}
            keyboardType="numeric"
            maxLength={12}
            placeholder="XXXX XXXX XXXX"
            placeholderTextColor="#999"
          />
          <TouchableOpacity 
            style={[styles.button, isVerifying && styles.buttonDisabled]} 
            onPress={handleAadhaarSubmit}
            disabled={isVerifying || aadhaarNumber.length !== 12}
          >
            <Text style={styles.buttonText}>
              {isVerifying ? 'Verifying...' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : !showOtpInput ? (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter Phone Number</Text>
          <Text style={styles.hint}>Enter the phone number linked to your Aadhaar</Text>
          
          {/* Display the linked phone number for testing purposes */}
          <View style={styles.testInfoContainer}>
            <Text style={styles.testInfoTitle}>Testing Information:</Text>
            <Text style={styles.testInfoText}>Linked Phone: {linkedPhone}</Text>
            <Text style={styles.testInfoText}>(This would be hidden in production)</Text>
          </View>
          
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9]/g, '').slice(0, 10))}
            keyboardType="numeric"
            maxLength={10}
            placeholder="9XXXXXXXXX"
            placeholderTextColor="#999"
          />
          <TouchableOpacity 
            style={[styles.button, isVerifying && styles.buttonDisabled]} 
            onPress={handlePhoneSubmit}
            disabled={isVerifying || phoneNumber.length !== 10}
          >
            <Text style={styles.buttonText}>
              {isVerifying ? 'Sending OTP...' : 'Get OTP'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter OTP</Text>
          <Text style={styles.hint}>OTP sent to {phoneNumber}</Text>
          
          {/* Display testing information for OTP */}
          <View style={styles.testInfoContainer}>
            <Text style={styles.testInfoTitle}>Testing Information:</Text>
            <Text style={styles.testInfoText}>Any 6-digit number will work</Text>
            <Text style={styles.testInfoText}>(This would be hidden in production)</Text>
          </View>
          
          <TextInput
            style={styles.input}
            value={otp}
            onChangeText={(text) => setOtp(text.replace(/[^0-9]/g, '').slice(0, 6))}
            keyboardType="numeric"
            maxLength={6}
            placeholder="XXXXXX"
            placeholderTextColor="#999"
          />
          <TouchableOpacity 
            style={[styles.button, isVerifying && styles.buttonDisabled]} 
            onPress={handleOtpSubmit}
            disabled={isVerifying || otp.length !== 6}
          >
            <Text style={styles.buttonText}>
              {isVerifying ? 'Verifying...' : 'Verify OTP'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: '#000000',
    fontSize: 24,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  inputContainer: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 8,
  },
  hint: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  testInfoContainer: {
    backgroundColor: '#F0F8FF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#B0C4DE',
  },
  testInfoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4682B4',
    marginBottom: 4,
  },
  testInfoText: {
    fontSize: 14,
    color: '#4682B4',
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4C6FFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#A8B3E0',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
}); 