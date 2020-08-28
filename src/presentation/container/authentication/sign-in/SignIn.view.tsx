import React from 'react';
import {View, Image, ScrollView} from 'react-native';
// import from library section

// importing from alias section
import {AppIcons, AppImages} from '@assets';
import {ErrorBoundary, TextField, RoundedButton, TextView} from '@components';
// importing from local file
import {useSignIn} from './SignIn.store';
import {SignInProps} from './SignIn.type';
import {SignInStyles} from './SignIn.style';
import {NavigatorContext} from '../../../context';

export const SignIn: React.FC<SignInProps> = (_) => {
  const [state, action] = useSignIn();
  const {setIsAuthorized} = React.useContext(NavigatorContext);

  const signIn = React.useCallback(() => {
    setIsAuthorized(true);
    console.log(state, action);
  }, [setIsAuthorized, state, action]);

  const renderForm = () => {
    return (
      <View>
        <TextField
          prefixIcon={AppIcons.USER}
          containerStyle={SignInStyles.marginTop}
        />
        <TextField
          prefixIcon={AppIcons.USER}
          containerStyle={SignInStyles.marginTop}
        />
        <RoundedButton
          containerStyle={SignInStyles.marginTop}
          onPress={signIn}
          title="Đăng nhập"
        />
        <RoundedButton
          containerStyle={SignInStyles.marginTop}
          title="Quét mã"
        />
      </View>
    );
  };

  return (
    <ErrorBoundary>
      <ScrollView contentContainerStyle={SignInStyles.container}>
        <Image
          style={SignInStyles.logo}
          source={AppImages.LOGO}
          resizeMode="contain"
        />
        {renderForm()}
        <TextView
          style={SignInStyles.copyright}
          text="Power by Công ty tnhh Vicopha"
        />
      </ScrollView>
    </ErrorBoundary>
  );
};
