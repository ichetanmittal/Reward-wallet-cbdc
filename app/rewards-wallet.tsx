import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function RewardsWalletScreen() {
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

      {/* Card View */}
      <View style={[styles.card, { backgroundColor: '#2E7D32' }]}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.balanceLabel}>Available Points</Text>
            <Text style={styles.walletTitle}>Rewards Wallet</Text>
          </View>
          <TouchableOpacity style={styles.viewWalletButton}>
            <Text style={[styles.viewWalletText, { color: '#2E7D32' }]}>View Rewards</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#388E3C' }]}>
            <Image 
              source={require('../assets/images/Creditcard.png')} 
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Earn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#388E3C' }]}>
            <Image 
              source={require('../assets/images/Download.png')} 
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Redeem</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#388E3C' }]}>
            <Image 
              source={require('../assets/images/Download.png')} 
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>History</Text>
          </TouchableOpacity>
        </View>
      </View>

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
  card: {
    margin: 20,
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
}); 