import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, router } from 'expo-router';

export default function WalletScreen() {
  const { privateKey, publicKey } = useLocalSearchParams();

  const handleRewardsWallet = () => {
    router.push('/rewards-wallet');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileButton}>
          <Image 
            source={require('../assets/images/person.png')} 
            style={styles.profileIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chetan Mittal</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Image 
              source={require('../assets/images/Logout.png')} 
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Digital Rupee Card */}
      <View style={styles.cardContainer}>
        <View style={[styles.card, { backgroundColor: '#D35400' }]}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.balanceLabel}>Current Balance</Text>
              <Text style={styles.walletTitle}>Digital Rupee Wallet</Text>
            </View>
            <TouchableOpacity style={styles.viewWalletButton}>
              <Text style={[styles.viewWalletText, { color: '#D35400' }]}>View Wallet</Text>
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#E67E22' }]}>
              <Image 
                source={require('../assets/images/Creditcard.png')} 
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
                source={require('../assets/images/Download.png')} 
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
      </View>

      {/* Keys Display */}
      <View style={styles.keysContainer}>
        <View style={styles.keySection}>
          <Text style={styles.keyLabel}>Public Key:</Text>
          <Text style={styles.keyValue} numberOfLines={1}>{publicKey}</Text>
        </View>
        <View style={styles.keySection}>
          <Text style={styles.keyLabel}>Private Key:</Text>
          <Text style={styles.keyValue} numberOfLines={1}>{privateKey}</Text>
        </View>
      </View>

      {/* Rewards Wallet Button */}
      <TouchableOpacity 
        style={styles.rewardsButton} 
        onPress={handleRewardsWallet}
      >
        <Text style={styles.rewardsButtonText}>View Rewards Wallet</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF8F5',
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
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  cardContainer: {
    paddingHorizontal: 20,
  },
  card: {
    height: 250,
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
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
  rewardsButton: {
    backgroundColor: '#2E7D32',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  rewardsButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 