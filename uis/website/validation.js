"use strict";

const form = document.getElementById("brasa-points-form");

const fullNameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const birthDateInput = document.getElementById("birth-date");
const howHeardSelect = document.getElementById("how-heard");
const countrySelect = document.getElementById("country");
const citySelect = document.getElementById("city");

const favoriteLocationSelect = document.getElementById(
	"favorite-location"
);

const termsCheckbox = document.getElementById("terms");

const foodOtherCheckbox = document.getElementById(
	"food-other-checkbox"
);

const foodOtherContainer = document.getElementById(
	"food-other-container"
);

const foodOtherInput = document.getElementById("food-other");

const successMessage = document.getElementById("success-message");
const formSummary = document.getElementById("form-summary");

const formSummaryList = document.getElementById(
	"form-summary-list"
);

/*
	Esta variable nos permite saber si el usuario ya intentó
	enviar el formulario.

	Antes del primer envío no mostramos el resumen general.
	Después del primer envío, el resumen se actualiza
	automáticamente cada vez que se corrige un campo.
*/
let formHasBeenSubmitted = false;

const citiesByCountry = {
	colombia: [
		{
			value: "medellin",
			label: "Medellín",
		},
		{
			value: "bogota",
			label: "Bogotá",
		},
		{
			value: "cali",
			label: "Cali",
		},
	],

	usa: [
		{
			value: "miami",
			label: "Miami",
		},
		{
			value: "orlando",
			label: "Orlando",
		},
	],
};

const locationsByCity = {
	medellin: [
		{
			value: "poblado",
			label: "Brasaland El Poblado",
		},
		{
			value: "laureles",
			label: "Brasaland Laureles",
		},
		{
			value: "envigado",
			label: "Brasaland Envigado",
		},
		{
			value: "sabaneta",
			label: "Brasaland Sabaneta",
		},
	],

	bogota: [
		{
			value: "usaquen",
			label: "Brasaland Usaquén",
		},
		{
			value: "chapinero",
			label: "Brasaland Chapinero",
		},
		{
			value: "zona-rosa",
			label: "Brasaland Zona Rosa",
		},
	],

	cali: [
		{
			value: "granada",
			label: "Brasaland Granada",
		},
		{
			value: "ciudad-jardin",
			label: "Brasaland Ciudad Jardín",
		},
		{
			value: "unicentro",
			label: "Brasaland Unicentro",
		},
	],

	miami: [
		{
			value: "brickell",
			label: "Brasaland Brickell",
		},
		{
			value: "coral-gables",
			label: "Brasaland Coral Gables",
		},
	],

	orlando: [
		{
			value: "downtown",
			label: "Brasaland Downtown",
		},
		{
			value: "international-drive",
			label: "Brasaland International Drive",
		},
	],
};

const errorMessages = {
	fullName:
		"Ingresa tu nombre completo (nombre y apellido)",

	email:
		"Ingresa un email válido (ejemplo: nombre@correo.com)",

	phone:
		"El teléfono debe incluir código de país (ejemplo: +57 300 123 4567 o +1 305 123 4567)",

	country:
		"Selecciona tu país",

	city:
		"Selecciona tu ciudad",

	howHeard:
		"Cuéntanos cómo conociste Brasaland",

	birthDate:
		"Debes ser mayor de 18 años para registrarte en Brasa Points",

	terms:
		"Debes aceptar los términos del programa Brasa Points para continuar",
};

const fieldNames = {
	"full-name": "Nombre completo",
	email: "Email",
	phone: "Teléfono",
	"birth-date": "Fecha de nacimiento",
	"how-heard": "¿Cómo nos conociste?",
	country: "País",
	city: "Ciudad",
	terms: "Términos del programa",
};

const validatedFields = [
	fullNameInput,
	emailInput,
	phoneInput,
	birthDateInput,
	howHeardSelect,
	countrySelect,
	citySelect,
	termsCheckbox,
];

function populateSelect(select, options, placeholder) {
	select.innerHTML = "";

	const placeholderOption = document.createElement("option");

	placeholderOption.value = "";
	placeholderOption.textContent = placeholder;

	select.appendChild(placeholderOption);

	options.forEach((optionData) => {
		const option = document.createElement("option");

		option.value = optionData.value;
		option.textContent = optionData.label;

		select.appendChild(option);
	});
}

