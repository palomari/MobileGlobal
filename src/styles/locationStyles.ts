import { StyleSheet, Platform } from 'react-native';
import { colors } from '../theme';

const isWeb = Platform.OS === 'web';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
  },
  label: {
    fontSize: isWeb ? 20 : 16,
    color: colors.text,
    marginBottom: 12,
    fontWeight: '500',
    ...(isWeb && {
      maxWidth: 800,
      alignSelf: 'center',
    }),
  },
  micButton: {
  position: 'absolute',
  right: 100,
  top: Platform.OS === 'web' ? 15 : 12,
},

input: {
  backgroundColor: '#fff',
  borderColor: colors.greenLight,
  borderWidth: 1,
  borderRadius: 12,
  paddingVertical: 14,
  paddingLeft: 16,
  paddingRight: 44,
  marginBottom: 24,
  fontSize: Platform.OS === 'web' ? 18 : 16,
  ...(Platform.OS === 'web' && {
    maxWidth: 600,
    alignSelf: 'center',
  }),
},
texto: {
  backgroundColor: '#fff',
  borderColor: colors.greenLight,
  borderWidth: 1,
  borderRadius: 12,
  paddingVertical: 14,
  paddingLeft: 16,
  paddingRight: 44,
  marginBottom: 24,
  fontSize: Platform.OS === 'web' ? 18 : 16,
  width: Platform.OS === 'web' ? 300 : '100%',
  alignSelf: Platform.OS === 'web' ? 'center' : 'stretch',
},

inputWrapper: {
  position: 'relative',
  marginBottom: 16,
  alignSelf: Platform.OS === 'web' ? 'center' : 'stretch',
  width: Platform.OS === 'web' ? 450 : '100%',
},

listeningText: {
  position: 'absolute',
  left: 110,
  top: isWeb ? 12 : 10,
  fontSize: 13,
  color: '#2E7D32',
},
buttonWrapper: {
  borderRadius: 12,
  overflow: 'hidden',
  marginTop: 2,
  maxWidth: 250,
  alignSelf: isWeb ? 'center' : 'stretch',
  ...(isWeb && {
    width: 320,
  }),
},

view1: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#000000aa',
  padding: 20,
},
view2: {
  backgroundColor: '#fff',
  borderRadius: 16,
  paddingVertical: isWeb ? 32 : 20,
  paddingHorizontal: isWeb ? 32 : 16,
  width: isWeb ? 250 : '90%',
  maxWidth: 600,
  alignItems: 'center',
  gap: 12,
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 8,
  elevation: 6,
},
textModal: {
  fontSize: isWeb ? 18 : 15,
  textAlign: 'center',
  color: '#333',
  fontWeight: '500',
  lineHeight: isWeb ? 26 : 20,
},
pressableModal: {
  borderRadius: 8,
  paddingVertical: isWeb ? 12 : 10,
  paddingHorizontal: 20,
  width: '100%',
  marginTop: 6,
},

});
