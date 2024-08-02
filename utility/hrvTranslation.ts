import { gender, stressLevel } from "@/constants";

// Update based on overleaf document
const hrvTranslation = (data: Data, participant: Participant): stressLevel => {

    if (participant.age < 20) {
        if (data.value > 70) return stressLevel.CALM;
        if (data.value >= 50) return stressLevel.MODERATE;
        return stressLevel.STRESSED;
    }
    if (participant.age < 30) {
        if (data.value > 55) return stressLevel.CALM;
        if (data.value >= 37) return stressLevel.MODERATE;
        return stressLevel.STRESSED;
    }
    if (participant.age < 40) {
        if (data.value > 44) return stressLevel.CALM;
        if (data.value >= 28) return stressLevel.MODERATE;
        return stressLevel.STRESSED;
    }
    if (participant.age < 50) {
        if (data.value > 35) return stressLevel.CALM;
        if (data.value >= 21) return stressLevel.MODERATE;
        return stressLevel.STRESSED;
    }
    if (participant.age < 60) {
        if (data.value > 28) return stressLevel.CALM;
        if (data.value >= 16) return stressLevel.MODERATE;
        return stressLevel.STRESSED;
    }
    if (participant.age < 70) {
        if (data.value > 23) return stressLevel.CALM;
        if (data.value >= 13) return stressLevel.MODERATE;
        return stressLevel.STRESSED;
    }
    if (data.value > 21) return stressLevel.CALM;
    if (data.value >= 13) return stressLevel.MODERATE;
    return stressLevel.STRESSED;

};

export default hrvTranslation;