function resetCitySelect() {
	populateSelect(
		citySelect,
		[],
		"Selecciona primero un país"
	);

	citySelect.disabled = true;
}

function resetLocationSelect() {
	populateSelect(
		favoriteLocationSelect,
		[],
		"Selecciona primero una ciudad"
	);

	favoriteLocationSelect.disabled = true;
}

function updateCities() {
	const selectedCountry = countrySelect.value;

	resetLocationSelect();

	if (
		!selectedCountry ||
		!citiesByCountry[selectedCountry]
	) {
		resetCitySelect();
		return;
	}

	populateSelect(
		citySelect,
		citiesByCountry[selectedCountry],
		"Selecciona tu ciudad"
	);

	citySelect.disabled = false;
}

function updateLocations() {
	const selectedCity = citySelect.value;

	if (
		!selectedCity ||
		!locationsByCity[selectedCity]
	) {
		resetLocationSelect();
		return;
	}

	populateSelect(
		favoriteLocationSelect,
		locationsByCity[selectedCity],
		"Selecciona una ubicación"
	);

	favoriteLocationSelect.disabled = false;
}

function normalizeSpaces(value) {
	return value.trim().replace(/\s+/g, " ");
}

function isValidFullName(value) {
	const normalizedName = normalizeSpaces(value);
	const nameParts = normalizedName.split(" ");

	return (
		nameParts.length >= 2 &&
		nameParts.every((part) => part.length >= 2)
	);
}

function isValidEmail(value) {
	const emailPattern =
		/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

	return emailPattern.test(value.trim());
}

function isValidPhone(value) {
	const phone = value.trim();
	const country = countrySelect.value;

	if (country === "colombia") {
		return /^\+57[\s-]?\d(?:[\s-]?\d){9}$/.test(
			phone
		);
	}

	if (country === "usa") {
		return /^\+1[\s-]?\d(?:[\s-]?\d){9}$/.test(
			phone
		);
	}

	return /^\+(57|1)[\s-]?\d(?:[\s-]?\d){9}$/.test(
		phone
	);
}

function calculateAge(birthDateValue) {
	if (!birthDateValue) {
		return null;
	}

	const birthDate = new Date(
		`${birthDateValue}T00:00:00`
	);

	const today = new Date();

	if (
		Number.isNaN(birthDate.getTime()) ||
		birthDate > today
	) {
		return null;
	}

	let age =
		today.getFullYear() - birthDate.getFullYear();

	const monthDifference =
		today.getMonth() - birthDate.getMonth();

	const birthdayHasNotOccurred =
		monthDifference < 0 ||
		(
			monthDifference === 0 &&
			today.getDate() < birthDate.getDate()
		);

	if (birthdayHasNotOccurred) {
		age -= 1;
	}

	return age;
}

function isAdult(value) {
	const age = calculateAge(value);

	return age !== null && age >= 18;
}

function getErrorElement(field) {
	return document.getElementById(
		`${field.id}-error`
	);
}

function showFieldError(field, message) {
	const errorElement = getErrorElement(field);

	field.setAttribute("aria-invalid", "true");

	field.classList.remove(
		"border-stone-300",
		"focus:border-brasa-600",
		"focus:ring-brasa-100"
	);

	field.classList.add(
		"border-red-600",
		"focus:border-red-700",
		"focus:ring-red-100"
	);

	if (errorElement) {
		errorElement.textContent = message;
		errorElement.classList.remove("hidden");
	}
}

function clearFieldError(field) {
	const errorElement = getErrorElement(field);

	field.setAttribute("aria-invalid", "false");

	field.classList.remove(
		"border-red-600",
		"focus:border-red-700",
		"focus:ring-red-100"
	);

	field.classList.add(
		"border-stone-300",
		"focus:border-brasa-600",
		"focus:ring-brasa-100"
	);

	if (errorElement) {
		errorElement.textContent = "";
		errorElement.classList.add("hidden");
	}
}

function validateFullName() {
	if (!isValidFullName(fullNameInput.value)) {
		showFieldError(
			fullNameInput,
			errorMessages.fullName
		);

		return false;
	}

	clearFieldError(fullNameInput);

	return true;
}

