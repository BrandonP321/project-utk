export class PasswordUtils {
  static minLength = 8;
  static maxLength = 128;
  static allowedSpecialCharacters = ["!", "@", "#", "$", "%", "^", "&", "*"];

  static uppercaseRegex = /(?=.*[A-Z])/;
  static lowercaseRegex = /(?=.*[a-z])/;
  static numberRegex = /(?=.*[0-9])/;
  static specialCharacterRegex = new RegExp(
    `(?=.*[${PasswordUtils.allowedSpecialCharacters.join("")}])`
  );
  static noControlCharactersRegex = /^[\x20-\x7E]*$/;
}
