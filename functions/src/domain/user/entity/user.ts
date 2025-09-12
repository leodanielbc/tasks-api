type UserProps = {
    id?: string;
    email: string;
    createdAt?: string;
}
export class User {

    private constructor(private props: UserProps) { }

    public static create(email: string) {
        return new User({ email });
    }


    get id(): string | undefined {
        return this.props.id;
    }

    get email(): string {
        return this.props.email;
    }
    
    get createdAt(): string | undefined {
        return this.props.createdAt;
    }

    toJSON() { return { ...this.props }; }
}