function validateEmail() {
	if (!isValidEmail(emailInput.value)) {
		showFieldError(
			emailInput,
			errorMessages.email
		);

		return false;
	}

	clearFieldError(emailInput);

	return true;
}

function validatePhone() {
	if (!isValidPhone(phoneInput.value)) {
		showFieldError(
			phoneInput,
			errorMessages.phone
		);

		return false;
	}

	clearFieldError(phoneInput);

	return true;
}

function validateBirthDate() {
	if (!isAdult(birthDateInput.value)) {
		showFieldError(
			birthDateInput,
			errorMessages.birthDate
		);

		return false;
	}

	clearFieldError(birthDateInput);

	return true;
}

function validateHowHeard() {
	if (!howHeardSelect.value) {
		showFieldError(
			howHeardSelect,
			errorMessages.howHeard
		);

		return false;
	}

	clearFieldError(howHeardSelect);

	return true;
}

function validateCountry() {
	if (!countrySelect.value) {
		showFieldError(
			countrySelect,
			errorMessages.country
		);

		return false;
	}

	clearFieldError(countrySelect);

	return true;
}

function validateCity() {
	if (
		citySelect.disabled ||
		!citySelect.value
	) {
		showFieldError(
			citySelect,
			errorMessages.city
		);

		return false;
	}

	clearFieldError(citySelect);

	return true;
}

function validateTerms() {
	if (!termsCheckbox.checked) {
		showFieldError(
			termsCheckbox,
			errorMessages.terms
		);

		return false;
	}

	clearFieldError(termsCheckbox);

	return true;
}

/*
	Valida un campo concreto y después actualiza
	el resumen inferior.

	Esta es la parte importante del cambio:
	cuando el campo pasa a ser válido, aria-invalid
	cambia a false y desaparece también del resumen.
*/
function validateField(field) {
	let isValid = true;

	switch (field.id) {
		case "full-name":
			isValid = validateFullName();
			break;

		case "email":
			isValid = validateEmail();
			break;

		case "phone":
			isValid = validatePhone();
			break;

		case "birth-date":
			isValid = validateBirthDate();
			break;

		case "how-heard":
			isValid = validateHowHeard();
			break;

		case "country":
			isValid = validateCountry();
			break;

		case "city":
			isValid = validateCity();
			break;

		case "terms":
			isValid = validateTerms();
			break;
	}

	updateValidationSummary();

	return isValid;
}

function getValidationResults() {
	return [
		{
			field: fullNameInput,
			isValid: validateFullName(),
		},
		{
			field: emailInput,
			isValid: validateEmail(),
		},
		{
			field: phoneInput,
			isValid: validatePhone(),
		},
		{
			field: birthDateInput,
			isValid: validateBirthDate(),
		},
		{
			field: howHeardSelect,
			isValid: validateHowHeard(),
		},
		{
			field: countrySelect,
			isValid: validateCountry(),
		},
		{
			field: citySelect,
			isValid: validateCity(),
		},
		{
			field: termsCheckbox,
			isValid: validateTerms(),
		},
	];
}

function showValidationSummary(results) {
	const invalidResults = results.filter(
		(result) => !result.isValid
	);

	formSummaryList.innerHTML = "";

	invalidResults.forEach(({ field }) => {
		const listItem = document.createElement("li");
		const link = document.createElement("a");

		link.href = `#${field.id}`;

		link.textContent =
			fieldNames[field.id] || "Campo inválido";

		link.className =
			"font-semibold underline hover:text-red-950";

		link.addEventListener("click", (event) => {
			event.preventDefault();
			field.focus();
		});

		listItem.appendChild(link);
		formSummaryList.appendChild(listItem);
	});

	if (invalidResults.length > 0) {
		formSummary.classList.remove("hidden");
	} else {
		formSummary.classList.add("hidden");
	}
}

/*
	Reconstruye el resumen usando el estado actual
	de cada campo.

	Solo se ejecuta visualmente después de que el
	usuario haya intentado enviar el formulario.
*/
function updateValidationSummary() {
	if (!formHasBeenSubmitted) {
		return;
	}

	const results = validatedFields.map((field) => {
		return {
			field,
			isValid:
				field.getAttribute("aria-invalid") !==
				"true",
		};
	});

	showValidationSummary(results);
}

