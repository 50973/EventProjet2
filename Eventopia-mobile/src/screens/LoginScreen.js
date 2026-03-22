import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  // 2. État local : valeurs des champs et message d'erreur
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 3. Récupération de la fonction login du contexte (fournie par AuthProvider)
  const { login } = useAuth();

  // 4. Appelée au clic sur "Se connecter"
  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setError('Veuillez remplir email et mot de passe.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      // 5. Appel API POST /api/auth/login via le contexte (qui stocke token + user)
      await login(email.trim(), password);
      // 6. Succès : le contexte a mis à jour user, App.js affichera alors la navigation (liste des events)
    } catch (err) {
      // 7. Erreur réseau ou 401 : afficher le message renvoyé par l'API ou un message par défaut
      const message = err.response?.data?.message || 'Erreur de connexion. Vérifiez vos identifiants.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // 8. KeyboardAvoidingView : décale le contenu quand le clavier s'ouvre (UX sur mobile)
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.form}>
        <Text style={styles.title}>Connexion</Text>

        {/* 9. Champ email : valeur contrôlée par l'état email */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!loading}
        />

        {/* 10. Champ mot de passe : secureTextEntry masque les caractères */}
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
        />

        {/* 11. Message d'erreur affiché sous les champs */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* 12. Bouton : désactivé pendant le chargement, affiche un indicateur si loading */}
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Se connecter</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  form: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  errorText: {
    color: '#c00',
    marginBottom: 12,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});