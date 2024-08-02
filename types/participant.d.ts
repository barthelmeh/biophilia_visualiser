type ParticipantRegister = {
    firstName: string,
    lastName: string,
    email: string,
    age: number,
    gender: string,
    activityLevel: import('../constants').activityLevel,
}

type Participant = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    age: number,
    gender: import('../constants').gender,
    activityLevel: import('../constants').activityLevel,
    hasAcceptedTerms: boolean
}