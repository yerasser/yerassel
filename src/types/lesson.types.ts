export type Lesson = {
    id: number;
    day: string;
    time_slot: string;
    person: string;
    subject: string;
    teacher: string;
    classroom: string;
    type: string;
};

export type Slot = {
    slot: string;
    yerassyl: Lesson | null;
    asel: Lesson | null
};
