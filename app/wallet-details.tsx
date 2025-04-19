import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function WalletDetails() {
  const { privateKey, publicKey } = useLocalSearchParams();

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Wallet Details</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Digital Rupee Wallet</Text>
          
          <View style={styles.keyContainer}>
            <Text style={styles.keyLabel}>Public Key</Text>
            <Text style={styles.keyValue} selectable>{publicKey}</Text>
          </View>

          <View style={styles.keyContainer}>
            <Text style={styles.keyLabel}>Private Key</Text>
            <Text style={styles.keyValue} selectable>{privateKey}</Text>
          </View>

          <Text style={styles.warning}>
            ⚠️ Keep your private key secure and never share it with anyone.
          </Text>
        </View>
      </ScrollView>

      <StatusBar style="dark" />
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  keyContainer: {
    marginBottom: 20,
  },
  keyLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  keyValue: {
    fontSize: 14,
    color: '#333',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    fontFamily: 'monospace',
  },
  warning: {
    color: '#D35400',
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
}); 