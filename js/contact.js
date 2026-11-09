/**
 * COS 106: Introduction to Web Technologies - Term Project
 * Student: MAHMUD BASHIR OLASUNKANMI
 * Matric No: 2025/C/CYB/1339 | Degree: B.Sc. Cybersecurity
 * File: js/contact.js - Client-Side Contact Form Validation
 * 
 * Strict Validation Requirements (from Rubric):
 * 1. No field is empty
 * 2. Email format is valid
 * 3. Phone number contains ONLY digits
 */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const phoneInput = document.getElementById('contactPhone');
  const messageInput = document.getElementById('contactMessage');
  const formSuccessModal = document.getElementById('formSuccessModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalOkBtn = document.getElementById('modalOkBtn');

  // Input Event Listeners for real-time validation clearing
  [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        validateField(input);
      });
      input.addEventListener('blur', () => {
        validateField(input);
      });
    }
  });

  // Modal Close Events
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }
  if (modalOkBtn) {
    modalOkBtn.addEventListener('click', closeModal);
  }
  if (formSuccessModal) {
    formSuccessModal.addEventListener('click', (e) => {
      if (e.target === formSuccessModal) closeModal();
    });
  }

  function closeModal() {
    if (formSuccessModal) {
      formSuccessModal.classList.remove('active');
    }
  }

  // Submit Handler
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput);
    const isEmailValid = validateField(emailInput);
    const isPhoneValid = validateField(phoneInput);
    const isMessageValid = validateField(messageInput);

    if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
      // All validations passed!
      const submittedName = nameInput.value.trim();
      
      // Update success modal text
      const modalMsg = document.getElementById('modalSenderName');
      if (modalMsg) {
        modalMsg.textContent = submittedName;
      }

      // Show success modal
      if (formSuccessModal) {
        formSuccessModal.classList.add('active');
      }

      // Reset form
      contactForm.reset();
      clearAllErrors();

      if (window.showToast) {
        window.showToast('Message sent successfully to Mahmud Bashir!', 'success');
      }
    } else {
      // Focus on first invalid field
      const firstInvalid = contactForm.querySelector('.is-invalid');
      if (firstInvalid) {
        firstInvalid.focus();
      }
      if (window.showToast) {
        window.showToast('Please correct the highlighted form errors.', 'danger');
      }
    }
  });

  /**
   * Field-by-field Validation Logic
   */
  function validateField(input) {
    if (!input) return true;
    const value = input.value.trim();
    const id = input.id;

    // 1. Validation for Name
    if (id === 'contactName') {
      if (value === '') {
        showError(input, 'Full name is required and cannot be empty.');
        return false;
      }
      if (value.length < 2) {
        showError(input, 'Please enter your full name (at least 2 characters).');
        return false;
      }
      clearError(input);
      return true;
    }

    // 2. Validation for Email (Requirement: Valid email format)
    if (id === 'contactEmail') {
      if (value === '') {
        showError(input, 'Email address is required and cannot be empty.');
        return false;
      }
      // Standard RFC Email Regex
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) {
        showError(input, 'Please enter a valid email address (e.g., student@miva.edu.ng).');
        return false;
      }
      clearError(input);
      return true;
    }

    // 3. Validation for Phone Number (Requirement: Only digits allowed!)
    if (id === 'contactPhone') {
      if (value === '') {
        showError(input, 'Phone number is required and cannot be empty.');
        return false;
      }
      // Strictly digits only: ^[0-9]+$
      const digitsOnlyRegex = /^[0-9]+$/;
      if (!digitsOnlyRegex.test(value)) {
        showError(input, 'Invalid phone number! It must contain digits only (no spaces, letters, or symbols).');
        return false;
      }
      if (value.length < 8 || value.length > 15) {
        showError(input, 'Phone number must be between 8 and 15 digits (e.g. 08072410373).');
        return false;
      }
      clearError(input);
      return true;
    }

    // 4. Validation for Message
    if (id === 'contactMessage') {
      if (value === '') {
        showError(input, 'Message body is required and cannot be empty.');
        return false;
      }
      if (value.length < 10) {
        showError(input, 'Your message is too short. Please provide at least 10 characters.');
        return false;
      }
      clearError(input);
      return true;
    }

    return true;
  }

  function showError(input, message) {
    input.classList.add('is-invalid');
    const feedback = input.parentElement.querySelector('.error-feedback');
    if (feedback) {
      feedback.textContent = message;
      feedback.style.display = 'block';
    }
  }

  function clearError(input) {
    input.classList.remove('is-invalid');
    const feedback = input.parentElement.querySelector('.error-feedback');
    if (feedback) {
      feedback.style.display = 'none';
    }
  }

  function clearAllErrors() {
    const errorFeedbacks = contactForm.querySelectorAll('.error-feedback');
    errorFeedbacks.forEach(el => el.style.display = 'none');
    const invalidInputs = contactForm.querySelectorAll('.is-invalid');
    invalidInputs.forEach(el => el.classList.remove('is-invalid'));
  }
});
