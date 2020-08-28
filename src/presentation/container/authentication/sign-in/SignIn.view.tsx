import React from 'react';
import {View, Image, ScrollView} from 'react-native';
// import from library section

// importing from alias section
import {AppIcons, AppImages} from '@assets';
import {
  ErrorBoundary,
  TextField,
  RoundedButton,
  TextView,
  FullScreenLoadingIndicator,
} from '@components';
// importing from local file
import {useSignIn} from './SignIn.store';
import {SignInProps} from './SignIn.type';
import {SignInStyles} from './SignIn.style';
import {NavigatorContext} from '../../../context';
import {Icon} from 'react-native-elements';

export const SignIn: React.FC<SignInProps> = (props) => {
  const [state, action] = useSignIn();
  const {navigation} = props;
  const {setIsAuthorized} = React.useContext(NavigatorContext);

  React.useEffect(() => {
    return action.reset;
  }, [action.reset]);

  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');

  const signIn = React.useCallback(async () => {
    const success = await action.signIn(userName, password);
    if (success) {
      setIsAuthorized(true);
    }
  }, [action, userName, password, setIsAuthorized]);

  const onScanQRButtonPress = React.useCallback(() => {
    navigation.navigate('ScanQR');
  }, [navigation]);

  const renderForm = () => {
    return (
      <View>
        <TextField
          prefix={<Icon name="lock-open-outline" type="ionicon" />}
          containerStyle={SignInStyles.marginTop}
          inputProps={{
            placeholder: 'Tài khoản',
            onChangeText: setUserName,
          }}
        />
        <TextField
          prefix={<Icon name="apps-outline" type="ionicon" />}
          containerStyle={SignInStyles.marginTop}
          inputProps={{
            placeholder: 'Mật khẩu',
            secureTextEntry: true,
            onChangeText: setPassword,
          }}
        />
        <View style={SignInStyles.marginTop} />
        <View style={SignInStyles.marginTop} />
        <View style={SignInStyles.marginTop} />
        <RoundedButton
          containerStyle={SignInStyles.marginTop}
          onPress={signIn}
          title="Đăng nhập"
        />
        <RoundedButton
          containerStyle={SignInStyles.marginTop}
          title="Quét mã"
          onPress={onScanQRButtonPress}
        />
      </View>
    );
  };

  return (
    <ErrorBoundary>
      <FullScreenLoadingIndicator visible={state.isSigning} />
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
