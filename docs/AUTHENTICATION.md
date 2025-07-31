# Authentication System

This portfolio includes a robust server-side authentication system with the following features:

## Security Features

- **Password Hashing**: Uses bcrypt to hash passwords securely
- **JWT Tokens**: Encrypted JSON Web Tokens for session management
- **Secure Cookies**: HTTP-only, secure, and SameSite cookies for CSRF protection
- **Server-Side Validation**: All authentication checks happen on the server
- **Brute Force Protection**: 1-second delay on failed login attempts
- **Token Expiration**: 7-day token expiration with automatic cleanup

## Setup

1. **Install Dependencies** (already done):
   ```bash
   npm install bcryptjs jsonwebtoken
   npm install --save-dev @types/bcryptjs @types/jsonwebtoken
   ```

2. **Environment Variables**:
   Create or update your `.env.local` file:
   ```env
   ADMIN_PASSWORD=your-secure-password
   JWT_SECRET=your-super-secret-jwt-key
   ```

3. **Generate a Secure JWT Secret**:
   ```bash
   node scripts/generate-jwt-secret.js
   ```

## How It Works

### Login Process
1. User enters password on `/login`
2. Server compares input with bcrypt-hashed admin password
3. If valid, creates encrypted JWT token with user info
4. Sets secure HTTP-only cookie with the token
5. Redirects to `/admin`

### Authentication Check
1. Middleware checks for auth token on protected routes
2. Verifies JWT token signature and expiration
3. If valid, allows access; if not, redirects to login
4. Server components double-check authentication

### Logout Process
1. Server action clears the authentication cookie
2. Redirects to login page

## File Structure

```
src/
├── lib/auth.ts                           # Authentication utilities
├── app/(auth)/login/
│   ├── page.tsx                         # Login page
│   ├── components/LoginForm.tsx         # Login form component
│   └── actions/
│       ├── loginAction.ts               # Login server action
│       └── logoutAction.ts              # Logout server action
├── app/admin/
│   └── page.tsx                         # Protected admin dashboard
└── middleware.ts                        # Route protection middleware

scripts/
└── generate-jwt-secret.js               # JWT secret generator
```

## Security Best Practices

1. **Change Default Password**: Update `ADMIN_PASSWORD` in `.env.local`
2. **Use Strong JWT Secret**: Generate with the provided script
3. **Environment Security**: Never commit `.env.local` to version control
4. **HTTPS in Production**: Ensure secure cookies work properly
5. **Regular Updates**: Keep dependencies updated for security patches

## Usage

- **Login**: Navigate to `/login` and enter the admin password
- **Admin Access**: Visit `/admin` (automatically redirects if not authenticated)
- **Logout**: Click the logout button in the admin dashboard

## Customization

- **Password Storage**: Currently uses environment variable; can be moved to database
- **Role-Based Access**: JWT payload includes role field for future expansion
- **Session Duration**: Modify token expiration in `src/lib/auth.ts`
- **Brute Force Protection**: Adjust delay time in login action
