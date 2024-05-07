export interface FormData {
    vacancyName: string;
    companyName: string;
    companyPlace: string;
    schedule: string;
    experience: string;
    keySkills: string[];
}

export interface FormDataToken {
    token: string;
    vacancyName: string;
    companyName: string;
    companyPlace: string;
    schedule: string;
    experience: string;
    keySkills: string[];
}

export interface statusPositionResponse {
    message: string;
    content: string | number;
}