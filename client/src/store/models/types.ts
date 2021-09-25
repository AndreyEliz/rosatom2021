export type Person = {
    Id: number;
    Position: "Ведущий инженер";
    DateOfBirth: string;
    Sex: "женский" | "мужской";
    MaritalStatus: MaritalStatus;
    StartDate: string;
    EndDate: null | string;
    NameOfAbsence: string;
    CalendarDaysOfAbsence: number;
    Rate: number;
    City: string;
    CountOfChildren: number;
    HasMentor: boolean;
}

type MaritalStatus = {
    1: "Разв.";
    2: "Жен/ЗМ";
    3: "Вдов.";
    4: "Хол/НЗ";
    5: "ГрБрак";
}