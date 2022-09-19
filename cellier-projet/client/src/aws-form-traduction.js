import { I18n } from "aws-amplify";

I18n.setLanguage("fr");

const dict = {
	fr: {
	"Sign In": "Connexion",
	"Sign in": "Se connecter",
	"Create Account": "Inscription",
	"Forgot your password?": "Mot de passe oublié ?",
	"Reset your password": "Réinitialiser votre mot de passe",
	"Send code": "Envoyer le code",
	"Resend Code": "Renvoyer le code",
	Submit: "Envoyer",
	Submitting: "Envoi en cours...",
	Sending: "Envoi en cours...",
	Confirming: "Confirmation en cours...",
	"Back to Sign In": "Retour à la connexion",
	"Signing in": "Veuillez patientez",
	"User does not exist.": "Adresse courriel ou mot de passe incorrecte",
	"Incorrect username or password.":
		"Adresse courriel ou mot de passe incorrecte",
	"Username/client id combination not found.": "Adresse courriel invalide",
	"Attempt limit exceeded, please try after some time.":
		"Trop de tentatives, veuillez réessayer plus tard",
	"Cannot reset password for the user as there is no registered/verified email or phone_number":
		"Adresse courriel invalide",
	"Password must have at least 8 characters":
		"Le mot de passe doit contenir au moins 8 caractère",
	"Your passwords must match": "Vos mots de passe doivent être identiques",
	"An account with the given email already exists.":
		"Adresse courriel invalide",
	"Invalid verification code provided, please try again.":
		"Code invalide, veuillez réessayer",
	"Username cannot be empty": "Veuillez entrer votre adresse courriel",
	"Custom auth lambda trigger is not configured for the user pool.":
		"Adresse courriel ou mot de passe incorrecte",
	"Password cannot be empty": "Veuillez entrer votre mot de passe",
	"Creating Account": "Création du compte",
	Confirm: "Confirmer",
	"We Emailed You": "Courriel envoyé",
	"Your code is on the way. To log in, enter the code we emailed to":
		"Votre code a été envoyé à votre adresse ",
	"It may take a minute to arrive.":
		"Cela pourrait prendre quelque minutes",
	"User does not exist.": "Adresse courriel ou mot de passe incorrecte",
	"Incorrect username or password.":
		"Adresse courriel ou mot de passe incorrecte",
	"Username/client id combination not found.": "Adresse courriel invalide",
	"Attempt limit exceeded, please try after some time.":
		"Trop de tentatives, veuillez réessayer plus tard",
	"Cannot reset password for the user as there is no registered/verified email or phone_number":
		"Adresse courriel invalide",
	"Password must have at least 8 characters":
		"Le mot de passe doit contenir au moins 8 caractère",
	"Your passwords must match": "Vos mots de passe doivent être identiques",
	"An account with the given email already exists.":
		"Adresse courriel invalide",
	"Invalid verification code provided, please try again.":
		"Code invalide, veuillez réessayer",
	"Username cannot be empty": "Veuillez entrer votre adresse courriel",
	"Custom auth lambda trigger is not configured for the user pool.":
		"Adresse courriel ou mot de passe incorrecte",
	"Password cannot be empty": "Veuillez entrer votre mot de passe",
	"Creating Account": "Création du compte",
	Confirm: "Confirmer",
	"We Emailed You": "Courriel envoyé",
	"Your code is on the way. To log in, enter the code we emailed to":
		"Votre code a été envoyé à votre adresse ",
	"It may take a minute to arrive.":
		"Cela pourrait prendre quelque minutes",
	"We Sent A Code": "Code Envoyé",
	"Your code is on the way. To log in, enter the code we sent you. It may take a minute to arrive.":
		"Votre code a été envoyé à votre adresse. Cela pourrait prendre quelque minutes",
	Skip: "Passer",
	Verify: "Vérifier",
	Email: "Courriel",
	"Account recovery requires verified contact information":
		"La récupération de compte nécessite des informations de contact vérifiées",
	},
};

const formFields = {
	signIn: {
		username: {
			labelHidden: true,
			placeholder: I18n.get("Adresse courriel"),
		},
		password: {
			labelHidden: true,
			placeholder: I18n.get("Mot de passe"),
		},
		},

		signUp: {
		email: {
			labelHidden: true,
			placeholder: I18n.get("Adresse courriel"),
		},
		password: {
			labelHidden: true,
			placeholder: I18n.get("Mot de passe"),
		},
		confirm_password: {
			labelHidden: true,
			placeholder: I18n.get("Confirmation mot de passe"),
		},
		},
		resetPassword: {
		username: {
			labelHidden: true,
			placeholder: I18n.get("Adresse courriel"),
		},
		},
		confirmResetPassword: {
		password: {
			labelHidden: true,
			placeholder: I18n.get("Mot de passe"),
		},
		confirm_password: {
			labelHidden: true,
			placeholder: I18n.get("Confirmation mot de passe"),
		},
	},
};

I18n.putVocabularies(dict);

export {dict, formFields };