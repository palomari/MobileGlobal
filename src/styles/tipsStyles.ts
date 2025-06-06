import { StyleSheet } from 'react-native';
import { colors } from '../theme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  title: { fontSize: 22, color: colors.greenDark, marginBottom: 16, fontWeight: 'bold' },
  item: {
    fontSize: 16,
    marginBottom: 12,
    color: colors.text,
    borderBottomWidth: 1,
    borderBottomColor: colors.greenLight,
    paddingBottom: 8
  }
});
