import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Image, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useState, useRef, useEffect } from 'react';

export default function LoadDigitalRupeeScreen() {
  const [amount, setAmount] = useState('0.00');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleClose = () => {
    router.back();
  };

  const handleLoad = () => {
    setIsModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsModalVisible(false);
    });
  };

  const handleAmountChange = (text: string) => {
    // Only allow numbers and one decimal point
    const filtered = text.replace(/[^0-9.]/g, '');
    const parts = filtered.split('.');
    if (parts.length > 2) return; // Don't allow multiple decimal points
    if (parts[1]?.length > 2) return; // Don't allow more than 2 decimal places
    setAmount(filtered);
  };

  const handlePaymentMethodSelect = (method: string) => {
    console.log('Selected payment method:', method);
    closeModal();
    // TODO: Implement payment processing
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

      {/* Payment Method Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={closeModal}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={closeModal}
        >
          <Animated.View 
            style={[
              styles.modalContent,
              {
                transform: [{
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [600, 0]
                  })
                }]
              }
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Payment Method</Text>
              <Text style={styles.modalSubtitle}>To load (add) e₹ into your wallet</Text>
            </View>

            {/* UPI Option */}
            <TouchableOpacity 
              style={styles.paymentOption}
              onPress={() => handlePaymentMethodSelect('UPI')}
            >
              <View style={styles.paymentOptionLeft}>
                <Image 
                  source={require('../assets/images/upi.png')} 
                  style={styles.paymentIcon}
                />
                <Text style={styles.paymentText}>UPI</Text>
              </View>
              <View style={styles.radioButton} />
            </TouchableOpacity>

            <Text style={styles.otherMethodsTitle}>Other Payment Method</Text>

            {/* Bank Account Option */}
            <TouchableOpacity 
              style={styles.paymentOption}
              onPress={() => handlePaymentMethodSelect('BANK')}
            >
              <View style={styles.paymentOptionLeft}>
                <Image 
                  source={require('../assets/images/bob.png')} 
                  style={styles.paymentIcon}
                />
                <View>
                  <Text style={styles.paymentText}>BOB</Text>
                  <Text style={styles.accountText}>Savings A/c: XXXXXXXXXX...</Text>
                </View>
              </View>
              <View style={styles.radioButton} />
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>

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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666666',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  paymentOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  paymentText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  accountText: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CCCCCC',
  },
  otherMethodsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
}); 