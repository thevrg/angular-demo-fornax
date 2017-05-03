export enum CourseType {
    INSTRUCTOR_LED, LIVE_VIRTUAL, SELF_PACED
}

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
