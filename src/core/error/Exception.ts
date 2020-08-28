export class Exception {}

export class UnKnowException extends Exception {}
export class RemoteException extends Exception {}

export class ServerException extends RemoteException {}

export class UnAuthorizedException extends RemoteException {}

export class LocalException extends Exception {}

export class PermissionDenied extends LocalException {}
