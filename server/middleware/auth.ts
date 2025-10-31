
import { Request, Response, NextFunction } from "express";

// Simple admin authentication middleware
// In production, you should use environment variables for credentials
export function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).json({ message: 'Authentication required' });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  // Use environment variables for admin credentials
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'changeme123';

  // Trim whitespace from credentials
  const trimmedUsername = username?.trim();
  const trimmedPassword = password?.trim();

  console.log('Auth attempt:', { 
    receivedUsername: trimmedUsername,
    expectedUsername: adminUsername,
    usernameMatch: trimmedUsername === adminUsername,
    hasPassword: !!trimmedPassword
  });

  if (trimmedUsername === adminUsername && trimmedPassword === adminPassword) {
    next();
  } else {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).json({ 
      message: 'Invalid credentials',
      hint: 'Using default credentials: admin / changeme123'
    });
  }
}
