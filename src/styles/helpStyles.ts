import { StyleSheet, Platform, Dimensions } from 'react-native';
import { colors } from '../theme';

const isWeb = Platform.OS === 'web';
const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingVertical: 20,
    paddingHorizontal: isWeb && screenWidth > 768 ? 550 : 16,
  },
  title: {
    fontSize: isWeb ? 20 : 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.greenDark,
    marginBottom: isWeb ? 12 : 16,
  },
  label: {
    fontSize: isWeb ? 14 : 16,
    color: colors.text,
    marginBottom: 6,
    marginTop: 12,
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: colors.greenLight,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: isWeb ? 8 : 12,
    paddingHorizontal: isWeb ? 10 : 12,
    paddingRight: 36,
    fontSize: isWeb ? 13 : 14,
  },
  micIcon: {
    position: 'absolute',
    right: 10,
    top: isWeb ? 8 : 10,
  },
  button: {
    marginTop: 24,
    backgroundColor: colors.greenDark,
    paddingVertical: isWeb ? 10 : 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: isWeb ? 14 : 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000aa',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: isWeb ? 20 : 24,
    width: isWeb ? 300 : '90%',
    maxWidth: 400,
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 6,
  },
  modalText: {
    fontSize: isWeb ? 14 : 16,
    textAlign: 'center',
    color: '#333',
    fontWeight: '500',
  },
  modalButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: isWeb ? 10 : 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 12,
  },
});
