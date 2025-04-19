import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import * as Crypto from 'expo-crypto';

export default function CreateWallet() {
  const handleCreateWallet = async () => {
    try {
      // Generate a random private key
      const privateKey = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        Math.random().toString()
      );
      
      // Generate a public key (in a real app, this would be derived from the private key)
      const publicKey = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        privateKey
      );

      // Navigate to wallet page with the keys
      router.push({
        pathname: '/wallet',
        params: {
          privateKey,
          publicKey
        }
      });
    } catch (error) {
      console.error('Error generating keys:', error);
      // You might want to show an error message to the user here
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
        <Text style={styles.title}>Create Your Digital Wallet</Text>
        <Text style={styles.subtitle}>Start your journey with Digital Rupee</Text>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleCreateWallet}>
          <Text style={styles.buttonText}>Create New Wallet</Text>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
}); 