import { StyleSheet, Platform, Dimensions } from 'react-native';
import { colors } from '../theme';

const isWeb = Platform.OS === 'web';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: 24,
    paddingBottom: 100,
    ...(isWeb && {
      maxWidth: 800,
      alignSelf: 'center',
    }),
  },
  title: {
    fontSize: isWeb ? 34 : 24,
    fontWeight: 'bold',
    color: colors.greenDark,
    marginBottom: 20,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: isWeb ? 24 : 18,
    marginTop: 28,
    marginBottom: 12,
    color: colors.text,
    fontWeight: '500'
  },
  itemBox: {
    backgroundColor: '#fff',
    padding: isWeb ? 20 : 12,
    borderRadius: 10,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: isWeb ? 20 : 16,
    color: colors.greenDark,
    marginBottom: 6,
  },
  itemContent: {
    fontSize: isWeb ? 18 : 14,
    color: colors.text,
    marginBottom: 4,
  },
  buttonGroup: {
    gap: 8,
    marginTop: 12,
  },
  buttonWrapper: {
    marginBottom: 6,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.greenLight,
    backgroundColor: colors.greenDark,
  },
});
