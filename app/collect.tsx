import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import QRCode from 'react-native-qrcode-svg';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CollectScreen() {
  const [eRupiHandle, setERupiHandle] = useState<string>('');

  useEffect(() => {
    const loadPhoneNumber = async () => {
      try {
        const phoneNumber = await AsyncStorage.getItem('phoneNumber');
        if (phoneNumber) {
          setERupiHandle(`${phoneNumber}@drbob`);
        }
      } catch (error) {
        console.error('Error loading phone number:', error);
      }
    };
    
    loadPhoneNumber();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Collect Digital Rupee</Text>
      </View>

      {/* QR Code Container */}
      <View style={styles.qrContainer}>
        <Text style={styles.qrLabel}>E-Rupi Handle QR Code</Text>
        {eRupiHandle ? (
          <View style={styles.qrCode}>
            <QRCode
              value={eRupiHandle}
              size={250}
              backgroundColor="white"
              color="black"
            />
          </View>
        ) : (
          <View style={[styles.qrCode, { justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={styles.qrHint}>Loading QR Code...</Text>
          </View>
        )}
        <Text style={styles.qrHint}>Scan to get the E-Rupi handle</Text>
      </View>

      {/* Wallet Details */}
      <View style={styles.walletDetails}>
        <Text style={styles.walletLabel}>Your E-Rupi Handle</Text>
        <Text style={styles.walletAddress} numberOfLines={2}>
          {eRupiHandle || 'Loading...'}
        </Text>
        <Text style={styles.instructions}>
          Share this QR code or E-Rupi handle to receive Digital Rupee
        </Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginHorizontal: 20,
  },
  qrLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  qrCode: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
  },
  qrHint: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  walletDetails: {
    marginTop: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  walletLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  walletAddress: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  instructions: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
}); 