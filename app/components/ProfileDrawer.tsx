import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

interface ProfileDrawerProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function ProfileDrawer({ isVisible, onClose }: ProfileDrawerProps) {
  const handleDeregisterWallet = async () => {
    try {
      // Clear wallet data
      await AsyncStorage.removeItem('walletExists');
      await AsyncStorage.removeItem('privateKey');
      await AsyncStorage.removeItem('publicKey');
      
      // Navigate back to index
      router.replace('/');
    } catch (error) {
      console.error('Error deregistering wallet:', error);
    }
  };

  const handleWalletDetails = () => {
    // TODO: Implement wallet details view
    onClose();
  };

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      <View style={styles.drawer}>
        <View style={styles.header}>
          <Image 
            source={require('../../assets/images/person.png')} 
            style={styles.profileIcon}
          />
          <Text style={styles.userName}>Chetan Mittal</Text>
        </View>

        <View style={styles.menuItems}>
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={handleWalletDetails}
          >
            <Image 
              source={require('../../assets/images/Creditcard.png')} 
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Wallet Details</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, styles.deregisterButton]} 
            onPress={handleDeregisterWallet}
          >
            <Image 
              source={require('../../assets/images/Logout.png')} 
              style={styles.menuIcon}
            />
            <Text style={[styles.menuText, styles.deregisterText]}>Deregister Wallet</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.8,
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    padding: 20,
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  menuItems: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
    tintColor: '#333',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  deregisterButton: {
    marginTop: 20,
  },
  deregisterText: {
    color: '#D35400',
  },
}); 