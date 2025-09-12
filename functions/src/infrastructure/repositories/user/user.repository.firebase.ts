import { User } from "../../../domain/user/entity/user";
import { UserGateway } from "../../../domain/user/gateway/user.gateway";
import { firestore } from "../../package/firebase";



export class UserRepositoryFirestore implements UserGateway {
    private collectionName = 'users';

    private constructor() { }

    public static create() {
        return new UserRepositoryFirestore();
    }


    async findByEmail(email: string): Promise<User | null> {
        const db = firestore();
        const snapshot = await db.collection(this.collectionName).where('email', '==', email).limit(1).get();
        if (snapshot.empty) return null;
        const doc = snapshot.docs[0];
        if (!doc) return null;
        return { id: doc.id, ...(doc.data() as any) } as User;
    }


    async save(user: User): Promise<User> {
        const db = firestore();
        const data = user.toJSON();
        const ref = await db.collection(this.collectionName).add(data);
        return { id: ref.id, ...data } as User;
    }
}