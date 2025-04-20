import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useState } from 'react';

export default function LoadDigitalRupeeScreen() {
  const [amount, setAmount] = useState('0.00');

  const handleClose = () => {
    router.back();
  };

  const handleLoad = () => {
    // TODO: Implement loading functionality
    console.log('Loading digital rupee...', amount);
  };

  const handleSelectDenomination = () => {
    // TODO: Implement denomination selection
    console.log('Select denomination...');
  };

  const handleAmountChange = (text: string) => {
    // Only allow numbers and one decimal point
    const filtered = text.replace(/[^0-9.]/g, '');
    const parts = filtered.split('.');
    if (parts.length > 2) return; // Don't allow multiple decimal points
    if (parts[1]?.length > 2) return; // Don't allow more than 2 decimal places
    setAmount(filtered);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Load Digital Rupee</Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Add e₹ to your wallet</Text>

      <View style={styles.amountContainer}>
        <Text style={styles.amountPrefix}>e₹</Text>
        <TextInput
          style={styles.amountInput}
          value={amount}
          onChangeText={handleAmountChange}
          keyboardType="decimal-pad"
          maxLength={10}
          selectTextOnFocus
        />
      </View>

      <Text style={styles.balanceText}>Wallet Balance: e₹ 0.00</Text>

      <TouchableOpacity 
        style={[styles.loadButton, !amount ? styles.loadButtonDisabled : null]} 
        onPress={handleLoad}
        disabled={!amount}
      >
        <Text style={styles.loadButtonText}>Load</Text>
      </TouchableOpacity>

      <Text style={styles.denominationText}>Denomination will be auto selected</Text>

      {/* <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.divider} />
      </View> */}

      {/* <TouchableOpacity style={styles.selectButton} onPress={handleSelectDenomination}>
        <Text style={styles.selectButtonText}>Select denomination manually</Text>
        <Text style={styles.arrowIcon}>›</Text>
      </TouchableOpacity> */}

      <StatusBar style="light" />
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
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  amountPrefix: {
    fontSize: 36,
    color: '#000000',
    marginRight: 8,
  },
  amountInput: {
    fontSize: 48,
    fontWeight: '600',
    color: '#000000',
    minWidth: 120,
    textAlign: 'left',
    padding: 0,
  },
  balanceText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
  },
  loadButton: {
    backgroundColor: '#4C6FFF',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  loadButtonDisabled: {
    backgroundColor: '#A8B3E0',
  },
  loadButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  denominationText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  orText: {
    color: '#666666',
    paddingHorizontal: 20,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#4C6FFF',
    marginHorizontal: 20,
    borderRadius: 12,
  },
  selectButtonText: {
    color: '#4C6FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  arrowIcon: {
    color: '#4C6FFF',
    fontSize: 24,
  },
}); 