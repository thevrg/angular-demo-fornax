export enum CourseType {
    INSTRUCTOR_LED, LIVE_VIRTUAL, SELF_PACED
}

export const COURSE_TYPES_WITH_NAMES_KEY = 'courseTypesWithNames';

export const courseTypesWithNames: { value: CourseType, name: string }[] = [
    { value: CourseType.INSTRUCTOR_LED, name: 'Instructor Led' },
    { value: CourseType.LIVE_VIRTUAL, name: 'Live Virtual' },
    { value: CourseType.SELF_PACED, name: 'Self Paced' },
];

export class Course {
    name: string;
    description: string;
    type: CourseType;
    private: boolean;

    constructor() {
        this.name = '';
        this.description = 'This is a description';
        this.type = CourseType.INSTRUCTOR_LED;
        this.private = false;
    }
}
