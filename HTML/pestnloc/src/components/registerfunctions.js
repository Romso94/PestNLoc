
export const formData = {
    registerFirstName: "",
    registerLastName: "",
    registerMail: "",
    registerAddress: "",
    registerPassword: "",
    registerPasswordConfirm: "",
    selectedMonth : "Select your birth month",
    selectedYear : "Select your birth year",
    selectedCountry : "Select your country",
    selectedGender : "Select your gender",
};

export function getFormData() {
    return formData;
}

export function updateFormData(newData) {
    Object.assign(formData, newData);
}

export function showFormData(){
    console.log(formData);
}