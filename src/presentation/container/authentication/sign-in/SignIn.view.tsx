import React from 'react';
import {View, Image, ScrollView, Alert, ActivityIndicator} from 'react-native';
// import from library section

// importing from alias section
import {AppImages} from '@assets';
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
import {LightTheme} from '@resources';

export const SignIn: React.FC<SignInProps> = (props) => {
  const [state, action] = useSignIn();
  const {navigation} = props;
  const {setIsAuthorized} = React.useContext(NavigatorContext);

  const checkCurrentSession = React.useCallback(async () => {
    const result = await action.checkCurrentSession();
    setIsAuthorized(result);
  }, [action, setIsAuthorized]);

  React.useEffect(() => {
    checkCurrentSession();
    return action.reset();
  }, [checkCurrentSession, action]);

  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');

  const signIn = React.useCallback(async () => {
    const success = await action.signIn(userName, password);
    setIsAuthorized(success);
    if (!success) {
      Alert.alert(
        'Đăng nhập thất bại',
        'Vui lòng Kiểm tra lại thông tin tài khoản hoặc mật khẩu?',
      );
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

  if (state.isValidatingCurrentSession) {
    return (
      <View style={SignInStyles.centerAll}>
        <Image
          style={SignInStyles.logo}
          source={AppImages.LOGO}
          resizeMode="contain"
        />
        {state.isSigning && (
          <ActivityIndicator color={LightTheme.colorScheme.secondary} />
        )}
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <FullScreenLoadingIndicator
        visible={state.isSigning && !state.isValidatingCurrentSession}
      />
      <ScrollView contentContainerStyle={SignInStyles.container}>
        <Image
          style={SignInStyles.logo}
          source={AppImages.LOGO}
          resizeMode="contain"
        />
        {renderForm()}
        <TextView
          style={SignInStyles.copyright}
          text="Powered by Công ty TNHH Vicopha"
        />
      </ScrollView>
    </ErrorBoundary>
  );
};
