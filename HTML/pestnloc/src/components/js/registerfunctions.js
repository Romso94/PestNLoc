
export const formData = {
    registerFirstName: "",
    registerLastName: "",
    registerMail: "",
    registerAddress: "",
    registerPassword: "",
    registerPasswordConfirm: "",
    selectedYear : "Select your birth year",
    selectedCountry : "Select your country",
    selectedGender : "Select your gender",
    phoneNumber : "",
    LicenseDateIssue : ""
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