export type TaskProps = {
    id?: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
    userId: string;
};

export class Task {
    public readonly id?: string;
    public readonly title: string;
    public readonly description: string;
    public readonly completed: boolean;
    public readonly createdAt: string;
    public readonly userId: string;

    private constructor(props: TaskProps) {
        this.title = props.title;
        this.description = props.description;
        this.completed = props.completed;
        this.createdAt = props.createdAt;
        this.userId = props.userId;
    }

    public static create(props: TaskProps) {
        return new Task(props);
    }

    public toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            completed: this.completed,
            createdAt: this.createdAt,
            userId: this.userId,
        };
    }

    public toggleComplete() {
        return Task.create({
            ...this,
            completed: !this.completed,
        });
    }
}