import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, router } from 'expo-router';
import { useState } from 'react';
import ProfileDrawer from './components/ProfileDrawer';

export default function WalletScreen() {
  const { privateKey, publicKey } = useLocalSearchParams();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const handleRewardsWallet = () => {
    router.push('/rewards-wallet');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => setIsDrawerVisible(true)}
        >
          <Image 
            source={require('../assets/images/person.png')} 
            style={styles.profileIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chetan Mittal</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.rewardsButton} 
            onPress={handleRewardsWallet}
          >
            <Text style={styles.rewardsButtonText}>View Rewards</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Drawer */}
      <ProfileDrawer 
        isVisible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
        privateKey={privateKey as string}
        publicKey={publicKey as string}
      />

      {/* Digital Rupee Card */}
      <View style={styles.cardContainer}>
        <View style={[styles.card, { backgroundColor: '#D35400' }]}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.balanceLabel}>Current Balance</Text>
              
            </View>
            <TouchableOpacity style={styles.viewWalletButton}>
              <Text style={[styles.viewWalletText, { color: '#D35400' }]}>View Wallet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* RBI and Wallet Title */}
      <View style={styles.walletInfoContainer}>
        <View style={styles.walletTextContainer}>
          <Text style={styles.rbiText}>Reserve Bank of India</Text>
          <Text style={styles.walletTypeText}>Digital Rupee Wallet</Text>
        </View>
        <Image 
          source={require('../assets/images/rbi.jpg')}
          style={styles.rbiLogo}
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#E67E22' }]}>
            <Image 
              source={require('../assets/images/Externallink.png')} 
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#E67E22' }]}>
            <Image 
              source={require('../assets/images/Download.png')} 
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Collect</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#E67E22' }]}>
            <Image 
              source={require('../assets/images/Creditcard.png')} 
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Load</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#E67E22' }]}>
            <Image 
              source={require('../assets/images/Download.png')} 
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Redeem</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Keys Display
      <View style={styles.keysContainer}>
        <View style={styles.keySection}>
          <Text style={styles.keyLabel}>Public Key:</Text>
          <Text style={styles.keyValue} numberOfLines={1}>{publicKey}</Text>
        </View>
        <View style={styles.keySection}>
          <Text style={styles.keyLabel}>Private Key:</Text>
          <Text style={styles.keyValue} numberOfLines={1}>{privateKey}</Text>
        </View>
      </View> */}

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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 15,
  },
  rewardsButton: {
    backgroundColor: '#2E7D32',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  rewardsButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  cardContainer: {
    paddingHorizontal: 20,
  },
  card: {
    height: 150,
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  balanceLabel: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  walletTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  viewWalletButton: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  viewWalletText: {
    fontWeight: '600',
  },
  actionButtonsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    width: '22%',
  },
  actionIcon: {
    width: 30,
    height: 30,
    marginBottom: 5,
    tintColor: 'white',
  },
  actionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  keysContainer: {
    backgroundColor: 'white',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  keySection: {
    marginBottom: 10,
  },
  keyLabel: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  keyValue: {
    color: '#666',
    fontSize: 12,
  },
  walletInfoContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletTextContainer: {
    flex: 1,
  },
  rbiText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  walletTypeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  rbiLogo: {
    width: 60,
    height: 60,
    marginLeft: 15,
  },
}); 