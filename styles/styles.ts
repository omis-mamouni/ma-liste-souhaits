import { StyleSheet } from 'react-native';

export const colors = {
  background: '#141414',     
  card: '#222222',            
  text: '#FFFFFF',          
  border: '#333333',         
  accent: '#E50914',          
  secondary: '#333333',       
  buttonPrimary: '#1DB954',   
  buttonSecondary: '#444444', 
  buttonText: '#FFFFFF',      
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingVertical: 20,
    paddingHorizontal: 8,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 20,
    marginVertical: 12,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 22,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    backgroundColor: colors.card,
    color: colors.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 10,
  },

  // ✅ Boutons
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonPrimary: {
    backgroundColor: colors.buttonPrimary,
  },
  buttonSecondary: {
    backgroundColor: colors.buttonSecondary,
  },
  buttonText: {
    color: colors.buttonText,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
