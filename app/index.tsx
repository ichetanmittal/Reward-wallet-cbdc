import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function Home() {
  const [hasWallet, setHasWallet] = useState(false);

  useEffect(() => {
    checkExistingWallet();
  }, []);

  const checkExistingWallet = async () => {
    try {
      const walletExists = await AsyncStorage.getItem('walletExists');
      setHasWallet(walletExists === 'true');
    } catch (error) {
      console.error('Error checking wallet:', error);
    }
  };

  const handleContinue = async () => {
    if (hasWallet) {
      // If wallet exists, get the keys and navigate directly to wallet
      const privateKey = await AsyncStorage.getItem('privateKey');
      const publicKey = await AsyncStorage.getItem('publicKey');
      router.push({
        pathname: '/wallet',
        params: {
          privateKey,
          publicKey
        }
      });
    } else {
      // If no wallet exists, go to create wallet page
      router.push('/create-wallet');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image 
          source={require('../assets/images/e-rupee.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>India's Central Bank Digital Currency</Text>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.poweredBy}>Powered by Bank of Baroda</Text>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>
            {hasWallet ? 'Open Wallet' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  poweredBy: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
}); 