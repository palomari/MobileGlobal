import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F8E9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 40,
  },
  hintContainer: {
    alignItems: 'center',
  },
  hintText: {
    marginTop: 8,
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '500',
  },
});
