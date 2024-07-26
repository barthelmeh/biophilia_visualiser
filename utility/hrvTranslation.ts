import { gender, stressLevel } from "@/constants";

// Update based on overleaf document
const hrvTranslation = (value: number, age: number, gender: gender): stressLevel => {

    if (age < 20) {
        if (value > 70) return stressLevel.CALM;
        if (value >= 50) return stressLevel.MODERATE;
        return stressLevel.STRESSED;
    }
    if (age < 30) {
        if (value > 55) return stressLevel.CALM;
        if (value >= 37) return stressLevel.MODERATE;
        return stressLevel.STRESSED;
    }
    if (age < 40) {
        if (value > 44) return stressLevel.CALM;
        if (value >= 28) return stressLevel.MODERATE;
        return stressLevel.STRESSED;
    }
    if (age < 50) {
        if (value > 35) return stressLevel.CALM;
        if (value >= 21) return stressLevel.MODERATE;
        return stressLevel.STRESSED;
    }
    if (age < 60) {
        if (value > 28) return stressLevel.CALM;
        if (value >= 16) return stressLevel.MODERATE;
        return stressLevel.STRESSED;
    }
    if (age < 70) {
        if (value > 23) return stressLevel.CALM;
        if (value >= 13) return stressLevel.MODERATE;
        return stressLevel.STRESSED;
    }
    if (value > 21) return stressLevel.CALM;
    if (value >= 13) return stressLevel.MODERATE;
    return stressLevel.STRESSED;

};

export default hrvTranslation;
