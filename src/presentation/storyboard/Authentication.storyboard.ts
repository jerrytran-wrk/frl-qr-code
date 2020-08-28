import {ParamListBase} from '@react-navigation/native';

export interface AuthenticationStoryboardParamList extends ParamListBase {
  SignIn: {userName?: string};
  SignUp: {userName?: string};
}
