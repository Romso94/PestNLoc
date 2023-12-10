export const formData = {
    registerFirstName: "",
    registerLastName: "",
    registerMail: "",
    registerAddress: "",
    registerPassword: "",
    registerPasswordConfirm: "",
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