import validator from 'validator';

/**
 * Security validation utilities for user input
 * Protects against XSS, injection attacks, and malicious input
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  sanitized?: string;
}

/**
 * Validate and sanitize email addresses
 * Prevents email injection attacks
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || typeof email !== 'string') {
    return { isValid: false, error: 'Email is required' };
  }

  // Trim and convert to lowercase
  const trimmedEmail = email.trim().toLowerCase();

  // Check length (RFC 5321 limit is 254)
  if (trimmedEmail.length > 254) {
    return { isValid: false, error: 'Email is too long' };
  }

  // Validate email format
  if (!validator.isEmail(trimmedEmail)) {
    return { isValid: false, error: 'Invalid email format' };
  }

  // Check for email injection patterns (newlines, carriage returns)
  if (/[\r\n]/.test(trimmedEmail)) {
    return { isValid: false, error: 'Invalid characters in email' };
  }

  return { isValid: true, sanitized: trimmedEmail };
}

/**
 * Validate and sanitize name fields
 * Allows letters, spaces, hyphens, apostrophes
 */
export function validateName(name: string): ValidationResult {
  if (!name || typeof name !== 'string') {
    return { isValid: false, error: 'Name is required' };
  }

  const trimmedName = name.trim();

  // Check length
  if (trimmedName.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters' };
  }

  if (trimmedName.length > 100) {
    return { isValid: false, error: 'Name is too long (max 100 characters)' };
  }

  // Allow only letters, spaces, hyphens, apostrophes, and common unicode letters
  const nameRegex = /^[\p{L}\p{M}\s'-]+$/u;
  if (!nameRegex.test(trimmedName)) {
    return { isValid: false, error: 'Name contains invalid characters' };
  }

  // Escape HTML to prevent XSS
  const sanitized = validator.escape(trimmedName);

  return { isValid: true, sanitized };
}

/**
 * Validate and sanitize phone numbers
 * Allows various international formats
 */
export function validatePhone(phone: string): ValidationResult {
  if (!phone || typeof phone !== 'string') {
    return { isValid: false, error: 'Phone number is required' };
  }

  const trimmedPhone = phone.trim();

  // Check length
  if (trimmedPhone.length < 10 || trimmedPhone.length > 20) {
    return { isValid: false, error: 'Invalid phone number length' };
  }

  // Allow only digits, spaces, hyphens, plus, and parentheses
  const phoneRegex = /^[\d\s\-+()]+$/;
  if (!phoneRegex.test(trimmedPhone)) {
    return { isValid: false, error: 'Phone number contains invalid characters' };
  }

  // Count digits only
  const digitCount = trimmedPhone.replace(/\D/g, '').length;
  if (digitCount < 10 || digitCount > 15) {
    return { isValid: false, error: 'Invalid phone number' };
  }

  const sanitized = validator.escape(trimmedPhone);

  return { isValid: true, sanitized };
}

/**
 * Validate and sanitize text messages
 * Prevents XSS and limits length
 */
export function validateMessage(message: string, maxLength: number = 5000): ValidationResult {
  if (!message || typeof message !== 'string') {
    return { isValid: false, error: 'Message is required' };
  }

  const trimmedMessage = message.trim();

  // Check minimum length
  if (trimmedMessage.length < 10) {
    return { isValid: false, error: 'Message must be at least 10 characters' };
  }

  // Check maximum length
  if (trimmedMessage.length > maxLength) {
    return { isValid: false, error: `Message is too long (max ${maxLength} characters)` };
  }

  // Escape HTML to prevent XSS
  const sanitized = validator.escape(trimmedMessage);

  return { isValid: true, sanitized };
}

/**
 * Validate and sanitize general text fields
 * Used for business names, project types, etc.
 */
export function validateTextField(
  field: string,
  fieldName: string,
  minLength: number = 2,
  maxLength: number = 200
): ValidationResult {
  if (!field || typeof field !== 'string') {
    return { isValid: false, error: `${fieldName} is required` };
  }

  const trimmedField = field.trim();

  if (trimmedField.length < minLength) {
    return { isValid: false, error: `${fieldName} must be at least ${minLength} characters` };
  }

  if (trimmedField.length > maxLength) {
    return { isValid: false, error: `${fieldName} is too long (max ${maxLength} characters)` };
  }

  // Escape HTML to prevent XSS
  const sanitized = validator.escape(trimmedField);

  return { isValid: true, sanitized };
}

/**
 * Sanitize HTML content for safe display in emails
 * Escapes all HTML tags to prevent XSS
 */
export function sanitizeForEmail(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Escape HTML entities
  let sanitized = validator.escape(input);

  // Preserve line breaks by converting \n to <br> after escaping
  sanitized = sanitized.replace(/\n/g, '<br>');

  return sanitized;
}

/**
 * Validate URL format
 * Used for optional website fields
 */
export function validateURL(url: string): ValidationResult {
  if (!url || typeof url !== 'string') {
    return { isValid: false, error: 'URL is required' };
  }

  const trimmedURL = url.trim();

  if (trimmedURL.length > 2048) {
    return { isValid: false, error: 'URL is too long' };
  }

  if (!validator.isURL(trimmedURL, { require_protocol: false })) {
    return { isValid: false, error: 'Invalid URL format' };
  }

  const sanitized = validator.escape(trimmedURL);

  return { isValid: true, sanitized };
}
