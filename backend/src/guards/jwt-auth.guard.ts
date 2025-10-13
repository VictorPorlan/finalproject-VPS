import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    console.log('JWT Guard - Error:', err);
    console.log('JWT Guard - User:', user ? `ID: ${user.id}` : 'null');
    console.log('JWT Guard - Info:', info);
    if (err || !user) {
      console.log('JWT Guard - Authentication failed');
      throw err || new Error('Unauthorized');
    }
    return user;
  }
}
