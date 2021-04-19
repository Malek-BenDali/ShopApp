import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {Card, Input, PrimaryButton} from '../../components/shared';
import {colors} from '../../constants';

const AuthScreen = props => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}>
      <Card styles={styles.authContainer}>
        <ScrollView>
          <Input
            id="email"
            label="E-Mail"
            required
            email
            autoCapitalize="none"
            errorMessage="Please enter a valid email adress"
            onInputChange={() => {}}
            initialValue=""
          />
          <Input
            id="password"
            label="passord"
            secureTextEntry
            required
            email
            minLength={5}
            autoCapitalize="none"
            errorMessage="Please enter a valid password"
            onInputChange={() => {}}
            initialValue=""
          />
          <PrimaryButton title="Login" onPress={() => {}} />
          <PrimaryButton
            title="Switch to Sign Up"
            styles={{backgroundColor: colors.secondary}}
            onPress={() => {}}
          />
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    // height: '50%',
    maxHeight: 400,
    padding: 20,
    justifyContent: 'space-evenly',
  },
});