function resetFormState() {
	formHasBeenSubmitted = false;

	validatedFields.forEach((field) => {
		clearFieldError(field);
	});

	formSummary.classList.add("hidden");
	formSummaryList.innerHTML = "";

	successMessage.classList.add("hidden");

	resetCitySelect();
	resetLocationSelect();

	foodOtherContainer.classList.add("hidden");
	foodOtherInput.disabled = true;
	foodOtherInput.value = "";
}

countrySelect.addEventListener("change", () => {
	updateCities();

	validateField(countrySelect);

	/*
		Al cambiar el país, la ciudad anterior deja de
		ser válida porque sus opciones se reemplazan.
	*/
	if (formHasBeenSubmitted) {
		validateField(citySelect);
	} else {
		clearFieldError(citySelect);
	}

	if (phoneInput.value.trim() !== "") {
		validateField(phoneInput);
	}

	successMessage.classList.add("hidden");
});

citySelect.addEventListener("change", () => {
	updateLocations();
	validateField(citySelect);

	successMessage.classList.add("hidden");
});

foodOtherCheckbox.addEventListener("change", () => {
	const isChecked = foodOtherCheckbox.checked;

	foodOtherContainer.classList.toggle(
		"hidden",
		!isChecked
	);

	foodOtherInput.disabled = !isChecked;

	if (isChecked) {
		foodOtherInput.focus();
	} else {
		foodOtherInput.value = "";
	}
});

const textFields = [
	fullNameInput,
	emailInput,
	phoneInput,
	birthDateInput,
];

textFields.forEach((field) => {
	field.addEventListener("input", () => {
		/*
			Después del primer intento de envío,
			validamos mientras el usuario escribe.

			Así el error desaparece inmediatamente
			tanto del input como del resumen.
		*/
		if (
			formHasBeenSubmitted ||
			field.getAttribute("aria-invalid") ===
				"true"
		) {
			validateField(field);
		}

		successMessage.classList.add("hidden");
	});

	field.addEventListener("blur", () => {
		validateField(field);
	});
});

howHeardSelect.addEventListener("change", () => {
	validateField(howHeardSelect);

	successMessage.classList.add("hidden");
});

termsCheckbox.addEventListener("change", () => {
	validateField(termsCheckbox);

	successMessage.classList.add("hidden");
});

form.addEventListener("submit", (event) => {
	event.preventDefault();

	formHasBeenSubmitted = true;

	successMessage.classList.add("hidden");

	const validationResults =
		getValidationResults();

	const formIsValid =
		validationResults.every(
			(result) => result.isValid
		);

	showValidationSummary(validationResults);

	if (!formIsValid) {
		formSummary.focus();
		return;
	}

	const formData = new FormData(form);

	const registrationData = {
		fullName: formData.get("fullName"),
		email: formData.get("email"),
		phone: formData.get("phone"),
		birthDate: formData.get("birthDate"),
		howHeard: formData.get("howHeard"),
		country: formData.get("country"),
		city: formData.get("city"),

		favoriteLocation:
			formData.get("favoriteLocation") ||
			null,

		foodPreferences:
			formData.getAll("foodPreferences"),

		foodOther:
			formData.get("foodOther") || null,

		termsAccepted:
			formData.get("terms") === "on",

		acceptsMarketing:
			formData.get("marketing") === "on",
	};

	console.log(
		"Registro de Brasa Points simulado:",
		registrationData
	);

	formSummary.classList.add("hidden");

	successMessage.classList.remove("hidden");
	successMessage.focus();

	form.reset();

	formHasBeenSubmitted = false;

	validatedFields.forEach((field) => {
		clearFieldError(field);
	});

	resetCitySelect();
	resetLocationSelect();

	foodOtherContainer.classList.add("hidden");
	foodOtherInput.disabled = true;
});

form.addEventListener("reset", () => {
	window.setTimeout(() => {
		resetFormState();
		fullNameInput.focus();
	}, 0);
});

resetCitySelect();
resetLocationSelect();