type ParticipantRegister = {
    firstName: string,
    lastName: string,
    email: string,
    age: number,
    gender: import('../constants').gender,
    activityLevel: import('../constants').activityLevel,
}

type Participant = ParticipantRegister & {
    id: number,
    hasAcceptedTerms: boolean
}